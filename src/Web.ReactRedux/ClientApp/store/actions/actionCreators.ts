import { ServicesActions, CommonActions } from "./actions";
import { Dispatch } from "redux";
import IServiceInfo from "../../entities/IServiceInfo";
import { commonActions } from "./actionTypes";

export function requestData(): CommonActions {
    return {
        type: commonActions.FETCHING_DATA
    };
}

export function showErrorMessage(message: string): CommonActions {
    return {
        type: commonActions.SHOW_ERROR,
        error: message
    };
}

export function listServices(services: IServiceInfo[]): ServicesActions {
    return {
        type: commonActions.LIST_ENTITIES,
        items: services
    };
}

export function getServices() {
    return (dispatch: Dispatch<ServicesActions>) => {
        dispatch(requestData());
        return fetch("/api/services")
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            }, (error: Error) => {
                dispatch(showErrorMessage(error.message));
            })
            .then((data: IServiceInfo[]) => {
                dispatch(listServices(data));
            })
    }
}