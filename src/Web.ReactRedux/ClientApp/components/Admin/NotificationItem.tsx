import * as React from "react";
import { Notification } from "@store/state";
import "@bootstrap/css";

interface NotificationItemProps extends Notification {
    onDismiss: (id: number) => void
}

const NotificationItem: React.SFC<NotificationItemProps> = ({ id, type, text, onDismiss }: NotificationItemProps) => {
    let colorClass = type === "success" ? "alert-success" : "alert-danger";
    return (
        <div className={`notification alert ${colorClass}`}>
            <button className="close" type="button" onClick={() => onDismiss(id)}>
                <span>&times;</span>
            </button>
            {text}
        </div>
    );
}

export default NotificationItem;