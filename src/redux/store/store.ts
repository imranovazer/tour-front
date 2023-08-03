import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import themeReducer from "../reducers/themeSlice";
import alertReducer from "../reducers/alertSlice";
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    alert: alertReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
