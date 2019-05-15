import * as React from "react";
import "./Dash.scss";

interface DashModifiers {
    Colors: {
        GREY: string,
        WHITE: string
    }
}

export const DashModifiers: DashModifiers = {
    Colors: {
        GREY: "dash--color-grey",
        WHITE: "dash--color-white"
    }
}

interface DashProps {
    modifiers?: string[];
    className?: string;
}

export class Dash extends React.Component<DashProps> {
    constructor(props: DashProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className = "", modifiers, ...restProps } = this.props;
        return (
            <hr className={`dash ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps} />
        );
    }
}