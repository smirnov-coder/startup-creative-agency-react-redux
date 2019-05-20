import * as React from "react";
import { Switch, Route } from "react-router";
import ServicesPage from "./ServicesPage";
import ServicePage from "./ServicePage";

export class ServicesSubarea extends React.Component {
    componentDidMount(): void {
        document.title = "Startup ReactRedux Admin Services";
    }

    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/admin/services" component={ServicesPage} />
                <Route path={["/admin/services/add", "/admin/services/edit/:id"]} component={ServicePage} />
            </Switch>
        );
    }
}