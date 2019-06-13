import { Action } from "redux";
import { Notification } from "@store/state";
import { ActionTypes } from "@store/actions";

export interface AddedNotificationAction extends Action {
    payload: {
        notification: Notification
    };
}

export const addNotification = (notification: Notification): AddedNotificationAction => {
    return {
        type: ActionTypes.ADDED_NOTIFICATION,
        payload: {
            notification
        }
    };
}

export interface DeletedNotificationAction extends Action {
    payload: {
        notificationId: number
    };
}

export const deleteNotification = (notificationId: number): DeletedNotificationAction => {
    return {
        type: ActionTypes.DELETED_NOTIFICATION,
        payload: {
            notificationId
        }
    };
}