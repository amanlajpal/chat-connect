import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
  name: "username",
  initialState: {
    value: undefined
  },
  reducers: {
    setUsername: (state, action) => {
      state.value = action?.payload;
    },
    reset: (state) => {
      state.value = undefined;
    },
  },
});

export const { setUsername, reset } = usernameSlice.actions;

export default usernameSlice;
