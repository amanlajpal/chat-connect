import connectionStatusSlice from "./connectionStatusSlice";
import stompClientSlice from "./stompClientSlice";
import { configureStore } from "@reduxjs/toolkit";
import usernameSlice from "./usernameSlice";

const store = configureStore({
  reducer: {
    connectionStatus: connectionStatusSlice?.reducer,
    stompClient: stompClientSlice?.reducer,
    username: usernameSlice?.reducer,
  },
});

export default store;