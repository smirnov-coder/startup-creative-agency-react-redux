import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { match, RouteComponentProps } from "react-router";

type ActionCreator = (...args: any[]) => void;
type Initializer = (routeMatch: match, actionCreator: ActionCreator) => ActionCreator;

export function withInitializer<T extends RouteComponentProps>(init: Initializer, actionCreator: ActionCreator) {
    return (WrappedComponent: React.ComponentType<T>) => {
        class WithPageInitializer extends React.Component<DispatchProps & T> {
            componentDidMount(): void {
                let { bindedActionCreator, match } = this.props;
                init(match, bindedActionCreator)();
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
