import * as React from "react";
import { SocialLink, ContactInfo } from "@store/entities";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { ContactItem } from "@components/Admin/ContactItem";
import SocialLinks from "@components/Admin/SocialLinks";
import { Button, ButtonModifiers } from "@components/Shared/Button";
import "@bootstrap/css";
import "./ContactList.scss";

interface ComponentProps {
    onSubmit: (formData: FormData) => void;
}

type ContactListProps = StateProps & ComponentProps;

interface ContactListState {
    contacts: ContactInfo[];
}

class ContactList extends React.Component<ContactListProps, ContactListState> {
    constructor(props: ContactListProps) {
        super(props);
        this.state = {
            contacts: this.props.contacts
        };
        this.refreshValidator = this.refreshValidator.bind(this);
    }

    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        this.validator = this.attachValidator();
    }

    componentWillUnmount(): void {
        this.detachValidator();
    }

    attachValidator(): JQueryValidation.Validator {
        let $form = $(this.form.current);

        let contactInfosRules = {};
        $form.find(".contact-item").each((contactItemIndex, contactItem) => {
            let prefix = `ContactInfos[${contactItemIndex}]`
            $(contactItem).find("input[name$='Caption']").each(() => {
                Object.assign(contactInfosRules, {
                    [`${prefix}.Caption`]: {
                        required: true
                    }
                });
            });
            $(contactItem).find("input[name$='Value']").each(contactValueIndex => {
                Object.assign(contactInfosRules, {
                    [`${prefix}.Values[${contactValueIndex}].Value`]: {
                        required: true
                    }
                });
            });
        });

        let socialLinksRules = {};
        $form.find("input[name$='NetworkName']").each(index => {
            let key: string = `SocialLinks[${index}].NetworkName`;
            Object.assign(socialLinksRules, {
                [key]: {
                    required: true,
                    maxlength: 50
                }
            });
        });
        $form.find("input[name$='Url']").each(index => {
            let key: string = `SocialLinks[${index}].Url`;
            Object.assign(socialLinksRules, {
                [key]: {
                    required: true,
                    maxlength: 100,
                    url: true
                }
            });
        });
        return $form.validate({
            /// TODO: validation don't forget to
            rules: {
                ...contactInfosRules,
                ...socialLinksRules
            },
            errorElement: "span",
            errorClass: "field-validation-error",
            highlight: (element, errorClass, validClass) => {
                $(element).addClass("input-validation-error");
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                //alert("submitted");//
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
            },
            invalidHandler: (event, validator) => {
                console.error("Form data is invalid.");//
            }
        });
    }

    detachValidator(): void {
        this.validator.destroy();
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { socialLinks } = this.props;
        let { contacts } = this.state;
        return (
            <div className="contact-list">
                <form ref={this.form} className="form-horizontal">
                    <div className="contact-list__items">
                        {contacts.map((contactInfo, index) => (
                            <div key={index} className="contact-list__item">
                                <ContactItem item={contactInfo} index={index} onValuesCountChange={this.refreshValidator} />
                            </div>
                        ))}
                        <div className="contact-list__item">
                            <SocialLinks items={socialLinks} />
                        </div>
                    </div>
                    <Button type="submit"
                        className="contact-list__save"
                        modifiers={[ButtonModifiers.Size.SMALL]}
                        children="Save" />
                </form>
            </div>
        );
    }

    refreshValidator(): void {
        this.detachValidator();
        this.attachValidator();
    }
}

interface StateProps {
    contacts: ContactInfo[];
    socialLinks: SocialLink[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        contacts: state.contacts.contactInfos,
        socialLinks: state.contacts.socialLinks
    };
}

export default connect(mapStateToProps, null)(ContactList);