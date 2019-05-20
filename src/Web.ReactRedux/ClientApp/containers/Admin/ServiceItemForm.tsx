import * as React from "react";
import { Button, ButtonModifiers } from "@components/Shared/Button";

interface ServiceItemFormProps {
    Id: number;
    IconClass: string;
    Caption: string;
    Description: string;
    onSubmit: (formData: FormData) => void;
}

export class ServiceItemForm extends React.Component<ServiceItemFormProps> {
    componentDidMount(): void {
        if (!$) {
            throw new Error("jQuery '$' is required.")
        }
        let $form = $(this.form.current);
        $form.validate({
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
            errorElement: "span",
            errorClass: "field-validation-error",
            highlight: (element, errorClass, validClass) => {
                $(element).addClass("input-validation-error");
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
            },
            invalidHandler: (event, validator) => {
                console.error("Form data is invalid.");//
            }
        });
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { Id, IconClass, Caption, Description } = this.props;
        let item = {
            id: Id ? Id : 0,
            iconClass: IconClass ? IconClass : "",
            caption: Caption ? Caption : "",
            description: Description ? Description : ""
        };
        return (
            <div className="service-item-form">
                <form ref={this.form}>
                    <input id="Id" name="Id" type="hidden" className="service-item-form__id" defaultValue={item.id.toString()} />
                    <div className="service-item-form__line form-group">
                        <label htmlFor="IconClass">FontAwesome Icon Class</label>
                        <input id="IconClass" name="IconClass" className="service-item-form__icon-class form-control"
                            defaultValue={item.iconClass} />
                    </div>
                    <div className="service-item-form__line form-group">
                        <label htmlFor="Caption">Caption</label>
                        <input id="Caption" name="Caption" className="service-item-form__caption form-control"
                            defaultValue={item.caption} />
                    </div>
                    <div className="service-item-form__line form-group">
                        <label htmlFor="Description">Description</label>
                        <textarea id="Description" name="Description" className="service-item-form__description form-control"
                            defaultValue={item.description}></textarea>
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
}