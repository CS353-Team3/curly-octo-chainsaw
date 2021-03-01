import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./Landing.js";
import About from "./about.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
