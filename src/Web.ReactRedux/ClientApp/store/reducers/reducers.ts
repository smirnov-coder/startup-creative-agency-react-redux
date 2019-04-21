import { IAppState } from "../state";
import { ServicesActions, IShowAction, IErrorAction } from "../actions/actions";
import { commonActions } from "../actions/actionTypes";
import { IServiceInfo } from "../entities";

const initialState: IAppState = {
    services: {
        isLoading: false,
        items: [],
        error: null
    },
    //teamMembers: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
    //works: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
    //blog: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
    //brands: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
    //testimonials: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
    //contacts: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
    //socialLinks: {
    //    isLoading: false,
    //    items: [],
    //    error: null
    //},
}

export function servicesReducer(state: IAppState = initialState, action: ServicesActions): IAppState {
    switch (action.type) {
        case commonActions.LOADING:
            return {
                ...state,
                services: {
                    ...state.services,
                    isLoading: true
                }
            }

        case commonActions.SHOW:
            return {
                ...state,
                services: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IServiceInfo>).items
                }
            }

        case commonActions.ERROR:
            return {
                ...state,
                services: {
                    ...state.services,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

//export function teamMembersReducer(state: IAppState = initialState, action: TeamMembersActions): IAppState {
//    switch (action.type) {
//        case commonActions.LOADING:
//            return {
//                ...state,
//                teamMembers: {
//                    ...state.teamMembers,
//                    isLoading: true
//                }
//            }

//        case commonActions.SHOW:
//            return {
//                ...state,
//                teamMembers: {
//                    isLoading: false,
//                    error: null,
//                    items: (action as IShowAction<IDomainUser>).items
//                }
//            }

//        case commonActions.ERROR:
//            return {
//                ...state,
//                services: {
//                    ...state.services,
//                    isLoading: false,
//                    error: (action as IErrorAction).error
//                }
//            }

//        default:
//            return state;
//    }
//}