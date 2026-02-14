import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, user } = action.payload || {}
      state.token = token ?? state.token
      state.user = user ?? state.user
    },
    clearCredentials(state) {
      state.token = null
      state.user = null
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
