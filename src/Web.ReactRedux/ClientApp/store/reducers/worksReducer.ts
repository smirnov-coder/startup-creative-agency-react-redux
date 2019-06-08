import { WorksState, initialState as appState } from "@store/state";
import { WorkExample } from "@store/entities";
import { ItemsAction, CurrentAction, ActionTypes, HomePageModelAction } from "@store/actions";

type WorksActions =
    | ItemsAction<WorkExample>
    | HomePageModelAction
    | CurrentAction<WorkExample>

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
                items: (action as HomePageModelAction).payload.model.works
            };
        }

        case ActionTypes.WORKS: {
            return {
                ...state,
                isLoading: false,
                items: (action as ItemsAction<WorkExample>).payload.items
            };
        }

        case ActionTypes.CURRENT_WORK_EXAMPLE: {
            return {
                ...state,
                isLoading: false,
                current: (action as CurrentAction<WorkExample>).payload.item
            };
        }

        default:
            return state;
    }
}

export default worksReducer;