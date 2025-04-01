// Importar React y ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./Components/App";

// Seleccionar el elemento donde se montará la app
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>

            <App />

    </React.StrictMode>
);