import * as React from "react";
import { hot } from "react-hot-loader";
import { compose } from "redux";
import { Switch, Route, Redirect } from "react-router";
import { Routes } from "@scripts/constants";
import { fetchInitialAppState } from "@store/actions";
import HomePage from "@containers/Home/HomePage";
import AuthArea from "@components/Auth/AuthArea";
import NotFoundPage from "@containers/Shared/NotFoundPage";
import AdminArea from "@components/Admin/AdminArea";
import { withInitializer } from "@containers/Admin/withInitializer";

const App: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.HOME} component={HomePage} />
            <Route path={Routes.AUTH_AREA} component={AuthArea} />
            <Route path={Routes.ADMIN_AREA} component={AdminArea} />
            <Route path={Routes.NOT_FOUND} component={NotFoundPage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

const composed = compose(
    hot(module),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchInitialAppState),
);

export default composed(App);