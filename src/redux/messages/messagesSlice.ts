import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, DocumentReference } from "firebase/firestore";

import { RootState } from "../store";
import { MessageProps, MessageBasic } from "../../models/message.data";
import { sendMessage } from "../../services/message.service";

interface ChatState {
  messages: MessageProps[];
  sendigMessage: "pending" | "error" | "idle";
  scrollBlock: boolean;
}

const initialState: ChatState = {
  messages: [],
  sendigMessage: "idle",
  scrollBlock: true,
};

export const createMessageInChat = createAsyncThunk(
  "message/fetchMessage",
  async (action: MessageBasic) => {
    let data: DocumentReference<DocumentData> = await sendMessage(action);
    return data.id;
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<MessageProps[]>) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    toggleBlock: (state) => {
      state.scrollBlock = !state.scrollBlock;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMessageInChat.pending, (state, action) => {
        state.sendigMessage = "pending";
      })
      .addCase(createMessageInChat.fulfilled, (state, action) => {
        state.sendigMessage = "idle";
      })
      .addCase(createMessageInChat.rejected, (state, action) => {
        state.sendigMessage = "error";
      });
  },
});

export const { addMessages, clearMessages, toggleBlock } = messageSlice.actions;
export const selectMessages = (state: RootState) =>
  state.messageReducer.messages;
export const selectScrollBlock = (state: RootState) =>
  state.messageReducer.scrollBlock;
export default messageSlice.reducer;
