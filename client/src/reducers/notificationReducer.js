import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    addNotification(state, action) {
      return {
        ...state,
        message: action.payload.message,
        typeOfMessage: action.payload.typeOfMessage,
      };
    },
    removeNotification(state) {
      return { ...state, message: "", typeOfMessage: "" };
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

let startTimer;

export const handleNotification = (obj, timer) => {
  return async (dispatch) => {
    clearTimeout(startTimer);
    startTimer = setTimeout(() => {
      dispatch(removeNotification());
    }, timer);

    dispatch(addNotification(obj));
  };
};

export default notificationSlice.reducer;
