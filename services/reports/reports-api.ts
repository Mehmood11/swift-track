import { REPORTS, baseApi } from "../base-api";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reportsList: builder.query({
      query: ({ paramsData }: any) => ({
        url: "reports",
        method: "GET",
        params: paramsData,
      }),
      providesTags: [REPORTS],
    }),
    deleteReport: builder.mutation({
      query: ({ id }: any) => ({
        url: `reports`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [REPORTS],
    }),
    applyFilterReport: builder.mutation({
      query: ({ body }: any) => ({
        url: "reports",
        method: "POST",
        body,
      }),
      invalidatesTags: [REPORTS],
    }),
  }),
});

export const {
  useReportsListQuery,
  useDeleteReportMutation,
  useApplyFilterReportMutation,
} = reportsApi;
