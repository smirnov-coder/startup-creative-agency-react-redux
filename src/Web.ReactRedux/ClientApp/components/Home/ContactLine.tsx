import * as React from "react";
import { ContactInfo } from "@store/entities";
import "./ContactLine.scss";

interface ContactInfoProps extends ContactInfo {
    icon: string
}

const ContactLine: React.SFC<ContactInfoProps> = ({ icon, Caption, Values }: ContactInfoProps) => {
    return (
        <article className="contact-info">
            <i className={`${icon} contact-info__icon`}></i>
            <h4 className="contact-info__caption">{Caption}</h4>
            <address className="contact-info__text">
                {Values.map((value, index) => value === Values[Values.length - 1]
                    ? <span key={index}>{value}</span>
                    : <span key={index}>{value}<br /></span>
                )}
            </address>
        </article>
    );
}

export default ContactLine;