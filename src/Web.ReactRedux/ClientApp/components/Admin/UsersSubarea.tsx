import * as React from "react";
import { withDocumentTitle } from "./withDocumentTitle";
import { Switch, Route, Redirect } from "react-router";
import { Routes } from "@scripts/constants";
import { compose } from "redux";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import Loader from "@components/Shared/Loader";
import { fetchUsers, registerUser } from "@store/actions/usersActions";
import UserList from "@containers/Admin/UserList";
import { RegisterUserForm } from "@containers/Admin/RegisterUserForm";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import ManageUserPage from "@containers/Admin/ManageUserPage";

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