import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { match, RouteComponentProps } from "react-router";

type ActionCreator = (...args: any[]) => void;
type Initializer = (routeMatch: match, actionCreator: ActionCreator) => ActionCreator;

export function withInitializer(init: Initializer, actionCreator: ActionCreator) {
    return <T extends RouteComponentProps>(WrappedComponent: React.ComponentType<T>) => {
        class WithInitializer extends React.Component<DispatchProps & T> {
            componentDidMount(): void {
                let { bindedActionCreator, match } = this.props;
                init(match, bindedActionCreator)();
            }

            render(): JSX.Element {
                let { bindedActionCreator, ...restProps } = this.props as any;
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

        // @ts-ignore: https://github.com/piotrwitek/react-redux-typescript-guide/issues/100
        return connect(null, mapDispatchToProps)(WithInitializer);
    }
}
