import { BASE_URL } from "@/config";
import type { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const REPORTS: any = "REPORTS";
export const ORDERS: any = "ORDERS";
export const PROFILE: any = "PROFILE";

const TAGS: any = [REPORTS, ORDERS, PROFILE];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("ngrok-skip-browser-warning", "69420");
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
