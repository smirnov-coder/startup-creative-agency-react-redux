import { Action } from "redux";
import * as Entities from "@store/entities";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, TOKEN_STORAGE_KEY } from "@scripts/constants";
import { fetchData } from "./genericActions";

export interface InitialAppState {
    userName: string;
    photo: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
    newMessagesCount: number;
    roles: string[];
}

export function fetchInitialAppState() {
    let url: string = GLOBALS.api.initialState;
    return fetchData<InitialAppState>({
        url,
        requestInit: dispatch => {
            dispatch(createNonPayloadAction(ActionTypes.REQUEST_AUTH));
            dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES));
        },
        requestComplete: dispatch => {
            dispatch(createNonPayloadAction(ActionTypes.REQUEST_AUTH_COMPLETED));
            dispatch(createNonPayloadAction(ActionTypes.REQUEST_MESSAGES_COMPLETED));
        },
        success: data => initAppState(data),
        errorMessage: `Failed to fetch initial app state from ${url}.`
    })
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

export const createNonPayloadAction = (type: string): Action => { return { type } };

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

export function fetchHomePageModel() {
    let url: string = GLOBALS.api.homeModel;
    return fetchData<HomePageModel>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_HOME_PAGE_MODEL)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_HOME_PAGE_MODEL_COMPLETED)),
        success: data => initHomePage(data),
        errorMessage: `Failed to fetch home page model from ${url}.`
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