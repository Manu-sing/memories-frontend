import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import idReducer from "./reducers/idReducer";
import authReducer from "./reducers/auth";

const store = configureStore({
  reducer: {
    posts: postReducer,
    currentId: idReducer,
    auth: authReducer,
  },
});

export default store;
