import * as React from "react";
import { DomainUser } from "@store/entities";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import { LinkButton } from "@components/Shared/LinkButton";
import "./UserList.scss";
import { UserItem } from "./UserItem";

type UserListProps = StateProps;

class UserList extends React.Component<UserListProps> {
    render(): JSX.Element {
        let { items, isAdmin } = this.props;
        return (
            <div className="user-list">
                <div className="user-list__items">
                    {items.map(item => (
                        <div key={item.Id} className="user-list__item">
                            <UserItem item={item} isAdmin={isAdmin} isManagePage={false} />
                        </div>
                    ))}
                </div>
                {isAdmin
                    ? <LinkButton url={Routes.REGISTER_USER}
                        className="user-list__add"
                        modifiers={[ButtonModifiers.Size.SMALL]}>
                        Register New User
                      </LinkButton>
                    : null
                }
            </div>
        );
    }
}

interface StateProps {
    items: DomainUser[];
    isAdmin: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.users.items,
        isAdmin: state.auth.isAdmin
    };
}

export default connect(mapStateToProps, null)(UserList);