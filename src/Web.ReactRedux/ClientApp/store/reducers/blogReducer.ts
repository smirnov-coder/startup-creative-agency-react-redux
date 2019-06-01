import { BlogState, initialState } from "@store/state";
import { HomePageModelAction } from "@store/actions/appActions";
import { ActionTypes } from "@store/actions/actionTypes";
import { BlogPost } from "@store/entities";
import { ItemsAction, CurrentAction } from "@store/actions/genericActions";

type BlogActions = 
    | ItemsAction<BlogPost>
    | HomePageModelAction
    | CurrentAction<BlogPost>

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
            let { items, append } = (action as ItemsAction<BlogPost>).payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                items: append ? state.items.concat(items) : items
            };
        }

        case ActionTypes.CURRENT_BLOG_POST: {
            return {
                ...state,
                isLoading: false,
                error: null,
                current: (action as CurrentAction<BlogPost>).payload.item
            };
        }

        default:
            return state;
    }
}