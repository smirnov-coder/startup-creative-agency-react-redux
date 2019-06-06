import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@store/state";
import Logo from "@components/Shared/Logo";
import UserWidget from "@containers/Shared/UserWidget";
import "./AdminHeader.scss";

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