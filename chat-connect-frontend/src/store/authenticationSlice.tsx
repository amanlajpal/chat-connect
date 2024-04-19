import { createSlice } from "@reduxjs/toolkit";

const initialAuthenticationState = {
  isAuthenticated: false,
  isTokenVerified: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    value: initialAuthenticationState,
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.value = action?.payload;
    },
    reset: (state) => {
      state.value = initialAuthenticationState;
    },
  },
});

export const { setAuthentication, reset } = authenticationSlice.actions;

export default authenticationSlice;
