import * as React from "react";
import { AppState } from "@store/state";
import { connect } from "react-redux";

export function withDataFeed<TData extends object>(feeder: (state: AppState) => TData, dataName: string) {
    return <TProps extends object>(WrappedComponent: React.ComponentType<TProps>) => {
        class WithDataFeed extends React.Component<TProps & StateProps> {
            render(): JSX.Element {
                return (
                    <WrappedComponent {...this.props} />
                );
            }
        }

        interface StateProps {
            [dataName: string]: TData;
        }

        const mapStateToProps = (state: AppState): StateProps => {
            return {
                 [dataName]: feeder(state)
            };
        }

        // @ts-ignore: https://github.com/piotrwitek/react-redux-typescript-guide/issues/100
        return connect(mapStateToProps, null)(WithDataFeed);
    }
}