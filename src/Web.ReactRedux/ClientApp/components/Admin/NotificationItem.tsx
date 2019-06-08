import * as React from "react";
import { Notification } from "@store/state";
import "@bootstrap/css";

interface NotificationProps extends Notification {
    onDismiss: (id: number) => void
}

const NotificationItem: React.SFC<NotificationProps> = ({ id, type, text, onDismiss }: NotificationProps) => {
    let colorClass = type === "success" ? "alert-success" : "alert-danger";
    return (
        <div className={`notification alert alert-dismissible fade in ${colorClass}`}>
            <button className="close" type="button" onClick={() => onDismiss(id)} data-dismiss="alert">
                <span>&times;</span>
            </button>
            {text}
        </div>
    );
}

export default NotificationItem;