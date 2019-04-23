import { combineReducers } from "redux";
import { servicesReducer, teamMembersReducer, worksReducer } from "./reducers";

export const rootReducer = combineReducers({
    servicesReducer,
    teamMembersReducer,
    worksReducer
});

export type AppState = ReturnType<typeof rootReducer>