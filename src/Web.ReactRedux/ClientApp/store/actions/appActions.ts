import { Dispatch, Action } from "redux";
import * as Entities from "@store/entities";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, TOKEN_STORAGE_KEY } from "@scripts/constants";

export interface InitialAppState {
    userName: string;
    photo: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
    newMessagesCount: number;
    roles: string[];
}

export const fetchInitialAppState = () => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_AUTH));
    dispatch(createSimpleAction(ActionTypes.REQUEST_MESSAGES));
    let accessToken: string = readAccessToken();
    let options: RequestInit = {
        headers: !accessToken ? {} : {
            Authorization: `Bearer ${accessToken}`
        }
    };
    let uri: string = GLOBALS.api.initialState;
    return fetch(uri, options)
        .then(response => response.json())
        .then((data: InitialAppState) => {
            //console.log("initial state", data);//
            dispatch(initAppState(data));
        })
        .catch(error => {
            console.error("fetchInitialAppState error", error);
        });
}

export interface InitialAppStateAction extends Action {
    payload: {
        initialState: InitialAppState
    }
}

const initAppState = (state: InitialAppState): InitialAppStateAction => {
    return {
        type: ActionTypes.INITIAL_APP_STATE,
        payload: {
            initialState: state
        }
    };
}

export const createSimpleAction = (type: string): Action => { return { type } };

export function readAccessToken(): string {
    let token: string = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
        token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    }
    return token;
}

interface HomePageModel {
    services: Entities.ServiceInfo[];
    teamMembers: Entities.DomainUser[];
    works: Entities.WorkExample[];
    blogPosts: Entities.BlogPost[];
    brands: Entities.Brand[];
    testimonials: Entities.Testimonial[];
    contacts: Entities.ContactInfo[];
    socialLinks: Entities.SocialLink[];
}

export const fetchHomePageModel = () => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_HOME_PAGE_MODEL));
    return fetch(GLOBALS.api.homeModel)
        .then(response => {
            return response.json();
        })
        .then((data: HomePageModel) => {
            //console.log("data", data);//
            dispatch(initHomePage(data));
        })
        .catch((error: Error) => {
            console.error("fetchHomePageModel error", error);//
        });
}

export interface HomePageModelAction extends Action {
    payload: {
        model: HomePageModel
    };
}

const initHomePage = (model: HomePageModel): HomePageModelAction => {
    return {
        type: ActionTypes.HOME_PAGE_MODEL,
        payload: {
            model
        }
    };
}

export interface OperationDetails {
    isError: boolean;
    message: string;
}

export interface ValidationProblemDetails {
    title: string;
    errors: Map<string, string[]>;
}