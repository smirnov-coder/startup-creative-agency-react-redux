import { Dispatch, Action } from "redux";
import { push } from "connected-react-router";
import { createSimpleAction, OperationDetails, ValidationProblemDetails, InitialAppState } from "./appActions";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, Routes, TOKEN_STORAGE_KEY } from "@scripts/constants";

interface SignInInfo {
    userName: string;
    password: string;
    rememberMe: boolean;
    returnUrl?: string;
}

interface AuthResult {
    accessToken: string;
    appState: InitialAppState;
}

export const signIn = ({ userName, password, rememberMe, returnUrl }: SignInInfo) => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_AUTH));
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, password })
    };
    return fetch(GLOBALS.api.accessToken, options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: OperationDetails | ValidationProblemDetails | AuthResult) => {
            if ("accessToken" in data) {
                dispatch(doSignIn(data, rememberMe));
                /// TODO: Добавить ссылку на май профайл
                dispatch(push(returnUrl ? returnUrl : Routes.MY_PROFILE));
                return;
            }
            let errorMessage: string;
            if ("title" in data) {
                errorMessage = data.title;
            } else {
                errorMessage = (data as OperationDetails).message;
            }
            dispatch(signInError(errorMessage));
        })
        .catch((error: Error) => {
            console.error("signIn error", error);//
        });
}

export interface SignInAction extends Action {
    payload: {
        appState: InitialAppState
    };
}

const doSignIn = (authResult: AuthResult, rememberMe: boolean): SignInAction => {
    if (rememberMe) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, authResult.accessToken)
    } else {
        window.sessionStorage.setItem(TOKEN_STORAGE_KEY, authResult.accessToken);
    }
    return {
        type: ActionTypes.SIGN_IN,
        payload: {
            appState: authResult.appState
        }
    };
}

export interface ErrorAction extends Action {
    payload: {
        message: string
    };
}

const signInError = (message: string): ErrorAction => {
    return {
        type: ActionTypes.ERROR,
        payload: {
            message
        }
    };
}

export const signOut = () => (dispatch: Dispatch) => {
    dispatch(doSignOut());
    dispatch(push(Routes.HOME));
}

export type SignOutAction = Action;

const doSignOut = (): SignOutAction => {
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    return {
        type: "SIGN_OUT"
    };
}