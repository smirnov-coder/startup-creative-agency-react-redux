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

export class Button extends React.Component<React.PropsWithChildren<IButtonProps>> {
    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {
        let { className, children, modifiers, onClick } = this.props;
        return (
            <button type="button" className={`button ${modifiers ? modifiers.join(" ") : null} ${className}`}
                onClick={onClick ? (e) => onClick(e) : null}>
                {children}
            </button>
        );
    }
}