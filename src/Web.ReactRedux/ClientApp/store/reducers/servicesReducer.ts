import { ServicesState, initialState as appState } from "@store/state"
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";
import { CurrentAction, ItemsAction } from "@store/actions/genericActions";
import { ServiceInfo } from "@store/entities";

type ServicesActions =
    | ItemsAction<ServiceInfo>
    | HomePageModelAction
    | CurrentAction<ServiceInfo>

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

        case ActionTypes.SERVICES: {
            return {
                ...state,
                isLoading: false,
                error: null,
                items: (action as ItemsAction<ServiceInfo>).payload.items
            };
        }

        case ActionTypes.CURRENT_SERVICE: {
            return {
                ...state,
                isLoading: false,
                error: null,
                current: (action as CurrentAction<ServiceInfo>).payload.item
            };
        }

        default:
            return state;
    }
}

export default servicesReducer;