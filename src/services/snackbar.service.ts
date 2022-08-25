import store from "../redux/store";
import {
  sendNewState2SnackBar,
  changeBackdropState,
} from "../redux/info/infoSlice";
import { AlertColor } from "@mui/material/Alert";

export const sendInfo2Toast = (message: string, status: AlertColor) => {
  store.dispatch(sendNewState2SnackBar({ message, open: true, status }));
};

export const showBackdrop = () => {
  store.dispatch(changeBackdropState({ open: true }));
};

export const hideBackdrop = () => {
  store.dispatch(changeBackdropState({ open: false }));
};
