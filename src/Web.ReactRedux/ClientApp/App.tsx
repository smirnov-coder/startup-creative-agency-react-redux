import * as React from "react";
import { hot } from "react-hot-loader";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store/reducers/rootReducer";
import HomePage from "./components/HomePage";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export const App: React.SFC = () =>
    <Provider store={store}>
        <Switch>
            <Route exact to="/" component={HomePage} />
        </Switch>
    </Provider>

export default hot(module)(App);
