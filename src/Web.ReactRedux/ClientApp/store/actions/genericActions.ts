import { Action, Dispatch } from "redux";
import { push } from "connected-react-router";
import { history } from "@store/configureStore";
import { Notification } from "@store/state";
import { Routes, HttpMethod } from "@scripts/constants";
import { decodeHTML, formatString, encodeHTML } from "@scripts/utils";
import { readAccessToken, OperationDetails, ValidationProblemDetails, doSignOut, addNotification } from "@store/actions";

interface FetchDataRequest<T> {
    url: string;
    requestInit: (dispatch: Dispatch) => void;
    requestComplete: (dispatch: Dispatch) => void;
    success: (data: T) => Action;
    errorMessage: string;
}

export function fetchData<T>({ url, requestInit, requestComplete, success, errorMessage }: FetchDataRequest<T>) {
    return (dispatch: Dispatch) => {
        requestInit(dispatch);
        let accessToken: string = readAccessToken();
        let options: RequestInit = {
            headers: !accessToken ? {} : {
                Authorization: `Bearer ${accessToken}`
            }
        };
        return fetch(url, options)
            .then(response => {
                return handleResponse(response, dispatch, requestComplete);
            })
            .then((data: T) => {
                dispatch(success(data));
            })
            .catch(error => {
                console.error(errorMessage);
                console.error(error);
            });
    }
}

export function handleResponse(response: Response, dispatch: Dispatch, badResponse: (dispatch: Dispatch) => void) {
    switch (response.status) {
        case 200:
        case 400:
        case 404:
            return response.json();

        case 401:
            dispatch(doSignOut());
            dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }));
            badResponse(dispatch);
            throw new Error(response.statusText);

        case 403:
            dispatch(push(Routes.ACCESS_DENIED));

        case 500:
            badResponse(dispatch);
            throw new Error(response.statusText);

        default:
            throw new Error(`Unhandled response status code: ${response.status}.`);
    }
}

export interface ItemsAction<T> extends Action {
    payload: {
        items: T[],
        append: boolean
    };
}

export function addItems<T>(items: T[], append: boolean = false, actionType: string): ItemsAction<T> {
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

export function setCurrent<T>(item: T, actionType: string): CurrentAction<T> {
    return {
        type: actionType,
        payload: {
            item
        }
    };
}

interface DeleteEntityRequest {
    entityId: number | string;
    urlTemplate: string;
    requestInit: (dispatch: Dispatch) => void;
    requestComplete: (dispatch: Dispatch) => void;
    success: (dispatch: Dispatch) => void;
    errorMessage: string;
}

export function deleteEntity({ entityId, urlTemplate, requestInit, requestComplete, success, errorMessage }: DeleteEntityRequest) {
    return (dispatch: Dispatch) => {
        requestInit(dispatch);
        let accessToken: string = readAccessToken();
        if (!accessToken) {
            return dispatch(push(Routes.LOGIN, { returnUrl: history.location.pathname }))
        }
        let options: RequestInit = {
            method: HttpMethod.DELETE,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        let template: string = decodeHTML(urlTemplate);
        let url: string = formatString(template, entityId);
        return fetch(url, options)
            .then(response => {
                return handleResponse(response, dispatch, requestComplete);
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
                dispatch(addNotification(notification));
                success(dispatch);
            })
            .catch(error => {
                console.error(errorMessage);
                console.error(error);
            });
    }
}

interface SubmitFormDataRequest {
    formData: FormData;
    url: string;
    method: HttpMethod;
    requestInit: (dispatch: Dispatch) => void;
    requestComplete: (dispatch: Dispatch) => void;
    success: (dispatch: Dispatch) => void;
    errorMessage: string;
}

export function submitFormData({ formData, url, method, requestInit, success, requestComplete, errorMessage }: SubmitFormDataRequest) {
    return (dispatch: Dispatch) => {
        requestInit(dispatch);
        let accessToken: string = readAccessToken();
        if (!accessToken) {
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
                return handleResponse(response, dispatch, requestComplete);
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
                !details.isError
                    ? success(dispatch)
                    : requestComplete(dispatch);
            })
            .catch(error => {
                console.error(errorMessage);
                console.error(error);
            });
    }
}