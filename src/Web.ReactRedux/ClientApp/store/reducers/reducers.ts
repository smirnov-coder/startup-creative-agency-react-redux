import { IAppState } from "../state";
import { ServicesActions, IShowErrorAction, IListEntitiesAction } from "../actions/actions";
import { commonActions } from "../actions/actionTypes";
import IServiceInfo from "../../entities/IServiceInfo";

const initialState: IAppState = {
    services: {
        isFetching: false,
        error: "",
        items: []
    }
}

export function servicesReducer(state: IAppState = initialState, action: ServicesActions): IAppState {
    switch (action.type) {
        case commonActions.FETCHING_DATA:
            return {
                services: {
                    ...state.services,
                    isFetching: true
                }
            }

        case commonActions.LIST_ENTITIES:
            return {
                services: {
                    isFetching: false,
                    error: "",
                    items: (action as IListEntitiesAction<IServiceInfo>).items
                }
            }

        case commonActions.SHOW_ERROR:
            return {
                services: {
                    ...state.services,
                    isFetching: false,
                    error: (action as IShowErrorAction).error
                }
            }

        default:
            return state;
    }
}