import { MessagesState, initialState } from "@store/state";
import { ActionTypes } from "@store/actions/actionTypes";
import { InitialAppStateAction } from "@store/actions/appActions";
import { SendingResultAction } from "@store/actions/messagesActions";
import { SignInAction } from "@store/actions/authActions";

type MessagesActions =
    | InitialAppStateAction
    | SendingResultAction
    | SignInAction

export default function messagesReducer(state: MessagesState = initialState.messages, action: MessagesActions): MessagesState {
    switch (action.type) {
        case ActionTypes.REQUEST_MESSAGES: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_MESSAGES_COMPLETED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case ActionTypes.INITIAL_APP_STATE: {
            return {
                ...state,
                isLoading: false,
                newMessagesCount: (action as InitialAppStateAction).payload.initialState.newMessagesCount
            };
        }

        case ActionTypes.SENDING_RESULT: {
            let result = (action as SendingResultAction).payload.result;
            return {
                ...state,
                isLoading: false,
                sendingResult: result,
                newMessagesCount: result.isError ? state.newMessagesCount : state.newMessagesCount + 1
            };
        }

        case ActionTypes.SIGN_IN: {
            return {
                ...state,
                newMessagesCount: (action as SignInAction).payload.appState.newMessagesCount
            };
        }

        //case ActionTypes.ASSIGN_ERROR: {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: action.error
        //    };
        //}

        //case "INIT_SERVICES_PAGE":
        //case "INIT_ADD_SERVICE_PAGE":
        //case "INIT_EDIT_SERVICE_PAGE":
        //case "INIT_MY_PROFILE_PAGE": {
        //    //console.log("state", state);//
        //    return {
        //        ...state,
        //        newMessagesCount: action.newMessagesCount
        //    };
        //}

        default:
            return state;
    }
}