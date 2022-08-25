import { AlertColor } from "@mui/material";

export interface SnackBarState {
  message: string;
  status: AlertColor;
  open: boolean;
}
