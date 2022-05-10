import "@testing-library/jest-dom/extend-expect";
import notificationReducer from "../reducers/notificationReducer";
import deepFreeze from "deep-freeze";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import mockAxios from "axios";
import { render } from "@testing-library/react";
import { setNotification, removeNotification } from "../reducers/NotificationReducer";
import { Provider } from "react-redux";
import Notification from "./Notification";
import Profile from "./Profile"


describe("notificationReducer", () => {
  test("returns the initial state", () => {
    expect(notificationReducer(null, {})).toEqual(null);
  });

  test("returns new text with action Set", () => {
    const state = { text: "Task test backend is done" };
    const action = {
      type: "Set",
      payload: {
        text:"Task test frontend is done",
      },
    };
    deepFreeze(state);
    const newState = notificationReducer(state, action);

    expect(newState).toEqual({
      text: "Task test frontend is done",
    });
  });

  test("sets state to null with action Remove", () => {
    const state = { text: "Task test backend is done" };
    const action = {
      type: "Remove",
    };
    deepFreeze(state);
    const newState = notificationReducer(state, action);

    expect(newState).toEqual(null);
  });
})

describe("actions", () => {
  let store;
  const mockStore = configureMockStore([thunk, promiseMiddleware]);
  beforeEach(() => {
    store = mockStore({
      Notification: null,
    });
  });

  test("dispatches Set action and returns data on success", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        Notification: null,
      })
    );

    await store.dispatch(setNotification("First task is done"));
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual("Set");
  });

  test("dispatches Remove action", async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        Notification:  { text: "test backend" },
      })
    );

    await store.dispatch(removeNotification());
    const actions = store.getActions();
    expect.assertions(1);
    expect(actions[0].type).toEqual("Remove");
  });
});

describe("Notification Component", () => {
  let store;
  const state = {
    Tasks: [
      { id: 0, text: "test backend", state: true },
      { id: 1, text: "test frontend", state: false },
    ],
    Notification: { text: "Task test backend is undone" }
  };
  const mockStore = configureMockStore();

  test("renders content", () => {
    store = mockStore(state);
    const { getByText } = render(
      <Provider store={store}>
        <Notification />
      </Provider>
    );

    expect(getByText("Task test backend is undone")).not.toBeNull();
  });

  test("returns null when there is no notification in store", () => {
    store = mockStore({
      Tasks: [
        { id: 0, text: "test backend", state: true },
        { id: 1, text: "test frontend", state: false },
      ],
    })
    const { queryByLabelText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    expect(queryByLabelText("task")).toBeFalsy();
  });
});