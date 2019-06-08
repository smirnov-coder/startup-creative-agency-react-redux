import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"
import { services, works, blog, brands, testimonials, contacts, messages, auth, users, notifications } from "@store/reducers";

const rootReducer = (history: History) => combineReducers({
    services,
    works,
    blog,
    brands,
    testimonials,
    contacts,
    messages,
    auth,
    users,
    notifications,
    router: connectRouter(history)
});

export default rootReducer