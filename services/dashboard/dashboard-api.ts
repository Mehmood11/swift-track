import { baseApi } from "../base-api";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardList: builder.query({
      query: () => ({
        url: "revenue",
        method: "GET",
      }),
    }),
  }),
});

export const { useDashboardListQuery } = dashboardApi;
