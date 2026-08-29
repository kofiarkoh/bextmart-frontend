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
    getCheckoutSummary: builder.query({
      query: ({ cityId, deliveryTypeId }) => ({
        url: `${BASE_URL}/checkout/summary?city_id=${cityId}&delivery_type_id=${deliveryTypeId}`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAddressOptionsQuery,
  useProcessPaymentMutation,
  useGetPaymentStatusQuery,
  useGetCheckoutSummaryQuery,
} = checkoutApi
