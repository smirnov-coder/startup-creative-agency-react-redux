import { ContactMessage } from "@containers/Home/ContactForm";
import { Dispatch, Action } from "redux";
import { createSimpleAction, OperationDetails, ValidationProblemDetails } from "./appActions";
import { ActionTypes } from "./actionTypes";
import { GLOBALS } from "@scripts/constants";

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