import * as React from "react";
import { BlogPost } from "@store/entities";
import { Routes } from "@scripts/constants";
import LinkButton from "@components/Shared/LinkButton";
import { ButtonModifiers } from "@components/Shared/Button";
import { BlogPostModal } from "@components/Home/BlogPostModal";
import BlogPostItem from "@components/Admin/BlogPostItem";
import "./BlogPostList.scss";

interface BlogPostListProps {
    items: BlogPost[];
}

interface BlogPostListState {
    showModal: boolean;
    blogPost: BlogPost;
}

export class BlogPostList extends React.Component<BlogPostListProps, BlogPostListState> {
    constructor(props: BlogPostListProps) {
        super(props);
        this.state = {
            showModal: false,
            blogPost: {} as BlogPost
        };
        this.viewBlogPost = this.viewBlogPost.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render(): JSX.Element {
        return (
            <div className="blog-post-list">
                <div className="blog-post-list__items">
                    {this.props.items.map((item, index) => (
                        <div key={index} className="blog-post-list__item">
                            <BlogPostItem item={item} onView={this.viewBlogPost} />
                        </div>
                    ))}
                </div>
                <LinkButton url={Routes.ADD_BLOG_POST}
                    className="blog-post-list__add"
                    modifiers={[ButtonModifiers.Size.SMALL]}
                    children="Add New Blog Post" />
                <BlogPostModal {...this.state} onClose={this.closeModal} />
            </div>
        );
    }

    viewBlogPost(id: number): void {
        this.setState({
            showModal: true,
            blogPost: this.props.items.find(item => item.Id === id)
        });
    }

    closeModal(): void {
        this.setState({
            showModal: false
        });
    }
}