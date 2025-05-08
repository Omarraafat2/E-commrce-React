import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../Store/store";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("token", token);
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getUserCart: builder.query<CartResponse, void>({
      query: () => "cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<CartResponse, string>({
      query: (productId) => ({
        url: "cart",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<CartResponse, string>({
      query: (productId) => ({
        url: `cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<CartResponse, { productId: string; count: number }>({
      query: ({ productId, count }) => ({
        url: `cart/${productId}`,
        method: "PUT",
        body: { count },
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    checkoutSession: builder.mutation({
      query: ({ cartId, shippingAddress }) => ({
        url: `orders/checkout-session/${cartId}`,
        method: 'POST',
        params: {
          url: window.location.origin,
        },
        body: { shippingAddress },

      }),
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useClearCartMutation,
  useCheckoutSessionMutation,
} = cartApi;

interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: {
      count: number;
      _id: string;
      product: {
        _id: string;
        title: string;
        imageCover: string;
        price: number;
      };
      price: number;
    }[];
    totalCartPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// interface ShippingAddress {
//   details: string;
//   phone: string;
//   city: string;
// }
