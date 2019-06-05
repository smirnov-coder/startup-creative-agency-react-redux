import * as React from "react";
import { Switch, Route, Redirect, match } from "react-router";
import { Routes } from "@scripts/constants";
import { compose } from "redux";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import Loader from "@components/Shared/Loader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import MessageTable from "@containers/Admin/MessageTable";
import { withAuthentication } from "@containers/Admin/withAuthentication";
import { fetchMessages, fetchMessage } from "@store/actions/messagesActions";
import { withDocumentTitle } from "./withDocumentTitle";
import MessageItem from "@containers/Admin/MessageItem";
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

// Messages page
const MessagesPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchMessages),
    withLoader(Loader, state => state.messages.isLoading),
    withPageContentWrapper("Messages"),
    withDataFeed(state => state.messages.items, "items")
)(MessageTable);

// Message page
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