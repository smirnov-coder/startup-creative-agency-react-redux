import * as React from "react";
import { IButtonProps } from "./Button";
import "./Button.scss";

interface ILinkButton extends IButtonProps {
    url: string;
}

export class LinkButton extends React.Component<React.PropsWithChildren<ILinkButton>> {
    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {
        let { url, className, modifiers, children } = this.props;
        return (
            <a href={url} className={`button ${modifiers.join(" ")} ${className}`}>
                {children}
            </a>
        );
    }
}