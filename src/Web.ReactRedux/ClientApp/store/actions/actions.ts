import {
    IServiceInfo,
    IWorkExample,
    IBlogPost,
    IBrand,
    ITestimonial,
    IContactInfo,
    ISocialLink,
    IDomainUser
} from "../entities";
import { IContactMessage } from "../../containers/ContactForm";

interface IAction {
    type: string
}

export interface ILoadingAction extends IAction { }

export interface IErrorAction extends IAction {
    error: Error;
}

export interface IShowAction<T> extends IAction {
    items: T[];
}

export interface ISendAction extends IAction {
    message: IContactMessage;
}

export interface IShowResponse extends IAction {
    text: string;
}

export type CommonActions = ILoadingAction | IErrorAction

export type ServicesActions = CommonActions | IShowAction<IServiceInfo>
export type TeamMembersActions = CommonActions | IShowAction<IDomainUser>
export type WorksActions = CommonActions | IShowAction<IWorkExample>
export type BlogActions = CommonActions | IShowAction<IBlogPost>
export type BrandsActions = CommonActions | IShowAction<IBrand>
export type TestimonialsActions = CommonActions | IShowAction<ITestimonial>
export type ContactsActions = CommonActions | IShowAction<IContactInfo>
export type SocialLinksActions = CommonActions | IShowAction<ISocialLink>
export type MessagesActions = CommonActions | ISendAction | IShowResponse