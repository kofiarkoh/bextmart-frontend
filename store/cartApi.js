import { apiSlice } from './apiSlice'
import { setCart } from './cartSlice'

const CART_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const normalizeCart = (data) => {
  const items =
    data?.data?.items ||
    data?.data?.data ||
    data?.data ||
    data?.items ||
    data?.cart ||
    []
  return {
    items: Array.isArray(items) ? items : [],
    meta: data?.data || data || null,
  }
}

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `${CART_BASE_URL}/cart`,
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCart(normalizeCart(data)))
        } catch {
          // no-op
        }
      },
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: `${CART_BASE_URL}/cart`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCart(normalizeCart(data)))
        } catch {
          // no-op
        }
      },
      invalidatesTags: ['Cart'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCartQuery, useAddToCartMutation } = cartApi
