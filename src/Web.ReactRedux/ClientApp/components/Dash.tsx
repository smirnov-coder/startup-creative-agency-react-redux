import * as React from "react";
import "./Dash.scss";

interface IDashColors {
    GREY: string;
    WHITE: string;
}

interface IDashModifiers {
    Colors: IDashColors;
}

export const DashModifiers: IDashModifiers = {
    Colors: {
        GREY: "dash--color-grey",
        WHITE: "dash--color-white"
    }
}

interface IDashProps {
    modifiers?: string[];
    className?: string;
}

export class Dash extends React.Component<IDashProps> {
    constructor(props: IDashProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className = "", modifiers, ...restProps } = this.props;
        return (
            <hr className={`dash ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps} />
        );
    }
}