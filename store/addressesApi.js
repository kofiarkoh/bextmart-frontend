import { apiSlice } from './apiSlice'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const addressesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: `${BASE_URL}/addresses`,
        method: 'GET',
      }),
      providesTags: ['Addresses'],
    }),
    getAddress: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/addresses/${id}`,
        method: 'GET',
      }),
      providesTags: ['Addresses'],
    }),
    createAddress: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/addresses`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Addresses'],
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}/addresses/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Addresses'],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAddressesQuery,
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressesApi
