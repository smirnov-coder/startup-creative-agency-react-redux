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
                {this.props.items.map((item, index) => (
                    <NotificationItem key={index} {...item} onDismiss={this.handleDelete} />
                ))}
            </div>
        );
    }

    handleDelete(id: number): void {
        this.props.onDelete(id);
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
    onDelete: (id: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onDelete: bindActionCreators(deleteNotification, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);