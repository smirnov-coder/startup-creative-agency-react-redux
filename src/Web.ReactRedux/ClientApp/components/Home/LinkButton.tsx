import * as React from "react";
import "./Button.scss";
import { ButtonProps } from "./Button";

interface LinkButtonProps extends ButtonProps {
    url: string;
}

export class LinkButton extends React.Component<LinkButtonProps> {
    constructor(props: LinkButtonProps) {
        super(props);
    }

    render(): JSX.Element {
        let { url, className = "", modifiers, ...restProps } = this.props;
        return (
            <a href={url} className={`button ${modifiers ? modifiers.join(" ") : ""} ${className}`} {...restProps}></a>
        );
    }
}