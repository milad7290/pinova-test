import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
import { configureStore } from "./store/index";
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById("root");

hydrate(<App store={store} />, mountApp);
