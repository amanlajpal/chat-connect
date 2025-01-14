import Conversation from "@/interfaces/Conversation";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      messageText: "Hi Deep!",
      fromNumber: "1234567890",
      status: "SENT",
      conversationId: 1,
    },
    {
      messageText: "Hello Aman!",
      fromNumber: "0987654321",
      status: "SENT",
      conversationId: 1,
    },
    {
      messageText: "How are you?",
      fromNumber: "1234567890",
      status: "DELIVERED",
      conversationId: 1,
    },
    {
      messageText: "I am good!",
      fromNumber: "0987654321",
      status: "SENT",
      conversationId: 1,
    },
    {
      messageText: "How about you?",
      fromNumber: "0987654321",
      status: "DELIVERED",
      conversationId: 1,
    },
    {
      messageText: "I am good too!",
      fromNumber: "1234567890",
      status: "SENT",
      conversationId: 1,
    },
  ],
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
