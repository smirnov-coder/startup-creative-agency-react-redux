import * as React from "react";
import { compose } from "redux";
import { Switch, Route, Redirect, match } from "react-router";
import { Routes } from "@scripts/constants";
import { fetchMessages, fetchMessage } from "@store/actions";
import Loader from "@components/Shared/Loader";
import MessageTable from "@containers/Admin/MessageTable";
import MessageItem from "@containers/Admin/MessageItem";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withAuthentication } from "@containers/Admin/withAuthentication";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const MessagesSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.MESSAGES} component={MessagesPage} />
            <Route path={Routes.MESSAGE} component={MessagePage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

const MessagesPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchMessages),
    withLoader(Loader, state => state.messages.isLoading),
    withPageContentWrapper("Messages"),
    withDataFeed(state => state.messages.items, "items")
)(MessageTable);

const MessagePage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchMessage
    ),
    withLoader(Loader, state => state.messages.isLoading || !state.messages.current),
    withPageContentWrapper((routeMatch: match) => `Message, ID: ${(routeMatch.params as any).id}`),
    withDataFeed(state => state.messages.current, "item")
)(MessageItem);

const composed = compose(
    withAuthentication(true),
    withDocumentTitle("Startup ReactRedux Admin Messages")
);

export default composed(MessagesSubarea);