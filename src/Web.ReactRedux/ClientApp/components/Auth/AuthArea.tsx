import * as React from "react";
import { Switch, Route } from "react-router";
import LoginPage from "../../containers/Auth/LoginPage";
import AccessDeniedPage from "../../containers/Auth/AccessDeniedPage";
import NotFoundPage from "../../containers/Shared/NotFoundPage";

const AuthArea: React.SFC = () =>
    <Switch>
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/accessDenied" component={AccessDeniedPage} />
        <Route component={NotFoundPage} />
    </Switch>;

export default AuthArea;