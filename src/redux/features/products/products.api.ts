import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({
        searchTerm,
        category,
        sort,
        page,
        limit,
      }: {
        searchTerm: string;
        category: string;
        sort: "asc" | "desc";
        page: number;
        limit: number;
      }) => {
        const params = new URLSearchParams();

        // Add search term if available
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        // Add categories
        if (category) {
          params.append("categories", category);
        }

        // Add sort order
        if (sort) {
          params.append("sort", sort);
        }

        // Add pagination
        if (page) {
          params.append("page", page.toString());
        }
        if (limit) {
          params.append("limit", limit.toString());
        }

        return {
          url: `products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
