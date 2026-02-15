import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  lastQuery: null,
  selected: null,
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
    setSelectedProduct(state, action) {
      state.selected = action.payload || null
    },
    clearProducts(state) {
      state.items = []
      state.lastQuery = null
    },
    clearSelectedProduct(state) {
      state.selected = null
    },
  },
})

export const {
  setProducts,
  setSelectedProduct,
  clearProducts,
  clearSelectedProduct,
} = productsSlice.actions
export default productsSlice.reducer
