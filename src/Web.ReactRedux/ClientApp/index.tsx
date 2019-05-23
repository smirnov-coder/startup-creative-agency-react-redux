import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "@store/configureStore";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

/////////////////////////////// #3

//import * as React from "react";
//import * as ReactDOM from "react-dom";
//import App from "./App";

//ReactDOM.render(
//    <App />,
//    document.getElementById("root")
//);


/////////////////////////////// #2

//import { AppContainer } from "react-hot-loader";
//import { Provider } from "react-redux";
//import * as React from "react";
//import * as ReactDOM from "react-dom";
//import App from "./App";
//import configureStore, { history } from "./store/configureStore";

//const store = configureStore();

//const render = () => {
//    ReactDOM.render(
//        <AppContainer>
//            <Provider store={store}>
//                <App history={history} />
//            </Provider>
//        </AppContainer>,
//        document.getElementById("root")
//    );
//}

//render();

//// Hot reloading
//if (module.hot) {
//    // Reload components
//    module.hot.accept("./App", () => {
//        render();
//    });
//}



///////////////////////////// #1

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