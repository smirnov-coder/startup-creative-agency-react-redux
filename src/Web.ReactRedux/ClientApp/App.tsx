import * as React from "react";
import { hot } from "react-hot-loader";
import { Dispatch, bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "@store/configureStore";
import { Routes } from "@scripts/constants";
import { fetchInitialAppState } from "@store/actions";
import HomePage from "@containers/Home/HomePage";
import AuthArea from "@components/Auth/AuthArea";
import NotFoundPage from "@containers/Shared/NotFoundPage";
import AdminArea from "@components/Admin/AdminArea";
import { withInitializer } from "@containers/Admin/withInitializer";

//type AppProps = DispatchProps;

class App extends React.Component/*<AppProps>*/ {
    //componentDidMount(): void {
    //    this.props.initAppState();
    //}
    /// TODO: Вынести ConnectedRouter в index.tsx и обернуть в ХОКи.
    render(): JSX.Element {
        return (
            /*<ConnectedRouter history={history}>*/
                <Switch>
                    <Route exact path={Routes.HOME} component={HomePage} />
                    <Route path={Routes.AUTH_AREA} component={AuthArea} />
                    <Route path={Routes.ADMIN_AREA} component={AdminArea} />
                    <Route path={Routes.NOT_FOUND} component={NotFoundPage} />
                    <Redirect to={Routes.NOT_FOUND} />
                </Switch>
            /*</ConnectedRouter>*/
        );
    }
}

//interface DispatchProps {
//    initAppState: () => void;
//}

//const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
//    return {
//        initAppState: bindActionCreators(fetchInitialAppState, dispatch)
//    };
//}

//const ConnectedApp = connect(null, mapDispatchToProps)(App);

const composed = compose(
    hot(module),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchInitialAppState),
);

export default composed(App);

//export default hot(module)(ConnectedApp);


//////////////////////////////////////// #3

//import * as React from "react";
//import { hot } from "react-hot-loader";
//import { Provider } from "react-redux";
//import configureStore, { history } from "./store/configureStore";
//import { ConnectedRouter } from "connected-react-router";
//import { Switch, Route, Redirect } from "react-router";
//import HomePage from "@containers/Home/HomePage";
//import AuthArea from "@components/Auth/AuthArea";
//import NotFoundPage from "@containers/Shared/NotFoundPage";
//import AdminArea from "@components/Admin/AdminArea";

//const store = configureStore();

//const App: React.SFC = () => {
//    return (
//        <Provider key={Date.now()} store={store}>
//            <ConnectedRouter history={history}>
//                <Switch>
//                    <Route exact path="/" component={HomePage} />
//                    <Route path="/auth" component={AuthArea} />
//                    <Route path="/admin" component={AdminArea} />
//                    <Route path="/notfound" component={NotFoundPage} />
//                    <Redirect to="/notfound" />
//                </Switch>
//            </ConnectedRouter>
//        </Provider>
//    );
//}

//export default hot(module)(App);


////////////////////////////// #2

//import * as React from "react";
//import { History } from "history";
//import { ConnectedRouter } from "connected-react-router";
//import { Switch, Route } from "react-router";
//import HomePage from "./containers/Home/HomePage";
//import { AuthArea } from "./components/Auth/AuthArea";
//import NotFoundPage from "./containers/Shared/NotFoundPage";

//interface AppProps {
//    history: History;
//}

//const App = ({ history }: AppProps) => {
//    return (
//        <ConnectedRouter history={history}>
//            <Switch>
//                <Route exact path="/" component={HomePage} />
//                <Route path="/auth" component={AuthArea} />
//                <Route component={NotFoundPage} />
//            </Switch>
//        </ConnectedRouter>
//    );
//}

//export default App;



////////////////////////////////// #1

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
