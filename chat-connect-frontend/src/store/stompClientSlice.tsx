import { createSlice } from "@reduxjs/toolkit";

const stompClientSlice = createSlice({
  name: "stompClient",
  initialState: {
    value: undefined,
  },
  reducers: {
    setStompClient: (state, action) => {
      state.value = action?.payload;
    },
    reset: (state) => {
      state.value = undefined;
    },
  },
});

export const { setStompClient, reset } = stompClientSlice.actions;

export default stompClientSlice;
