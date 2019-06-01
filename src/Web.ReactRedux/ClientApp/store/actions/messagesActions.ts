import { ContactMessage } from "@containers/Home/ContactForm";
import { Dispatch, Action } from "redux";
import { createSimpleAction, OperationDetails, ValidationProblemDetails, readAccessToken } from "./appActions";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, Routes } from "@scripts/constants";
import { fetchData, ItemsAction, addItems, setCurrent } from "./genericActions";
import { Message } from "@store/entities";
import { push } from "connected-react-router";
import { history } from "@store/configureStore";
import { doSignOut } from "./authActions";
import { Notification } from "@store/state";
import { encodeHTML, decodeHTML, formatString } from "@scripts/utils";
import { addNotification } from "./notificationsActions";

export const sendMessage = (message: ContactMessage) => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_MESSAGES));
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    };
    return fetch(GLOBALS.api.messages, options)
        .then((response: Response) => {
            return response.json();
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
        .catch((error: Error) => {
            console.error(error, "sendMessage error");//
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
    return fetchData<Message[]>({
        url: GLOBALS.api.messages,
        requestActionType: ActionTypes.REQUEST_MESSAGES,
        success: addMessages,
        errorTitle: "fetch messages error"
    });
}

const addMessages = (messages: Message[]): ItemsAction<Message> => addItems<Message>(messages, false, ActionTypes.MESSAGES);

export function markAsUnread(messageIds: number[]) {
    //console.log("ids", messageIds);//
    return submitJsonData({
        jsonData: JSON.stringify({ messageIds, isRead: false }),
        url: GLOBALS.api.messages,
        method: "PUT",
        requestActionType: ActionTypes.REQUEST_MESSAGES,
        success: fetchMessages,
        errorTitle: "mark as unread error"
    });
}

interface SubmitJsonDataRequest {
    jsonData: string;
    url: string;
    method: "POST" | "PUT" | "DELETE",
    requestActionType: string;
    success: () => (dispatch: Dispatch) => void;
    errorTitle: string;
    notify?: boolean;
}

function submitJsonData({ jsonData, url, method, requestActionType, success, errorTitle, notify = true }: SubmitJsonDataRequest) {
    return (dispatch: Dispatch) => {
        dispatch(createSimpleAction(requestActionType));
        let accessToken: string = readAccessToken();
        if (!accessToken) {
            return dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }));
        }
        let options: RequestInit = {
            method,
            headers: !accessToken ? {} : {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: jsonData
        };
        return fetch(url, options)
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 400:
                    case 404:
                        return response.json();

                    case 401:
                        dispatch(doSignOut());
                        dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }));
                        throw new Error(response.statusText);

                    case 403:
                        dispatch(push(Routes.ACCESS_DENIED));
                        throw new Error(response.statusText);

                    case 500:
                        throw new Error(response.statusText);

                    default:
                        throw new Error("Unhandled response status code.");
                }
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
                success()(dispatch);
            })
            .catch(error => {
                console.error(errorTitle, error);
            });
    }
}

export function deleteMessages(messageIds: number[]) {
    return submitJsonData({
        jsonData: JSON.stringify(messageIds),
        url: GLOBALS.api.messages,
        method: "DELETE",
        requestActionType: ActionTypes.REQUEST_MESSAGES,
        success: fetchMessages,
        errorTitle: "delete messages error"
    });
}

export const fetchMessage = (messageId: number) => (dispatch: Dispatch) => {
    let template: string = decodeHTML(GLOBALS.api.message);
    let url: string = formatString(template, messageId);
    // Получаем с сервера сообщение с соответствующим Id.
    fetchData<Message>({
        url,
        requestActionType: ActionTypes.REQUEST_MESSAGES,
        success: setCurrentMessage,
        errorTitle: "fetch message error"
    })(dispatch);
    // Помечаем полученное сообщение как "прочитанное".
    markAsRead(messageId)(dispatch);
}

const setCurrentMessage = (message: Message) => setCurrent<Message>(message, ActionTypes.CURRENT_MESSAGE);

export function markAsRead(messageId: number) {
    return submitJsonData({
        jsonData: JSON.stringify({ messageIds: [messageId], isRead: true }),
        url: GLOBALS.api.messages,
        method: "PUT",
        requestActionType: ActionTypes.REQUEST_MESSAGES,
        success: () => (dispatch) => dispatch(createSimpleAction(ActionTypes.REQUEST_MESSAGES_COMPLETED)),
        errorTitle: "mark as read error",
        notify: false
    });
}
