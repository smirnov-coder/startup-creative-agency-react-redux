import { BrandsState, initialState as appState } from "@store/state";
import { Brand } from "@store/entities";
import { ItemsAction, CurrentAction, ActionTypes, HomePageModelAction } from "@store/actions";

type BrandsActions =
    | ItemsAction<Brand>
    | HomePageModelAction
    | CurrentAction<Brand>;

const initialState = appState.brands;

export default function brandsReducer(state: BrandsState = initialState, action: BrandsActions): BrandsState {
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
                items: (action as HomePageModelAction).payload.model.brands
            };
        }

        case ActionTypes.BRANDS: {
            let { items, append } = (action as ItemsAction<Brand>).payload;
            return {
                ...state,
                isLoading: false,
                items: append ? state.items.concat(items) : items
            };
        }

        case ActionTypes.CURRENT_BRAND: {
            return {
                ...state,
                isLoading: false,
                current: (action as CurrentAction<Brand>).payload.item
            };
        }

        default:
            return state;
    }
}