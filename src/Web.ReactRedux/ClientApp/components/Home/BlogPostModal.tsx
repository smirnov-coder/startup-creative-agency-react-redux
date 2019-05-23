import * as React from "react";
import { BlogPost, DomainUser } from "@store/entities";
import "@bootstrap/css";
import "./BlogPostModal.scss";
import { Button, ButtonModifiers } from "@components/Shared/Button";

interface BlogPostModalProps {
    blogPost: BlogPost;
    showModal: boolean;
    onClose: () => void;
}

export class BlogPostModal extends React.Component<BlogPostModalProps> {
    constructor(props: BlogPostModalProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(nextProps: BlogPostModalProps): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
        nextProps.showModal
            ? $(this.modal.current).modal("show")
            : $(this.modal.current).modal("hide");
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
                                    <Button modifiers={[ButtonModifiers.Size.SMALL]}
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
        if (!date) {
            date = new Date();
        }
        let options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(date).toLocaleDateString("en-US", options);
    }

    getBlogPostMetadata(date: string, blogPost: BlogPost): string {
        return `${date} By ${this.getFullName(blogPost.CreatedBy)} in ${blogPost.Category}`;
    }

    getFullName(user: DomainUser): string {
        if (!user || !user.Profile) {
            return "NULL";
        }
        return `${user.Profile.FirstName} ${user.Profile.LastName}`;
    }
}