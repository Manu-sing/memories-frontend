import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import idReducer from "./reducers/idReducer";

const store = configureStore({
  reducer: {
    posts: postReducer,
    currentId: idReducer,
  },
});

export default store;
