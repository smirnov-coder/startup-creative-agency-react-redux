import { Action } from "redux";
import { ServiceInfo } from "@store/entities";

export interface AddServicesAction extends Action {
    payload: {
        items: ServiceInfo[]
    };
}

export const addServices = (services: ServiceInfo[]): AddServicesAction => {
    return {
        type: "ADD_SERVICES",
        payload: {
            items: services
        }
    };
}