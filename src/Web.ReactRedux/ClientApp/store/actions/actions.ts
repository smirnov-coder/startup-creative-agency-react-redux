import IServiceInfo from "../../entities/IServiceInfo";

interface IAction {
    type: string
}

export interface IFetchingDataAction extends IAction { }

export interface IShowErrorAction extends IAction {
    error: string;
}

export interface IListEntitiesAction<T> extends IAction {
    items: T[];
}

export type CommonActions = IFetchingDataAction
    | IShowErrorAction

export type ServicesActions = CommonActions
    | IListEntitiesAction<IServiceInfo>