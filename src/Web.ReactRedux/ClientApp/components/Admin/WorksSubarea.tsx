import * as React from "react";
import { Routes } from "@scripts/constants";
import { Switch, Route, Redirect, match } from "react-router";
import { compose } from "redux";
import { withPageInitializer } from "@containers/Admin/withPageInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import Loader from "@components/Shared/Loader";
import { fetchWorks, setCurrentWorkExample, addWorkExample, updateWorkExample, fetchWorkExample } from "@store/actions/worksActions";
import WorkExampleList from "@containers/Admin/WorkExampleList";
import { withDocumentTitle } from "./withDocumentTitle";
import { WorkExample } from "@store/entities";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import WorkExampleItemForm from "@containers/Admin/WorkExampleItemForm";

const WorksSubarea: React.SFC = () =>
    <Switch>
        <Route exact path={Routes.WORKS} component={WorksPage} />
        <Route path={Routes.ADD_WORK_EXAMPLE} component={AddWorkExamplePage} />
        <Route path={Routes.EDIT_WORK_EXAMPLE} component={EditWorkExamplePage} />
        <Redirect to={Routes.NOT_FOUND} />
    </Switch>;

// Works page
const WorksPage = compose(
    withPageInitializer((routeMatch, actionCreator) => actionCreator, fetchWorks),
    withLoader(Loader, state => state.works.isLoading),
    withPageContentWrapper("Work Example List")
)(WorkExampleList);

// AddWorkExample page
const AddWorkExamplePage = compose(
    withPageInitializer(
        (routeMatch, actionCreator) => {
            return () => actionCreator({ Id: 0, Name: "", Category: "", ImagePath: "", Description: "" } as WorkExample);
        },
        setCurrentWorkExample
    ),
    withLoader(Loader, state => !state.works.current),
    withPageContentWrapper("Add Work Example"),
    withSubmitHandler(addWorkExample)
)(WorkExampleItemForm);

// EditWorkExample page
const EditWorkExamplePage = compose(
    withPageInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchWorkExample
    ),
    withLoader(Loader, state => state.works.isLoading || !state.works.current),
    withPageContentWrapper((routeMatch: match) => `Edit Work Example, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateWorkExample)
)(WorkExampleItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Works")(WorksSubarea);