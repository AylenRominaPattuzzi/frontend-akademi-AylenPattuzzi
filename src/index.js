// Importar React y ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducers from './reducers'
import { thunk } from "redux-thunk";
import { App } from "./Components/App";

const store = createStore(reducers, applyMiddleware(thunk))
// Seleccionar el elemento donde se montará la app
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);