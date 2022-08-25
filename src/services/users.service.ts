import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

import { db } from "../utils/firebase";
import { UserDetail } from "../models/userdetail";

const collectionName = "userdetails";
const collectionUsersDetail = collection(db, collectionName);

export const getUsers = (callback: (users: UserDetail[]) => void) => {
  const q = query(collectionUsersDetail, orderBy("username", "asc"));
  return onSnapshot(q, (querySnapshot) => {
    const users = querySnapshot.docs.map((data, _) => {
      let docData: DocumentData = data.data();
      let user: UserDetail = {
        uid: docData.uid,
        email: docData.email,
        birthday: docData.birthday,
        color: docData.color,
        fullname: docData.fullname,
        picUrl: docData.picUrl,
        username: docData.username,
      };
      return user;
    });
    callback(users);
  });
};

export const addUserDetail = async (userdetail: UserDetail) => {
  return await setDoc(doc(collectionUsersDetail, userdetail.uid), userdetail);
};

export const fetchUserDetail = async (uid: string) => {
  let snapshot = await getDoc(doc(collectionUsersDetail, uid));
  if (snapshot.exists()) {
    return snapshot.data() as UserDetail;
  } else {
    throw new Error(`El usuario con el uid ${uid} no existe`);
  }
};

export const existUserDetail = async (uid: string) => {
  let snapshot = await getDoc(doc(collectionUsersDetail, uid));
  return snapshot.exists();
};
