import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  sendEmailVerification,
  sendPasswordResetEmail,
  NextOrObserver,
  ErrorFn,
  CompleteFn,
} from "firebase/auth";

import { LoginCred } from "../models/login.data";
import { UserSingUp } from "../models/user-signup.data";
import { auth } from "../utils/firebase";

export const userLoginWithFirebase = async (userCredentials: LoginCred) => {
  return await signInWithEmailAndPassword(
    auth,
    userCredentials.email,
    userCredentials.password
  );
};

export const createUser = async (userCredentials: UserSingUp) => {
  return await createUserWithEmailAndPassword(
    auth,
    userCredentials.email,
    userCredentials.password
  );
};

export const emailVerification = async (user: User) => {
  return await sendEmailVerification(user);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const authState = (
  next: NextOrObserver<User | null>,
  error?: ErrorFn,
  complete?: CompleteFn
) => {
  return auth.onAuthStateChanged(next, error, complete);
};

export const userLogout = async () => {
  return await auth.signOut();
};

export const forgottePassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
