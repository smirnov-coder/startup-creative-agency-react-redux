import * as React from "react";

export function withDocumentTitle(title: string) {
    return <T extends object>(WrappedComponent: React.ComponentType<T>) => {
        return class WithDocumentTitle extends React.Component<T> {
            componentDidMount(): void {
                document.title = title;
            }

            render(): JSX.Element {
                return (
                    <WrappedComponent {...this.props} />
                );
            }
        }
    }
}