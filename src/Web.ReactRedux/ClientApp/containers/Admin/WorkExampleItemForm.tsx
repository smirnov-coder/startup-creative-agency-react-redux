import * as React from "react";
import { RouteComponentProps } from "react-router";
import { WorkExample } from "@store/entities";
import { Routes, VALIDATION_OPTIONS, IMAGE_VALIDATION_OPTIONS } from "@scripts/constants";
import { FileInput } from "@components/Admin/FileInput";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import "./WorkExampleItemForm.scss";
import { imageValidationOptions } from "@scripts/utils";

interface ComponentProps {
    item: WorkExample;
    onSubmit: (formData: FormData) => void;
}

type WorkExampleItemFormProps = ComponentProps & RouteComponentProps;

interface WorkExampleItemFormState {
    Id: number;
    Name: string;
    Category: string;
    ImagePath: string;
    Description: string;
}

export class WorkExampleItemForm extends React.Component<WorkExampleItemFormProps, WorkExampleItemFormState> {
    constructor(props: WorkExampleItemFormProps) {
        super(props);
        let { Id, Name, Category, ImagePath, Description } = this.props.item;
        this.state = {
            Id,
            Name,
            Category,
            ImagePath,
            Description
        };
    }

    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        let imageOptions: JQueryValidation.ValidationOptions = imageValidationOptions("FileName", "ImagePath");
        let $form = $(this.form.current);
        this.validator = $form.validate({
            ...VALIDATION_OPTIONS,
            rules: {
                Id: {
                    required: true
                },
                Name: {
                    required: true,
                    maxlength: 20
                },
                Category: {
                    required: true,
                    maxlength: 20
                },
                Description: {
                    required: true,
                    maxlength: 500
                },
                ...imageOptions.rules
            },
            messages: {
                ...imageOptions.messages
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

    componentWillReceiveProps(nextProps: WorkExampleItemFormProps): void {
        if (this.props.match.path.toLocaleLowerCase() === Routes.ADD_WORK_EXAMPLE) {
            this.setState({
                Id: 0,
                Name: "",
                Category: "",
                ImagePath: "",
                Description: ""
            });
        } else {
            let { Id, Name, Category, ImagePath, Description } = nextProps.item;
            this.setState({
                Id,
                Name,
                Category,
                ImagePath,
                Description
            });
        }
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { Id, Name, Category, ImagePath, Description } = this.state;
        let imageAlt: string = Name ? Name : "NO IMAGE";
        let hiddenClass = "work-example-item-form__img--hidden";
        let imageClass = `work-example-item-form__img ${ImagePath ? " thumbnail" : hiddenClass}`;
        return (
            <div className="work-example-item-form">
                <form ref={this.form} encType="multipart/form-data">
                    <input id="Id" name="Id" type="hidden" className="work-example-item-form__id" defaultValue={Id.toString()} />
                    <div className="work-example-item-form__line form-group">
                        <label htmlFor="Name">Name</label>
                        <input id="Name" name="Name" className="work-example-item-form__name form-control"
                            value={Name} onChange={(e) => this.handleChange(e, "Name")} />
                    </div>
                    <div className="work-example-item-form__line form-group">
                        <label htmlFor="Category">Category</label>
                        <input id="Category" name="Category" className="work-example-item-form__category form-control"
                            value={Category} onChange={(e) => this.handleChange(e, "Category")} />
                    </div>
                    <div className="work-example-item-form__line form-group">
                        <label htmlFor="Description">Description</label>
                        <textarea id="Description" name="Description" className="work-example-item-form__description form-control" value={Description} onChange={(e) => this.handleChange(e, "Description")}></textarea>
                    </div>
                    <div className="work-example-item-form__line form-group">
                        <label htmlFor="Image">Image</label>
                        <FileInput className="work-example-item-form__upload"
                            fileInputId="Image"
                            fileInputName="Image"
                            buttonPosition="right"
                            textInputId="FileName"
                            textInputName="FileName" />
                    </div>
                    <div className="work-example-item-form__line form-group">
                        <label htmlFor="ImagePath">Current Image</label>
                        <input id="ImagePath" name="ImagePath" type="hidden" className="work-example-item-form__img-path"
                            value={ImagePath} onChange={(e) => this.handleChange(e, "ImagePath")} />
                        <div className="work-example-item-form__img-holder">
                            <img src={ImagePath} alt={imageAlt} title={imageAlt} className={imageClass} />
                        </div>
                    </div>
                    <div className="work-example-item-form__line">
                        <Button type="submit"
                            className="work-example-item-form__submit"
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