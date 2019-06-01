import * as React from "react";
import { Switch, Route, Redirect, match } from "react-router";
import { Routes } from "@scripts/constants";
import { compose } from "redux";
import { withInitializer } from "@containers/Admin/withPageInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import Loader from "@components/Shared/Loader";
import { withDocumentTitle } from "./withDocumentTitle";
import { fetchBlogPosts, setCurrentBlogPost, addBlogPost, fetchBlogPost, updateBlogPost } from "@store/actions/blogActions";
import BlogPostList from "@containers/Admin/BlogPostList";
import { BlogPost } from "@store/entities";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import BlogPostItemForm from "@containers/Admin/BlogPostItemForm";

const BlogSubarea: React.SFC = () =>
    <Switch>
        <Route exact path={Routes.BLOG} component={BlogPostsPage} />
        <Route path={Routes.ADD_BLOG_POST} component={AddBlogPostPage} />
        <Route path={Routes.EDIT_BLOG_POST} component={EditBlogPostPage} />
        <Redirect to={Routes.NOT_FOUND} />
    </Switch>;

// BlogPosts page
const BlogPostsPage = compose(
    withInitializer((routeMatch, actionCreator) => () => actionCreator({ privateArea: true }), fetchBlogPosts),
    withLoader(Loader, state => state.blog.isLoading),
    withPageContentWrapper("Blog Post List")
)(BlogPostList);

// AddBlogPost page
const AddBlogPostPage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            return () => actionCreator({ Id: 0, Title: "", Category: "", ImagePath: "", Content: "" } as BlogPost);
        },
        setCurrentBlogPost
    ),
    withLoader(Loader, state => !state.blog.current),
    withPageContentWrapper("Add Blog Post"),
    withSubmitHandler(addBlogPost)
)(BlogPostItemForm);

// EditBlogPost page
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
    withSubmitHandler(updateBlogPost)
)(BlogPostItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Blog")(BlogSubarea);