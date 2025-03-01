import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import LandingApp from "./LandingApp";

const getAppToRender = () => {
    const hostname = window.location.hostname;

    if (hostname.startsWith("app.")) {
        return App;
    }

    // Default case: render LandingPage or handle unknown domains
    return LandingApp;
};

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(container);

const AppToRender = getAppToRender();

root.render(
    <React.StrictMode>
        <ColorModeScript />
        <AppToRender />
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();