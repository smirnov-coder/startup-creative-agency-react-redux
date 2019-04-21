import IServiceInfo from "../entities/IServiceInfo";

export interface IAppState {
    // index
    services: {
        isFetching: boolean,
        items: IServiceInfo[],
        error: string
    }
    //teamMembers: IDomaiUser[],
    //workExamples: IWorkExample[],
    //blogPosts: IBlogPost[],
    //brands: IBrand[],
    //testimonials: ITestimonial[],
    //contactInfos: IContactInfo[],

    //// admin
    //myProfile: IDomaiUser,
    //users: IDomaiUser[],
    //messages: IMessage[]
}