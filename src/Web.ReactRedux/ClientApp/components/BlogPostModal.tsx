﻿import * as React from "react";
import { IBlogPost, IDomainUser } from "../store/entities";
import { ButtonModifiers, Button } from "./Button";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./BlogPostModal.scss";

interface IBlogPostModalProps {
    blogPost: IBlogPost;
    showModal: boolean;
    onClose: () => void;
}

export class BlogPostModal extends React.Component<IBlogPostModalProps> {
    constructor(props: IBlogPostModalProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
        if (this.props.showModal) {
            let $modal = $(this.modal.current);
            $modal.modal("show");
            //$(this.modal.current).on("hidden.bs.modal", this.props.onClose());
        }
    }

    private modal = React.createRef<HTMLDivElement>();

    render(): JSX.Element {
        let { blogPost } = this.props;
        let date: string = this.getBlogPostDateString(blogPost.CreatedOn);
        let meta: string = this.getBlogPostMetadata(date, blogPost);
        return (
            <div ref={this.modal} className="modal fade" tabIndex={-1} id="blog-post-modal">
                <div className="blog-post custom-modal">
                    <div className="modal-dialog modal-lg custom-modal__inner">
                        <div className="container">
                            <div className="modal-content custom-modal__content">
                                <div className="modal-header">
                                    <button type="button" className="close" onClick={this.handleClose}>
                                        <span>&times;</span>
                                    </button>
                                    <div className="blog-post__title">{blogPost.Title}</div>
                                    <div className="blog-post__meta">{meta}</div>
                                </div>
                                <div className="modal-body clearfix">
                                    <img src={blogPost.ImagePath} alt={blogPost.Title}
                                        className="blog-post__img img-responsive center-block" />
                                    <div className="blog-post__content" dangerouslySetInnerHTML={{ __html: blogPost.Content }}></div>
                                </div>
                                <div className="modal-footer custom-modal__footer">
                                    <Button
                                        modifiers={[ButtonModifiers.Size.SMALL]}
                                        className="custom-modal__close"
                                        children="Close"
                                        onClick={this.handleClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClose(): void {
        $(this.modal.current).modal("hide");
        this.props.onClose();
    }

    getBlogPostDateString(date: Date): string {
        let options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(date).toLocaleDateString("en-US", options);
    }

    getBlogPostMetadata(date: string, blogPost: IBlogPost): string {
        return `${date} By ${this.getFullName(blogPost.CreatedBy)} in ${blogPost.Category}`;
    }

    getFullName(user: IDomainUser): string {
        return `${user.Profile.FirstName} ${user.Profile.LastName}`;
    }
}