import { Message } from "@store/entities";
import { MessagesState, initialState as appState } from "@store/state";
import {
    ItemsAction,
    CurrentAction,
    SignInAction,
    SendingResultAction,
    InitialAppStateAction,
    ActionTypes
} from "@store/actions";

type MessagesActions =
    | InitialAppStateAction
    | SendingResultAction
    | SignInAction
    | ItemsAction<Message>
    | CurrentAction<Message>

const initialState = appState.messages;

export default function messagesReducer(state: MessagesState = initialState, action: MessagesActions): MessagesState {
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

        case ActionTypes.MESSAGES: {
            let { items } = (action as ItemsAction<Message>).payload;
            return {
                ...state,
                isLoading: false,
                items,
                newMessagesCount: items.filter(message => !message.IsRead).length
            };
        }

        case ActionTypes.CURRENT_MESSAGE: {
            let current: Message = (action as CurrentAction<Message>).payload.item;
            let newMessagesCount: number = state.newMessagesCount > 0
                ? state.newMessagesCount - 1
                : state.newMessagesCount;
            current.IsRead = true;
            return {
                ...state,
                isLoading: false,
                current,
                newMessagesCount
            };
        }

        default:
            return state;
    }
}