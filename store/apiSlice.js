import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    // Add endpoints here. Example:
    // getProducts: builder.query({
    //   query: () => '/products',
    // }),
  }),
})
