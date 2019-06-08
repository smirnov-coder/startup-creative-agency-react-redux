import { Dispatch, Action } from "redux";
import { push } from "connected-react-router";
import { GLOBALS, Routes, TOKEN_STORAGE_KEY, HttpMethod } from "@scripts/constants";
import {
    createNonPayloadAction,
    OperationDetails,
    ValidationProblemDetails,
    InitialAppState,
    handleResponse,
    ActionTypes
} from "@store/actions";

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
    dispatch(createNonPayloadAction(ActionTypes.REQUEST_AUTH));
    let options: RequestInit = {
        method: HttpMethod.POST,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, password })
    };
    let url: string = GLOBALS.api.accessToken;
    return fetch(url, options)
        .then((response: Response) => {
            return handleResponse(response, dispatch, dispatch =>
                dispatch(createNonPayloadAction(ActionTypes.REQUEST_AUTH_COMPLETED)));
        })
        .then((data: OperationDetails | ValidationProblemDetails | AuthResult) => {
            if ("accessToken" in data) {
                dispatch(doSignIn(data, rememberMe));
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
        .catch(error => {
            console.error(`Failed to authenticate user '${userName}'. An error response was received from ${url}.`);
            console.error(error);
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

export const doSignOut = (): SignOutAction => {
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    return {
        type: ActionTypes.SIGN_OUT
    };
}