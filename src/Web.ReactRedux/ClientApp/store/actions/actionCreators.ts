import { ServicesActions, CommonActions, TeamMembersActions, WorksActions } from "./actions";
import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { IServiceInfo, IDomainUser, IWorkExample } from "../entities";
import { IHomePageModel } from "../../containers/HomePage";

export function load(): CommonActions {
    return {
        type: ActionTypes.LOADING
    };
}

export function showError(error: Error): CommonActions {
    return {
        type: ActionTypes.SHOW_ERROR,
        error: error
    };
}

export function showServices(services: IServiceInfo[]): ServicesActions {
    return {
        type: ActionTypes.SHOW_SERVICES,
        items: services
    };
}

export function showTeam(teamMembers: IDomainUser[]): TeamMembersActions {
    return {
        type: ActionTypes.SHOW_TEAM_MEMBERS,
        items: teamMembers
    };
}

export function showWorks(works: IWorkExample[]): WorksActions {
    return {
        type: ActionTypes.SHOW_WORKS,
        items: works
    };
}

//export function getServices() {
//    return {
//        type: commonActions.GET,

//    }
//}

export function getPageModel() {
    return (dispatch: Dispatch) => {
        dispatch(load());
        return fetch("/ViewModel")
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            }, (error: Error) => {
                dispatch(showError(error));
            })
            .then((data: IHomePageModel) => {
                dispatch(showServices(data.services));
                dispatch(showTeam(data.teamMembers));
                dispatch(showWorks(data.works));
                //
            })
            
    }
}