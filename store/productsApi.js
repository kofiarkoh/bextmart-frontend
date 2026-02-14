import { apiSlice } from './apiSlice'
import { setProducts } from './productsSlice'

const PRODUCTS_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (params) => ({
        url: `${PRODUCTS_BASE_URL}/products/search`,
        method: 'GET',
        params,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const items = data?.data?.data || data?.data || data?.results || data || []
          dispatch(setProducts({ items, query: arg }))
        } catch {
          // no-op
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSearchProductsQuery } = productsApi
