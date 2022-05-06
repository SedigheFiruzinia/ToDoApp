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

export const stateChanged = (task) => {
  return async (dispatch) => {
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
      return state.map((task) =>
        task.id === action.payload.task.id
          ? {
              ...task,
              state: !action.payload.note.state,
            }
          : task
      );

    default:
      return state;
  }
};

export default TaskReducer;
