import taskService from "../services/tasks";

export const tasksInitialized = () => {
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

export const stateChanged = (task) => {
  return async (dispatch) => {
    await taskService.updateState(task.id);
    dispatch({
      type: "State-Changed",
      payload: {
        task,
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
      t.id === action.payload.task.id
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
