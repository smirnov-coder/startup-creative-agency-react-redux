import { Action } from "redux";
import {
    ServiceInfo,
    WorkExample,
    BlogPost,
    Brand,
    Testimonial,
    ContactInfo,
    SocialLink,
    DomainUser
} from "../entities";
import { ContactMessage } from "../../containers/Home/ContactForm";
import { ValidationProblemDetails } from "../state";

export interface RequestAction extends Action { }

export interface ErrorAction extends Action {
    error: Error;
}

export interface AssignManyAction<T> extends Action {
    items: T[];
}

export interface SendAction extends Action {
    message: ContactMessage;
}

export interface ShowResponse extends Action {
    text: string;
    isError: boolean;
}

export interface AppendAction extends AssignManyAction<BlogPost> { }

export type CommonActions = RequestAction | ErrorAction

export type ServicesActions = CommonActions | AssignManyAction<ServiceInfo>
export type TeamMembersActions = CommonActions | AssignManyAction<DomainUser>
export type WorksActions = CommonActions | AssignManyAction<WorkExample>
export type BlogActions = CommonActions | AssignManyAction<BlogPost> | AppendAction
export type BrandsActions = CommonActions | AssignManyAction<Brand>
export type TestimonialsActions = CommonActions | AssignManyAction<Testimonial>
export type ContactsActions = CommonActions | AssignManyAction<ContactInfo>
export type SocialLinksActions = CommonActions | AssignManyAction<SocialLink>
export type MessagesActions = CommonActions | SendAction | ShowResponse

export interface InitSimplePageAction extends Action {
    userName: string;
    photo: string;
    isAuthenticated: boolean;
}

export interface InitMyProfilePageAction extends InitSimplePageAction {
    user: DomainUser;
    isAdmin: boolean;
    newMessagesCount: number;
}

export type PagesActions = InitSimplePageAction | InitMyProfilePageAction

export interface SignOutAction extends Action { }

export interface SignInAction extends Action {
    isAdmin: boolean;
}

export type AuthActions = CommonActions | SignInAction | SignOutAction

export interface OperationDetailsAction extends Action {
    isError: boolean;
    message: string;
}

export interface AssignSingleAction<T> extends Action {
    item: T
}

export type UsersActions = CommonActions | AssignSingleAction<DomainUser>