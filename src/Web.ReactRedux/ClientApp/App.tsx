import * as React from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router";
import HomePage from "./containers/Home/HomePage";
import { AuthArea } from "./components/Auth/AuthArea";
import NotFoundPage from "./containers/Shared/NotFoundPage";

interface AppProps {
    history: History;
}

const App = ({ history }: AppProps) => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/auth" component={AuthArea} />
                <Route component={NotFoundPage} />
            </Switch>
        </ConnectedRouter>
    );
}

export default App;



//import * as React from "react";
//import { hot } from "react-hot-loader";
//import { Switch, Route } from "react-router-dom";
//import { Provider } from "react-redux";
//import { createStore, applyMiddleware } from "redux";
//import { rootReducer } from "./store/reducers/rootReducer";
//import HomePage from "./containers/Home/HomePage";
//import thunk from "redux-thunk";
//import { AuthArea } from "./components/Auth/AuthArea";
//import NotFoundPage from "./containers/Shared/NotFoundPage";

//const store = createStore(
//    rootReducer,
//    applyMiddleware(thunk)
//);

//export const App: React.SFC = () =>
//    <Provider store={store}>
//        <Switch>
//            <Route exact path="/" component={HomePage} />
//            <Route path="/auth" component={AuthArea} />
//            <Route component={NotFoundPage} />
//        </Switch>
//    </Provider>

//export default hot(module)(App);
