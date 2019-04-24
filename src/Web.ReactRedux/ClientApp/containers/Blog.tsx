import * as React from "react";
import { IBlogPost } from "../store/entities";
import { AppState } from "../store/reducers/rootReducer";
import { connect } from "react-redux";
import { BlogPostPreview } from "../components/BlogPostPreview";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Blog.scss";
import { BlogPostModal } from "../components/BlogPostModal";

interface IBlogProps {
    isLoading: boolean;
    items: IBlogPost[];
}

interface IBlogState {
    showModal: boolean;
    blogPost: IBlogPost;
}

class Blog extends React.Component<IBlogProps, IBlogState> {
    constructor(props: IBlogProps) {
        super(props);
        this.state = {
            showModal: false,
            blogPost: null
        };
        this.onViewBlogPost = this.onViewBlogPost.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let { showModal } = this.state;
        return (
            <section className="blog-post-list">
                <h3 className="sr-only">Blog Post List</h3>
                {isLoading ? <div>Loading... Please wait.</div> : items.map(blogPost => (
                    <div key={blogPost.Id} className="blog-post-list__item row">
                        <BlogPostPreview key={blogPost.Id} blogPost={blogPost} onView={this.onViewBlogPost} />
                        {blogPost === items[items.length - 1] ? null : <hr className="blog-post-list__separator" />}
                    </div>
                ))}
                {/* ////////////////////////////////////////////////////////// */}
                <div className="blog-post-list__loading">
                    <hr className="blog-post-list__separator" />
                    <form id="getBlogPostsForm" method="get">
                        <button type="submit" className="blog-post-list__button button">Load More</button>
                    </form>
                    <i className="blog-post-list__loader fa fa-spinner fa-pulse fa-3x"></i>
                </div>
                {!showModal ? null :
                    <BlogPostModal blogPost={this.state.blogPost} showModal={showModal} onClose={this.closeModal} />
                }
            </section>
        );
    }

    closeModal(): void {
        this.setState({
            showModal: false
        });
    }

    onViewBlogPost(id: number): void {
        let blogPost = this.props.items.find(x => x.Id === id);
        this.setState({
            showModal: true,
            blogPost
        });
    }
}

interface IStateProps {
    isLoading: boolean;
    items: IBlogPost[];
}

const mapStateToProps = (state: AppState): IStateProps => {
    return {
        isLoading: state.blogReducer.blog.isLoading,
        items: state.blogReducer.blog.items
    };
}

//interface IDispatchProps {
//    getPageModel: () => void
//}

//const mapDispatchToProps = (dispatch: Dispatch<ServicesActions>): IDispatchProps => {
//    return {
//        getServices: bindActionCreators(getServices, dispatch)
//    };
//}

export default connect(mapStateToProps, null)(Blog);