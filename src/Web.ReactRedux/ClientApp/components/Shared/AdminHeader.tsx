import * as React from "react";
import { Logo } from "../../components/Home/Logo";
import UserWidget from "../../containers/Shared/UserWidget";
import "./AdminHeader.scss";

interface AdminHeaderProps {
    isAuthenticated: boolean;
}

export class AdminHeader extends React.Component<AdminHeaderProps> {
    constructor(props: AdminHeaderProps) {
        super(props);
    }

    render(): JSX.Element {
        let { isAuthenticated } = this.props;
        return (
            <header className="admin-header">
                <div className="admin-header__left-content">
                    <Logo />
                </div>
                {!isAuthenticated ? null :
                    <div className="admin-header__right-content">
                        <UserWidget />
                    </div>
                }
            </header>
        );
    }
}