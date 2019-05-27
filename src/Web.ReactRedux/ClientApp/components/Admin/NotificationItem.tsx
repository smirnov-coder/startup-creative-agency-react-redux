import * as React from "react";
import { Notification } from "@store/state";
import "@bootstrap/css";

interface NotificationProps extends Notification {
    onDelete: (id: number) => void
}

const NotificationItem: React.SFC<NotificationProps> = (props: NotificationProps) => {
    let { id, type, text, onDelete } = props;
    let colorClass: string = type === "success" ? "alert-success" : "alert-danger";
    return (
        <div className={`notification alert alert-dismissible fade in ${colorClass}`}>
            <button className="close" type="button" onClick={() => onDelete(id)} data-dismiss="alert">
                <span>&times;</span>
            </button>
            {text}
        </div>
    );
}

export default NotificationItem;