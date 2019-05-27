import { ActionTypes } from "./actionTypes";
import { Action, Dispatch } from "redux";
import { createSimpleAction, readAccessToken, OperationDetails, ValidationProblemDetails } from "./appActions";
import { doSignOut } from "./authActions";
import { Routes } from "@scripts/constants";
import { push } from "connected-react-router";
import { decodeHTML, formatString, encodeHTML } from "@scripts/utils";
import { Notification } from "@store/state";
import { addNotification } from "./notificationsActions";
import { history } from "@store/configureStore";

interface FetchDataRequest<T> {
    url: string;
    requestActionType: string;
    success: (data: T) => Action;
    errorTitle: string;
}

export function fetchData<T>({ url, requestActionType, success, errorTitle }: FetchDataRequest<T>) {
    return (dispatch: Dispatch) => {
        dispatch(createSimpleAction(requestActionType));
        let accessToken: string = readAccessToken();
        let options: RequestInit = {
            headers: !accessToken ? {} : {
                Authorization: `Bearer ${accessToken}`
            }
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
                        throw new Error("Unauthorized request.");

                    case 403:
                        dispatch(push(Routes.ACCESS_DENIED));
                        throw new Error("Forbidden.");

                    case 500:
                        throw new Error("Internal server error.")
                }
            })
            .then((data: T) => {
                //console.log("initial state", data);//
                dispatch(success(data));
            })
            .catch(error => {
                console.error(errorTitle, error);
            });
    }
}

export interface ItemsAction<T> extends Action {
    payload: {
        items: T[],
        append: boolean
    };
}

export function addItems<T>(items: T[], append: boolean = false, actionType: ActionTypes): ItemsAction<T> {
    return {
        type: actionType,
        payload: {
            items,
            append
        }
    };
}

export interface CurrentAction<T> extends Action {
    payload: {
        item: T
    };
}

export function setCurrent<T>(item: T, actionType: ActionTypes): CurrentAction<T> {
    return {
        type: actionType,
        payload: {
            item
        }
    };
}

interface DeleteEntityRequest {
    entityId: number;
    url: string;
    requestActionType: string;
    success: () => (dispatch: Dispatch) => void;
    errorTitle: string;
}

export function deleteEntity({ entityId, url, requestActionType, success, errorTitle }: DeleteEntityRequest) {
    return (dispatch: Dispatch) => {
        dispatch(createSimpleAction(requestActionType));
        let accessToken: string = readAccessToken();
        if (!accessToken) {
            console.log("form page url", history.location.pathname);//
            return dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }))
        }
        let options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        let uriTemplate: string = decodeHTML(url);
        let uri: string = formatString(uriTemplate, entityId);
        return fetch(uri, options)
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 400:
                    case 404:
                        return response.json();

                    case 401:
                        dispatch(doSignOut());
                        dispatch(push(Routes.LOGIN));
                        throw new Error("Unauthorized request.");

                    case 403:
                        dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }));
                        throw new Error("Forbidden.");

                    case 500:
                        throw new Error("Internal server error.")
                }
            })
            .then((data: OperationDetails | ValidationProblemDetails) => {
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
                dispatch(addNotification(notification))
                success()(dispatch);
            })
            .catch(error => {
                console.error(errorTitle, error);//
            });
    }
}

interface SubmitFormDataRequest {
    formData: FormData;
    url: string;
    method: "POST" | "PUT";
    requestActionType: string;
    successRedirectUrl: string;
    completedActionType: string;
    errorTitle: string;
}

export function submitFormData({ formData, url, method, requestActionType, successRedirectUrl, completedActionType,
    errorTitle }: SubmitFormDataRequest) {
    return (dispatch: Dispatch) => {
        dispatch(createSimpleAction(requestActionType));
        let accessToken: string = readAccessToken();
        if (!accessToken) {
            console.log("form page url", history.location.pathname);//
            return dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }))
        }
        let options: RequestInit = {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: formData
        };
        return fetch(url, options)
            .then((response: Response) => {
                switch (response.status) {
                    case 200:
                    case 400:
                    case 404:
                        return response.json();

                    case 401:
                        dispatch(doSignOut());
                        dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }));
                        throw new Error("Unauthorized request.");

                    case 403:
                        dispatch(push(Routes.ACCESS_DENIED));
                        throw new Error("Forbidden.");

                    case 500:
                        throw new Error("Internal server error.")
                }
            })
            .then((data: OperationDetails | ValidationProblemDetails) => {
                let isValidationError: boolean = "title" in data;
                let details: OperationDetails = null;
                if (isValidationError) {
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
                dispatch(addNotification(notification))
                if (!isValidationError) {
                    dispatch(push(successRedirectUrl));
                } else {
                    dispatch(createSimpleAction(completedActionType));
                }
            })
            .catch((error: Error) => {
                console.error(errorTitle, error);//
            });
    }
}