﻿import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import configureStore, { history } from "./store/configureStore";

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider key={module.hot ? Date.now() : 1} store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById("root")
    );
}

render();

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept("./App", () => {
        render();
    });
}



//import * as React from "react";
//import * as ReactDOM from "react-dom";
//import { BrowserRouter } from "react-router-dom";
//import App from "./App";

//ReactDOM.render(
//    <BrowserRouter>
//        <App />
//    </BrowserRouter>,
//    document.getElementById("root")
//);