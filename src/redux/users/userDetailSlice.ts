import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { UserDetail } from "../../models/userdetail";
import { addUserDetail, fetchUserDetail } from "../../services/users.service";

interface UserDetailState {
  userInChat: UserDetail[];
  userInSession: UserDetail | null;
  getUserInSession: "pending" | "error" | "idle";
  setUserInSession: "pending" | "error" | "idle";
}

const initialState: UserDetailState = {
  userInChat: [],
  userInSession: null,
  getUserInSession: "idle",
  setUserInSession: "idle",
};

export const fetchUserDetailAndAddInSession = createAsyncThunk(
  "userdetail/fetchUserDetail",
  async (uid: string) => {
    return await fetchUserDetail(uid);
  }
);

export const addUserDetailInCollection = createAsyncThunk(
  "userdetail/addUserDetail",
  async (userDetail: UserDetail) => {
    return await addUserDetail(userDetail);
  }
);

export const userDetailSlice = createSlice({
  name: "userdetail",
  initialState,
  reducers: {
    addUsersInChat: (state, action: PayloadAction<UserDetail[]>) => {
      state.userInChat = action.payload;
    },
    removeUserData: (state) => {
      state.userInChat = [];
      state.userInSession = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserDetailAndAddInSession.pending, (state) => {
        state.getUserInSession = "pending";
      })
      .addCase(fetchUserDetailAndAddInSession.fulfilled, (state, action) => {
        state.getUserInSession = "idle";
        state.userInSession = action.payload;
      })
      .addCase(fetchUserDetailAndAddInSession.rejected, (state) => {
        state.getUserInSession = "error";
        state.userInSession = null;
      })
      .addCase(addUserDetailInCollection.pending, (state) => {
        state.setUserInSession = "pending";
      })
      .addCase(addUserDetailInCollection.fulfilled, (state) => {
        state.setUserInSession = "idle";
      })
      .addCase(addUserDetailInCollection.rejected, (state) => {
        state.setUserInSession = "error";
      });
  },
});

export const { addUsersInChat, removeUserData } = userDetailSlice.actions;
export const selectUsersInChat = (state: RootState) =>
  state.userDetailReducer.userInChat;
export const selectQuantityUsersInChat = (state: RootState) =>
  state.userDetailReducer.userInChat.length;
export const selectUsersInSession = (state: RootState) =>
  state.userDetailReducer.userInSession;
export default userDetailSlice.reducer;
