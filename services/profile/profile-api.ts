import { PROFILE, baseApi } from "../base-api";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profileList: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: [PROFILE],
    }),
    updateProfile: builder.mutation({
      query: ({ body }: any) => ({
        url: "user/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: [PROFILE],
    }),
  }),
});

export const { useProfileListQuery, useUpdateProfileMutation } = profileApi;
