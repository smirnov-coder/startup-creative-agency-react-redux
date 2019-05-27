import * as React from "react";
import { Switch, Route, match, Redirect } from "react-router";
import { Routes } from "@scripts/constants";
import { compose } from "redux";
import { fetchServices, fetchService, addService, updateService, setCurrentService } from "@store/actions/servicesActions";
import Loader from "@components/Shared/Loader";
import ServiceList from "@containers/Admin/ServiceList";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { ServiceInfo } from "@store/entities";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageInitializer } from "@containers/Admin/withPageInitializer";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import ServiceItemForm from "@containers/Admin/ServiceItemForm";

const ServicesSubarea: React.SFC = () =>
    <Switch>
        <Route exact path={Routes.SERVICES} component={ServicesPage} />
        <Route path={Routes.ADD_SERVICE} component={AddServicePage} />
        <Route path={Routes.EDIT_SERVICE} component={EditServicePage} />
        <Redirect to={Routes.NOT_FOUND} />
    </Switch>;

// Services page
const ServicesPage = compose(
    withPageInitializer((routeMatch, actionCreator) => actionCreator, fetchServices),
    withLoader(Loader, state => state.services.isLoading),
    withPageContentWrapper("Service List")
)(ServiceList);

// AddService page
const AddServicePage = compose(
    withPageInitializer(
        (routeMatch, actionCreator) => {
            return () => actionCreator({ Id: 0, IconClass: "", Caption: "", Description: "" } as ServiceInfo);
        },
        setCurrentService
    ),
    withLoader(Loader, state => !state.services.current),
    withPageContentWrapper("Add Service"),
    withSubmitHandler(addService)
)(ServiceItemForm);

// EditService page
const EditServicePage = compose(
    withPageInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchService
    ),
    withLoader(Loader, state => state.services.isLoading || !state.services.current),
    withPageContentWrapper((routeMatch: match) => `Edit Service, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateService)
)(ServiceItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Services")(ServicesSubarea);