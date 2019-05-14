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

//interface IAction {
//    type: string
//}

export interface RequestAction extends Action { }

export interface ErrorAction extends Action {
    error: Error;
}

export interface ShowAction<T> extends Action {
    items: T[];
}

export interface SendAction extends Action {
    message: ContactMessage;
}

export interface ShowResponse extends Action {
    text: string;
    isError: boolean;
}

export interface AppendAction extends ShowAction<BlogPost> { }

export type CommonActions = RequestAction | ErrorAction

export type ServicesActions = CommonActions | ShowAction<ServiceInfo>
export type TeamMembersActions = CommonActions | ShowAction<DomainUser>
export type WorksActions = CommonActions | ShowAction<WorkExample>
export type BlogActions = CommonActions | ShowAction<BlogPost> | AppendAction
export type BrandsActions = CommonActions | ShowAction<Brand>
export type TestimonialsActions = CommonActions | ShowAction<Testimonial>
export type ContactsActions = CommonActions | ShowAction<ContactInfo>
export type SocialLinksActions = CommonActions | ShowAction<SocialLink>
export type MessagesActions = CommonActions | SendAction | ShowResponse


export interface ShowLoginPageAction extends Action {
    userName: string;
    photo: string;
}

export interface SignOutAction extends ShowLoginPageAction {
    isAuthenticated: boolean;
    isAdmin: boolean;
    //returnUrl: string;
}

export interface SignInAction extends Action {
    accessToken: string;
}

export type LoginPageActions = CommonActions | ShowLoginPageAction
export type AuthActions = CommonActions | SignInAction | SignOutAction

export interface OperationDetailsAction extends Action {
    isError: boolean;
    message: string;
    validationError: ValidationProblemDetails
}

