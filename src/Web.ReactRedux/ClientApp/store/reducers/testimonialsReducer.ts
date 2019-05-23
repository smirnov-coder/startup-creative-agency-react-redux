import { TestimonialsState, initialState as appState } from "@store/state";
import { AddTestimonialsAction } from "@store/actions/testimonialsActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type TestimonialsActions =
    | AddTestimonialsAction
    | HomePageModelAction

const initialState = appState.testimonials;

function testimonialsReducer(state: TestimonialsState = initialState, action: TestimonialsActions): TestimonialsState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_TESTIMONIALS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_TESTIMONIALS_COMPLETED: {
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
                items: (action as HomePageModelAction).payload.model.testimonials
            };
        }

        //case "ADD_TESTIMONIALS": {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        items: (action as AddTestimonialsAction).payload.items
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

export default testimonialsReducer;