// services/productsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse, AllProductsResponse } from "../Interfaces/Product";

interface ProductQueryParams {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1",
  }),
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllProductsResponse, ProductQueryParams>({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query<ProductResponse, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    getProductsByCategory: builder.query<AllProductsResponse, string>({
      query: (slug) => `/products?category=${slug}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
