import connectionStatusSlice from "./connectionStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import usernameSlice from "./usernameSlice";
import chatsSlice from "./chatsSlice";

const store = configureStore({
  reducer: {
    chats: chatsSlice.reducer,
    connectionStatus: connectionStatusSlice.reducer,
    username: usernameSlice.reducer,
  },
});

export default store;
