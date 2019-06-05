import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"
import servicesReducer from "./servicesReducer";
import worksReducer from "./worksReducer";
import blogReducer from "./blogReducer";
import brandsReducer from "./brandsReducer";
import testimonialsReducer from "./testimonialsReducer";
import contactsReducer from "./contactsReducer";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import notificationsReducer from "./notificationsReducer";

const rootReducer = (history: History) => combineReducers({
    services: servicesReducer,
    works: worksReducer,
    blog: blogReducer,
    brands: brandsReducer,
    testimonials: testimonialsReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
    auth: authReducer,
    users: usersReducer,
    notifications: notificationsReducer,

    router: connectRouter(history)
});

export default rootReducer



//import { combineReducers } from "redux";
//import {
//    servicesReducer,
//    teamMembersReducer,
//    worksReducer,
//    blogReducer,
//    brandsReducer,
//    testimonialsReducer,//    contactsReducer,
//    messagesReducer,
//    socialLinksReducer,
//    authReducer,
//    pageModelsReducer,
//} from "./reducers";

//export const rootReducer = combineReducers({
//    services: servicesReducer,
//    teamMembers: teamMembersReducer,
//    works: worksReducer,
//    blog: blogReducer,
//    brands: brandsReducer,
//    testimonials: testimonialsReducer,
//    contacts: contactsReducer,
//    messages: messagesReducer,
//    socialLinks: socialLinksReducer,
//    auth: authReducer,
//    pageModels: pageModelsReducer,
//});

//export type AppState = ReturnType<typeof rootReducer>