import * as React from "react";
import PageContent from "./PageContent";
import { RouteComponentProps, match } from "react-router";

export function withPageContentWrapper<T extends object>(caption: string | ((routeMatch: match) => string)) {
    return (WrappedComponent: React.ComponentType<T>) => {
        return class WithPageContentWrapper extends React.Component<T & RouteComponentProps> {
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