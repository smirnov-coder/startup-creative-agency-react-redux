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
import { IHomePageProps } from "../../components/HomePage";

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

export type CommonActions = ILoadingAction | IErrorAction

export type ServicesActions = CommonActions | IShowAction<IServiceInfo>
export type TeamMembersActions = CommonActions | IShowAction<IDomainUser>
export type WorksActions = CommonActions | IShowAction<IWorkExample>
export type BlogActions = CommonActions | IShowAction<IBlogPost>
export type BrandsActions = CommonActions | IShowAction<IBrand>
export type TestimonialsActions = CommonActions | IShowAction<ITestimonial>
export type ContactsActions = CommonActions | IShowAction<IContactInfo>
export type SocialLinksActions = CommonActions | IShowAction<ISocialLink>

export interface IInitAction extends IAction {
    pageData: IHomePageProps;
}
export type HomePageAction = CommonActions | IInitAction
