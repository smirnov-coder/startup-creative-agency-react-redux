import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

interface WrappedComponentProps {
    onSubmit: (formData: FormData) => void;
}

export function withSubmitHandler(onSubmit: (formData: FormData) => void) {
    return <T extends WrappedComponentProps>(WrappedComponent: React.ComponentType<T>) => {
        class WithSubmitHandler extends React.Component<DispatchProps & T> {
            render(): JSX.Element {
                let { handleSubmit, ...restProps } = this.props as any;
                return (
                    <WrappedComponent onSubmit={handleSubmit} {...restProps} />
                );
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

        // @ts-ignore: https://github.com/piotrwitek/react-redux-typescript-guide/issues/100
        return connect(null, mapDispatchToProps)(WithSubmitHandler);
    }
}