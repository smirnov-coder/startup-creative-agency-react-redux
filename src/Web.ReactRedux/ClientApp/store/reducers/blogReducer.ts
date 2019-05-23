import { BlogState, initialState } from "@store/state";
import { BlogPostsAction } from "@store/actions/blogActions";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";

type BlogActions = 
    | BlogPostsAction
    | HomePageModelAction

export default function blogReducer(state: BlogState = initialState.blog, action: BlogActions): BlogState {
    switch (action.type) {
        case ActionTypes.REQUEST_HOME_PAGE_MODEL:
        case ActionTypes.REQUEST_BLOG_POSTS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case ActionTypes.REQUEST_BLOG_POSTS_COMPLETED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case ActionTypes.HOME_PAGE_MODEL: {
            return {
                ...state,
                isLoading: false,
                error: null,
                items: (action as HomePageModelAction).payload.model.blogPosts
            };
        }

        case ActionTypes.BLOG_POSTS: {
            let { items, append } = (action as BlogPostsAction).payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                items: append ? state.items.concat(items) : items
            };
        }

        //case ActionTypes.ASSIGN_ERROR: {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: action.error
        //    };
        //}

        //case ActionTypes.APPEND_BLOG_POSTS: {
        //    return {
        //        ...state,
        //        isLoading: false,
        //        error: null,
        //        items: state.items.concat(action.items)
        //    };
        //}

        default:
            return state;
    }
}