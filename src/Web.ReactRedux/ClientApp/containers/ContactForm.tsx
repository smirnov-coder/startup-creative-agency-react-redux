import * as React from "react";
import { Button } from "../components/Button";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { sendMessage } from "../store/actions/actionCreators";
import "./ContactForm.scss";
import { AppState } from "../store/reducers/rootReducer";

export interface IContactMessage {
    name: string;
    email: string;
    subject: string;
    company: string;
    text: string;
}

interface IContactFormProps {
    isLoading: boolean;
    responseMessage?: string;
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
        this.handleSend = this.handleSend.bind(this);
    }

    render(): JSX.Element {
        let { name, email, company, subject, text } = this.state.message;
        let { isLoading } = this.props; //console.log(isLoading, "isLoading");//
        return (
            <section className="contact-form">
                <h3 className="sr-only">Send Us a Message</h3>
                <div className="row">
                    <form id="contactForm">
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
                            <Button className="contact-form__button" onClick={this.handleSend}>
                                Send Message
                            </Button>
                            <span className="contact-form__note">
                                We’ll contact you as soon as possible. We don’t reply on Monday.
                            </span>
                        </div>
                    </form>
                </div>
                {isLoading ?
                    <div className="contact-form__overlay contact-form__overlay--visible">
                        <i className="contact-form__loader fa fa-spinner fa-pulse fa-3x"></i>
                    </div>
                    : null
                }
                {/*this.props.responseMessage ? console.log(this.props.responseMessage, "response") : null*/}
            </section>
        );
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

    handleSend(event: React.MouseEvent): void {
        //console.log("send");//
        event.preventDefault();
        this.props.sendMessage(this.state.message);
    }

}

interface IStateProps {
    isLoading: boolean;
    responseMessage: string;
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.messagesReducer.messages.isLoading,
        responseMessage: state.messagesReducer.operationDetails
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