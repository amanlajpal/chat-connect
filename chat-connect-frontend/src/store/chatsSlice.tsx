import { createSlice } from "@reduxjs/toolkit";

export interface Chat {
  selected?: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  name?: string;
  phoneNumber: string;
  profilePhoto?: string;
}
const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    value: [] as Chat[],
  },
  reducers: {
    joinChat: (state, action) => {
      const { lastMessage, lastMessageTime, name, profilePhoto, phoneNumber } =
        action?.payload;
      state.value.push({
        lastMessage,
        lastMessageTime,
        name,
        profilePhoto,
        phoneNumber,
        selected: false,
      });
    },
    leaveChat: (state, action) => {
      const phoneNumberOfLeaver: string = action?.payload;
      state.value = state.value.filter(
        (chat: any) => chat.phoneNumber !== phoneNumberOfLeaver
      );
    },
    setFetchedChats: (state, action) => {
      state.value = action?.payload;
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
        foundChat.messages = [...(foundChat?.messages || []), action?.payload];
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
        foundChat.messages = [...(foundChat?.messages || []), action?.payload];
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

export const {
  joinChat,
  leaveChat,
  setSelectedChat,
  addChatMessage,
  addChatMessageSentBySender,
  reset,
  setFetchedChats
} = chatsSlice.actions;

export default chatsSlice;
