import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => {
        return {
          url: `/order/admin`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/order/status/admin/${id}`,
          method: "PUT",
          body: { status },
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } =
  productApi;
