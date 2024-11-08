import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "order/create-order",
          method: "POST",
          body: data,
        };
      },
    }),
    getOrdersForUser: builder.query({
      query: () => {
        return {
          url: "order/user",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersForUserQuery } = productApi;
