import * as React from "react";
import { IContactInfo } from "../store/entities";
import "./ContactLine.scss";

export class ContactLine extends React.Component<IContactInfo & { icon: string }> {
    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {
        let { icon, Caption, Values } = this.props;
        return (
            <article className="contact-info">
                <i className={`${icon} contact-info__icon`}></i>
                <h4 className="contact-info__caption">{Caption}</h4>
                <address className="contact-info__text">
                    {Values.map(value => value === Values[Values.length - 1]
                        ? <span key={value}>{value}</span>
                        : <span key={value}>{value}<br /></span>
                    )}
                </address>
            </article>
        );
    }
}