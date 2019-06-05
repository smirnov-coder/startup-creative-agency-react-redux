import * as React from "react";
import { DomainUser } from "@store/entities";
import { compose } from "redux";
import { fetchUser } from "@store/actions/usersActions";
import UserItem from "./UserItem";
import { withAuthentication } from "./withAuthentication";
import { withInitializer } from "./withInitializer";
import { withLoader } from "./withLoader";
import Loader from "@components/Shared/Loader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { match } from "react-router";
import { withDataFeed } from "./withDataFeed";

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