let timeout;

export const setNotification = (text) => {
  return async (dispatch) => {
    dispatch({
      type: "Set",
      payload: {
        text,
      },
    });

    timeout = setTimeout(() => {
      dispatch({
        type: "Remove",
      });
    }, 3000);
  };
};

export const removeNotification = () => {
  return (dispatch) => {
    dispatch({
      type: "Remove",
    });
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "Set":
      clearTimeout(timeout);
      return { text: action.payload.text };
    case "Remove":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
