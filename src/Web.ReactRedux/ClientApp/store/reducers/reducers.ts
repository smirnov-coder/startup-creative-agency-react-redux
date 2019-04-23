import { IAppState } from "../state";
import { ServicesActions, IShowAction, IErrorAction, TeamMembersActions, WorksActions } from "../actions/actions";
import { ActionTypes } from "../actions/actionTypes";
import { IServiceInfo, IDomainUser, IWorkExample } from "../entities";

const initialState: IAppState = {
    services: {
        isLoading: false,
        items: [],
        error: null
    },
    teamMembers: {
        isLoading: false,
        items: [],
        error: null
    },
    works: {
        isLoading: false,
        items: [],
        error: null
    },
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
        case ActionTypes.LOADING:
            return {
                ...state,
                services: {
                    ...state.services,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_SERVICES:
            return {
                ...state,
                services: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IServiceInfo>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
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

export function teamMembersReducer(state: IAppState = initialState, action: TeamMembersActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                teamMembers: {
                    ...state.teamMembers,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_TEAM_MEMBERS:
            return {
                ...state,
                teamMembers: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IDomainUser>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                teamMembers: {
                    ...state.teamMembers,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

export function worksReducer(state: IAppState = initialState, action: WorksActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                works: {
                    ...state.works,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_WORKS:
            return {
                ...state,
                works: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IWorkExample>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                works: {
                    ...state.works,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}