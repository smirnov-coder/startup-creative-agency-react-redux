import * as React from "react";
import { BlogPost } from "@store/entities";
import { connect } from "react-redux";
import { BlogPostPreview } from "@components/Home/BlogPostPreview";
import "@bootstrap/css";
import "./Blog.scss";
import { BlogPostModal } from "@components/Home/BlogPostModal";
import { Dispatch, bindActionCreators } from "redux";
import { getBlogPosts } from "@store/actions/actionCreators";
import { AppState } from "@store/state";
import Loader from "@components/Shared/Loader";
import { Button } from "@components/Shared/Button";

type BlogProps = StateProps & DispatchProps;
   
interface BlogState {
    showModal: boolean;
    blogPost: BlogPost;
    itemsCount: number;
    showButton: boolean;
}

class Blog extends React.Component<BlogProps, BlogState> {
    constructor(props: BlogProps) {
        super(props);
        this.state = {
            showModal: false,
            blogPost: {
                Id: 0,
                Title: "",
                Category: "",
                Content: "",
                ImagePath: "",
                CreatedBy: null,
                CreatedOn: null,
                LastUpdatedBy: null,
                LastUpdatedOn: null
            },
            itemsCount: 0,
            showButton: false
        };
        this.onViewBlogPost = this.onViewBlogPost.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadBlogPosts = this.loadBlogPosts.bind(this);
    }

    componentWillReceiveProps(nextProps: BlogProps): void {
        this.setState({
            itemsCount: nextProps.items.length,
            // Скрыть кнопку загрузки блог постов, если кол-во отображаемых постов равно общему кол-ву загруженных постов,
            // или если всего загружено нечётное кол-во постов (блог посты подгружаются по 2).
            showButton: this.state.itemsCount === nextProps.items.length || nextProps.items.length % 2 !== 0 ? false : true
        });
    }

    render(): JSX.Element {
        let { isLoading, items } = this.props;
        let { showModal, showButton, blogPost } = this.state;

        // Сформировать массив элементов для вывода. В массиве будут чередоваться блог посты и резделитель.
        let elements: JSX.Element[] = [];
        for (var index = 0; index < items.length; index++) {
            elements.push(
                <div key={items[index].Id} className="blog-post-list__item row">
                    <BlogPostPreview blogPost={items[index]} onView={this.onViewBlogPost} />
                </div>
            );
            if (index !== items.length - 1) {
                elements.push(<hr key={items[index].Id * 100} className="blog-post-list__separator" />);
            }
        }

        let separator: JSX.Element = <hr className="blog-post-list__separator" />;
        return (
            <section className="blog-post-list">
                <h3 className="sr-only">Blog Post List</h3>
                <div className="blog-post-list__items">
                    { isLoading && items.length === 0 ? <Loader /> : elements.map(element => element) }
                </div>
                <div className="blog-post-list__loading">
                    {isLoading
                        ? <div>{separator}<Loader /></div>
                        : !showButton 
                            ? null
                            : <div>
                                {separator}
                                <Button className="blog-post-list__button" onClick={this.loadBlogPosts}>
                                    Load More
                                </Button>
                              </div>
                    }
                </div>
                <BlogPostModal blogPost={blogPost} showModal={showModal} onClose={this.closeModal} />
            </section>
        );
    }

    loadBlogPosts(): void {
        let skip: number = this.props.items.length;
        let take: number = 2;
        this.props.getBlogPosts(skip, take);
    }

    closeModal(): void {
        this.setState({
            showModal: false
        });
    }

    onViewBlogPost(id: number): void {
        this.setState({
            showModal: true,
            blogPost: this.props.items.find(x => x.Id === id)
        });
    }
}

interface StateProps {
    isLoading: boolean;
    items: BlogPost[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.blog.isLoading,
        items: state.blog.items
    };
}

interface DispatchProps {
    getBlogPosts: (skip: number, take: number) => void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getBlogPosts: bindActionCreators(getBlogPosts, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);