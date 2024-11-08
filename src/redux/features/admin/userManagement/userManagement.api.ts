import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/make-admin?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery, useMakeAdminMutation, useDeleteUserMutation } =
  userApi;
