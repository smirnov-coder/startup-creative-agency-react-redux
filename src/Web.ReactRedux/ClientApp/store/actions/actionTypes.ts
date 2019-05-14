const keyMirror = require("keymirror");

interface ActionTypes {
    REQUEST: string;
    REQUEST_BLOG_POSTS: string;
    ASSIGN_ERROR: string;
    ASSIGN_SERVICES: string;
    ASSIGN_TEAM_MEMBERS: string;
    ASSIGN_WORKS: string;
    ASSIGN_BLOG: string;
    ASSIGN_BRANDS: string;
    ASSIGN_TESTIMONIALS: string;
    ASSIGN_CONTACTS: string;
    REQUEST_SEND_MESSAGE: string;
    ASSIGN_SOCIAL_LINKS: string;
    APPEND_BLOG_POSTS: string;
}

export const ActionTypes = keyMirror({
    REQUEST: null,
    REQUEST_BLOG_POSTS: null,
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
}) as ActionTypes;
