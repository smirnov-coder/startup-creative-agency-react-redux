import * as React from "react";
import { ContactInfo } from "@store/entities";
import { connect } from "react-redux";
import { ContactLine } from "@components/Home/ContactLine";
import "./Contacts.scss";
import { AppState } from "@store/state";
import Loader from "@components/Shared/Loader";

type ContactsProps = StateProps;

class Contacts extends React.Component<ContactsProps> {
    constructor(props: ContactsProps) {
        super(props);
    }

    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let icons: any = {
            Address: "fa fa-map-marker fa-2x",
            Phone: "fa fa-mobile-phone fa-2x",
            Email: "contacts__icon-mail fa fa-envelope"
        };
        return (
            <section className="contacts">
                <h3 className="sr-only">Contacts</h3>
                {isLoading ? <Loader /> : items.map(contactInfo => (
                    <div key={contactInfo.Name} className="contacts__line">
                        <ContactLine {...contactInfo} icon={icons[contactInfo.Name]} />
                    </div>
                ))}
            </section>
        );
    }
}

interface StateProps {
    isLoading: boolean;
    items: ContactInfo[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.contacts.isLoading,
        items: state.contacts.items
    };
}

export default connect(mapStateToProps, null)(Contacts);