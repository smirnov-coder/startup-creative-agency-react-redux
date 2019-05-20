import {
    ServiceInfo,
    DomainUser,
    WorkExample,
    BlogPost,
    Brand,
    Testimonial,    ContactInfo,
    Message,
    SocialLink,
    BaseEntity
} from "./entities";
import { RouterState } from "connected-react-router";

interface PartialState<T = BaseEntity> {
    isLoading: boolean;
    items: T[];
    error: Error;
}

export interface ServicesState extends PartialState<ServiceInfo> {
    current: ServiceInfo;
}

export type TeamMembersState = PartialState<DomainUser>;
export type WorksState = PartialState<WorkExample>;
export type BlogState = PartialState<BlogPost>;
export type BrandsState = PartialState<Brand>;
export type TestimonialsState = PartialState<Testimonial>;
export type ContactsState = PartialState<ContactInfo>;
export type SocialLinksState = PartialState<SocialLink>;
export interface MessagesState extends PartialState<Message> {
    newMessagesCount: number;
}

export interface OperationDetailsState {
    isError: boolean,
    message: string,
}

export interface AuthState {
    userName: string,
    photo: string,
    isAuthenticated: boolean,
    isAdmin: boolean,
    isLoading: boolean
}

export interface UsersState extends PartialState<DomainUser> {
    current: DomainUser
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
    teamMembers: TeamMembersState,
    works: WorksState,
    blog: BlogState,
    brands: BrandsState,
    testimonials: TestimonialsState,
    contacts: ContactsState,
    socialLinks: SocialLinksState,
    messages: MessagesState,
    operationDetails: OperationDetailsState,
    auth: AuthState,
    users: UsersState,
    notifications: NotificationsState,

    router: RouterState
}