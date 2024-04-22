import Conversation from "@/interfaces/Conversation";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  id: 1,
} as Conversation;

const conversationSlice = createSlice({
  name: "chats",
  initialState: {
    value: initialState,
  },
  reducers: {
    updateConversation: (state, action) => {
      const conversation = action?.payload;
      state.value = { ...conversation };
    },
    setMessage: (state, action) => {
      const message = action?.payload;
      state.value.messages = state?.value?.messages
        ? [...state?.value?.messages, message]
        : [message];
    },
    reset: (state) => {
      state.value = initialState;
    },
  },
});

export const { updateConversation, setMessage, reset } =
  conversationSlice.actions;

export default conversationSlice;
