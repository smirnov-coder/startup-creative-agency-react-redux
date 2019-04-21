import { IServiceInfo } from "./entities";


export interface IAppState {
    // index
    services: {
        isLoading: boolean,
        items: IServiceInfo[],
        error: Error
    },
    //teamMembers: {
    //    isLoading: boolean,
    //    items: IDomainUser[],
    //    error: Error
    //},
    //works: {
    //    isLoading: boolean,
    //    items: IWorkExample[],
    //    error: Error
    //},
    //blog: {
    //    isLoading: boolean,
    //    items: IBlogPost[],
    //    error: Error
    //},
    //brands: {
    //    isLoading: boolean,
    //    items: IBrand[],
    //    error: Error
    //},
    //testimonials: {
    //    isLoading: boolean,
    //    items: ITestimonial[],
    //    error: Error
    //},
    //contacts: {
    //    isLoading: boolean,
    //    items: IContactInfo[],
    //    error: Error
    //},
    //socialLinks: {
    //    isLoading: boolean,
    //    items: ISocialLink[],
    //    error: Error
    //},

    //// admin
    //myProfile: IDomaiUser,
    //users: IDomaiUser[],
    //messages: IMessage[]
}