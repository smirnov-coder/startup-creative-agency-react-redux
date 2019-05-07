import * as React from "react";
import { IContactInfo } from "../store/entities";
import { AppState } from "../store/reducers/rootReducer";
import { connect } from "react-redux";
import { ContactLine } from "../components/ContactLine";
import "./Contacts.scss";

interface IContactsProps {
    isLoading: boolean;
    items: IContactInfo[];
}

class Contacts extends React.Component<IContactsProps> {
    constructor(props: IContactsProps) {
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
                {/* /// TODO: Add loader. */isLoading ? <div>Loading... Please wait</div> : items.map(contactInfo => (
                    <div key={contactInfo.Name} className="contacts__line">
                        <ContactLine {...contactInfo} icon={icons[contactInfo.Name]} />
                    </div>
                ))}
            </section>
        );
    }
}

interface IStateProps {
    isLoading: boolean;
    items: IContactInfo[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.contactsReducer.contacts.isLoading,
        items: state.contactsReducer.contacts.items
    };
}

export default connect(mapStateToProps, null)(Contacts);