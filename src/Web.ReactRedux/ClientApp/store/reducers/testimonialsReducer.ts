import { Testimonial } from "@store/entities";
import { TestimonialsState, initialState as appState } from "@store/state";
import { ItemsAction, CurrentAction, ActionTypes, HomePageModelAction } from "@store/actions";

type TestimonialsActions =
    | ItemsAction<Testimonial>
    | HomePageModelAction
    | CurrentAction<Testimonial>

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
                items: (action as HomePageModelAction).payload.model.testimonials
            };
        }

        case ActionTypes.TESTIMONIALS: {
            return {
                ...state,
                isLoading: false,
                items: (action as ItemsAction<Testimonial>).payload.items
            };
        }

        case ActionTypes.CURRENT_TESTIMONIAL: {
            return {
                ...state,
                isLoading: false,
                current: (action as CurrentAction<Testimonial>).payload.item
            };
        }

        default:
            return state;
    }
}

export default testimonialsReducer;