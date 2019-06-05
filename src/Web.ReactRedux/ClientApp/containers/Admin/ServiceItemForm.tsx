import * as React from "react";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import * as $ from "jquery";
import { ServiceInfo } from "@store/entities";
import { RouteComponentProps } from "react-router";
import { Routes, VALIDATION_OPTIONS } from "@scripts/constants";
import "./ServiceItemForm.scss";
import "@bootstrap/css";

interface ComponentProps {
    item: ServiceInfo;
    onSubmit: (formData: FormData) => void;
}

type ServiceItemFormProps = ComponentProps & RouteComponentProps;

interface ServiceItemFormState {
    Id: number;
    IconClass: string;
    Caption: string;
    Description: string;
}

export class ServiceItemForm extends React.Component<ServiceItemFormProps, ServiceItemFormState> {
    constructor(props: ServiceItemFormProps) {
        super(props);
        let { Id, IconClass, Caption, Description } = this.props.item;
        this.state = {
            Id,
            IconClass,
            Caption,
            Description
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
                IconClass: {
                    required: true,
                    maxlength: 50
                },
                Caption: {
                    required: true,
                    maxlength: 50
                },
                Description: {
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

    componentWillReceiveProps(nextProps: ServiceItemFormProps): void {
        if (this.props.match.path.toLocaleLowerCase() === Routes.ADD_SERVICE) {
            this.setState({
                Id: 0,
                Caption: "",
                IconClass: "",
                Description: ""
            });
        } else {
            let { Id, IconClass, Caption, Description } = nextProps.item;
            this.setState({
                Id,
                IconClass,
                Caption,
                Description
            });
        }
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { Id, IconClass, Caption, Description } = this.state;
        return (
            <div className="service-item-form">
                <form ref={this.form}>
                    <input id="Id" name="Id" type="hidden" className="service-item-form__id" defaultValue={Id.toString()} />
                    <div className="service-item-form__line form-group">
                        <label htmlFor="IconClass">FontAwesome Icon Class</label>
                        <input id="IconClass" name="IconClass" className="service-item-form__icon-class form-control"
                            value={IconClass} onChange={(e) => this.handleChange(e, "IconClass")} />
                    </div>
                    <div className="service-item-form__line form-group">
                        <label htmlFor="Caption">Caption</label>
                        <input id="Caption" name="Caption" className="service-item-form__caption form-control"
                            value={Caption} onChange={(e) => this.handleChange(e, "Caption")} />
                    </div>
                    <div className="service-item-form__line form-group">
                        <label htmlFor="Description">Description</label>
                        <textarea id="Description" name="Description" className="service-item-form__description form-control"
                            value={Description} onChange={(e) => this.handleChange(e, "Description")}></textarea>
                    </div>
                    <div className="service-item-form__line">
                        <Button type="submit"
                            className="service-item-form__submit"
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