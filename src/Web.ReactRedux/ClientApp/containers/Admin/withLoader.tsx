import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "@store/state";

export function withLoader(LoaderComponent: React.ComponentType, isLoading: (state: AppState) => boolean) {
    return <T extends object>(WrappedComponent: React.ComponentType<T>) => {
        class WithLoader extends React.Component<StateProps & T> {
            render(): JSX.Element {
                let { isLoading, ...restProps } = this.props as any;
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
        
        // @ts-ignore: https://github.com/piotrwitek/react-redux-typescript-guide/issues/100
        return connect(mapStateToProps, null)(WithLoader);
    }
}