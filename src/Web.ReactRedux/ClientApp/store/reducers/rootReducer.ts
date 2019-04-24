import { combineReducers } from "redux";
import {
    servicesReducer,
    teamMembersReducer,
    worksReducer,
    blogReducer,
    brandsReducer,
    testimonialsReducer,    contactsReducer,
    messagesReducer,
    socialLinksReducer
} from "./reducers";

export const rootReducer = combineReducers({
    servicesReducer,
    teamMembersReducer,
    worksReducer,
    blogReducer,
    brandsReducer,
    testimonialsReducer,
    contactsReducer,
    messagesReducer,
    socialLinksReducer
});

export type AppState = ReturnType<typeof rootReducer>