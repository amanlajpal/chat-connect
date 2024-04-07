import { createSlice } from "@reduxjs/toolkit";

const connectionStatusSlice = createSlice({
  name: "connectionStatus",
  initialState: {
    value: "disconnected",
    message: "No connection",
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      return {
        ...state,
        value: action?.payload,
      };
    },
    reset: (state) => {
      state.value = "disconnected";
      state.message = "No connection";
    },
  },
});

export const { setConnectionStatus, reset } = connectionStatusSlice.actions;

export default connectionStatusSlice;
