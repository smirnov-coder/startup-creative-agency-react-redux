import * as React from "react";
import { compose } from "redux";
import { match } from "react-router";
import { DomainUser } from "@store/entities";
import { fetchUser } from "@store/actions";
import Loader from "@components/Shared/Loader";
import UserItem from "@containers/Admin/UserItem";
import { withAuthentication } from "@containers/Admin/withAuthentication";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withDataFeed } from "@containers/Admin/withDataFeed";

interface ManageUserPageProps {
    user: DomainUser;
}

const ManageUserPage: React.SFC<ManageUserPageProps> = ({ user }: ManageUserPageProps) => {
    return (
        <UserItem item={user} isAdmin={true} isManagePage={true} />
    );
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
    withDataFeed(state => state.users.current, "user")
);

export default composed(ManageUserPage);