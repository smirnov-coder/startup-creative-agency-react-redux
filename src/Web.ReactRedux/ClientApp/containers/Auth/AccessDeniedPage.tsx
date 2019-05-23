import * as React from "react";
import ErrorPage from "@components/Shared/ErrorPage";

export class AccessDeniedPage extends React.Component {

    componentDidMount(): void {
        document.title = "Startup ReactRedux Auth Access Denied";
    }

    render(): JSX.Element {
        return (
            <ErrorPage title="Error 403" subtitle="Access denied." description="You are not authorized for this operation." />
        );
    }
}