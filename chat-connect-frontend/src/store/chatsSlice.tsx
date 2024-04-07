import { Chat } from "@/interfaces/Chat";
import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    value: [] as Chat[],
  },
  reducers: {
    joinChat: (state, action) => {
      const {
        lastMessage,
        lastMessageTime,
        name,
        profilePhoto,
        phoneNumber,
        id,
      } = action?.payload;
      if (state.value.find((chat: any) => chat?.id === id)) return; // Prevent duplicate chats
      state.value.push({
        lastMessage,
        lastMessageTime,
        name,
        profilePhoto,
        phoneNumber,
        id,
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
        if (chat?.phoneNumber === action?.payload?.phoneNumber) {
          chat.selected = true;
        } else {
          chat.selected = false;
        }
        return chat;
      });
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
  reset,
  setFetchedChats,
} = chatsSlice.actions;

export default chatsSlice;
