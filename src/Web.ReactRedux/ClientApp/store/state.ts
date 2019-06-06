import { RouterState } from "connected-react-router";
import * as Entities from "@store/entities";

interface PartialState<T = Entities.BaseEntity> {
    isLoading: boolean;
    items: T[];
    current: T;
}

export type ServicesState = PartialState<Entities.ServiceInfo>;
export type WorksState = PartialState<Entities.WorkExample>;
export type BlogState = PartialState<Entities.BlogPost>;
export type BrandsState = PartialState<Entities.Brand>;
export type TestimonialsState = PartialState<Entities.Testimonial>;

export interface ContactsState {
    isLoading: boolean;
    contactInfos: Entities.ContactInfo[];
    socialLinks: Entities.SocialLink[];
}

export interface MessagesState extends PartialState<Entities.Message> {
    newMessagesCount: number;
    sendingResult: {
        isError: boolean,
        message: string
    };
}

export interface AuthState {
    userName: string,
    photo: string,
    isAuthenticated: boolean,
    isAdmin: boolean,
    isLoading: boolean,
    errorMessage: string,
    roles: string[]
}

export interface UsersState extends PartialState<Entities.DomainUser> {
    current: Entities.DomainUser
}

export interface Notification {
    id: number;
    type: "success" | "error";
    text: string;
}

export interface NotificationsState {
    items: Notification[]
}

export interface AppState {
    services: ServicesState,
    works: WorksState,
    blog: BlogState,
    brands: BrandsState,
    testimonials: TestimonialsState,
    contacts: ContactsState,
    messages: MessagesState,
    auth: AuthState,
    users: UsersState,
    notifications: NotificationsState,
    router: RouterState
}

export const initialState: AppState = {
    services: {
        isLoading: false,
        items: [],
        current: null
    },
    works: {
        isLoading: false,
        items: [],
        current: null
    },
    blog: {
        isLoading: false,
        items: [],
        current: null
    },
    brands: {
        isLoading: false,
        items: [],
        current: null
    },
    testimonials: {
        isLoading: false,
        items: [],
        current: null
    },
    contacts: {
        isLoading: false,
        contactInfos: [],
        socialLinks: [],
    },
    messages: {
        isLoading: false,
        items: [],
        current: null,
        newMessagesCount: 0,
        sendingResult: {
            isError: false,
            message: ""
        }
    },
    auth: {
        isAuthenticated: false,
        userName: "",
        photo: "",
        isAdmin: false,
        isLoading: true,
        errorMessage: "",
        roles: []
    },
    users: {
        isLoading: false,
        items: [],
        current: null,
    },
    notifications: {
        items: []
    },
    router: null
}