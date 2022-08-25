import { socialAuth, auth } from "../utils/firebase";
let { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } = socialAuth;

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: "popup",
});
facebookProvider.addScope("user_birthday");

export const singInWithGooglePopup = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const singInWithFacebookPopup = async () => {
  return await signInWithPopup(auth, facebookProvider);
};
