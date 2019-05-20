import * as React from "react";
import "./SocialLink.scss";

interface SocialLinkModifiers {
    Shape: {
        ROUND: string,
        SQUARE: string
    }
}

export const SocialLinkModifiers: SocialLinkModifiers = {
    Shape: {
        ROUND: "social-link--shape-round",
        SQUARE: "social-link--shape-square"
    }
}

interface SocialLinkProps {
    url: string;
    icon: string;
    modifiers?: string[];
}

export class SocialLink extends React.Component<SocialLinkProps> {
    constructor(props: SocialLinkProps) {
        super(props);
    }

    render(): JSX.Element {
        const { url, icon, modifiers } = this.props;
        return (
            <a href={url} target="_blank" className={`social-link ${modifiers ? modifiers.join(" ") : ""}`}>
                <i className={icon}></i>
            </a>
        );
    }
}