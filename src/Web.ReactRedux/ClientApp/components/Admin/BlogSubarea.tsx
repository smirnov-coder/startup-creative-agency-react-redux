import * as React from "react";
import { compose } from "redux";
import { Switch, Route, Redirect, match } from "react-router";
import { BlogPost } from "@store/entities";
import { Routes } from "@scripts/constants";
import { fetchBlogPosts, addBlogPost, fetchBlogPost, updateBlogPost } from "@store/actions";
import Loader from "@components/Shared/Loader";
import { BlogPostList } from "@containers/Admin/BlogPostList";
import { BlogPostItemForm } from "@containers/Admin/BlogPostItemForm";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const BlogSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.BLOG} component={BlogPostsPage} />
            <Route path={Routes.ADD_BLOG_POST} component={AddBlogPostPage} />
            <Route path={Routes.EDIT_BLOG_POST} component={EditBlogPostPage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

const BlogPostsPage = compose(
    withInitializer((routeMatch, actionCreator) => () => actionCreator({ privateArea: true }), fetchBlogPosts),
    withLoader(Loader, state => state.blog.isLoading),
    withPageContentWrapper("Blog Post List"),
    withDataFeed(state => state.blog.items, "items")
)(BlogPostList);

const AddBlogPostPage = compose(
    withPageContentWrapper("Add Blog Post"),
    withSubmitHandler(addBlogPost),
    withDataFeed(state => { return { Id: 0, Title: "", Category: "", ImagePath: "", Content: "" } as BlogPost }, "item")
)(BlogPostItemForm);

const EditBlogPostPage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchBlogPost
    ),
    withLoader(Loader, state => state.blog.isLoading || !state.blog.current),
    withPageContentWrapper((routeMatch: match) => `Edit Blog Post, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateBlogPost),
    withDataFeed(state => state.blog.current, "item")
)(BlogPostItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Blog")(BlogSubarea);