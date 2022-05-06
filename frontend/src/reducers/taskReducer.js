import taskService from "../services/tasks";

export const tasksInitialized = (id) => {
  return async (dispatch) => {
    const tasks = await taskService.getAll();

    dispatch({
      type: "Tasks-Initialized",
      payload: {
        tasks,
      },
    });
  };
};

export const stateChanged = (id) => {
  return async (dispatch) => {
    await taskService.updateState(id);
    dispatch({
      type: "State-Changed",
      payload: {
        id,
      },
    });
  };
};

const TaskReducer = (state = [], action) => {
  switch (action.type) {
    case "Tasks-Initialized":
      return action.payload.tasks;

    case "State-Changed":
      return state.map((t) =>
        t.id === action.payload.id
          ? {
              ...t,
              state: !t.state,
            }
          : t
      );

    default:
      return state;
  }
};

export default TaskReducer;
