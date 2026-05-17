import { apiSlice } from './apiSlice'
import { setCredentials, clearCredentials } from './authSlice'

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/auth/register`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const token = data?.data?.token || data?.token
          const user  = data?.data?.user  || data?.user
          if (token) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('auth_token', token)
              localStorage.setItem('yam-user', JSON.stringify(user))
            }
            dispatch(setCredentials({ token, user: user || null }))
          }
        } catch { /* no-op */ }
      },
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/auth/email/verify`,
        method: 'POST',
        body,
      }),
    }),
    resendEmailVerification: builder.mutation({
      query: () => ({
        url: `${AUTH_BASE_URL}/auth/email/resend`,
        method: 'POST',
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
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/auth/forgot-password`,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH_BASE_URL}/auth/reset-password`,
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendEmailVerificationMutation,
} = authApi
