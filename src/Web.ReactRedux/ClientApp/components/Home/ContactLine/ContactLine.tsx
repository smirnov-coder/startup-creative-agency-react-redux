import * as React from "react";
import { ContactInfo } from "@store/entities";
import "./ContactLine.scss";

interface ContactLineProps {
    item: ContactInfo;
    icon: string
}

const ContactLine: React.SFC<ContactLineProps> = ({ icon, item }: ContactLineProps) => {
    return (
        <article className="contact-info">
            <i className={`${icon} contact-info__icon`}></i>
            <h4 className="contact-info__caption">{item.Caption}</h4>
            <address className="contact-info__text">
                {item.Values.map((value, index) => value === item.Values[item.Values.length - 1]
                    ? <span key={index}>{value}</span>
                    : <span key={index}>{value}<br /></span>
                )}
            </address>
        </article>
    );
}

export default ContactLine;