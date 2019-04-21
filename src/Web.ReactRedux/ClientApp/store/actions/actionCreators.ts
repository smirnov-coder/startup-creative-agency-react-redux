import { ServicesActions, CommonActions } from "./actions";
import { Dispatch } from "redux";
import { commonActions } from "./actionTypes";
import { IServiceInfo } from "../entities";
import { IHomePageModel } from "../../components/HomePage";

export function load(): CommonActions {
    return {
        type: commonActions.LOADING
    };
}

export function handleError(error: Error): CommonActions {
    return {
        type: commonActions.ERROR,
        error: error
    };
}

export function showServices(services: IServiceInfo[]): ServicesActions {
    return {
        type: commonActions.SHOW,
        items: services
    };
}

//export function getServices() {
//    return {
//        type: commonActions.GET,

//    }
//}

export function getPageModel() {
    return (dispatch: Dispatch<CommonActions>) => {
        dispatch(load());
        return fetch("/ViewModel")
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            }, (error: Error) => {
                dispatch(handleError(error));
            })
            .then((data: IHomePageModel) => {
                dispatch(showServices(data.services));
                //
            })
    }
}