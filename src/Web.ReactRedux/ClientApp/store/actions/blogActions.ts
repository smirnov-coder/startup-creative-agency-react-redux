import * as $ from "jquery";
import { BlogPost } from "@store/entities";
import { Action, Dispatch } from "redux";
import { createSimpleAction } from "./appActions";
import { ActionTypes } from "./actionTypes";
import { decodeHTML } from "@scripts/utils";
import { GLOBALS } from "@scripts/constants";

export const fetchBlogPosts = (skip: number = 0, take = 0) => (dispatch: Dispatch) => {
    dispatch(createSimpleAction(ActionTypes.REQUEST_BLOG_POSTS));
    let uriTemplate: string = decodeHTML(GLOBALS.api.blogPartial);
    //console.log("uriTemplate", uriTemplate);//
    let uri: string = $.validator.format(uriTemplate, skip, take);
    //console.log("uri", uri)
    return fetch(uri)
        .then(response => response.json())
        .then((data: BlogPost[]) => {
            dispatch(addBlogPosts(data, true));
        })
        .catch(error => {
            console.error("fetchBlogPosts error", error);//
        });
}

export interface BlogPostsAction extends Action {
    payload: {
        items: BlogPost[],
        append: boolean
    };
}

const addBlogPosts = (blogPosts: BlogPost[], append: boolean = false): BlogPostsAction => {
    return {
        type: "BLOG_POSTS",
        payload: {
            items: blogPosts,
            append
        }
    };
}