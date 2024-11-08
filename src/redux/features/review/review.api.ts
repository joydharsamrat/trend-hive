import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => {
        return {
          url: "reviews/add-review",
          method: "POST",
          body: data,
        };
      },
    }),
    getProductReviews: builder.query({
      query: (id) => {
        return {
          url: `reviews/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddReviewMutation, useGetProductReviewsQuery } = productApi;
