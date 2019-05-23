import { DomainUser } from "@store/entities";
import { Action } from "redux";

export interface AddUsersAction extends Action {
    payload: {
        items: DomainUser[]
    };
}

export const addUsers = (users: DomainUser[]): AddUsersAction => {
    return {
        type: "ADD_USERS",
        payload: {
            items: users
        }
    };
}