import { configureStore } from "@reduxjs/toolkit";
import MessageReducer from "./messages/messagesSlice";
import UserDetailReducer from "./users/userDetailSlice";
import InfoReducer from "./info/infoSlice";

const store = configureStore({
  reducer: {
    messageReducer: MessageReducer,
    userDetailReducer: UserDetailReducer,
    infoReducer: InfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
