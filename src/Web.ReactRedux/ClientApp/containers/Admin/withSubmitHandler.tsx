import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

interface WrappedComponentProps {
    onSubmit: (formData: FormData) => void;
}

type SubmitHandler = (formData: FormData) => void

export function withSubmitHandler<T extends WrappedComponentProps>(onSubmit: SubmitHandler) {
    return (WrappedComponent: React.ComponentType<T>) => {
        class WithSubmitHandler extends React.Component<DispatchProps> {
            render(): JSX.Element {
                return <WrappedComponent {...this.props} onSubmit={this.props.handleSubmit} />;
            }
        }

        interface DispatchProps {
            handleSubmit: (formData: FormData) => void;
        }

        const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
            return {
                handleSubmit: bindActionCreators(onSubmit, dispatch)
            };
        }

        return connect(null, mapDispatchToProps)(WithSubmitHandler);
    }
}