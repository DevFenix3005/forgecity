import { RefObject } from "react";
import { MessageProps } from "./message.data";

export interface MessageViewProps {
  messages: MessageProps[];
}

export interface MessageViewState {
  chatBoxRef?: RefObject<HTMLElement>;
}
