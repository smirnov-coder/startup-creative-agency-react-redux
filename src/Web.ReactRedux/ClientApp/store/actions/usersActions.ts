import { DomainUser } from "@store/entities";
import { Dispatch } from "redux";
import { createSimpleAction, readAccessToken, OperationDetails, ValidationProblemDetails } from "./appActions";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, Routes } from "@scripts/constants";
import { push } from "connected-react-router";
import { decodeHTML, encodeHTML, formatString } from "@scripts/utils";
import { addNotification } from "./notificationsActions";
import { Notification } from "@store/state";
import { doSignOut } from "./authActions";
import { fetchData, ItemsAction, addItems, CurrentAction, setCurrent, deleteEntity, submitFormData } from "./genericActions";

export function fetchMe() {
    return fetchData<DomainUser>({
        url: GLOBALS.api.self,
        requestActionType: ActionTypes.REQUEST_USERS,
        success: setCurrentUser,
        errorTitle: "fetch me error"
    });
}

const setCurrentUser = (user: DomainUser): CurrentAction<DomainUser> => setCurrent<DomainUser>(user, ActionTypes.CURRENT_USER);

export const updateProfile = (userProfileData: FormData) => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_USERS));
    let accessToken: string = readAccessToken();
    if (!accessToken) {
        return dispatch(push(Routes.LOGIN));
    }
    let options: RequestInit = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: userProfileData
    };
    return fetch(GLOBALS.api.updateUserProfile, options)
        .then(response => {
            //console.log("response", response);//
            switch (response.status) {
                case 200:
                case 400:
                case 404:
                    return response.json();

                case 401:
                    dispatch(doSignOut());
                    dispatch(push(Routes.LOGIN));
                    throw new Error(response.statusText)

                case 403:
                    dispatch(push(Routes.ACCESS_DENIED));

                case 500:
                    throw new Error(response.statusText)

                default:
                    throw new Error("Unhandled response status code.");
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
            console.error("update profile error", error);
        });
}

export function fetchUsers() {
    return fetchData<DomainUser[]>({
        url: GLOBALS.api.users,
        requestActionType: ActionTypes.REQUEST_USERS,
        success: addUsers,
        errorTitle: "fetch users error"
    });
}

const addUsers = (users: DomainUser[]): ItemsAction<DomainUser> => addItems(users, false, ActionTypes.USERS);

export function fetchUser(userName: string) {
    let template: string = decodeHTML(GLOBALS.api.user);
    let url: string = formatString(template, userName);
    return fetchData<DomainUser>({
        url,
        requestActionType: ActionTypes.REQUEST_USERS,
        success: setCurrentUser,
        errorTitle: "fetch user error"
    });
}

export function deleteUser(userName: string) {
    return deleteEntity({
        entityId: userName,
        urlTemplate: GLOBALS.api.user,
        requestActionType: ActionTypes.REQUEST_USERS,
        success: () => (dispatch) => dispatch(push(Routes.USERS)),
        errorTitle: "delete user error"
    });
}

export function updateDisplayStatus(userName: string, isDisplayed: boolean) {
    return (dispatch: Dispatch) => {
        //console.log("action isDisplayed", isDisplayed)
        dispatch(createSimpleAction(ActionTypes.REQUEST_USERS));
        let accessToken: string = readAccessToken();
        if (!accessToken) {
            return dispatch(push(Routes.LOGIN));
        }
        let options: RequestInit = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, isDisplayed })
        }
        return fetch(GLOBALS.api.updateUserStatus, options)
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 400:
                    case 404:
                        return response.json();

                    case 401:
                        dispatch(doSignOut());
                        dispatch(push(Routes.LOGIN));
                        throw new Error(response.statusText)

                    case 403:
                        dispatch(push(Routes.ACCESS_DENIED));

                    case 500:
                        throw new Error(response.statusText)

                    default:
                        throw new Error("Unhandled response status code.");
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
                dispatch(createSimpleAction(ActionTypes.REQUEST_USERS_COMPLETED));
                if (!details.isError) {
                    dispatch(push(Routes.USERS));
                }
            })
            .catch(error => {
                console.error("update display status error", error);
            });
    }
}

export const registerUser = (userData: FormData) => {
    return submitFormData({
        formData: userData,
        method: "POST",
        url: GLOBALS.api.registerUser,
        requestActionType: ActionTypes.REQUEST_USERS,
        completedActionType: ActionTypes.REQUEST_USERS_COMPLETED,
        successRedirectUrl: Routes.USERS,
        errorTitle: "register user error"
    });
}