import { ORDERS, baseApi } from "../base-api";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ordersList: builder.query({
      query: ({ paramsData }: any) => ({
        url: "orders",
        method: "GET",
        params: paramsData,
      }),
      providesTags: [ORDERS],
    }),
    postOrders: builder.mutation({
      query: ({ body }: any) => ({
        url: "orders",
        method: "POST",
        body,
      }),
      invalidatesTags: [ORDERS],
    }),
    deleteOrders: builder.mutation({
      query: ({ order_id }: any) => ({
        url: `orders/${order_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ORDERS],
    }),
    updateOrders: builder.mutation({
      query: ({ order_id, body }: any) => ({
        url: `orders/${order_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [ORDERS],
    }),
    vehiclesList: builder.query({
      query: () => ({
        url: `vehicles?is_page=false`,
        method: "GET",
      }),
    }),
    clientList: builder.query({
      query: () => ({
        url: "clients?is_page=false",
        method: "GET",
      }),
    }),
    driversList: builder.query({
      query: () => ({
        url: "drivers?is_page=false",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useOrdersListQuery,
  usePostOrdersMutation,
  useDeleteOrdersMutation,
  useUpdateOrdersMutation,
  useVehiclesListQuery,
  useClientListQuery,
  useDriversListQuery,
  useLazyClientListQuery,
  useLazyVehiclesListQuery,
  useLazyDriversListQuery,
} = orderApi;
