import { BlogPost } from "@store/entities";
import { ActionTypes } from "./actionTypes";
import { decodeHTML, formatString } from "@scripts/utils";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { fetchData, ItemsAction, deleteEntity, CurrentAction, setCurrent, submitFormData } from "./genericActions";
import { push } from "connected-react-router";
import { createNonPayloadAction } from "./appActions";

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
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BLOG_POSTS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BLOG_POSTS_COMPLETED)),
        success: (data) => addBlogPosts(data, !privateArea),
        errorMessage: `Failed to fetch blog posts from ${url}.`
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
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_WORKS_COMPLETED)),
        success: (dispatch) => fetchBlogPosts({ privateArea: true })(dispatch),
        errorMessage: `Failed to delete blog post with ID = ${blogPostId}.`
    });
}

export function setCurrentBlogPost(blogPost: BlogPost): CurrentAction<BlogPost> {
    return setCurrent<BlogPost>(blogPost, ActionTypes.CURRENT_BLOG_POST);
}

export const addBlogPost = (blogPostData: FormData) =>
    submitBlogPostData(blogPostData, HttpMethod.POST, "Failed to create new blog post.");

export const updateBlogPost = (blogPostData: FormData) =>
    submitBlogPostData(blogPostData, HttpMethod.PUT, `Failed to update blog post with ID = ${blogPostData.get("Id")}.`);

function submitBlogPostData(blogPostData: FormData, method: HttpMethod, errorMessage: string) {
    return submitFormData({
        url: GLOBALS.api.blog,
        method,
        formData: blogPostData,
        success: dispatch => dispatch(push(Routes.BLOG)),
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BLOG_POSTS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BLOG_POSTS_COMPLETED)),
        errorMessage
    });
}

export function fetchBlogPost(blogPostId: number) {
    let template: string = decodeHTML(GLOBALS.api.blogPost);
    let url: string = formatString(template, blogPostId);
    return fetchData<BlogPost>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BLOG_POSTS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BLOG_POSTS_COMPLETED)),
        success: setCurrentBlogPost,
        errorMessage: `Failed to fetch blog post with ID = ${blogPostId} from ${url}.`
    });
}