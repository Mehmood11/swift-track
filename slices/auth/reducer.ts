import { createSlice } from "@reduxjs/toolkit";

import { loginSuccess, authMeSuccess } from "./extra-reducers";
import { authApi } from "@/services/auth/auth-api";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
    },
    isAuthenticatedUser: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, loginSuccess);
    builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, authMeSuccess);
  },
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
