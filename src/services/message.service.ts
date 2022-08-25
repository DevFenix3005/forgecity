import { format } from "date-fns";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../utils/firebase";
import { MessageProps, MessageBasic } from "../models/message.data";

const collectionName = "message";

export const getChatMessage = (
  currentUserId: string,
  callback: (message: MessageProps[]) => void
) => {
  const q = query(collection(db, collectionName), orderBy("createAt", "asc"));
  return onSnapshot(q, (querySnapshot) => {
    let messages: MessageProps[] = [];
    if (!querySnapshot.empty) {
      messages = querySnapshot.docs.map((data, _) => {
        let docData: DocumentData = data.data();
        console.log(docData);
        let docTimestamp = docData.createAt as Timestamp;
        let createAt = format(docTimestamp.toDate(), "yyyy-MM-dd HH:mm");
        let message: MessageProps = {
          id: data.id,
          createAt,
          kindOfMessage: docData.kindOfMessage,
          userName: docData.userName,
          userId: docData.userId,
          userPicUrl: docData.userPicUrl,
          content: docData.content,
          color: docData.color,
          thisIsMyMsg: docData.userId === currentUserId,
        };
        if (message.kindOfMessage === "image") {
          message.imgUrl = docData.imgUrl;
        }
        console.log(message);

        return message;
      });
    }
    callback(messages);
  });
};

export const sendMessage = async ({
  userId,
  userName,
  content,
  color,
  userPicUrl,
  imgUrl,
}: MessageBasic) => {
  let message: MessageProps = {
    userId,
    userName,
    content,
    userPicUrl,
    createAt: Timestamp.now(),
    kindOfMessage: "text",
    color: color,
  };
  if (imgUrl) {
    message.kindOfMessage = "image";
    message.imgUrl = imgUrl;
  }

  return await addDoc(collection(db, "message"), message);
};
