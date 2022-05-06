import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import tasksReducer from "./reducers/taskReducer";
import notificationReducer from "./reducers/notificationReducer";
import "bootstrap/dist/css/bootstrap.min.css";

const reducer = combineReducers({
  Tasks: tasksReducer,
  Notification: notificationReducer,
});

const composeEnhancer = composeWithDevTools({ trace: true });

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
