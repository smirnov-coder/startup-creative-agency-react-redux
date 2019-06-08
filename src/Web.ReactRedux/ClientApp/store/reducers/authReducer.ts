import { AuthState, initialState as appState } from "@store/state";
import { SignOutAction, SignInAction, ErrorAction, ActionTypes, InitialAppStateAction, CurrentAction } from "@store/actions";
import { DomainUser } from "@store/entities";

type AuthActions =
    | InitialAppStateAction
    | SignInAction
    | SignOutAction
    | ErrorAction
    | CurrentAction<DomainUser>;

const initialState = appState.auth;

export default function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
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
            let { userName, photo, isAdmin, isAuthenticated, roles } = (action as InitialAppStateAction).payload.initialState;
            return {
                ...state,
                isLoading: false,
                userName,
                photo,
                isAdmin,
                isAuthenticated,
                roles
            };
        }

        case ActionTypes.SIGN_IN: {
            let { userName, photo, isAdmin, isAuthenticated, roles } = (action as SignInAction).payload.appState
            return {
                isLoading: false,
                errorMessage: "",
                userName,
                photo,
                isAuthenticated,
                isAdmin,
                roles
            };
        }

        case ActionTypes.SIGN_OUT: {
            return {
                userName: "",
                photo: "",
                isAuthenticated: false,
                isAdmin: false,
                isLoading: false,
                errorMessage: "",
                roles: []
            };
        }

        case ActionTypes.ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMessage: (action as ErrorAction).payload.message
            };
        }

        case ActionTypes.CURRENT_USER: {
            let { Identity, Profile } = (action as CurrentAction<DomainUser>).payload.item;
            return {
                ...state,
                photo: state.userName === Identity.UserName ? Profile.PhotoFilePath : state.photo
            }
        }

        default:
            return state;
    }
}