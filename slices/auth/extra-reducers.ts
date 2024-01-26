import { setSessionStorage } from "@/utils/session-storage";
import type { PayloadAction } from "@reduxjs/toolkit";

type LoginAction = PayloadAction<any>;

export const loginSuccess = (state: any, action: LoginAction): void => {
  const { access_token, refresh_token } = action.payload;

  state.accessToken = access_token;
  state.refreshToken = refresh_token;
  state.isAuthenticated = true;

  setSessionStorage("accessToken", access_token);
  setSessionStorage("refreshToken", refresh_token);
};

export const authMeSuccess = (state: any, action: LoginAction): void => {
  const { access_token, refresh_token } = action.payload;

  state.accessToken = access_token;
  state.refreshToken = refresh_token;
  state.isAuthenticated = true;

  setSessionStorage("accessToken", access_token);
  setSessionStorage("refreshToken", refresh_token);
};
