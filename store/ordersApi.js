import { apiSlice } from './apiSlice'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (page = 1) => ({
        url: `${BASE_URL}/orders?page=${page}`,
        method: 'GET',
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/orders/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetOrdersQuery, useGetOrderQuery } = ordersApi
