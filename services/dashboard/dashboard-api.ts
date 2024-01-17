import { baseApi } from "../base-api";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardList: builder.query({
      query: ({ type }) => ({
        url: `revenue?type=${type}`,
        method: "GET",
        params: { type },
      }),
    }),
  }),
});

export const { useDashboardListQuery, useLazyDashboardListQuery } =
  dashboardApi;
