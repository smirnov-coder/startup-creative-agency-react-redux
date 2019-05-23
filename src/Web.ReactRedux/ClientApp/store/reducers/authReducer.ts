import { AuthState, initialState } from "@store/state";
import { InitialAppStateAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";
import { SignOutAction, SignInAction, ErrorAction } from "@store/actions/authActions";

type AuthActions =
    | InitialAppStateAction
    | SignInAction
    | SignOutAction
    | ErrorAction

export default function authReducer(state: AuthState = initialState.auth, action: AuthActions): AuthState {
    switch (action.type) {
        case ActionTypes.REQUEST_AUTH: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_AUTH_COMPLETED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case ActionTypes.INITIAL_APP_STATE: {
            let { userName, photo, isAdmin, isAuthenticated } = (action as InitialAppStateAction).payload.initialState;
            return {
                ...state,
                isLoading: false,
                userName,
                photo,
                isAdmin,
                isAuthenticated
            };
        }

        case ActionTypes.SIGN_IN: {
            let { userName, photo, isAdmin, isAuthenticated } = (action as SignInAction).payload.appState
            return {
                isLoading: false,
                errorMessage: "",
                userName,
                photo,
                isAuthenticated,
                isAdmin
            };
        }

        case ActionTypes.SIGN_OUT: {
            return {
                userName: "",
                photo: "",
                isAuthenticated: false,
                isAdmin: false,
                isLoading: false,
                errorMessage: ""
            };
        }

        case ActionTypes.ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMessage: (action as ErrorAction).payload.message
            };
        }

        //case "INIT_LOGIN_PAGE":
        //case "INIT_NOT_FOUND_PAGE": //console.log("state", state); console.log("action", action);//
        //case "INIT_ACCESS_DENIED_PAGE": {
        //    let { userName, photo, isAuthenticated } = action;
        //    return {
        //        ...state,
        //        userName,
        //        photo,
        //        isAuthenticated,
        //        isLoading: false
        //    };
        //}

        //case "INIT_SERVICES_PAGE":
        //case "INIT_ADD_SERVICE_PAGE":
        //case "INIT_EDIT_SERVICE_PAGE":
        //case "INIT_MY_PROFILE_PAGE": {
        //    //console.log("state", state);//
        //    let { userName, photo, isAuthenticated, isAdmin } = action;
        //    return {
        //        userName,
        //        photo,
        //        isAuthenticated,
        //        isAdmin,
        //        isLoading: false
        //    };
        //}

        default:
            return state;
    }
}