import * as React from "react";
import "./Service.scss";
import { IServiceInfo } from "../store/entities";

export class Service extends React.Component<IServiceInfo> {
    render(): JSX.Element {
        return (
            <article className="service">
                <div className="service__icon">
                    <i className={this.props.IconClass}></i>
                </div>
                <h4 className="service__caption">{this.props.Caption}</h4>
                <p className="service__description">{this.props.Description}</p>
            </article>
        );
    }
}