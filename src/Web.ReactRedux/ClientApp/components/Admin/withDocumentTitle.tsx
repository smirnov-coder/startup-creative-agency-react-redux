import * as React from "react";

export function withDocumentTitle<T extends object>(title: string) {
    return (WrappedComponent: React.ComponentType<T>) => {
        return class WithDocumentTitle extends React.Component<T> {
            componentDidMount(): void {
                document.title = title;
            }

            render(): JSX.Element {
                return <WrappedComponent {...this.props} />
            }
        }
    }
}