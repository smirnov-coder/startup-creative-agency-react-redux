import { DomainUser } from "@store/entities";
import { Action, Dispatch } from "redux";
import { createSimpleAction, readAccessToken, OperationDetails, ValidationProblemDetails } from "./appActions";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, Routes } from "@scripts/constants";
import { push } from "connected-react-router";
import * as $ from "jquery";
import { decodeHTML, encodeHTML } from "@scripts/utils";
import { addNotification } from "./notificationsActions";
import { Notification } from "@store/state";
import { doSignOut } from "./authActions";

export const fetchMe = () => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_USERS));
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    };
    return fetch(GLOBALS.api.self, options)
        .then(response => {
            //console.log("response", response);//
            switch (response.status) {
                case 200:
                case 404:
                    return response.json();

                case 401:
                    dispatch(doSignOut());
                    dispatch(push(Routes.LOGIN));
                    throw new Error("Unauthorized request.");

                case 500:
                    throw new Error("Internal server error.")
            }
        })
        .then((data: DomainUser | OperationDetails) => {
            if ("isError" in data) {
                dispatch(push(Routes.NOT_FOUND));
                throw new Error((data as OperationDetails).message);
            }
            dispatch(setCurrentUser(data));
        })
        .catch((error: Error) => {
            console.error("fetchMe error", error);
        });
}

export interface CurrentUserAction extends Action {
    payload: {
        user: DomainUser
    };
}

const setCurrentUser = (user: DomainUser): CurrentUserAction => {
    return {
        type: ActionTypes.CURRENT_USER,
        payload: {
            user
        }
    };
}

export const updateProfile = (userName: string, formData: FormData) => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_USERS));
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        method: "PUT",
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        },
        body: formData
    };
    let uriTemplate: string = decodeHTML(GLOBALS.api.updateUserProfile); //console.log("template", uriTemplate);//
    let uri: string = $.validator.format(uriTemplate, userName);
    return fetch(uri, options)
        .then(response => {
            //console.log("response", response);//
            switch (response.status) {
                case 200:
                case 404:
                    return response.json();

                case 401:
                    dispatch(push(Routes.LOGIN));
                    throw new Error("Unauthorized request.");

                case 500:
                    throw new Error("Internal server error.")
            }
        })
        .then((data: OperationDetails | ValidationProblemDetails) => {
            //console.log("data", data);//
            let details: OperationDetails = null;
            if ("title" in data) {
                details = {
                    isError: true,
                    message: (data as ValidationProblemDetails).title
                };
            } else {
                details = <OperationDetails>data;
            }
            let notification: Notification = {
                id: Date.now(),
                type: details.isError ? "error" : "success",
                text: encodeHTML(details.message)
            }
            dispatch(addNotification(notification));
            fetchMe()(dispatch);
        })
        .catch((error: Error) => {
            console.error("updateProfile error", error);
        });
}