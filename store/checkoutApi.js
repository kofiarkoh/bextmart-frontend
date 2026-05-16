import { apiSlice } from './apiSlice'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddressOptions: builder.query({
      query: () => ({
        url: `${BASE_URL}/checkout/address-options`,
        method: 'GET',
      }),
    }),
    processPayment: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/checkout/process-payment`,
        method: 'POST',
        body,
      }),
    }),
    getPaymentStatus: builder.query({
      query: (orderId) => ({
        url: `${BASE_URL}/orders/${orderId}/payment-status`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAddressOptionsQuery,
  useProcessPaymentMutation,
  useGetPaymentStatusQuery,
} = checkoutApi
