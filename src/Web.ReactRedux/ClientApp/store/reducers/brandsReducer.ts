import { BrandsState, initialState } from "@store/state";
import { AddBrandsAction } from "@store/actions/brandsActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type BrandsActions = 
    | AddBrandsAction
    | HomePageModelAction

export default function brandsReducer(state: BrandsState = initialState.brands, action: BrandsActions): BrandsState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_BRANDS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_BRANDS_COMPLETED: {
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
                items: (action as HomePageModelAction).payload.model.brands
            };
        }

        //case "ADD_BRANDS": {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        items: (action as AddBrandsAction).payload.items
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