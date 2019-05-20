import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/state";
import { NavLink } from "react-router-dom";
import { Menu } from "../../components/Home/Menu";
import "./NavMenu.scss";

type NavMenuProps = StateProps;

const NavMenu: React.SFC<NavMenuProps> = (props: NavMenuProps) => {
    let links: any = {
        "My Profile": "/admin/myprofile",
        "Services": "/admin/services",
        "Users": "/admin/users",
        "Works": "/admin/works",
        "Blog": "/admin/blog",
        "Brands": "/admin/brands",
        "Testimonials": "/admin/testimonials"
    };
    let { isAdmin, newMessagesCount } = props;
    if (isAdmin) {
        links["Contacts"] = "/admin/contacts";
        links["Messages"] = "/admin/messages";
    }
    return (
        <Menu className="nav-menu">
            {Object.keys(links).map(pageName => (
                <Menu.Item key={pageName} className="nav-menu__item">
                    <NavLink to={links[pageName]} className="nav-menu__link custom-link">
                        {pageName}
                        {pageName === "Messages" && newMessagesCount > 0
                            ? <span className="badge nav-menu__badge">
                                {newMessagesCount > 99 ? "99+" : newMessagesCount}
                            </span>
                            : null
                        }
                    </NavLink>
                </Menu.Item>
            ))}
        </Menu>
    );
}

interface StateProps {
    isAdmin: boolean;
    newMessagesCount: number;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isAdmin: state.auth.isAdmin,
        newMessagesCount: state.messages.newMessagesCount
    };
}

export default connect(mapStateToProps, null)(NavMenu);