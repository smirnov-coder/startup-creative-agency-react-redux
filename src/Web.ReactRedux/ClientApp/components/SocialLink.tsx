import * as React from "react";
import "./SocialLink.scss";

export interface ISocialLinkProps {
    url: string;
    icon: string;
    shape?: string;
}

export interface ISocialLinkShapes {
    CIRCLE: string;
    SQUARE: string;
}

export const SocialLinkShapes: ISocialLinkShapes = {
    CIRCLE: "social-link--shape-circle",
    SQUARE: "social-link--shape-square"
}

export class SocialLink extends React.Component<ISocialLinkProps> {
    render(): JSX.Element {
        const { url, icon, shape } = this.props;
        return (
            <a href={url} target="_blank" className={`social-link ${shape}`}>
                <i className={icon}></i>
            </a>
        );
    }
}