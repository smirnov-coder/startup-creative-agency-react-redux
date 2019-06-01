import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Routes } from "@scripts/constants";
import { FileInput } from "@components/Admin/FileInput";
import { Button, ButtonModifiers } from "@components/Shared/Button";
import { Brand } from "@store/entities";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import "./BrandItemForm.scss";
import * as $ from "jquery";

interface BrandItemFormProps extends StateProps, RouteComponentProps {
    onSubmit: (formData: FormData) => void;
}

interface BrandItemFormState {
    Id: number;
    Name: string;
    ImagePath: string;
}

class BrandItemForm extends React.Component<BrandItemFormProps, BrandItemFormState> {
    constructor(props: BrandItemFormProps) {
        super(props);
        let { Id, Name, ImagePath } = this.props.item;
        this.state = {
            Id,
            Name,
            ImagePath
        };
    }

    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        let $form = $(this.form.current);
        this.validator = $form.validate({
            /// TODO: validation don't forget to
            rules: {
                Id: {
                    required: true
                },
                //IconClass: {
                //    required: true,
                //    maxlength: 50
                //},
                //Caption: {
                //    required: true,
                //    maxlength: 50
                //},
                //Description: {
                //    required: true,
                //    maxlength: 300
                //}
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

    componentWillUnmount(): void {
        this.validator.destroy();
    }

    componentWillReceiveProps(nextProps: BrandItemFormProps): void {
        if (this.props.match.path.toLocaleLowerCase() === Routes.ADD_BRAND) {
            this.setState({
                Id: 0,
                Name: "",
                ImagePath: ""
            });
        } else {
            let { Id, Name, ImagePath } = nextProps.item;
            this.setState({
                Id,
                Name,
                ImagePath
            });
        }
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { Id, Name, ImagePath } = this.state;
        let imageAlt: string = Name ? Name : "NO IMAGE";
        let hiddenClass = "brand-item-form__img--hidden";
        let imageClass = `brand-item-form__img ${ImagePath ? " thumbnail" : hiddenClass}`;
        return (
            <div className="brand-item-form">
                <form ref={this.form} encType="multipart/form-data">
                    <input id="Id" name="Id" type="hidden" className="brand-item-form__id" defaultValue={Id.toString()} />
                    <div className="brand-item-form__line form-group">
                        <label htmlFor="Name">Name</label>
                        <input id="Name" name="Name" className="brand-item-form__name form-control"
                            value={Name} onChange={(e) => this.handleChange(e, "Name")} />
                    </div>
                    <div className="brand-item-form__line form-group">
                        <label htmlFor="Image">Image</label>
                        <FileInput className="brand-item-form__upload"
                            fileInputId="Image"
                            fileInputName="Image"
                            buttonPosition="right"
                            textInputId="img-file-name"
                            textInputName="img-file-name" />
                    </div>
                    <div className="brand-item-form__line form-group">
                        <label htmlFor="ImagePath">Current Image</label>
                        <input id="ImagePath" name="ImagePath" type="hidden" className="brand-item-form__img-path"
                            value={ImagePath} onChange={(e) => this.handleChange(e, "ImagePath")} />
                        <div className="brand-item-form__img-holder">
                            <img src={ImagePath} alt={imageAlt} title={imageAlt} className={imageClass} />
                        </div>
                    </div>
                    <div className="brand-item-form__line">
                        <Button type="submit"
                            className="brand-item-form__submit"
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

interface StateProps {
    item: Brand;
}

const mapStateToProps = (state: AppState): StateProps => {//console.log("state", state);//
    return {
        item: state.brands.current
    };
}

export default connect(mapStateToProps, null)(BrandItemForm);