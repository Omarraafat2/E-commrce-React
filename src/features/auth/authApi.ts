import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/store';

export const authApi = createApi({
reducerPath: 'authApi',
baseQuery: fetchBaseQuery({
  baseUrl: 'https://ecommerce.routemisr.com/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('token', token);
    }
    return headers;
  },
}),
endpoints: (builder) => ({
  signup: builder.mutation({
    query: (data) => ({
      url: '/auth/signup',
      method: 'POST',
      body: data,
    }),
  }),
  login: builder.mutation({
    query: (data) => ({
      url: '/auth/signin',
      method: 'POST',
      body: data,
    }),
  }),
  forgotPassword: builder.mutation({
    query: (data) => ({
      url: '/auth/forgot-password',
      method: 'POST',
      body: data,
    }),
  }),
  verifyResetCode: builder.mutation({
    query: (body) => ({
      url: '/auth/verifyResetCode',
      method: 'POST',
      body,
    }),
  }),
  resetPassword: builder.mutation({
    query: (body) => ({
      url: '/auth/resetPassword',
      method: 'PUT',
      body,
    }),
  }),
  changePassword: builder.mutation({
    query: ({ body }) => ({
      url: '/users/changeMyPassword',
      method: 'PUT',
      body,
    }),
  }),
  getAllUsers: builder.query({
    query: ({ limit = 10, keyword = '' }) => ({
      url: `/users?limit=${limit}&keyword=${keyword}`,
    }),
  }),
  verifyToken: builder.query({
    query: (token) => ({
      url: '/auth/verifyToken',
      method: 'GET',
      headers: { token },
    }),
  }),
  getAllCategories: builder.query<any, void>({
    query: () => ({
      url: '/categories',
      method: 'GET',
    }),
  }),
  getSubCategoriesByCategory: builder.query({
    query: (categoryId) => ({
      url: `/categories/${categoryId}/subcategories`,
      method: 'GET',
    }),
  }),
}),
});

export const {
useSignupMutation,
useLoginMutation,
useForgotPasswordMutation,
useVerifyResetCodeMutation,
useResetPasswordMutation,
useChangePasswordMutation,
useGetAllUsersQuery,
useVerifyTokenQuery,
useGetAllCategoriesQuery,
useGetSubCategoriesByCategoryQuery,
} = authApi;
