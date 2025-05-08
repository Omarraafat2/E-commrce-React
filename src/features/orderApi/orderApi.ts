// src/features/orderApi/orderApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IShippingAddress } from '../../Interfaces/IShipping';

export const orderApi = createApi({
  reducerPath: 'orderApi',
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
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      { session: { url: string } },
      { cartId: string; returnUrl: string; shippingAddress: IShippingAddress } // أضفنا shippingAddress هنا
    >({
      query: ({ cartId, returnUrl, shippingAddress }) => ({
        url: `/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
        method: 'POST',
        body: { cartId, returnUrl, shippingAddress }, // إرسال shippingAddress في الطلب
      }),
    }),

    getUserOrders: builder.query<any, string>({ // string = userId
      query: (userId) => ({
        url: `/orders/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useCreateCheckoutSessionMutation,
  useGetUserOrdersQuery,
} = orderApi;
