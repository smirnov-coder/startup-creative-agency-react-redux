const keyMirror = require("keymirror");

export interface IActionTypes {
    LOADING_ALL: string;
    LOADING_BLOG_POSTS: string;
    SHOW_ERROR: string;
    SHOW_SERVICES: string;
    SHOW_TEAM_MEMBERS: string;
    SHOW_WORKS: string;
    SHOW_BLOG: string;
    SHOW_BRANDS: string;
    SHOW_TESTIMONIALS: string;
    SHOW_CONTACTS: string;
    SENDING_MESSAGE: string;
    SHOW_SOCIAL_LINKS: string;
    APPEND_BLOG_POSTS: string;
}

export const ActionTypes = keyMirror({
    LOADING_ALL: null,
    LOADING_BLOG_POSTS: null,
    SHOW_ERROR: null,
    SHOW_SERVICES: null,
    SHOW_TEAM_MEMBERS: null,
    SHOW_WORKS: null,
    SHOW_BLOG: null,
    SHOW_BRANDS: null,
    SHOW_TESTIMONIALS: null,
    SHOW_CONTACTS: null,
    SENDING_MESSAGE: null,
    SHOW_SOCIAL_LINKS: null,
    APPEND_BLOG_POSTS: null,
}) as IActionTypes;
