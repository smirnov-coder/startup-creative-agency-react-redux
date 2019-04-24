import * as React from "react";
import { IBlogPost, IDomainUser } from "../store/entities";
import { Button, ButtonModifiers } from "./Button";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./BlogPostPreview.scss";

interface IBlogPostPreviewProps {
    blogPost: IBlogPost;
    onView: (id: number) => void;
}

export class BlogPostPreview extends React.Component<IBlogPostPreviewProps> {
    constructor(props: IBlogPostPreviewProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render(): JSX.Element {
        let { blogPost } = this.props;
        let authorNameClassList: string[] = [
            "blog-post-preview-header__author-name",
            "custom-link",
            "custom-link--color-secondary"
        ];
        let authorGroupClassList: string[] = [
            "blog-post-preview-header__author-group",
            "custom-link",
            "custom-link--color-secondary"
        ];
        return (
            <article className="blog-post-preview">
                <div className="blog-post-preview__img-holder col-md-5">
                    <img src={blogPost.ImagePath} className="blog-post-preview__img" alt={blogPost.Title} />
                </div>
                <div className="blog-post-preview__content col-md-7">
                    <header className="blog-post-preview-header">
                        <div className="blog-post-preview-header__date">
                            <p className="blog-post-preview-header__day">
                                {new Date(blogPost.CreatedOn).getDate()}
                            </p>
                            <p className="blog-post-preview-header__month">
                                {this.getMonthShortName(blogPost.CreatedOn)}
                            </p>
                        </div>
                        <div className="blog-post-preview-header__meta">
                            <h4 className="blog-post-preview-header__title custom-link"
                                onClick={this.handleClick}>{blogPost.Title}</h4>
                            <div className="blog-post-preview-header__author">
                                By&nbsp;
                                <span className={authorNameClassList.join(" ")}>
                                    {this.getFullName(blogPost.CreatedBy)}
                                </span>
                                &nbsp;in&nbsp;
                                <span className={authorGroupClassList.join(" ")}>
                                    {blogPost.Category}
                                </span>
                            </div>
                        </div>
                    </header>
                    <div className="blog-post-preview__text">{blogPost.Content}</div>
                    <Button modifiers={[ButtonModifiers.Style.LINK, "custom-link--color-secondary"]}
                        className="blog-post-preview__button" onClick={this.handleClick}>
                        Read More
                    </Button>
                </div>
            </article>
        );
    }

    handleClick(event: React.MouseEvent): void {
        event.preventDefault();
        this.props.onView(this.props.blogPost.Id);
    }

    getMonthShortName(date: Date): string {
        return new Date(date).toLocaleDateString("en-US", { month: "short" }).toLowerCase();
    }

    getFullName(user: IDomainUser): string {
        return `${user.Profile.FirstName} ${user.Profile.LastName}`
    }
}