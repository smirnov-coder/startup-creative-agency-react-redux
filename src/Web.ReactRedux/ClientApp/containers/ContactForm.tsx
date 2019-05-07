import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Button } from "../components/Button";
import { AppState } from "../store/reducers/rootReducer";
import { sendMessage } from "../store/actions/actionCreators";
import "./ContactForm.scss";
import "jquery-validation";
import { Loader } from "../components/Loader";
import { ContactFormModal } from "../components/ContactFormModal";

export interface IContactMessage {
    name: string;
    email: string;
    subject: string;
    company: string;
    text: string;
}

interface IContactFormProps {
    isLoading: boolean;
    responseMessage: string;
    isError: boolean;
    sendMessage: (message: IContactMessage) => void;
}

interface IContactFormState {
    message: IContactMessage;
    showModal: boolean;
}

class ContactForm extends React.Component<IContactFormProps, IContactFormState> {
    constructor(props: IContactFormProps) {
        super(props);
        this.state = {
            message: {
                name: "",
                email: "",
                company: "",
                subject: "",
                text: ""
            },
            showModal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    private contactForm = React.createRef<HTMLFormElement>();

    componentDidMount(): void {
        $(this.contactForm.current).validate({
            rules: {
                name: {
                    required: true,
                    maxlength: 50
                },
                email: {
                    required: true,
                    maxlength: 50,
                    email: true
                },
                subject: {
                    maxlength: 100
                },
                company: {
                    maxlength: 100
                },
                text: {
                    required: true,
                    maxlength: 5000
                }
            },
            errorElement: "span",
            errorClass: "field-validation-error",
            highlight: (element, errorClass, validClass) => {
                $(element).addClass("input-validation-error");
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.sendMessage(this.state.message);
            },
            invalidHandler: (event, validator) => {
                console.log("Form data is invalid.");
            }
        });
    }

    componentWillReceiveProps(nextProps: IContactFormProps): void {
        this.setState({
            showModal: nextProps.responseMessage ? true : false
        });
    }

    render(): JSX.Element {
        let { name, email, company, subject, text } = this.state.message;
        let { isLoading, responseMessage, isError } = this.props; //console.log(isLoading, "isLoading");//
        return (
            <section className="contact-form">
                <h3 className="sr-only">Send Us a Message</h3>
                <div className="row">
                    <form ref={this.contactForm}>
                        <div className="contact-form__line col-md-6">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" className="contact-form__text-input" placeholder="Your Name"
                                value={name} onChange={(e) => this.handleChange(e, "name")} />
                        </div>
                        <div className="contact-form__line col-md-6">
                            <label htmlFor="email" className="sr-only">E-mail</label>
                            <input id="email" name="email" className="contact-form__text-input" placeholder="Your E-mail"
                                value={email} onChange={(e) => this.handleChange(e, "email")} />
                        </div>
                        <div className="contact-form__line col-md-6">
                            <label htmlFor="subject" className="sr-only">Subject</label>
                            <input id="subject" name="subject" className="contact-form__text-input"
                                placeholder="Your Subject" value={subject}
                                onChange={(e) => this.handleChange(e, "subject")} />
                        </div>
                        <div className="contact-form__line col-md-6">
                            <label htmlFor="company" className="sr-only">Company Name</label>
                            <input id="company" name="company" className="contact-form__text-input"
                                placeholder="Your Company Name" value={company}
                                onChange={(e) => this.handleChange(e, "company")} />
                        </div>
                        <div className="contact-form__line col-xs-12">
                            <label htmlFor="text" className="sr-only">Message</label>
                            <textarea id="text" name="text" className="contact-form__text-area" rows={5}
                                placeholder="Write Your Message" value={text}
                                onChange={(e) => this.handleChange(e, "text")}></textarea>
                        </div>
                        <div className="contact-form__line col-xs-12">
                            <Button className="contact-form__button" type="submit">
                                Send Message
                            </Button>
                            <span className="contact-form__note">
                                We’ll contact you as soon as possible. We don’t reply on Monday.
                            </span>
                        </div>
                    </form>
                    {isLoading ? <Loader modifiers={["loader--behavior-fill", "loader--bg-translucent"]} /> : null}
                </div>
                <ContactFormModal showModal={this.state.showModal}
                    text={responseMessage}
                    isError={isError}
                    onClose={this.closeModal} />
            </section>
        );
    }

    closeModal(): void {
        this.setState({
            message: {
                name: "",
                email: "",
                company: "",
                subject: "",
                text: ""
            },
            showModal: false
        });
    }

    handleChange(event: React.ChangeEvent, inputName: string): void {
        let value: string = (event.target as HTMLInputElement).value;
        this.setState({
            message: {
                ...this.state.message,
                [inputName]: value
            }
        }); //console.log(this.state.message);//
    }
}

interface IStateProps {
    isLoading: boolean;
    responseMessage: string;
    isError: boolean;
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.messagesReducer.messages.isLoading,
        responseMessage: state.messagesReducer.operationDetails,
        isError: state.messagesReducer.isError
    };
}

interface IDispatchProps {
    sendMessage: (message: IContactMessage) => void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        sendMessage: bindActionCreators(sendMessage, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);