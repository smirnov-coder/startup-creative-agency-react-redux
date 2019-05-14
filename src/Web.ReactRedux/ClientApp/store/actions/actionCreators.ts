import {
    ServicesActions,
    CommonActions,
    TeamMembersActions,
    WorksActions,
    BlogActions,
    BrandsActions,
    TestimonialsActions,    ContactsActions,
    MessagesActions,
    SocialLinksActions,
    AuthActions,
    LoginPageActions,
    OperationDetailsAction,
} from "./actions";
import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { ServiceInfo, DomainUser, WorkExample, BlogPost, Brand, Testimonial, ContactInfo, SocialLink } from "../entities";
import { HomePageModel } from "../../containers/Home/HomePage";
import { ContactMessage } from "../../containers/Home/ContactForm";
import { push } from "connected-react-router";
import { ValidationProblemDetails, OperationDetailsState } from "../state";

export const request = (): CommonActions => {
    return {
        type: ActionTypes.REQUEST
    };
}

export const assignError = (error: Error): CommonActions => {
    return {
        type: ActionTypes.ASSIGN_ERROR,
        error: error
    };
}

export const assignServices = (services: ServiceInfo[]): ServicesActions => {
    return {
        type: ActionTypes.ASSIGN_SERVICES,
        items: services
    };
}

export const assignTeamMembers = (teamMembers: DomainUser[]): TeamMembersActions => {
    return {
        type: ActionTypes.ASSIGN_TEAM_MEMBERS,
        items: teamMembers
    };
}

export const assignWorks = (works: WorkExample[]): WorksActions => {
    return {
        type: ActionTypes.ASSIGN_WORKS,
        items: works
    };
}

export const assignBlog = (blogPosts: BlogPost[]): BlogActions => {
    return {
        type: ActionTypes.ASSIGN_BLOG,
        items: blogPosts
    };
}

export const assignBrands = (brands: Brand[]): BrandsActions => {
    return {
        type: ActionTypes.ASSIGN_BRANDS,
        items: brands
    };
}

export const assignTestimonials = (testimonials: Testimonial[]): TestimonialsActions => {
    return {
        type: ActionTypes.ASSIGN_TESTIMONIALS,
        items: testimonials
    };
}

export const assignContacts = (contacts: ContactInfo[]): ContactsActions => {
    return {
        type: ActionTypes.ASSIGN_CONTACTS,
        items: contacts
    };
}

export const assignSocialLinks = (socialLinks: SocialLink[]): SocialLinksActions => {
    return {
        type: ActionTypes.ASSIGN_SOCIAL_LINKS,
        items: socialLinks
    }
}

export const getHomePageModel = () => (dispatch: Dispatch) => {
    dispatch(request());
    return fetch("/api/pagemodels/home")
        .then((response: Response) => {
            return response.json();
        })
        .then((data: HomePageModel) => {
            dispatch(assignServices(data.services));
            dispatch(assignTeamMembers(data.teamMembers));
            dispatch(assignWorks(data.works));
            dispatch(assignBlog(data.blogPosts));
            dispatch(assignBrands(data.brands));
            dispatch(assignTestimonials(data.testimonials));
            dispatch(assignContacts(data.contacts));
            dispatch(assignSocialLinks(data.socialLinks));
        })
        .catch((error: Error) => {
            console.error(error, "getHomePageModel error");//
        });
}

export const getLoginPageModel = () => (dispatch: Dispatch) => {
    dispatch(request());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    };
    return fetch("/api/pagemodels/login", options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: { userName: string, photoFilePath: string }) => {
            dispatch(initLoginPage(data));
        })
        .catch((error: Error) => {
            console.error(error, "getLoginPageModel error");//
        });
}

function readAccessToken(): string {
    let token: string = window.sessionStorage.getItem(STORAGE_KEY);
    if (!token) {
        token = window.localStorage.getItem(STORAGE_KEY);
    }
    return token;
}

interface UserInfo {
    userName: string;
    photoFilePath: string;
}

const initLoginPage = ({ userName, photoFilePath }: UserInfo): LoginPageActions => {
    return {
        type: "INIT_LOGIN_PAGE",
        userName,
        photo: photoFilePath
    }
}

const STORAGE_KEY: string = "accessToken";

export const signOut = () => (dispatch: Dispatch) => {
    dispatch(doSignOut());
    dispatch(push("/"));
}

const doSignOut = (): AuthActions => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(STORAGE_KEY);
    return {
        type: "SIGN_OUT",
        userName: "",
        photo: "",
        isAdmin: false,
        isAuthenticated: false,
    };
}

interface SignInInfo {
    userName: string;
    password: string;
    rememberMe: boolean;
    returnUrl?: string;
}

interface OperationDetails {
    isError: boolean;
    message: string;
}

export const signIn = ({ userName, password, rememberMe, returnUrl }: SignInInfo) => (dispatch: Dispatch) => {
    dispatch(request());
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, password })
    };
    return fetch("/api/auth/token", options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: any) => {
            let details: OperationDetails;
            if (details = data as OperationDetails) {
                if (!details.isError) {
                    if (rememberMe) {
                        window.localStorage.setItem(STORAGE_KEY, data)
                    } else {
                        window.sessionStorage.setItem(STORAGE_KEY, data);
                    }
                    dispatch(push(returnUrl ? returnUrl : "/admin/myprofile"));
                } else {
                    dispatch(assignOperationDetails({ ...details, validationError: null }));
                }
            }
            let validationError: ValidationProblemDetails
            if (validationError = data as ValidationProblemDetails) {
                details = {
                    isError: true,
                    message: validationError.title
                }
                dispatch(assignOperationDetails({ ...details, validationError }))
            }
        })
        .catch((error: Error) => {
            console.error(error, "signIn error");//
        });
}

const assignOperationDetails = ({ isError, message, validationError }: OperationDetailsState): OperationDetailsAction => {
    return {
        type: "ASSIGN_OPERATION_DETAILS",
        isError,
        message,
        validationError
    };
}

const requestSendMessage = (): MessagesActions => {
    return {
        type: ActionTypes.REQUEST_SEND_MESSAGE
    }
}

export const sendMessage = (message: ContactMessage) => (dispatch: Dispatch) => {
    dispatch(requestSendMessage());
    let options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    };
    return fetch("/api/messages", options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: any) => {
            let details: OperationDetails;
            if (details = data as OperationDetails) {
                dispatch(assignOperationDetails({ ...details, validationError: null }));
            }
            let validationError: ValidationProblemDetails
            if (validationError = data as ValidationProblemDetails) {
                details = {
                    isError: true,
                    message: `${validationError.title} Please check message data and try again.`
                }
                dispatch(assignOperationDetails({ ...details, validationError }))
            }
        })
        .catch((error: Error) => {
            console.error(error, "sendMessage error");//
        });
}

export const getBlogPosts = (skip: number = 0, take: number = 0) => (dispatch: Dispatch) => {
    dispatch(requestBlogPosts());
    return fetch(`/api/blog?skip=${skip}&take=${take}`)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: BlogPost[]) => {
            dispatch(appendBlogPosts(data));
        })
        .catch((error: Error) => {
            console.error(error, "getBlogPosts error");//
        });
}

const appendBlogPosts = (blogPosts: BlogPost[]): BlogActions => {
    return {
        type: "APPEND_BLOG_POSTS",
        items: blogPosts
    }
}

const requestBlogPosts = (): BlogActions => {
    return {
        type: ActionTypes.REQUEST_BLOG_POSTS
    };
}