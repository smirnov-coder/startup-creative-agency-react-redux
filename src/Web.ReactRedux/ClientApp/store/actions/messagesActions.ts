import { Dispatch, Action } from "redux";
import { push } from "connected-react-router";
import { history } from "@store/configureStore";
import { Notification } from "@store/state";
import { Message } from "@store/entities";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { encodeHTML, decodeHTML, formatString } from "@scripts/utils";
import { ContactMessage } from "@containers/Home/ContactForm";
import {
    createNonPayloadAction,
    OperationDetails,
    ValidationProblemDetails,
    readAccessToken,
    ActionTypes,
    fetchData,
    ItemsAction,
    addItems,
    setCurrent,
    handleResponse,
    addNotification
} from "@store/actions";

export const sendMessage = (message: ContactMessage) => (dispatch: Dispatch) => {
    dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES));
    let options: RequestInit = {
        method: HttpMethod.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    };
    return fetch(GLOBALS.api.messages, options)
        .then((response: Response) => {
            return handleResponse(response, dispatch, dispatch =>
                dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)));
        })
        .then((data: OperationDetails | ValidationProblemDetails) => {
            let details: OperationDetails = null;
            if ("title" in data) {
                details = {
                    isError: true,
                    message: `${(data as ValidationProblemDetails).title} Please check message data and try again.`
                };
            } else {
                details = <OperationDetails>data;
            }
            dispatch(addSendingResult(details));
        })
        .catch(error => {
            console.error("Failed to send contact message.");
            console.error(error);
        });
}

export interface SendingResultAction extends Action {
    payload: {
        result: OperationDetails
    };
}

const addSendingResult = (result: OperationDetails) => {
    return {
        type: ActionTypes.SENDING_RESULT,
        payload: {
            result
        }
    };
}

export const clearSendingResult = (): SendingResultAction => {
    let result: OperationDetails = {
        isError: false,
        message: ""
    };
    return addSendingResult(result);
}

export function fetchMessages() {
    let url: string = GLOBALS.api.messages;
    return fetchData<Message[]>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        success: addMessages,
        errorMessage: `Failed to fetch messages from ${url}.`
    });
}

const addMessages = (messages: Message[]): ItemsAction<Message> => addItems<Message>(messages, false, ActionTypes.MESSAGES);

export function markAsUnread(messageIds: number[]) {
    return submitJsonData({
        jsonData: JSON.stringify({ messageIds, isRead: false }),
        url: GLOBALS.api.messages,
        method: HttpMethod.PUT,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        success: fetchMessages(),
        errorMessage: `Failed to mark messages with IDs = [${messageIds.join(", ")}] as unread.`
    });
}

interface SubmitJsonDataRequest {
    jsonData: string;
    url: string;
    method: HttpMethod,
    requestInit: (dispatch: Dispatch) => void;
    requestComplete: (dispatch: Dispatch) => void;
    success: (dispatch: Dispatch) => void;
    errorMessage: string;
    notify?: boolean;
}

function submitJsonData({
    jsonData,
    url,
    method,
    requestInit,
    requestComplete,
    success,
    errorMessage,
    notify = true
}: SubmitJsonDataRequest) {
    return (dispatch: Dispatch) => {
        requestInit(dispatch);
        let accessToken: string = readAccessToken();
        if (!accessToken) {
            return dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }));
        }
        let options: RequestInit = {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: jsonData
        };
        return fetch(url, options)
            .then(response => {
                return handleResponse(response, dispatch, dispatch => requestComplete(dispatch));
            })
            .then((data: OperationDetails | ValidationProblemDetails) => {
                if (notify) {
                    let details: OperationDetails = null;
                    if ("title" in data) {
                        details = {
                            isError: true,
                            message: (data as ValidationProblemDetails).title
                        }
                    } else {
                        details = <OperationDetails>data;
                    }
                    let notification: Notification = {
                        id: Date.now(),
                        type: details.isError ? "error" : "success",
                        text: encodeHTML(details.message)
                    };
                    dispatch(addNotification(notification));
                }
                success(dispatch);
            })
            .catch(error => {
                console.error(errorMessage);
                console.error(error);
            });
    }
}

export function deleteMessages(messageIds: number[]) {
    return submitJsonData({
        jsonData: JSON.stringify(messageIds),
        url: GLOBALS.api.messages,
        method: HttpMethod.DELETE,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        success: fetchMessages(),
        errorMessage: `Failed to delete messages with IDs = [${messageIds.join(", ")}].`
    });
}

export const fetchMessage = (messageId: number) => (dispatch: Dispatch) => {
    let template: string = decodeHTML(GLOBALS.api.message);
    let url: string = formatString(template, messageId);
    // Получаем с сервера сообщение с соответствующим Id.
    fetchData<Message>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        success: setCurrentMessage,
        errorMessage: `Failed to fetch message with ID = ${messageId}.`
    })(dispatch);
    // Помечаем полученное сообщение как "прочитанное".
    markAsRead(messageId)(dispatch);
}

const setCurrentMessage = (message: Message) => setCurrent<Message>(message, ActionTypes.CURRENT_MESSAGE);

export function markAsRead(messageId: number) {
    return submitJsonData({
        jsonData: JSON.stringify({ messageIds: [messageId], isRead: true }),
        url: GLOBALS.api.messages,
        method: HttpMethod.PUT,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        success: (dispatch) => dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        errorMessage: `Failed to mark message with ID = ${messageId} as read.`,
        notify: false
    });
}
