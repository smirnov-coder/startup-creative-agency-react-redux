import * as React from "react";
import { withDocumentTitle } from "./withDocumentTitle";
import { Switch, Route, Redirect, withRouter } from "react-router";
import { Routes } from "@scripts/constants";
import { compose } from "redux";
import { withInitializer } from "@containers/Admin/withPageInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import Loader from "@components/Shared/Loader";
import { fetchUsers } from "@store/actions/usersActions";
import UserList from "@containers/Admin/UserList";
import ManageUserPage from "@containers/Admin/ManageUserPage";
import RegisterUserForm from "@containers/Admin/RegisterUserForm";

const UsersSubarea: React.SFC = () =>
    <Switch>
        <Route exact path={Routes.USERS} component={UsersPage} />
        <Route path={Routes.REGISTER_USER} component={RegisterUserPage} />
        <Route path={Routes.MANAGE_USER} component={ManageUserPage} />
        <Redirect to={Routes.NOT_FOUND} />
    </Switch>;

// Users page
const UsersPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchUsers),
    withLoader(Loader, state => state.users.isLoading),
    withPageContentWrapper("User List")
)(UserList);

// RegisterUser page
const RegisterUserPage = compose(
    withLoader(Loader, state => state.users.isLoading),
    withPageContentWrapper("Register New User"),
    withRouter,
)(RegisterUserForm);

export default withDocumentTitle("Startup ReactRedux Admin Users")(UsersSubarea);