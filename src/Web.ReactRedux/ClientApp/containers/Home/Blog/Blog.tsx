﻿import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { BlogPost } from "@store/entities";
import { AppState } from "@store/state";
import { fetchBlogPosts } from "@store/actions";
import Loader from "@components/Shared/Loader";
import Button from "@components/Shared/Button";
import { BlogPostPreview } from "@components/Home/BlogPostPreview";
import { withDataFeed } from "@containers/Admin/withDataFeed";
import { BlogPostModal } from "@components/Home/BlogPostModal";
import "@bootstrap/css";
import "./Blog.scss";

interface ComponentProps {
    items: BlogPost[];
}

type BlogProps = ComponentProps & StateProps & DispatchProps;
   
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
            blogPost: {} as BlogPost,
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

        let separator = <hr className="blog-post-list__separator" />;
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
        this.props.getBlogPosts({ skip, take });
    }

    closeModal(): void {
        this.setState({
            showModal: false
        });
    }

    onViewBlogPost(id: number): void {
        this.setState({
            showModal: true,
            blogPost: this.props.items.find(item => item.Id === id)
        });
    }
}

interface StateProps {
    isLoading: boolean;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        isLoading: state.blog.isLoading,
    };
}

interface GetBlogPostsParams {
    skip: number;
    take: number;
}

interface DispatchProps {
    getBlogPosts: ({ skip, take }: GetBlogPostsParams) => void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        getBlogPosts: bindActionCreators(fetchBlogPosts, dispatch)
    };
}

const composed = compose(
    withDataFeed(state => state.blog.items, "items"),
    connect(mapStateToProps, mapDispatchToProps)
);

export default composed(Blog);