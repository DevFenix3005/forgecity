import * as React from "react";
import { User, UserCredential } from "firebase/auth";

import { useAppDispatch } from "../redux/hooks";
import { addUsersInChat, fetchUserDetailAndAddInSession, removeUserData } from "../redux/users/userDetailSlice";
import { addMessages, clearMessages } from "../redux/messages/messagesSlice";

import { getUsers } from "../services/users.service";
import { getChatMessage } from "../services/message.service";
import { showBackdrop, hideBackdrop } from "../services/snackbar.service";

import {
  userLoginWithFirebase,
  userLogout,
  authState,
} from "../services/my-firebase-auth.service";
import { LoginCred } from "../models/login.data";

interface AuthContextType {
  user: User | null;
  signin: (user: LoginCred, callback: (user: User) => void, fail: (errorcode: number) => void) => void;
  signinSocial: (user: User, callback: () => void) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const dispatch = useAppDispatch();
  let [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {

    const messageSub = () => {
      if (user) {
        return getChatMessage(user.uid, (messages) => {
          dispatch(addMessages(messages));
        });
      } else {
        return null;
      }
    }

    const userSub = () => {
      return getUsers((users) => {
        dispatch(addUsersInChat(users));
      });
    }

    const unsubAuth = authState((user) => {
      showBackdrop();
      if (user) {
        setUser(user);
        dispatch(fetchUserDetailAndAddInSession(user?.uid));
      }
      hideBackdrop();
    });

    let unsubMessage = messageSub();
    let unsubUsers = userSub();

    return function cleanup() {
      if (unsubMessage) unsubMessage();
      unsubUsers();
      unsubAuth();
      dispatch(removeUserData());
      dispatch(clearMessages());
    }
  }, [dispatch, user])

  let signin = async (loginCred: LoginCred, callback: (user: User) => void, fail: (errorcode: number) => void) => {
    try {
      let userCredential: UserCredential = await userLoginWithFirebase(loginCred);
      let _user = userCredential.user;
      if (_user.emailVerified) {
        setUser(_user);
        callback(_user);
        localStorage.setItem("login", "1");
      } else fail(0);
    } catch (error: any) {
      fail(1);
    }
  };

  let signinSocial = async (user: User, callback: () => void) => {
      setUser(user);
      callback();
      localStorage.setItem("login", "1");
  };

  let signout = (callback: VoidFunction) => {
    userLogout();
    setUser(null);
    localStorage.removeItem("login");
    callback();
  };

  let value = { user, signin, signinSocial, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
