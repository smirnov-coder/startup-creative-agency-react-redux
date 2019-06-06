import * as React from "react";
import { compose } from "redux";
import { Switch, Route, Redirect } from "react-router";
import { Routes } from "@scripts/constants";
import { fetchUsers, registerUser } from "@store/actions";
import Loader from "@components/Shared/Loader";
import UserList from "@containers/Admin/UserList";
import { RegisterUserForm } from "@containers/Admin/RegisterUserForm";
import ManageUserPage from "@containers/Admin/ManageUserPage";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";

const UsersSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.USERS} component={UsersPage} />
            <Route path={Routes.REGISTER_USER} component={RegisterUserPage} />
            <Route path={Routes.MANAGE_USER} component={ManageUserPage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

// Users page
const UsersPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchUsers),
    withLoader(Loader, state => state.users.isLoading),
    withPageContentWrapper("User List"),
    withDataFeed(state => state.users.items, "items")
)(UserList);

// RegisterUser page
const RegisterUserPage = compose(
    withLoader(Loader, state => state.users.isLoading),
    withPageContentWrapper("Register New User"),
    withSubmitHandler(registerUser),
    withDataFeed(state => state.auth.roles, "roles")
)(RegisterUserForm);

export default withDocumentTitle("Startup ReactRedux Admin Users")(UsersSubarea);