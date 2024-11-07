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
  }),
});

export const { useCreateOrderMutation } = productApi;
