import {
    ServicesActions,
    CommonActions,
    TeamMembersActions,
    WorksActions,
    BlogActions,
    BrandsActions,
    TestimonialsActions,    ContactsActions,
    MessagesActions,
    SocialLinksActions
} from "./actions";
import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { IServiceInfo, IDomainUser, IWorkExample, IBlogPost, IBrand, ITestimonial, IContactInfo, ISocialLink } from "../entities";
import { IHomePageModel } from "../../containers/HomePage";
import { IContactMessage } from "../../containers/ContactForm";

export function loadAll(): CommonActions {
    return {
        type: ActionTypes.LOADING_ALL
    };
}

export function showError(error: Error): CommonActions {
    return {
        type: ActionTypes.SHOW_ERROR,
        error: error
    };
}

export function showServices(services: IServiceInfo[]): ServicesActions {
    return {
        type: ActionTypes.SHOW_SERVICES,
        items: services
    };
}

export function showTeam(teamMembers: IDomainUser[]): TeamMembersActions {
    return {
        type: ActionTypes.SHOW_TEAM_MEMBERS,
        items: teamMembers
    };
}

export function showWorks(works: IWorkExample[]): WorksActions {
    return {
        type: ActionTypes.SHOW_WORKS,
        items: works
    };
}

export function showBlog(blogPosts: IBlogPost[]): BlogActions {
    return {
        type: ActionTypes.SHOW_BLOG,
        items: blogPosts
    };
}

export function showBrands(brands: IBrand[]): BrandsActions {
    return {
        type: ActionTypes.SHOW_BRANDS,
        items: brands
    };
}

export function showTestimonials(testimonials: ITestimonial[]): TestimonialsActions {
    return {
        type: ActionTypes.SHOW_TESTIMONIALS,
        items: testimonials
    };
}

export function showContacts(contacts: IContactInfo[]): ContactsActions {
    //console.log(contacts, "showContacts");//
    return {
        type: ActionTypes.SHOW_CONTACTS,
        items: contacts
    };
}

export function showSocialLinks(socialLinks: ISocialLink[]): SocialLinksActions {
    return {
        type: ActionTypes.SHOW_SOCIAL_LINKS,
        items: socialLinks
    }
}

export function getPageModel() {
    return (dispatch: Dispatch) => {
        dispatch(loadAll());
        return fetch("/model")
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            }, (error: Error) => {
                dispatch(showError(error));
            })
            .then((data: IHomePageModel) => {
                dispatch(showServices(data.services));
                dispatch(showTeam(data.teamMembers));
                dispatch(showWorks(data.works));
                dispatch(showBlog(data.blogPosts));
                dispatch(showBrands(data.brands));
                dispatch(showTestimonials(data.testimonials));
                dispatch(showContacts(data.contacts));
                dispatch(showSocialLinks(data.socialLinks));
            })

    }
}

export function sendingMessage(): MessagesActions {
    return {
        type: ActionTypes.SENDING_MESSAGE
    }
}

interface IValidationProblemDetails {
    title: string;
}

export function showResponseMessage(text: string, isError: boolean): MessagesActions {
    return {
        type: "SHOW_RESPONSE_MESSAGE",
        text,
        isError
    }
}

export function sendMessage(message: IContactMessage) {
    return (dispatch: Dispatch) => {
        dispatch(sendingMessage());
        let isError: boolean = false;
        return fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
            .then((response: Response) => {
                if (!response.ok) {
                    isError = true;
                }
                return response.text();
            }, (error: Error) => {
                dispatch(showError(error));
            })
            .then((data: string) => {
                let validationProblem: IValidationProblemDetails;
                let text: string;
                try {
                    validationProblem = JSON.parse(data)
                    if (validationProblem) {
                        text = `${validationProblem.title} Please check message data and try again.`;
                    }
                } catch {
                    text = data;
                }
                dispatch(showResponseMessage(text, isError));
            });
    }
}

export function getBlogPosts(skip: number = 0, take: number = 0) {
    return (dispatch: Dispatch) => {
        dispatch(loadBlogPosts());
        return fetch(`/api/blog?skip=${skip}&take=${take}`)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            }, (error: Error) => {
                dispatch(showError(error));
            })
            .then((data: IBlogPost[]) => {
                dispatch(appendBlogPosts(data));
            });
    }
}

export function appendBlogPosts(blogPosts: IBlogPost[]): BlogActions {
    return {
        type: "APPEND_BLOG_POSTS",
        items: blogPosts
    }
}

export function loadBlogPosts(): BlogActions {
    return {
        type: ActionTypes.LOADING_BLOG_POSTS
    };
}