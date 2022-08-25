import { Provider } from "react-redux";

import { Routes, Route } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import store from './redux/store';
import RequireAuth from './utils/require-auth';
import MyTheme from './utils/my-theme';
import SignUp from './components/sign-up/sign-up.component';
import SignIn from './components/sign-in/sign-in.component';
import MyToast from './components/mytoast/mytoast.component';
import UserView from "./components/usersview/userview.component";
import MyBackdrop from './components/mybackdrop/mybackdrop.component';
import ChatRoom from './pages/chatroom.page/chatroom';
import Login from './pages/login.page/login';
import { AuthProvider } from './utils/auth';

const theme = createTheme(MyTheme);

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="login" element={<Login />}>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<RequireAuth><ChatRoom /></RequireAuth>} />
          </Routes>
          <MyToast />
          <UserView />
          <MyBackdrop />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}