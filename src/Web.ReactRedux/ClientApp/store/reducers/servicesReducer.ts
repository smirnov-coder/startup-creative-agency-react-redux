import { ServicesState, initialState as appState } from "@store/state"
import { AddServicesAction } from "@store/actions/servicesActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type ServicesActions =
    | AddServicesAction
    | HomePageModelAction

const initialState = appState.services

function servicesReducer(state: ServicesState = initialState, action: ServicesActions): ServicesState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_SERVICES: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_SERVICES_COMPLETED: {
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
                items: (action as HomePageModelAction).payload.model.services
            };
        }


        //case "ADD_SERVICES": {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        items: (action as AddServicesAction).payload.items
        //    };
        //}

        default:
            return state;
    }
}

export default servicesReducer;