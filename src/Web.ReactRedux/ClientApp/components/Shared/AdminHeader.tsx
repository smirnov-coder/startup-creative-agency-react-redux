import * as React from "react";
import UserWidget from "@containers/Shared/UserWidget";
import "./AdminHeader.scss";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { Logo } from "./Logo";

type AdminHeaderProps = StateProps;

const AdminHeader: React.SFC<AdminHeaderProps> = (props: AdminHeaderProps) =>
    <header className="admin-header">
        <div className="admin-header__left-content">
            <Logo />
        </div>
        <div className="admin-header__right-content">
            {props.isAuthenticated ? <UserWidget /> : null}
        </div>
    </header>;

interface StateProps {
    isAuthenticated: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, null)(AdminHeader);