import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

export const uploadFile = async (refName: string, file: File) => {
  const storageRef = ref(storage, refName);
  return await uploadBytes(storageRef, file);
};

export const getFileUrl = async (refName: string) => {
  const storageRef = ref(storage, refName);
  return await getDownloadURL(storageRef);
};
