const keyMirror = require("keymirror");

export interface IActionType {
    LOADING: string;
    SHOW: string;
    GET: string;
    ADD: string;
    UPDATE: string;
    DELETE: string;
    ERROR: string;
}

export const commonActions = keyMirror({
    LOADING: null,
    SHOW: null,
    GET: null,
    ADD: null,
    UPDATE: null,
    DELETE: null,
    ERROR: null
}) as IActionType;
