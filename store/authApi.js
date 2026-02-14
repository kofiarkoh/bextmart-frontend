import { apiSlice } from './apiSlice'
import { setCredentials, clearCredentials } from './authSlice'

const AUTH_BASE_URL = 'http://127.0.0.1:8000/api'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/auth/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/auth/login`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data?.token) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('auth_token', data.token)
            }
            dispatch(setCredentials({ token: data.token, user: data.user || null }))
          }
        } catch {
          // no-op
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_BASE_URL}/auth/logout`,
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } finally {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
          }
          dispatch(clearCredentials())
        }
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: `${AUTH_BASE_URL}/auth/me`,
        method: 'GET',
      }),
      providesTags: ['Me'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: data }))
        } catch {
          // no-op
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi
