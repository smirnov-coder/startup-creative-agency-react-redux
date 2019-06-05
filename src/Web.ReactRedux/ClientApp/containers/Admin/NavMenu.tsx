import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@store/state";
import { NavLink } from "react-router-dom";
import { Menu } from "@components/Home/Menu";
import "./NavMenu.scss";
import { Routes } from "@scripts/constants";

type NavMenuProps = StateProps;

const NavMenu: React.SFC<NavMenuProps> = ({ isAdmin, newMessagesCount }: NavMenuProps) => {
    let links: any = {
        "My Profile": Routes.MY_PROFILE,
        "Services": Routes.SERVICES,
        "Users": Routes.USERS,
        "Works": Routes.WORKS,
        "Blog": Routes.BLOG,
        "Brands": Routes.BRANDS,
        "Testimonials": Routes.TESTIMONIALS
    };
    if (isAdmin) {
        links["Contacts"] = Routes.CONTACTS;
        links["Messages"] = Routes.MESSAGES;
    }
    return (
        <Menu className="nav-menu">
            {Object.keys(links).map((pageName, index) => (
                <Menu.Item key={index} className="nav-menu__item">
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