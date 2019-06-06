import { UsersState, initialState as appState } from "@store/state";
import { DomainUser } from "@store/entities";
import { CurrentAction, ItemsAction, ActionTypes, HomePageModelAction } from "@store/actions";

type UsersActions = 
    | HomePageModelAction
    | CurrentAction<DomainUser>
    | ItemsAction<DomainUser>

const initialState = appState.users;

function usersReducer(state: UsersState = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_USERS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_USERS_COMPLETED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case ActionTypes.HOME_PAGE_MODEL: {
            return {
                ...state,
                isLoading: false,
                items: (action as HomePageModelAction).payload.model.teamMembers
            };
        }

        case ActionTypes.CURRENT_USER: {
            return {
                ...state,
                isLoading: false,
                current: (action as CurrentAction<DomainUser>).payload.item,
            };
        }

        case ActionTypes.USERS: {
            return {
                ...state,
                isLoading: false,
                items: (action as ItemsAction<DomainUser>).payload.items
            };
        }

        default:
            return state;
    }
}

export default usersReducer;