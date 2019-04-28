import * as React from "react";
import "./Button.scss";

interface IButtonSizes {
    SMALL: string;
}

interface IButtonColors {
    WHITE: string;
}

interface IButtonBorders {
    THICK: string;
}

interface IButtonStyles {
    LINK: string;
}

interface IButtonModifiers {
    Size: IButtonSizes;
    Color: IButtonColors;
    Border: IButtonBorders;
    Style: IButtonStyles;
}

export const ButtonModifiers: IButtonModifiers = {
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

export interface IButtonProps {
    modifiers?: string[];
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

export class Button extends React.Component<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        let { className = "", modifiers, ...restProps } = this.props;
        return (
            <button className={`button ${modifiers ? modifiers.join(" ") : ""} ${className}`}
                type="button" {...restProps} />
        );
    }
}