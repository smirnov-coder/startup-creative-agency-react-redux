import * as React from "react";
import "./SocialLink.scss";

interface ISocialLinkShapes {
    ROUND: string;
    SQUARE: string;
}

interface ISocialLinkModifiers {
    Shape: ISocialLinkShapes
}

export const SocialLinkModifiers: ISocialLinkModifiers = {
    Shape: {
        ROUND: "social-link--shape-round",
        SQUARE: "social-link--shape-square"
    }
}

interface ISocialLinkProps {
    url: string;
    icon: string;
    modifiers?: string[];
}

export class SocialLink extends React.Component<ISocialLinkProps> {
    render(): JSX.Element {
        const { url, icon, modifiers } = this.props;
        return (
            <a href={url} target="_blank" className={`social-link ${modifiers ? modifiers.join(" ") : ""}`}>
                <i className={icon}></i>
            </a>
        );
    }
}