import * as React from "react";
import * as $ from "jquery";
import { RouteComponentProps } from "react-router";
import { Testimonial } from "@store/entities";
import { Routes, VALIDATION_OPTIONS } from "@scripts/constants";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import "./TestimonialItemForm.scss";

interface ComponentProps {
    item: Testimonial;
    onSubmit: (formData: FormData) => void;
}

type TestimonialItemFormProps = ComponentProps & RouteComponentProps;

interface TestimonialItemFormState {
    Id: number;
    Author: string;
    Company: string;
    Text: string;
}

export class TestimonialItemForm extends React.Component<TestimonialItemFormProps, TestimonialItemFormState> {
    constructor(props: TestimonialItemFormProps) {
        super(props);
        let { Id, Author, Company, Text } = this.props.item;
        this.state = {
            Id,
            Author,
            Company,
            Text
        };
    }

    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        let $form = $(this.form.current);
        this.validator = $form.validate({
            ...VALIDATION_OPTIONS,
            rules: {
                Id: {
                    required: true
                },
                Author: {
                    required: true,
                    maxlength: 30
                },
                Company: {
                    required: true,
                    maxlength: 50
                },
                Text: {
                    required: true,
                    maxlength: 300
                }
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
            }
        });
    }

    componentWillUnmount(): void {
        this.validator.destroy();
    }

    componentWillReceiveProps(nextProps: TestimonialItemFormProps): void {
        if (this.props.match.path.toLocaleLowerCase() === Routes.ADD_TESTIMONIAL) {
            this.setState({
                Id: 0,
                Author: "",
                Company: "",
                Text: ""
            });
        } else {
            let { Id, Author, Company, Text } = nextProps.item;
            this.setState({
                Id,
                Author,
                Company,
                Text
            });
        }
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { Id, Author, Company, Text } = this.state;
        return (
            <div className="testimonial-item-form">
                <form ref={this.form}>
                    <input id="Id" name="Id" type="hidden" className="testimonial-item-form__id" defaultValue={Id.toString()} />
                    <div className="testimonial-item-form__line form-group">
                        <label htmlFor="Author">Author</label>
                        <input id="Author" name="Author" className="testimonial-item-form__author form-control"
                            value={Author} onChange={(e) => this.handleChange(e, "Author")} />
                    </div>
                    <div className="testimonial-item-form__line form-group">
                        <label htmlFor="Company">Company</label>
                        <input id="Company" name="Company" className="testimonial-item-form__company form-control"
                            value={Company} onChange={(e) => this.handleChange(e, "Company")} />
                    </div>
                    <div className="testimonial-item-form__line form-group">
                        <label htmlFor="Text">Text</label>
                        <textarea id="Text" name="Text" className="testimonial-item-form__text form-control"
                            value={Text} onChange={(e) => this.handleChange(e, "Text")}></textarea>
                    </div>
                    <div className="testimonial-item-form__line">
                        <Button type="submit"
                            className="testimonial-item-form__submit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Submit" />
                    </div>
                </form>
            </div>
        );
    }

    handleChange(event: React.ChangeEvent, inputName: string): void {
        this.setState({
            ...this.state,
            [inputName]: (event.target as HTMLInputElement).value
        });
    }
}