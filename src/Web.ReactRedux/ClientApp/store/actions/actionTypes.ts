const keyMirror = require("keymirror");

export interface IActionType {
    FETCHING_DATA: string;
    LIST_ENTITIES: string;
    GET_ENTITY: string;
    ADD_ENTITY: string;
    UPDATE_ENTITY: string;
    DELETE_ENTITY: string;
    SHOW_ERROR: string;
}

export const commonActions = keyMirror({
    FETCHING_DATA: null,
    LIST_ENTITIES: null,
    GET_ENTITY: null,
    ADD_ENTITY: null,
    UPDATE_ENTITY: null,
    DELETE_ENTITY: null,
    SHOW_ERROR: null
}) as IActionType;
