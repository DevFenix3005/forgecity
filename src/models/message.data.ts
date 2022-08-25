import { Timestamp } from "firebase/firestore";

export interface MessageBasic {
  userId: string;
  userName: string;
  content: string;
  color: string;
  userPicUrl?: string;
  imgUrl?: string;
}

export interface MessageProps extends MessageBasic {
  id?: string;
  kindOfMessage: "text" | "image";
  thisIsMyMsg?: boolean;
  createAt: Date | Timestamp | string;
}
