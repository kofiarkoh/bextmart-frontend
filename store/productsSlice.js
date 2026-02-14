import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  lastQuery: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      const { items, query } = action.payload || {}
      state.items = Array.isArray(items) ? items : []
      state.lastQuery = query ?? null
    },
    clearProducts(state) {
      state.items = []
      state.lastQuery = null
    },
  },
})

export const { setProducts, clearProducts } = productsSlice.actions
export default productsSlice.reducer
