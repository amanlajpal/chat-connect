import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  id: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  email: null,
  profilePhoto: null,
  createdAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialUserState,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action?.payload;
    },
    reset: (state) => {
      state.value = initialUserState;
    },
  },
});

export const { setUser, reset } = userSlice.actions;

export default userSlice;
