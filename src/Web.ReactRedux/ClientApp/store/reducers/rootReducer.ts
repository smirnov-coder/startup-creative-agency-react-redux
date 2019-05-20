import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"
import {
    servicesReducer,
    teamMembersReducer,
    worksReducer,
    blogReducer,
    brandsReducer,
    testimonialsReducer,    contactsReducer,
    messagesReducer,
    socialLinksReducer,
    authReducer,
    operationDetailsReducer,
    usersReducer,    notificationsReducer
} from "./reducers";

const rootReducer = (history: History) => combineReducers({
    services: servicesReducer,
    teamMembers: teamMembersReducer,
    works: worksReducer,
    blog: blogReducer,
    brands: brandsReducer,
    testimonials: testimonialsReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
    socialLinks: socialLinksReducer,
    auth: authReducer,
    operationDetails: operationDetailsReducer,
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