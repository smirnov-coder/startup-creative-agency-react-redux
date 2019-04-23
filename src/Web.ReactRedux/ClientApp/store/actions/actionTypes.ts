const keyMirror = require("keymirror");

export interface IActionTypes {
    LOADING: string;
    SHOW_ERROR: string;
    SHOW_SERVICES: string;
    SHOW_TEAM_MEMBERS: string;
    SHOW_WORKS: string;
}

export const ActionTypes = keyMirror({
    LOADING: null,
    SHOW_ERROR: null,
    SHOW_SERVICES: null,
    SHOW_TEAM_MEMBERS: null,
    SHOW_WORKS: null,
}) as IActionTypes;
