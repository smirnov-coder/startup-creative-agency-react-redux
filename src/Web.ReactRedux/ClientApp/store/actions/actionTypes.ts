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
    ASSIGN_ERROR: null,
    ASSIGN_SERVICES: null,
    ASSIGN_TEAM_MEMBERS: null,
    ASSIGN_WORKS: null,
    ASSIGN_BLOG: null,
    ASSIGN_BRANDS: null,
    ASSIGN_TESTIMONIALS: null,
    ASSIGN_CONTACTS: null,
    REQUEST_SEND_MESSAGE: null,
    ASSIGN_SOCIAL_LINKS: null,
    APPEND_BLOG_POSTS: null,
}) as ActionTypes;
