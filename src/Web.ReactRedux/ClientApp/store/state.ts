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

export type ServicesState = PartialState<ServiceInfo>;
export type TeamMembersState = PartialState<DomainUser>;
export type WorksState = PartialState<WorkExample>;
export type BlogState = PartialState<BlogPost>;
export type BrandsState = PartialState<Brand>;
export type TestimonialsState = PartialState<Testimonial>;
export type ContactsState = PartialState<ContactInfo>;
export type SocialLinksState = PartialState<SocialLink>;
export type MessagesState = PartialState<Message>;

export interface ValidationProblemDetails {
    title: string;
    errors: any;
}

export interface OperationDetailsState {
    isError: boolean,
    message: string,
    validationError: ValidationProblemDetails
}

export interface AuthState {
    isAuthenticated: boolean,
    userName: string,
    photo: string,
    isAdmin: boolean
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
    router: RouterState
}