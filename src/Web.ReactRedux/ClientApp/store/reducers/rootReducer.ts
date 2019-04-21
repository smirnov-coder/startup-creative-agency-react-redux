import { combineReducers } from "redux";
import { servicesReducer } from "./reducers";

export const rootReducer = combineReducers({
    servicesReducer
});

export type AppState = ReturnType<typeof rootReducer>