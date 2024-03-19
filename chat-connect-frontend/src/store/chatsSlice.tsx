import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    value: [
        // {
        //     sender: "ChatConnect",
        //     content: "Welcome to ChatConnect!",
        //     type: "JOIN",
        // },
    ],
  },
  reducers: {
    joinChat: (state, action) => {
      if (
        !state.value.find(
          (chat: any) => chat.sender === action?.payload?.sender
        )
      ){
        state.value = [action?.payload, ...state.value];
      }
    },
    leaveChat: (state, action) => {
      state.value = state.value.filter(
        (chat: any) => chat.sender !== action?.payload?.sender
      );
    },
    setSelectedChat: (state, action) => {
      state.value = state.value.map((chat: any) => {
        if (chat.sender === action?.payload?.sender) {
          chat.isSelected = true;
        } else {
          chat.isSelected = false;
        }
        return chat;
      });
    },
    addChatMessage: (state, action) => {
      const foundChat = state.value.find(
        (chat: any) => chat.sender === action?.payload?.sender
      );
      if (foundChat) {
        foundChat.messages = [
          ...(foundChat?.messages || []),
          action?.payload,
        ];
      } else {
        state.value = [
          ...state.value,
          {
            sender: action?.payload?.sender,
            messages: [action?.payload],
          },
        ];
      }
    },
    addChatMessageSentBySender: (state, action) => {
      const foundChat = state.value.find(
        (chat: any) => chat.sender === action?.payload?.receiver
      );
      if (foundChat) {
        foundChat.messages = [
          ...(foundChat?.messages || []),
          action?.payload,
        ];
      } else {
        state.value = [
          ...state.value,
          {
            sender: action?.payload?.receiver,
            messages: [action?.payload],
          },
        ];
      }
    },
    reset: (state) => {
      state.value = [];
    },
  },
});

export const { joinChat, leaveChat, setSelectedChat, addChatMessage, addChatMessageSentBySender, reset } =
  chatsSlice.actions;

export default chatsSlice;
