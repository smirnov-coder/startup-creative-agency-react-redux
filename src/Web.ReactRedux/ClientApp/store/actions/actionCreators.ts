﻿import {
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

export function load(): CommonActions {
    return {
        type: ActionTypes.LOADING
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
        dispatch(load());
        return fetch("/ViewModel")
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
                //console.log(data, "data");//
                dispatch(showContacts(data.contacts));
                dispatch(showSocialLinks(data.socialLinks));
                //
            })
            
    }
}

export function sending(): MessagesActions {
    return {
        type: ActionTypes.SENDING_MESSAGE
    }
}

export function showResponse(responseText: string): MessagesActions {
    //console.log(responseText, "showResponse");//
    return {
        type: "SHOW_RESPONSE",
        text: responseText
    }
}

export function sendMessage(message: IContactMessage) {
    //console.log("sendMessage");//
    return (dispatch: Dispatch) => {
        dispatch(sending());
        return fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            })
            .then((response: Response) => {
                //console.log(response, "response");//
                return response.json();
            }, (error: any) => {
                //console.log(error, "error");//
                dispatch(showError(error));
            })
            .then((data: any) => {
                //console.log(data, "data");//
                dispatch(showResponse(data.title));
            });
    }
}