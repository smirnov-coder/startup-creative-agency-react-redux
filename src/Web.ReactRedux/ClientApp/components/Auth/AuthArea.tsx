import * as React from "react";
import { Switch, Route } from "react-router";
import LoginPage from "../../containers/Auth/LoginPage";
import AccessDeniedPage from "../../containers/Auth/AccessDeniedPage";
import NotFoundPage from "../../containers/Shared/NotFoundPage";

export class AuthArea extends React.Component {
    render(): JSX.Element {
        return (
            <Switch>
                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/accessDenied" component={AccessDeniedPage} />
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}