import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./std.min.css";
import store from "./store";
import { Provider } from "react-redux";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
// eslint-disable-next-line
ReactDOM.render(app, document.getElementById("root"));
