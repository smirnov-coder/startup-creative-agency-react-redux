import * as React from "react";
import { compose } from "redux";
import { ContactInfo } from "@store/entities";
import ContactLine from "@components/Home/ContactLine";
import Loader from "@components/Shared/Loader";
import { withLoader } from "@containers/Admin/withLoader";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import "./Contacts.scss";

interface ContactsProps {
    items: ContactInfo[];
}

const Contacts: React.SFC<ContactsProps> = ({ items }: ContactsProps) => {
    let icons: any = {
        Address: "fa fa-map-marker fa-2x",
        Phone: "fa fa-mobile-phone fa-2x",
        Email: "contacts__icon-mail fa fa-envelope"
    };
    return (
        <section className="contacts">
            <h3 className="sr-only">Contacts</h3>
            {items.map((contactInfo, index) => (
                <div key={index} className="contacts__line">
                    <ContactLine icon={icons[contactInfo.Name]} {...contactInfo} />
                </div>
            ))}
        </section>
    );
}

const composed = compose(
    withLoader(Loader, state => state.contacts.isLoading),
    withDataFeed(state => state.contacts.contactInfos, "items")
);

export default composed(Contacts);