import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { Button, ButtonModifiers } from "@components/Shared/Button";
import { Routes } from "@scripts/constants";
import { BlogPost } from "@store/entities";
import { FileInput } from "@components/Admin/FileInput";
import "./BlogPostItemForm.scss";

interface BlogPostItemFormProps extends StateProps, RouteComponentProps {
    onSubmit: (formData: FormData) => void;
}

interface BlogPostItemFormState {
    Id: number;
    Title: string;
    Category: string;
    ImagePath: string;
    Content: string;
}

class BlogPostItemForm extends React.Component<BlogPostItemFormProps, BlogPostItemFormState> {
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
                            textInputId="img-file-name"
                            textInputName="img-file-name" />
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

interface StateProps {
    item: BlogPost;
}

const mapStateToProps = (state: AppState): StateProps => {//console.log("state", state);//
    return {
        item: state.blog.current
    };
}

export default connect(mapStateToProps, null)(BlogPostItemForm);