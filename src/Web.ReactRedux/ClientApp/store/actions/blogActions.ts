import { BlogPost } from "@store/entities";
import { ActionTypes } from "./actionTypes";
import { decodeHTML, formatString } from "@scripts/utils";
import { GLOBALS, Routes } from "@scripts/constants";
import { fetchData, ItemsAction, deleteEntity, CurrentAction, setCurrent, submitFormData } from "./genericActions";

interface FetchBlogPostsRequest {
    skip?: number;
    take?: number;
    privateArea?: boolean;
}

const defaultArgument: FetchBlogPostsRequest = {
    skip: 0,
    take: 0,
    privateArea: false
}

export function fetchBlogPosts({ skip = 0, take = 0, privateArea = false }: FetchBlogPostsRequest = defaultArgument) {
    let template: string = decodeHTML(GLOBALS.api.blogPartial);
    let url: string = privateArea ? GLOBALS.api.blog : formatString(template, skip, take);
    return fetchData<BlogPost[]>({
        url,
        requestActionType: ActionTypes.REQUEST_BLOG_POSTS,
        success: (data) => addBlogPosts(data, !privateArea),
        errorTitle: "fetch blog posts error"
    });
}

const addBlogPosts = (blogPosts: BlogPost[], append: boolean = false): ItemsAction<BlogPost> => {
    return {
        type: ActionTypes.BLOG_POSTS,
        payload: {
            items: blogPosts,
            append
        }
    };
}

export function deleteBlogPost(blogPostId: number) {
    return deleteEntity({
        entityId: blogPostId,
        urlTemplate: GLOBALS.api.blogPost,
        requestActionType: ActionTypes.REQUEST_WORKS,
        success: () => fetchBlogPosts({ privateArea: true }),
        errorTitle: "delete work example error"
    });
}

export function setCurrentBlogPost(blogPost: BlogPost): CurrentAction<BlogPost> {
    return setCurrent<BlogPost>(blogPost, ActionTypes.CURRENT_BLOG_POST);
}

export const addBlogPost = (blogPostData: FormData) =>
    submitBlogPostData(blogPostData, "POST", "add blog post error");

export const updateBlogPost = (blogPostData: FormData) =>
    submitBlogPostData(blogPostData, "PUT", "update blog post error");

function submitBlogPostData(blogPostData: FormData, method: "POST" | "PUT", errorTitle: string) {
    return submitFormData({
        url: GLOBALS.api.blog,
        method,
        formData: blogPostData,
        successRedirectUrl: Routes.BLOG,
        requestActionType: ActionTypes.REQUEST_BLOG_POSTS,
        completedActionType: ActionTypes.REQUEST_BLOG_POSTS_COMPLETED,
        errorTitle
    });
}

export function fetchBlogPost(blogPostId: number) {
    let template: string = decodeHTML(GLOBALS.api.blogPost);
    let url: string = formatString(template, blogPostId);
    return fetchData<BlogPost>({
        url,
        requestActionType: ActionTypes.REQUEST_BLOG_POSTS,
        success: setCurrentBlogPost,
        errorTitle: "fetch blog post error"
    });
}