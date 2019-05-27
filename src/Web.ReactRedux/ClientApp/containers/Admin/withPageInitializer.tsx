import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { match, RouteComponentProps } from "react-router";

export type ActionCreator = (...args: any[]) => void;
export type PageInitializer = (routeMatch: match, actionCreator: ActionCreator) => ActionCreator;

export function withPageInitializer<T extends object>(pageInit: PageInitializer, actionCreator: ActionCreator) {
    return (WrappedComponent: React.ComponentType<T>) => {
        class WithPageInitializer extends React.Component<DispatchProps & T & RouteComponentProps> {
            componentDidMount(): void {
                let { bindedActionCreator, match } = this.props;
                pageInit(match, bindedActionCreator)();
            }

            render(): JSX.Element {
                let { bindedActionCreator, ...restProps } = this.props;
                return (
                    <WrappedComponent {...restProps} />
                );
            }
        }

        interface DispatchProps {
            bindedActionCreator: ActionCreator;
        }

        const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
            return {
                bindedActionCreator: bindActionCreators(actionCreator, dispatch)
            }
        }

        return connect(null, mapDispatchToProps)(WithPageInitializer);
    }
}
