import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './apiSlice'
import authReducer, { setCredentials } from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token')
  const storedUser = localStorage.getItem('yam-user')
  const user = storedUser ? JSON.parse(storedUser) : null
  if (token || user) {
    store.dispatch(setCredentials({ token, user }))
  }
}
