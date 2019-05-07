import * as React from "react";
import "./Button.scss";
import { IButtonProps } from "./Button";

interface ILinkButton extends IButtonProps {
    url: string;
}

export class LinkButton extends React.Component<ILinkButton> {
    constructor(props: ILinkButton) {
        super(props);
    }

    render(): JSX.Element {
        let { url, className = "", modifiers, ...restProps } = this.props;
        return (
            <a href={url} className={`button ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps}></a>
        );
    }
}