// Importar React y ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducers from './reducers'


const store = createStore(reducers)
// Seleccionar el elemento donde se montará la app
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);