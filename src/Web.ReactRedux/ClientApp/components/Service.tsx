import * as React from "react";
import "./Service.scss";

export interface IServiceProps {
    iconClass: string;
    caption: string;
    description: string;
}

export class Service extends React.Component<IServiceProps> {
    render(): JSX.Element {
        return (
            <article className="service">
                <div className="service__icon">
                    <i className={this.props.iconClass}></i>
                </div>
                <h4 className="service__caption">{this.props.caption}</h4>
                <p className="service__description">{this.props.description}</p>
            </article>
        );
    }
}