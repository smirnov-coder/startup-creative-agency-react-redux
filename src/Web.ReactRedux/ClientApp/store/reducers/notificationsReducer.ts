import { NotificationsState, initialState as appState } from "@store/state";
import { AddedNotificationAction, DeletedNotificationAction } from "@store/actions/notificationsActions";
import { ActionTypes } from "@store/actions/actionTypes";

type NotificationsActions =
    | AddedNotificationAction
    | DeletedNotificationAction

const initialState = appState.notifications;

function notificationsReducer(state: NotificationsState = initialState, action: NotificationsActions): NotificationsState {
    switch (action.type) {
        case ActionTypes.ADDED_NOTIFICATION: {
            let { notification } = (action as AddedNotificationAction).payload;
            return {
                items: state.items.concat(notification)
            };
        }

        case ActionTypes.DELETED_NOTIFICATION: {
            let { notificationId } = (action as DeletedNotificationAction).payload;
            return {
                items: state.items.filter(item => item.id !== notificationId)
            };
        }

        default:
            return state;
    }
}

export default notificationsReducer;