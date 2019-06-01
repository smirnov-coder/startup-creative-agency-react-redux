import * as React from "react";
import { DomainUser } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators, compose } from "redux";
import { updateDisplayStatus, deleteUser, fetchUser } from "@store/actions/usersActions";
import { connect } from "react-redux";
import { UserItem } from "./UserItem";
import { withAuthentication } from "./withAuthentication";
import { withInitializer } from "./withInitializer";
import { withLoader } from "./withLoader";
import Loader from "@components/Shared/Loader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { match } from "react-router";

type ManageUserPageProps = StateProps & DispatchProps;

class ManageUserPage extends React.Component<ManageUserPageProps> {
    render(): JSX.Element {
        let { user, updateDisplayStatus, deleteUser } = this.props;
        return (
            <UserItem item={user} isAdmin={true} isManagePage={true} onDelete={deleteUser}
                onUpdateDisplayStatus={updateDisplayStatus} />
        );
    }
}

interface StateProps {
    user: DomainUser;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        user: state.users.current
    };
}

interface DispatchProps {
    updateDisplayStatus: (userName: string, isDisplayed: boolean) => void;
    deleteUser: (userName: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        updateDisplayStatus: bindActionCreators(updateDisplayStatus, dispatch),
        deleteUser: bindActionCreators(deleteUser, dispatch)
    };
}

const composed = compose(
    withAuthentication(true),
    withInitializer(
        (routeMatch, actionCreator) => {
            let userName: string = (routeMatch.params as any).userName;
            return () => actionCreator(userName);
        },
        fetchUser
    ),
    withLoader(Loader, state => state.users.isLoading || !state.users.current),
    withPageContentWrapper((routeMatch: match) => "Manage User"),
    connect(mapStateToProps, mapDispatchToProps)
);

export default composed(ManageUserPage);