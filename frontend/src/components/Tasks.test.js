import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { render } from "@testing-library/react";
import Tasks from "./Tasks";
import App from "../App"
import taskReducer from "../reducers/taskReducer";
import deepFreeze from "deep-freeze";
import mockAxios from "axios";
import { stateChanged ,tasksInitialized } from "../reducers/taskReducer";
import userEvent from '@testing-library/user-event'

describe("taskReducer", () => {
  test("returns the initial state", () => {
    expect(taskReducer(undefined, {})).toEqual([]);
  });

  test("returns new state with action State-Changed", () => {
    const state = [{ id: 0, text: "test backend", state: true }];
    const action = {
      type: "State-Changed",
      payload: {
        task:state[0],
      },
    };
    deepFreeze(state);
    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual({
      id: 0,
      text: "test backend",
      state: false,
    });
  });

  test("Tasks-Initialized", () => {
    const state = [];
    const action = {
      type: "Tasks-Initialized",
      payload: {
        tasks: [
          { id: 0, text: "test backend", state: true },
          { id: 1, text: "test frontend", state: true },
          { id: 2, text: "implement backend", state: false },
          { id: 3, text: "improve app", state: true },
          { id: 4, text: "implement frontend", state: true },
          { id: 5, text: "design frontend", state: false },
          { id: 6, text: "deploy app", state: false },
        ],
      },
    };

    deepFreeze(state);
    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(7);
    expect(newState).toContainEqual({
      id: 0,
      text: "test backend",
      state: true,
    });
  });
});

describe("Tasks Component", () => {
  let store;
  const state = {
    Tasks: [
      { id: 0, text: "test backend", state: true },
      { id: 1, text: "test frontend", state: false },
    ],
    Notification: { text:"hi" }
  };
  const mockStore = configureMockStore([thunk, promiseMiddleware]);

  test("renders content", () => {
    store = mockStore(state);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("test backend")).not.toBeNull();
  });

  test("clicks", async() => {
    store = mockStore(state);
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    const { getByText } = render(
      <Provider store={store}>
        <Tasks test ={mockHandler}/>
      </Provider>
    );

    await user.click(getByText('test backend'))
    expect(mockHandler.mock.calls).toHaveLength(1)

  });
});

describe("actions", () => {
  let store;
  const mockStore = configureMockStore([thunk, promiseMiddleware]);
  beforeEach(() => {
    store = mockStore({
      Tasks: [{ id: 0, text: "test backend", state: false }],
    });
  });

  test("dispatches Tasks-Initialized action and returns data on success", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        Tasks: [],
      })
    );

    await store.dispatch(tasksInitialized());
    const actions = store.getActions();

    expect.assertions(1);
    expect(actions[0].type).toEqual("Tasks-Initialized");
  });

  test("dispatches State-Changed action", async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        Tasks: [{ id: 0, text: "test backend", state: false }],
      })
    );

    await store.dispatch(stateChanged(0));
    const actions = store.getActions();
    expect.assertions(1);
    expect(actions[0].type).toEqual("State-Changed");
  });
});
