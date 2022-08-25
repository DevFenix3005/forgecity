import { ThemeOptions } from "@mui/material/styles";
import { deepPurple, deepOrange } from "@mui/material/colors";

const MyTheme: ThemeOptions = {
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: deepOrange["A400"],
    },
    background: {
      default: deepPurple[50],
    },
  },
};

export default MyTheme;
