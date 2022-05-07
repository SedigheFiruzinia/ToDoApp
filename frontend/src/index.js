import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import tasksReducer from "./reducers/taskReducer";
import notificationReducer from "./reducers/notificationReducer";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore({
  reducer: {
    Tasks: tasksReducer,
    Notification: notificationReducer,
  },
});
console.log(store.getState());

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
