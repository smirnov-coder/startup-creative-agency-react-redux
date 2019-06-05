import { BrandsState, initialState } from "@store/state";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";
import { Brand } from "@store/entities";
import { ItemsAction, CurrentAction } from "@store/actions/genericActions";

type BrandsActions = 
    | ItemsAction<Brand>
    | HomePageModelAction
    | CurrentAction<Brand>

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

        case ActionTypes.BRANDS: {
            let { items, append } = (action as ItemsAction<Brand>).payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                items: append ? state.items.concat(items) : items
            };
        }

        case ActionTypes.CURRENT_BRAND: {
            return {
                ...state,
                isLoading: false,
                error: null,
                current: (action as CurrentAction<Brand>).payload.item
            };
        }

        default:
            return state;
    }
}