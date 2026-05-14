import { apiSlice } from './apiSlice'
import { clearCart } from './cartSlice'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddressOptions: builder.query({
      query: () => ({
        url: `${BASE_URL}/checkout/address-options`,
        method: 'GET',
      }),
    }),
    confirmAddress: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/checkout/confirm-address`,
        method: 'POST',
        body,
      }),
    }),
    getCheckoutSummary: builder.query({
      query: () => ({
        url: `${BASE_URL}/checkout/summary`,
        method: 'GET',
      }),
    }),
    processPayment: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/checkout/process-payment`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(clearCart())
        } catch {
          // no-op
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAddressOptionsQuery,
  useConfirmAddressMutation,
  useGetCheckoutSummaryQuery,
  useProcessPaymentMutation,
} = checkoutApi
