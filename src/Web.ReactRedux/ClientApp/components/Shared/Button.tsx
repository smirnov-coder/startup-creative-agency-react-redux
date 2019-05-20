import * as React from "react";
import "./Button.scss";

interface ButtonModifiers {
    Size: {
        SMALL: string
    };
    Color: {
        WHITE: string
    };
    Border: {
        THICK: string
    };
    Style: {
        LINK: string
    };
}

export const ButtonModifiers: ButtonModifiers = {
    Size: {
        SMALL: "button--size-sm"
    },
    Color: {
        WHITE: "button--color-white"
    },
    Border: {
        THICK: "button--border-thick"
    },
    Style: {
        LINK: "button--style-link"
    }
}

export interface ButtonProps {
    modifiers?: string[];
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    type?: "button" | "reset" | "submit"
}

export class Button extends React.Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className = "", modifiers, type, ...restProps } = this.props;
        return (
            <button className={`button ${modifiers ? modifiers.join(" ") : ""} ${className}`}
                type={type ? type : "button"} {...restProps} />
        );
    }
}