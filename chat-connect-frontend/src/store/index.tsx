import connectionStatusSlice from "./connectionStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import usernameSlice from "./usernameSlice";
import chatsSlice from "./chatsSlice";
import userSlice from "./userSlice";
import conversationSlice from "./conversationSlice";

const store = configureStore({
  reducer: {
    chats: chatsSlice.reducer,
    connectionStatus: connectionStatusSlice.reducer,
    username: usernameSlice.reducer,
    user: userSlice.reducer,
    conversation: conversationSlice.reducer,
  },
});

export default store;
