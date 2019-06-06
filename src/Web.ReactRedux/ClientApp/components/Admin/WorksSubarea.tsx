import * as React from "react";
import { compose } from "redux";
import { Switch, Route, Redirect, match } from "react-router";
import { WorkExample } from "@store/entities";
import { Routes } from "@scripts/constants";
import { fetchWorks, addWorkExample, updateWorkExample, fetchWorkExample } from "@store/actions";
import Loader from "@components/Shared/Loader";
import { WorkExampleList } from "@containers/Admin/WorkExampleList";
import { WorkExampleItemForm } from "@containers/Admin/WorkExampleItemForm";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import { withDocumentTitle } from "./withDocumentTitle";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const WorksSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.WORKS} component={WorksPage} />
            <Route path={Routes.ADD_WORK_EXAMPLE} component={AddWorkExamplePage} />
            <Route path={Routes.EDIT_WORK_EXAMPLE} component={EditWorkExamplePage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

// Works page
const WorksPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchWorks),
    withLoader(Loader, state => state.works.isLoading),
    withPageContentWrapper("Work Example List"),
    withDataFeed(state => state.works.items, "items")
)(WorkExampleList);

// AddWorkExample page
const AddWorkExamplePage = compose(
    withPageContentWrapper("Add Work Example"),
    withSubmitHandler(addWorkExample),
    withDataFeed(state => { return { Id: 0, Name: "", Category: "", ImagePath: "", Description: "" } as WorkExample }, "item")
)(WorkExampleItemForm);

// EditWorkExample page
const EditWorkExamplePage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchWorkExample
    ),
    withLoader(Loader, state => state.works.isLoading || !state.works.current),
    withPageContentWrapper((routeMatch: match) => `Edit Work Example, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateWorkExample),
    withDataFeed(state => state.works.current, "item")
)(WorkExampleItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Works")(WorksSubarea);