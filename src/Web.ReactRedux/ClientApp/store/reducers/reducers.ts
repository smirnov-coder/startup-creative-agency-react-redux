import { IAppState } from "../state";
import {
    ServicesActions,
    IShowAction,
    IErrorAction,
    TeamMembersActions,
    WorksActions,
    BlogActions,
    BrandsActions,
    TestimonialsActions,
    ContactsActions,
    MessagesActions,
    IShowResponse,
    SocialLinksActions
} from "../actions/actions";
import { ActionTypes } from "../actions/actionTypes";
import {
    IServiceInfo,
    IDomainUser,
    IWorkExample,
    IBlogPost,
    IBrand,
    ITestimonial,
    IContactInfo,
    ISocialLink
} from "../entities";

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
    blog: {
        isLoading: false,
        items: [],
        error: null
    },
    brands: {
        isLoading: false,
        items: [],
        error: null
    },
    testimonials: {
        isLoading: false,
        items: [],
        error: null
    },
    contacts: {
        isLoading: false,
        items: [],
        error: null
    },
    socialLinks: {
        isLoading: false,
        items: [],
        error: null
    },
    messages: {
        isLoading: false,
        items: [],
        error: null
    },
    operationDetails: null
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

export function blogReducer(state: IAppState = initialState, action: BlogActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                blog: {
                    ...state.blog,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_BLOG:
            return {
                ...state,
                blog: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IBlogPost>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                blog: {
                    ...state.blog,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

export function brandsReducer(state: IAppState = initialState, action: BrandsActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                brands: {
                    ...state.brands,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_BRANDS:
            return {
                ...state,
                brands: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IBrand>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                brands: {
                    ...state.brands,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

export function testimonialsReducer(state: IAppState = initialState, action: TestimonialsActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                testimonials: {
                    ...state.testimonials,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_TESTIMONIALS:
            return {
                ...state,
                testimonials: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<ITestimonial>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                testimonials: {
                    ...state.testimonials,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

export function contactsReducer(state: IAppState = initialState, action: ContactsActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_CONTACTS:
            return {
                ...state,
                contacts: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<IContactInfo>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

export function messagesReducer(state: IAppState = initialState, action: MessagesActions): IAppState {
    switch (action.type) {
        case ActionTypes.SENDING_MESSAGE:
            //console.log("sendingMessage");//
            return {
                ...state,
                messages: {
                    ...state.messages,
                    isLoading: true
                }
            }

        case "SHOW_RESPONSE":
            //console.log("showResponse");//
            return {
                ...state,
                messages: {
                    ...state.messages,
                    isLoading: false,
                    error: null
                },
                operationDetails: (action as IShowResponse).text
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}

export function socialLinksReducer(state: IAppState = initialState, action: SocialLinksActions): IAppState {
    switch (action.type) {
        case ActionTypes.LOADING:
            return {
                ...state,
                socialLinks: {
                    ...state.socialLinks,
                    isLoading: true
                }
            }

        case ActionTypes.SHOW_SOCIAL_LINKS:
            return {
                ...state,
                socialLinks: {
                    isLoading: false,
                    error: null,
                    items: (action as IShowAction<ISocialLink>).items
                }
            }

        case ActionTypes.SHOW_ERROR:
            return {
                ...state,
                socialLinks: {
                    ...state.socialLinks,
                    isLoading: false,
                    error: (action as IErrorAction).error
                }
            }

        default:
            return state;
    }
}