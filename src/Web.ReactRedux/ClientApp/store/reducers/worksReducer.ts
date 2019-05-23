import { WorksState, initialState as appState } from "@store/state";
import { AddWorksAction } from "@store/actions/worksActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type WorksActions =
    | AddWorksAction
    | HomePageModelAction

const initialState = appState.works;

function worksReducer(state: WorksState = initialState, action: WorksActions): WorksState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_WORKS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_WORKS_COMPLETED: {
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
                items: (action as HomePageModelAction).payload.model.works
            };
        }

        //case "ADD_WORKS": {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        items: (action as AddWorksAction).payload.items
        //    };
        //}

        //case ActionTypes.ASSIGN_ERROR: {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: action.error
        //    };
        //}

        default:
            return state;
    }
}

export default worksReducer;