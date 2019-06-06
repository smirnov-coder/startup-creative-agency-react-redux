import * as React from "react";
import { compose } from "redux";
import { Switch, Route, match, Redirect } from "react-router";
import { ServiceInfo } from "@store/entities";
import { Routes } from "@scripts/constants";
import { fetchServices, fetchService, addService, updateService } from "@store/actions";
import Loader from "@components/Shared/Loader";
import ServiceList from "@containers/Admin/ServiceList";
import { ServiceItemForm } from "@containers/Admin/ServiceItemForm";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withLoader } from "@containers/Admin/withLoader";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const ServicesSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.SERVICES} component={ServicesPage} />
            <Route path={Routes.ADD_SERVICE} component={AddServicePage} />
            <Route path={Routes.EDIT_SERVICE} component={EditServicePage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

// Services page
const ServicesPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchServices),
    withLoader(Loader, state => state.services.isLoading),
    withPageContentWrapper("Service List"),
    withDataFeed(state => state.services.items, "items")
)(ServiceList);

// AddService page
const AddServicePage = compose(
    withPageContentWrapper("Add Service"),
    withSubmitHandler(addService),
    withDataFeed(state => { return { Id: 0, IconClass: "", Caption: "", Description: "" } as ServiceInfo }, "item")
)(ServiceItemForm);

// EditService page
const EditServicePage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchService
    ),
    withLoader(Loader, state => state.services.isLoading || !state.services.current),
    withPageContentWrapper((routeMatch: match) => `Edit Service, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateService),
    withDataFeed(state => state.services.current, "item")
)(ServiceItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Services")(ServicesSubarea);