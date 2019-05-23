import { UsersState, initialState as appState } from "@store/state";
import { AddUsersAction } from "@store/actions/usersActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type UsersActions = 
    | AddUsersAction
    | HomePageModelAction

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
                error: null,
                items: (action as HomePageModelAction).payload.model.teamMembers
            };
        }

        //case "ADD_USERS": {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        items: (action as AddUsersAction).payload.items
        //    };
        //}

        //case "ASSIGN_USER": {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        current: action.item,
        //        error: null
        //    };
        //}

        //case "INIT_MY_PROFILE_PAGE": {
        //    //console.log("state Init", state);//
        //    return {
        //        ...state,
        //        error: null,
        //        isLoading: false,
        //        current: action.user
        //    };
        //}

        default:
            return state;
    }
}

export default usersReducer;