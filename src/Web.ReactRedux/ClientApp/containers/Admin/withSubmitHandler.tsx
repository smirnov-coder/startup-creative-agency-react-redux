import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

interface WrappedComponentProps {
    onSubmit: (formData: FormData) => void;
}

type SubmitHandler = (formData: FormData) => void

export function withSubmitHandler<T extends WrappedComponentProps>(onSubmit: SubmitHandler) {
    return (WrappedComponent: React.ComponentType<T>) => {
        class WithSubmitHandler extends React.Component<DispatchProps & T> {
            render(): JSX.Element {
                //let { onSubmit } = this.props;
                return (
                    <WrappedComponent {...this.props} />
                );
            }
        }

        interface DispatchProps {
            onSubmit: (formData: FormData) => void;
        }

        const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
            return {
                onSubmit: bindActionCreators(onSubmit, dispatch)
            };
        }

        return connect(null, mapDispatchToProps)(WithSubmitHandler);
    }
}