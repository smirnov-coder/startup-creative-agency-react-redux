import * as React from "react";
import PageContent from "@components/Admin/PageContent";
import { RouteComponentProps, match } from "react-router";

export function withPageContentWrapper(caption: string | ((routeMatch: match) => string)) {
    return <T extends RouteComponentProps>(WrappedComponent: React.ComponentType<T>) => {
        return class WithPageContentWrapper extends React.Component<T> {
            render(): JSX.Element {
                return (
                    <PageContent caption={typeof caption === "string" ? caption : caption(this.props.match)}>
                        <WrappedComponent {...this.props} />
                    </PageContent>
                );
            }
        }
    }
}