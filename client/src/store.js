// import { configureStore } from "@reduxjs/toolkit";
// import postReducer from "./reducers/postReducer";
// import idReducer from "./reducers/idReducer";
// import authReducer from "./reducers/auth";

// const store = configureStore({
//   reducer: {
//     posts: postReducer,
//     currentId: idReducer,
//     auth: authReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import idReducer from "./reducers/idReducer";
import authReducer from "./reducers/auth";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "counter",
  storage,
};

const reducers = combineReducers({
  posts: postReducer,
  currentId: idReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
