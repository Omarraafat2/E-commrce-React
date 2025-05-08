import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Brand } from '../../Interfaces/Brand';

export interface BrandResponse {
  status: string;
  results: number;
  data: Brand[];
}

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ecommerce.routemisr.com/api/v1/',
  }),
  tagTypes: ['Brand'],
  endpoints: (builder) => ({
    // GET ALL BRANDS
    getAllBrands: builder.query<BrandResponse, { limit?: number; keyword?: string } | void>({
      query: (params) => {
        const parts: string[] = [];
        if (params?.limit) parts.push(`limit=${params.limit}`);
        if (params?.keyword) parts.push(`keyword=${params.keyword}`);
        const qs = parts.length ? `?${parts.join('&')}` : '';
        return `brands${qs}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((b) => ({ type: 'Brand' as const, id: b._id })),
              { type: 'Brand', id: 'LIST' },
            ]
          : [{ type: 'Brand', id: 'LIST' }],
    }),

    // GET BRAND BY ID
    getBrandById: builder.query<Brand, string>({
      query: (id) => `brands/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Brand' as const, id }],
    }),
  }),
});

export const { useGetAllBrandsQuery, useGetBrandByIdQuery } = brandApi;
