import * as React from "react";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import NotificationItem from "@components/Admin/NotificationItem";
import { deleteNotification } from "@store/actions/notificationsActions";
import { Notification } from "@store/state";

type NotificationBarProps = StateProps & DispatchProps;

class NotificationBar extends React.Component<NotificationBarProps> {
    constructor(props: NotificationBarProps) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render(): JSX.Element {
        return (
            <div className="notification-bar">
                {this.props.items.map(item => (
                    <NotificationItem key={item.id} {...item} onDelete={this.handleDelete} />
                ))}
            </div>
        );
    }

    handleDelete(id: number): void {
        this.props.deleteNotification(id);
    }
}

interface StateProps {
    items: Notification[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.notifications.items
    };
}

interface DispatchProps {
    deleteNotification: (id: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        deleteNotification: bindActionCreators(deleteNotification, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);