import { BlogPost } from "@store/entities";
import { BlogState, initialState as appState } from "@store/state";
import { ItemsAction, CurrentAction, ActionTypes, HomePageModelAction } from "@store/actions";

type BlogActions =
    | ItemsAction<BlogPost>
    | HomePageModelAction
    | CurrentAction<BlogPost>;

const initialState = appState.blog;

export default function blogReducer(state: BlogState = initialState, action: BlogActions): BlogState {
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
                items: (action as HomePageModelAction).payload.model.blogPosts
            };
        }

        case ActionTypes.BLOG_POSTS: {
            let { items, append } = (action as ItemsAction<BlogPost>).payload;
            return {
                ...state,
                isLoading: false,
                items: append ? state.items.concat(items) : items
            };
        }

        case ActionTypes.CURRENT_BLOG_POST: {
            return {
                ...state,
                isLoading: false,
                current: (action as CurrentAction<BlogPost>).payload.item
            };
        }

        default:
            return state;
    }
}