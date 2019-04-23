import * as React from "react";
import { IButtonProps } from "./Button";

export class ModalCloseButton extends React.Component<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className, children, modifiers } = this.props;
        return (
            <button type="button" className={`button ${modifiers.join(" ")} ${className}`} data-dismiss="modal">
                {children}
            </button>
        );
    }
}