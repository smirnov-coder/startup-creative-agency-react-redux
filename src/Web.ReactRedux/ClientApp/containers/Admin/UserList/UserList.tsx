import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@store/state";
import { DomainUser } from "@store/entities";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import LinkButton from "@components/Shared/LinkButton";
import UserItem from "@containers/Admin/UserItem";
import "./UserList.scss";

interface ComponentProps {
    items: DomainUser[];
}

type UserListProps = ComponentProps & StateProps;

const UserList: React.SFC<UserListProps> = ({ items, isAdmin }: UserListProps) => {
    return (
        <div className="user-list">
            <div className="user-list__items">
                {items.map((item, index) => (
                    <div key={index} className="user-list__item">
                        <UserItem item={item} isAdmin={isAdmin} isManagePage={false} />
                    </div>
                ))}
            </div>
            {!isAdmin
                ? null
                : <LinkButton url={Routes.REGISTER_USER} className="user-list__add" children="Register New User"
                    modifiers={[ButtonModifiers.Size.SMALL]} />
            }
        </div>
    );
}

interface StateProps {
    isAdmin: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isAdmin: state.auth.isAdmin
    };
}

export default connect(mapStateToProps, null)(UserList);