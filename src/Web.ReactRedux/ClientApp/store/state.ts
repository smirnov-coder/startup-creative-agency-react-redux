import * as Entities from "./entities";
import { RouterState } from "connected-react-router";

interface PartialState<T = Entities.BaseEntity> {
    isLoading: boolean;
    items: T[];
    current: T;
    error: Error;
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
    error: Error
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
    errorMessage: string
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
        isLoading: true,
        items: [],
        error: null,
        current: null
    },
    works: {
        isLoading: true,
        items: [],
        error: null,
        current: null
    },
    blog: {
        isLoading: true,
        items: [],
        error: null,
        current: null
    },
    brands: {
        isLoading: true,
        items: [],
        error: null,
        current: null
    },
    testimonials: {
        isLoading: true,
        items: [],
        error: null,
        current: null
    },
    contacts: {
        isLoading: true,
        contactInfos: [],
        socialLinks: [],
        error: null
    },
    messages: {
        isLoading: true,
        items: [],
        error: null,
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
        errorMessage: ""
    },
    users: {
        isLoading: false,
        items: [],
        current: null,
        error: null
    },
    notifications: {
        items: []
    },
    router: null
}