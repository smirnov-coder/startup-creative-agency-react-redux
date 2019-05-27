import * as React from "react";
import { AppState } from "@store/state";
import { connect } from "react-redux";

export function withLoader<T extends object>(LoaderComponent: React.ComponentType, isLoading: (state: AppState) => boolean) {
    return (WrappedComponent: React.ComponentType<T>) => {
        class WithLoader extends React.Component<StateProps & T> {
            render(): JSX.Element {
                let { isLoading, ...restProps } = this.props;
                return (this.props.isLoading
                    ? <LoaderComponent />
                    : <WrappedComponent {...restProps} />
                );
            }
        }

        interface StateProps {
            isLoading: boolean;
        }

        const mapStateToProps = (state: AppState): StateProps => {
            return {
                isLoading: isLoading(state)
            };
        }

        return connect(mapStateToProps, null)(WithLoader);
    }
}