import * as React from "react";
import * as $ from "jquery";
import { RouteComponentProps } from "react-router";
import { BlogPost } from "@store/entities";
import { Routes, VALIDATION_OPTIONS } from "@scripts/constants";
import { imageValidationOptions } from "@scripts/utils";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import { FileInput } from "@components/Admin/FileInput";
import "./BlogPostItemForm.scss";

interface ComponentProps {
    item: BlogPost;
    onSubmit: (formData: FormData) => void;
}

type BlogPostItemFormProps = ComponentProps & RouteComponentProps;

interface BlogPostItemFormState {
    Id: number;
    Title: string;
    Category: string;
    ImagePath: string;
    Content: string;
}

export class BlogPostItemForm extends React.Component<BlogPostItemFormProps, BlogPostItemFormState> {
    constructor(props: BlogPostItemFormProps) {
        super(props);
        let { Id, Title, Category, ImagePath, Content } = this.props.item;
        this.state = {
            Id,
            Title,
            Category,
            ImagePath,
            Content
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
                Title: {
                    required: true,
                    maxlength: 100
                },
                Category: {
                    required: true,
                    maxlength: 50
                },
                Content: {
                    required: true,
                    maxlength: 5000
                },
                ...imageOptions.rules
            },
            messages: {
                ...imageOptions.messages
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
            },
        });
    }

    componentWillUnmount(): void {
        this.validator.destroy();
    }

    componentWillReceiveProps(nextProps: BlogPostItemFormProps): void {
        if (this.props.match.path.toLocaleLowerCase() === Routes.ADD_BLOG_POST) {
            this.setState({
                Id: 0,
                Title: "",
                Category: "",
                ImagePath: "",
                Content: ""
            });
        } else {
            let { Id, Title, Category, ImagePath, Content } = nextProps.item;
            this.setState({
                Id,
                Title,
                Category,
                ImagePath,
                Content
            });
        }
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { Id, Title, Category, ImagePath, Content } = this.state;
        let imageAlt: string = Title ? Title : "NO IMAGE";
        let hiddenClass = "blog-post-item-form__img--hidden";
        let imageClass = `blog-post-item-form__img ${ImagePath ? " thumbnail" : hiddenClass}`;
        return (
            <div className="blog-post-item-form">
                <form ref={this.form} encType="multipart/form-data">
                    <input id="Id" name="Id" type="hidden" className="blog-post-item-form__id" defaultValue={Id.toString()} />
                    <div className="blog-post-item-form__line form-group">
                        <label htmlFor="Title">Title</label>
                        <input id="Title" name="Title" className="blog-post-item-form__title form-control"
                            value={Title} onChange={(e) => this.handleChange(e, "Title")} />
                    </div>
                    <div className="blog-post-item-form__line form-group">
                        <label htmlFor="Category">Category</label>
                        <input id="Category" name="Category" className="blog-post-item-form__category form-control"
                            value={Category} onChange={(e) => this.handleChange(e, "Category")} />
                    </div>
                    <div className="blog-post-item-form__line form-group">
                        <label htmlFor="Content">Content</label>
                        <textarea id="Content" name="Content" className="blog-post-item-form__content form-control"
                            value={Content} onChange={(e) => this.handleChange(e, "Content")}></textarea>
                    </div>
                    <div className="blog-post-item-form__line form-group">
                        <label htmlFor="Image">Image</label>
                        <FileInput className="blog-post-item-form__upload"
                            fileInputId="Image"
                            fileInputName="Image"
                            buttonPosition="right"
                            textInputId="FileName"
                            textInputName="FileName" />
                    </div>
                    <div className="blog-post-item-form__line form-group">
                        <label htmlFor="ImagePath">Current Image</label>
                        <input id="ImagePath" name="ImagePath" type="hidden" className="blog-post-item-form__img-path"
                            value={ImagePath} onChange={(e) => this.handleChange(e, "ImagePath")} />
                        <div className="blog-post-item-form__img-holder">
                            <img src={ImagePath} alt={imageAlt} title={imageAlt} className={imageClass} />
                        </div>
                    </div>
                    <div className="blog-post-item-form__line">
                        <Button type="submit"
                            className="blog-post-item-form__submit"
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