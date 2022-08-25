import { AlertColor } from "@mui/material/Alert";

export interface LoginCred {
  email: string;
  password: string;
}

interface SnackBarHandler {
  snackBarState: (state: boolean) => void;
  snackBarMessage: (msg: string) => void;
  snackBarStatus: (msg: AlertColor) => void;
}

export interface SignInProps extends SnackBarHandler {}

export interface SignUpProps extends SnackBarHandler {}
