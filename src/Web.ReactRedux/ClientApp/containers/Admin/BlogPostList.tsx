import * as React from "react";
import { BlogPost } from "@store/entities";
import { AppState } from "@store/state";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteBlogPost } from "@store/actions/blogActions";
import { LinkButton } from "@components/Shared/LinkButton";
import { Routes } from "@scripts/constants";
import { ButtonModifiers } from "@components/Shared/Button";
import { BlogPostModal } from "@components/Home/BlogPostModal";
import { BlogPostItem } from "@components/Admin/BlogPostItem";
import "./BlogPostList.scss";

type BlogPostListProps = StateProps & DispatchProps;

interface BlogPostListState {
    showModal: boolean;
    blogPost: BlogPost;
}

class BlogPostList extends React.Component<BlogPostListProps, BlogPostListState> {
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
        let { items, deleteBlogPost } = this.props;
        return (
            <div className="blog-post-list">
                <div className="blog-post-list__items">
                    {items.map(item => (
                        <div key={item.Id} className="blog-post-list__item">
                            <BlogPostItem {...item} onDelete={deleteBlogPost} onView={this.viewBlogPost} />
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

interface StateProps {
    items: BlogPost[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        items: state.blog.items
    };
}

interface DispatchProps {
    deleteBlogPost: (blogPostId: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        deleteBlogPost: bindActionCreators(deleteBlogPost, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostList);