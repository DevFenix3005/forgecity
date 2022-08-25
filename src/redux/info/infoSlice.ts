import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { SnackBarState } from "../../models/snackbar.data";
import { UserDialog } from "../../models/userdialog.data";

interface InfoState {
  snackBar: SnackBarState;
  showBackdrop: boolean;
  dialog: UserDialog;
}

const initialState: InfoState = {
  snackBar: {
    message: "",
    open: false,
    status: "success",
  },
  dialog: {
    open: false,
  },
  showBackdrop: false,
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    sendNewState2SnackBar: (state, action: PayloadAction<SnackBarState>) => {
      let { open, message, status } = action.payload;
      state.snackBar.open = open;
      state.snackBar.message = message;
      state.snackBar.status = status;
    },
    restartSnackBarState: (state) => {
      state.snackBar.open = false;
      state.snackBar.message = "";
      state.snackBar.status = "success";
    },
    changeBackdropState: (state, action: PayloadAction<{ open: boolean }>) => {
      state.showBackdrop = action.payload.open;
    },
    toggleUserDialog: (state) => {
      let { open } = state.dialog;
      state.dialog.open = !open;
    },
  },
});

export const {
  restartSnackBarState,
  sendNewState2SnackBar,
  changeBackdropState,
  toggleUserDialog,
} = infoSlice.actions;

export const selectSnackBarState = (state: RootState) =>
  state.infoReducer.snackBar;

export const selectBackdropState = (state: RootState) =>
  state.infoReducer.showBackdrop;

export const selectInfoDialogState = (state: RootState) =>
  state.infoReducer.dialog;

export default infoSlice.reducer;
