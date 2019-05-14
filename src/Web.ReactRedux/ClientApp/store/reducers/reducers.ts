import { AppState, ServicesState, TeamMembersState, WorksState, BlogState, BrandsState, TestimonialsState, ContactsState, MessagesState, SocialLinksState, AuthState, OperationDetailsState } from "../state";
import {
    ServicesActions,
    ShowAction,
    ErrorAction,
    TeamMembersActions,
    WorksActions,
    BlogActions,
    BrandsActions,
    TestimonialsActions,
    ContactsActions,
    MessagesActions,
    SocialLinksActions,    AppendAction,
    ShowLoginPageAction,
    AuthActions,
    SignOutAction,
    LoginPageActions,
    OperationDetailsAction,
} from "../actions/actions";
import { ActionTypes } from "../actions/actionTypes";
import {
    ServiceInfo,
    DomainUser,
    WorkExample,
    BlogPost,
    Brand,
    Testimonial,
    ContactInfo,
    SocialLink,    Message
} from "../entities";

const initialState: AppState = {
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
    operationDetails: {
        isError: false,
        message: "",
        validationError: null
    },
    auth: {
        isAuthenticated: false,
        userName: "",
        photo: "",
        isAdmin: false
    },
    router: null
}

export function servicesReducer(state: ServicesState = initialState.services, action: ServicesActions): ServicesState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("services load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_SERVICES:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<ServiceInfo>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function teamMembersReducer(state: TeamMembersState = initialState.teamMembers, action: TeamMembersActions): TeamMembersState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("team members load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_TEAM_MEMBERS:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<DomainUser>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function worksReducer(state: WorksState = initialState.works, action: WorksActions): WorksState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("works load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_WORKS:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<WorkExample>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function blogReducer(state: BlogState = initialState.blog, action: BlogActions): BlogState {
    switch (action.type) {
        case ActionTypes.REQUEST_BLOG_POSTS:
        case ActionTypes.REQUEST: //console.log("blog load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_BLOG:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<BlogPost>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        case ActionTypes.APPEND_BLOG_POSTS:
            return {
                isLoading: false,
                error: null,
                items: state.items.concat((action as AppendAction).items)
            };

        default:
            return state;
    }
}

export function brandsReducer(state: BrandsState = initialState.brands, action: BrandsActions): BrandsState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("brands load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_BRANDS:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<Brand>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function testimonialsReducer(state: TestimonialsState = initialState.testimonials, action: TestimonialsActions): TestimonialsState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("testimonials load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_TESTIMONIALS:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<Testimonial>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function contactsReducer(state: ContactsState = initialState.contacts, action: ContactsActions): ContactsState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("contacts load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_CONTACTS:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<ContactInfo>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function messagesReducer(state: MessagesState = initialState.messages, action: MessagesActions): MessagesState {
    switch (action.type) {
        case ActionTypes.REQUEST_SEND_MESSAGE: //console.log("messages load");//
            //console.log("sendingMessage");//
            return {
                ...state,
                isLoading: true
            }

        case "SHOW_RESPONSE_MESSAGE":
            //console.log("showResponse");//
            return {
                ...state,
                isLoading: false,
                error: null
            };

        //case "SHOW_RESPONSE_MESSAGE":
        //    //console.log("showResponse");//
        //    return {
        //        ...state,
        //        messages: {
        //            ...state.messages,
        //            isLoading: false,
        //            error: null
        //        },
        //        operationDetails: (action as ShowResponse).text,
        //        isError: (action as ShowResponse).isError
        //    }

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function socialLinksReducer(state: SocialLinksState = initialState.socialLinks, action: SocialLinksActions): SocialLinksState {
    switch (action.type) {
        case ActionTypes.REQUEST: //console.log("social links load");//
            return {
                ...state,
                isLoading: true
            };

        case ActionTypes.ASSIGN_SOCIAL_LINKS:
            return {
                isLoading: false,
                error: null,
                items: (action as ShowAction<SocialLink>).items
            };

        case ActionTypes.ASSIGN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action as ErrorAction).error
            };

        default:
            return state;
    }
}

export function authReducer(state: AuthState = initialState.auth, action: AuthActions): AuthState {
    switch (action.type) {
        case "SIGN_OUT":
            let { userName, photo, isAdmin, isAuthenticated } = action as SignOutAction;
            return {
                isAuthenticated,
                userName,
                photo,
                isAdmin
            };

        default:
            return state;
    }
}

export function pageModelsReducer(state: AppState = initialState, action: LoginPageActions): AppState {
    switch (action.type) {

        case "SHOW_LOGIN_PAGE":
            return {
                ...state,
                auth: {
                    userName: (action as ShowLoginPageAction).userName,
                    photo: (action as ShowLoginPageAction).photo,
                    ...state.auth
                }
            };

        default:
            return state;
    }
}

export const operationDetailsReducer = (state: OperationDetailsState = initialState.operationDetails, action: OperationDetailsAction): OperationDetailsState => {
    switch (action.type) {
        case "ASSIGN_OPERATION_DETAILS":
            let { isError, message, validationError } = action;
            return {
                isError,
                message,
                validationError
            };

        default:
            return state;
    }
}

