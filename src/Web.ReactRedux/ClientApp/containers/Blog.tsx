import * as React from "react";
import { IBlogPost } from "../store/entities";
import { AppState } from "../store/reducers/rootReducer";
import { connect } from "react-redux";
import { BlogPostPreview } from "../components/BlogPostPreview";
import "../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./Blog.scss";
import { BlogPostModal } from "../components/BlogPostModal";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { Dispatch, bindActionCreators } from "redux";
import { getBlogPosts } from "../store/actions/actionCreators";

interface IBlogProps {
    isLoading: boolean;
    items: IBlogPost[];
    getBlogPosts: () => void;
}

interface IBlogState {
    showModal: boolean;
    blogPostToShow: IBlogPost;
    displayedItems: IBlogPost[];
}

class Blog extends React.Component<IBlogProps, IBlogState> {
    constructor(props: IBlogProps) {
        super(props);
        this.state = {
            showModal: false,
            blogPostToShow: null,
            displayedItems: this.props.items
        };
        this.onViewBlogPost = this.onViewBlogPost.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps: IBlogProps): void {
        this.setState({
            displayedItems: nextProps.items
        });
    }

    render(): JSX.Element {
        let { isLoading } = this.props;
        let { showModal, displayedItems } = this.state;
        let elements: JSX.Element[] = [];
        for (var index = 0; index < displayedItems.length; index++) {
            elements.push(
                <div key={displayedItems[index].Id} className="blog-post-list__item row">
                    <BlogPostPreview blogPost={displayedItems[index]} onView={this.onViewBlogPost} />
                </div>
            );
            if (index !== displayedItems.length - 1) {
                elements.push(<hr key={displayedItems[index].Id * 10} className="blog-post-list__separator" />);
            }
        }
        return (
            <section className="blog-post-list">
                <h3 className="sr-only">Blog Post List</h3>
                <div className="blog-post-list__items">
                    {/* /// TODO: Add loader. */isLoading && displayedItems.length === 0
                        ? <Loader />
                        : elements.map(element => element)
                    }
                </div>
                <div className="blog-post-list__loading">
                    <hr className="blog-post-list__separator" />
                    {isLoading ? <Loader /> :
                        <Button className="blog-post-list__button" onClick={this.props.getBlogPosts}>
                            Load More
                        </Button>
                    }
                </div>
                {!showModal ? null :
                    <BlogPostModal blogPost={this.state.blogPostToShow} showModal={showModal} onClose={this.closeModal} />
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
        let blogPostToShow = this.props.items.find(x => x.Id === id);
        this.setState({
            showModal: true,
            blogPostToShow
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

interface IDispatchProps {
    getBlogPosts: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    return {
        getBlogPosts: bindActionCreators(getBlogPosts, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);