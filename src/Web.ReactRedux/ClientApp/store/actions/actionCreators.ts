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
    OperationDetailsAction,
    InitSimplePageAction,
    SignOutAction,
    SignInAction,
    InitMyProfilePageAction,
} from "./actions";
import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { ServiceInfo, DomainUser, WorkExample, BlogPost, Brand, Testimonial, ContactInfo, SocialLink } from "@store/entities";
import { HomePageModel } from "@containers/Home/HomePage";
import { ContactMessage } from "@containers/Home/ContactForm";
import { push, replace } from "connected-react-router";
import { OperationDetailsState, Notification } from "@store/state";
import { MyProfilePageModel } from "@containers/Admin/MyProfilePage";
import { Map } from "immutable";
import { encodeHTML } from "@scripts/utils";
import { Date } from "core-js";

export const requestBegin = (): CommonActions => {
    return {
        type: ActionTypes.REQUEST
    };
}

function requestEnd() {
    return {
        type: "REQUEST_END"
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
    dispatch(requestBegin());
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
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    }; //console.log("options", options);//
    return fetch("/api/pagemodels/login", options)
        .then((response: Response) => {
            //console.log("response", response);//
            return response.json();
        })
        .then((data: UserInfo) => {
            //console.log("data", data);//
            dispatch(initSimplePage("INIT_LOGIN_PAGE", { ...data }));
        })
        .catch((error: Error) => {
            console.error(error, "getLoginPageModel error");//
        });
}

export const getNotFoundPageModel = () => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    }; //console.log("options", options);//
    return fetch("/api/pagemodels/notfound", options)
        .then((response: Response) => {
            //console.log("response", response);//
            return response.json();
        })
        .then((data: UserInfo) => {
            //console.log("data", data);//
            dispatch(initSimplePage("INIT_NOT_FOUND_PAGE", { ...data }));
        })
        .catch((error: Error) => {
            console.error(error, "getNotFoundPageModel error");//
        });
}

export const getAccessDeniedPageModel = () => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    }; //console.log("options", options);//
    return fetch("/api/pagemodels/accessdenied", options)
        .then((response: Response) => {
            //console.log("response", response);//
            return response.json();
        })
        .then((data: UserInfo) => {
            //console.log("data", data);//
            dispatch(initSimplePage("INIT_ACCESS_DENIED_PAGE", { ...data }));
        })
        .catch((error: Error) => {
            console.error(error, "getAccessDeniedPageModel error");//
        });
}

export const getMyProfilePageModel = () => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    }; //console.log("options", options);//
    return fetch("/api/pagemodels/myprofile", options)
        .then((response: Response) => {
            //console.log("response", response);//
            return response.json();
        })
        .then((data: MyProfilePageModel) => {
            //console.log("data", data);//
            dispatch(initMyProfilePage(data));
        })
        .catch((error: Error) => {
            console.error(error, "getMyProfilePageModel error");//
        });
}

const initMyProfilePage = (model: MyProfilePageModel): InitMyProfilePageAction => {
    return {
        type: "INIT_MY_PROFILE_PAGE",
        userName: model.userWidget.userName,
        photo: model.userWidget.photo,
        isAuthenticated: true,
        isAdmin: model.isAdmin,
        user: model.user,
        newMessagesCount: model.newMessagesCount
    };
}

export const updateUserProfile = (userName: string, formData: FormData) => (dispatch: Dispatch) => {
    //console.log("formData", formData);//
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        method: "PUT",
        body: formData,
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    };
    return fetch(`/api/users/${userName}/profile`, options)
        .then((response: Response) => response.json())
        .then((data: any) => {
            //console.log("data", data);//
            let details: OperationDetails = data as OperationDetails
            if (!details) {
                details = {
                    isError: true,
                    message: "A validation error occurred while processing your request."
                };
            }
            let notification: Notification = {
                id: Date.now(),
                type: details.isError ? "error" : "success",
                text: $("<div />").text(details.message).html() // HTML encode with jQuery.
            };
            dispatch(addNotification(notification))
            getMyProfilePageModel()(dispatch)
                .then(() => dispatch(push("/admin/myprofile")));
        })
        .catch((error: Error) => {
            console.error(error, "updateUserProfile error");//
        });
}

export const addNotification = (notification: Notification) => {
    return {
        type: "ADD_NOTIFICATION",
        notification
    };
}

export const deleteNotification = (id: number) => {
    return {
        type: "DELETE_NOTIFICATION",
        id
    };
}

interface ServicesPageModel {
    userWidget: {
        userName: string,
        photo: string
    };
    items: ServiceInfo[];
    isAdmin: boolean;
    newMessagesCount: number;
}

export const getServicesPageModel = () => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    };
    return fetch("/api/pagemodels/services", options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: ServicesPageModel) => {
            dispatch(initServicesPage(data));
        })
        .catch((error: Error) => {
            console.error(error, "getServicesPageModel error");//
        });
}

const initServicesPage = (model: ServicesPageModel): any => {
    return {
        type: "INIT_SERVICES_PAGE",
        userName: model.userWidget.userName,
        photo: model.userWidget.photo,
        isAuthenticated: true,
        isAdmin: model.isAdmin,
        services: model.items,
        newMessagesCount: model.newMessagesCount
    };
}

export const deleteService = (serviceId: number) => (dispatch: Dispatch) => {
    /// TODO: Отрефакторить.
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        method: "DELETE",
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    };
    return fetch(`/api/services/${serviceId}`, options)
        .then((response: Response) => response.json())
        .then((data: any) => {
            let details: OperationDetails = data as OperationDetails
            if (!details) {
                details = {
                    isError: true,
                    message: "A validation error occurred while processing your request."
                };
            }
            let notification: Notification = {
                id: Date.now(),
                type: details.isError ? "error" : "success",
                text: encodeHTML(details.message)
            };
            dispatch(addNotification(notification))
            getServicesPageModel()(dispatch)
                .then(() => dispatch(push("/admin/services")));
        })
        .catch((error: Error) => {
            console.error(error, "deleteService error");//
        });
}

interface AddServicePageModel {
    userWidget: UserInfo;
    isAdmin: boolean;
    newMessagesCount: number;
}

export const getAddServicePageModel = () => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    }; //console.log("options", options);//
    return fetch("/api/pagemodels/addservice", options)
        .then((response: Response) => {
            //console.log("response", response);//
            return response.json();
        })
        .then((data: AddServicePageModel) => {
            //console.log("data", data);//
            dispatch(initAddServicePage(data));
        })
        .catch((error: Error) => {
            console.error(error, "getAddServicePageModel error");//
        });
}

const initAddServicePage = (model: AddServicePageModel): any => {
    return {
        type: "INIT_ADD_SERVICE_PAGE",
        userName: model.userWidget.userName,
        photo: model.userWidget.photo,
        isAuthenticated: true,
        isAdmin: model.isAdmin,
        newMessagesCount: model.newMessagesCount
    };
}

interface EditServicePageModel {
    userWidget: UserInfo;
    isAdmin: boolean;
    newMessagesCount: number;
    item: ServiceInfo;
}

export const getEditServicePageModel = (serviceId: number) => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    }; //console.log("options", options);//
    return fetch(`/api/pagemodels/editservice/${serviceId}`, options)
        .then((response: Response) => {
            //console.log("response", response);//
            if (response.status === 404) {
                dispatch(replace("/notfound"));
                throw new Error("Page not found.");
            }
            return response.json();
        })
        .then((data: EditServicePageModel) => {
            //console.log("data", data);//
            dispatch(initEditServicePage(data));
        })
        .catch((error: Error) => {
            console.error(error, "getEditServicePageModel error");//
        });
}

const initEditServicePage = (model: EditServicePageModel): any => {
    return {
        type: "INIT_EDIT_SERVICE_PAGE",
        userName: model.userWidget.userName,
        photo: model.userWidget.photo,
        isAuthenticated: true,
        isAdmin: model.isAdmin,
        newMessagesCount: model.newMessagesCount,
        item: model.item
    };
}

interface ValidationProblemDetails {
    title: string;
    errors: Map<string, string[]>;
}

export const addService = (formData: FormData) => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        method: "POST",
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        },
        body: formData
    };
    return fetch(`/api/services`, options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: OperationDetails | ValidationProblemDetails) => {
            let isValidationError: boolean = "title" in data;
            let details: OperationDetails = null;
            if (isValidationError) {
                details = {
                    isError: true,
                    message: "A validation error occurred while processing your request."
                }
            } else {
                details = <OperationDetails>data;
            }
            let notification: Notification = {
                id: Date.now(),
                type: details.isError ? "error" : "success",
                text: encodeHTML(details.message)
            };
            dispatch(addNotification(notification))
            if (!isValidationError) {
                dispatch(push("/admin/services"));
            } else {
                dispatch(requestEnd());
            }
        })
        .catch((error: Error) => {
            console.error(error, "addService error");//
        });
}

export const updateService = (serviceId: number, formData: FormData) => (dispatch: Dispatch) => {
    dispatch(requestBegin());
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        method: "PUT",
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        },
        body: formData
    };
    return fetch(`/api/services/${serviceId}`, options)
        .then((response: Response) => {
            return response.json();
        })
        .then((data: OperationDetails | ValidationProblemDetails) => {
            let isValidationError: boolean = "title" in data;
            let details: OperationDetails = null;
            if (isValidationError) {
                details = {
                    isError: true,
                    message: (data as ValidationProblemDetails).title
                }
            } else {
                details = <OperationDetails>data;
            }
            let notification: Notification = {
                id: Date.now(),
                type: details.isError ? "error" : "success",
                text: encodeHTML(details.message)
            };
            dispatch(addNotification(notification))
            if (!isValidationError) {
                dispatch(push("/admin/services"));
            } else {
                dispatch(requestEnd());
            }
        })
        .catch((error: Error) => {
            console.error(error, "updateService error");//
        });
}




const STORAGE_KEY: string = "accessToken";

function readAccessToken(): string {
    let token: string = window.sessionStorage.getItem(STORAGE_KEY);
    if (!token) {
        token = window.localStorage.getItem(STORAGE_KEY);
    }
    return token;
}

interface UserInfo {
    userName: string;
    photo: string;
}

const initSimplePage = (type: string, { userName, photo }: UserInfo): InitSimplePageAction => {
    return {
        type,
        userName,
        photo,
        isAuthenticated: userName ? true : false
    };
}

export const signOut = () => (dispatch: Dispatch) => {
    dispatch(doSignOut());
    dispatch(push("/"));
}

const doSignOut = (): SignOutAction => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(STORAGE_KEY);
    return {
        type: "SIGN_OUT"
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

interface AuthInfo {
    accessToken: string;
    isAdmin: boolean;
}

export const signIn = ({ userName, password, rememberMe, returnUrl }: SignInInfo) => (dispatch: Dispatch) => {
    dispatch(requestBegin());
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
        .then((data: OperationDetails | ValidationProblemDetails | AuthInfo) => {
            if ("accessToken" in data) {
                let { accessToken, isAdmin } = data;
                dispatch(doSignIn(accessToken, isAdmin, rememberMe));
                dispatch(push(returnUrl ? returnUrl : "/admin/myprofile"));
                return;
            }
            let details: OperationDetails = null;
            if ("title" in data) {
                details = {
                    isError: true,
                    message: data.title
                };
            } else {
                details = <OperationDetails>data;
            }
            dispatch(assignOperationDetails({ ...details }))
        })
        .catch((error: Error) => {
            console.error(error, "signIn error");//
        });
}

const doSignIn = (accessToken: string, isAdmin: boolean, rememberMe: boolean): SignInAction => {
    if (rememberMe) {
        window.localStorage.setItem(STORAGE_KEY, accessToken)
    } else {
        window.sessionStorage.setItem(STORAGE_KEY, accessToken);
    }
    return {
        type: "SIGN_IN",
        isAdmin
    };
}

const assignOperationDetails = ({ isError, message }: OperationDetailsState): OperationDetailsAction => {
    return {
        type: "ASSIGN_OPERATION_DETAILS",
        isError,
        message
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
        .then((data: OperationDetails | ValidationProblemDetails) => {
            let details: OperationDetails = null;
            if ("title" in data) {
                details = {
                    isError: true,
                    message: `${(data as ValidationProblemDetails).title} Please check message data and try again.`
                };
            } else {
                details = <OperationDetails>data;
            }
            dispatch(assignOperationDetails({ ...details }));
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