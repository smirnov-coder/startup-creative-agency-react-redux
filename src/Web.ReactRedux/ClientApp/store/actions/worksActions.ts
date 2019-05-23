import { WorkExample } from "@store/entities";
import { Action } from "redux";

export interface AddWorksAction extends Action {
    payload: {
        items: WorkExample[]
    };
}

export const addWorks = (works: WorkExample[]): AddWorksAction => {
    return {
        type: "ADD_WORKS",
        payload: {
            items: works
        }
    };
}