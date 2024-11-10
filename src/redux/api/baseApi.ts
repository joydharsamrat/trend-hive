import envConfig from "@/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["products", "cart", "users", "categories"],
});
