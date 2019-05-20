import * as React from "react";
import "@bootstrap/css";

interface NotificationProps {
    id: number;
    type: "success" | "error";
    text: string;
    onDelete: (id: number) => void
}

const Notification: React.SFC<NotificationProps> = (props: NotificationProps) => {
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

export default Notification;