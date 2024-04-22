import { App } from "./App/App";
import "./global.css";

const favicon = document.createElement("link");
favicon.setAttribute("rel", "icon");
favicon.setAttribute("href", "../assets/favicon.ico");

document.querySelector("head")?.append(favicon);

const container = document.querySelector("body");

if (container) {
    const app = new App(container);
    app.start();
}
