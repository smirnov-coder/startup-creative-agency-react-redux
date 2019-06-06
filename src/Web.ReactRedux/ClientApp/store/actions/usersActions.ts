import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { Notification } from "@store/state";
import { DomainUser } from "@store/entities";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { decodeHTML, encodeHTML, formatString } from "@scripts/utils";
import {
    createNonPayloadAction,
    readAccessToken,
    OperationDetails,
    ValidationProblemDetails,
    ActionTypes,
    addNotification,
    fetchData,
    ItemsAction,
    addItems,
    CurrentAction,
    setCurrent,
    deleteEntity,
    submitFormData,
    handleResponse
} from "@store/actions";

export function fetchMe() {
    let url: string = GLOBALS.api.self;
    return fetchData<DomainUser>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)),
        success: setCurrentUser,
        errorMessage: `Failed to fetch user from ${url}.`
    });
}

const setCurrentUser = (user: DomainUser): CurrentAction<DomainUser> => setCurrent<DomainUser>(user, ActionTypes.CURRENT_USER);

export function updateProfile(userProfileData: FormData) {
    return submitFormData({
        url: GLOBALS.api.updateUserProfile,
        formData: userProfileData,
        method: HttpMethod.PUT,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)),
        success: fetchMe(),
        errorMessage: `Failed to update profile for user '${userProfileData.get("UserName")}'.`
    });
}

export function fetchUsers() {
    let url: string = GLOBALS.api.users;
    return fetchData<DomainUser[]>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)),
        success: addUsers,
        errorMessage: `Failed to fetch users from ${url}.`
    });
}

const addUsers = (users: DomainUser[]): ItemsAction<DomainUser> => addItems(users, false, ActionTypes.USERS);

export function fetchUser(userName: string) {
    let template: string = decodeHTML(GLOBALS.api.user);
    let url: string = formatString(template, userName);
    return fetchData<DomainUser>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)),
        success: setCurrentUser,
        errorMessage: `Failed to fetch user '${userName}' from ${url}.`
    });
}

export function deleteUser(userName: string) {
    return deleteEntity({
        entityId: userName,
        urlTemplate: GLOBALS.api.user,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)),
        success: (dispatch) => dispatch(push(Routes.USERS)),
        errorMessage: `Failed to delete user '${userName}'.`
    });
}

export function updateDisplayStatus(userName: string, isDisplayed: boolean) {
    return (dispatch: Dispatch) => {
        dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS));
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
                return handleResponse(response, dispatch, dispatch =>
                    dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)));
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
                dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED));
                if (!details.isError) {
                    dispatch(push(Routes.USERS));
                }
            })
            .catch(error => {
                console.error(`Failed to update display status for user '${userName}'.`);
                console.error(error);
            });
    }
}

export const registerUser = (userData: FormData) => {
    return submitFormData({
        formData: userData,
        method: HttpMethod.POST,
        url: GLOBALS.api.registerUser,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_USERS_COMPLETED)),
        success: (dispatch) => dispatch(push(Routes.USERS)),
        errorMessage: "Failed to register new user."
    });
}