import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { signOut } from "@store/actions/actionCreators";
import "./UserWidget.scss";
import { AppState } from "@store/state";

type UserWidgetProps = StateProps & DispatchProps;

class UserWidget extends React.Component<UserWidgetProps> {
    constructor(props: UserWidgetProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let { userName, photo } = this.props;
        return (
            <div className="user-widget">
                <div className="user-widget__img-holder">
                    <img src={photo} className={`user-widget__img ${photo ? "" : "user-widget__img--hidden"}`}
                        alt={userName} />
                </div>
                <div className="user-widget__info">
                    <div className="user-widget__user-name">{userName}</div>
                    <button className="user-widget__logout custom-link custom-link--color-white" onClick={this.handleClick}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        this.props.onLogout();
    }
}

interface StateProps {
    userName: string;
    photo: string;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        userName: state.auth.userName,
        photo: state.auth.photo
    };
}

interface DispatchProps {
    onLogout: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onLogout: bindActionCreators(signOut, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserWidget);