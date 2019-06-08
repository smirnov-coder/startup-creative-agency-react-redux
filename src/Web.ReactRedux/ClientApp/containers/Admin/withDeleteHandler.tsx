import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

interface WrappedComponentProps {
    onDelete: (entityId: number) => void;
}

export function withDeleteHandler(onDelete: (entityId: number) => void) {
    return <T extends WrappedComponentProps>(WrappedComponent: React.ComponentType<T>) => {
        class WithDeleteHandler extends React.Component<DispatchProps & T> {
            render(): JSX.Element {
                let { handleDelete, ...restProps } = this.props as any;
                return (
                    <WrappedComponent onDelete={handleDelete} {...restProps} />
                );
            }
        }

        interface DispatchProps {
            handleDelete: (entityId: number) => void;
        }

        const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
            return {
                handleDelete: bindActionCreators(onDelete, dispatch)
            };
        }

        // @ts-ignore: https://github.com/piotrwitek/react-redux-typescript-guide/issues/100
        return connect(null, mapDispatchToProps)(WithDeleteHandler);
    }
}