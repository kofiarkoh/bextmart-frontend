import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  meta: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      const { items, meta } = action.payload || {}
      state.items = Array.isArray(items) ? items : []
      state.meta = meta ?? null
    },
    clearCart(state) {
      state.items = []
      state.meta = null
    },
  },
})

export const { setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
