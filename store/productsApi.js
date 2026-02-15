import { apiSlice } from './apiSlice'
import { setProducts, setSelectedProduct } from './productsSlice'

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
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_BASE_URL}/products/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const product = data?.data || data?.product || data || null
          dispatch(setSelectedProduct(product))
        } catch {
          // no-op
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSearchProductsQuery, useGetProductQuery } = productsApi
