import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ecommerce.routemisr.com/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('token', token);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    addToWishlist: builder.mutation<any, string>({
      query: (productId) => ({
        url: `/wishlist`,
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),

    getWishlist: builder.query<any, void>({
      query: () => ({
        url: `/wishlist`,
        method: 'GET',
      }),
      providesTags: ['Wishlist'],
    }),

    removeFromWishlist: builder.mutation<any, string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;
