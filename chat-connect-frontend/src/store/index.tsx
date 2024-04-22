import connectionStatusSlice from "./connectionStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import chatsSlice from "./chatsSlice";
import userSlice from "./userSlice";
import conversationSlice from "./conversationSlice";
import authenticationSlice from "./authenticationSlice";

const store = configureStore({
  reducer: {
    chats: chatsSlice.reducer,
    connectionStatus: connectionStatusSlice.reducer,
    user: userSlice.reducer,
    conversation: conversationSlice.reducer,
    authentication: authenticationSlice.reducer,
  },
});

export default store;
