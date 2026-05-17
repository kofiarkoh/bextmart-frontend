import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLoginMutation } from '../store/authApi'
import { setCredentials } from '../store/authSlice'

const Eye = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOff = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

export default function LoginPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-account-login')
  }

  const router    = useRouter()
  const dispatch  = useDispatch()
  const authToken = useSelector((s) => s.auth?.token)

  const [mode, setMode]                 = useState('login')
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPw, setShowPw]             = useState(false)
  const [resetEmail, setResetEmail]     = useState('')
  const [resetSent, setResetSent]       = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [error, setError]               = useState(null)

  const [login, { isLoading: loggingIn }] = useLoginMutation()

  useEffect(() => {
    if (authToken) router.replace('/account')
  }, [authToken, router])

  function isEmail(v) { return /\S+@\S+\.\S+/.test(v) }

  function switchMode(m) { setMode(m); setError(null); setResetSent(false) }

  async function handleLogin(e) {
    e.preventDefault()
    if (!isEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!password)       { setError('Please enter your password.'); return }
    setError(null)
    try {
      const res   = await login({ email, password }).unwrap()
      const token = res?.token || res?.data?.token
      const user  = res?.user  || res?.data?.user
      if (token) {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('yam-user', JSON.stringify(user))
        dispatch(setCredentials({ token, user: user || null }))
      }
      router.push('/account')
    } catch (err) {
      setError(err?.data?.message || 'Invalid email or password.')
    }
  }

  async function handleReset(e) {
    e.preventDefault()
    if (!isEmail(resetEmail)) { setError('Please enter a valid email address.'); return }
    setError(null)
    setResetLoading(true)
    setTimeout(() => { setResetLoading(false); setResetSent(true) }, 1500)
  }

  if (authToken) return null

  return (
    <>
      <Head><title>Sign In — Bextmart</title></Head>
      <Header />

      <main style={{ background: '#f5f5f5', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Sign in card */}
          {mode === 'login' && (
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: '36px 36px 28px' }}>
              <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--color_heading)', margin: '0 0 24px', textAlign: 'center' }}>
                Sign in
              </h1>

              <form onSubmit={handleLogin} noValidate>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#333', marginBottom: 6 }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email here"
                    autoComplete="email"
                    autoFocus
                    style={{
                      width: '100%', height: 44, padding: '0 12px',
                      border: '1px solid #ccc', borderRadius: 4,
                      fontSize: 14, outline: 'none', boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                    onBlur={(e)  => e.target.style.borderColor = '#ccc'}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>Password</label>
                    <button
                      type="button"
                      onClick={() => switchMode('reset')}
                      style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--color_primary)', cursor: 'pointer', padding: 0 }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      style={{
                        width: '100%', height: 44, padding: '0 42px 0 12px',
                        border: '1px solid #ccc', borderRadius: 4,
                        fontSize: 14, outline: 'none', boxSizing: 'border-box',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                      onBlur={(e)  => e.target.style.borderColor = '#ccc'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      tabIndex={-1}
                      style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#888', padding: 0, display: 'flex', alignItems: 'center',
                      }}
                    >
                      {showPw ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p style={{
                    background: '#fff5f5', border: '1px solid #fed7d7',
                    color: '#c53030', fontSize: 13, padding: '9px 12px',
                    borderRadius: 4, margin: '0 0 16px', lineHeight: 1.5,
                  }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loggingIn}
                  style={{
                    width: '100%', height: 44, borderRadius: 4, border: 'none',
                    background: loggingIn ? '#4444aa' : 'var(--color_primary)',
                    color: '#fff', fontSize: 15, fontWeight: 600,
                    cursor: loggingIn ? 'wait' : 'pointer',
                    transition: 'background 0.2s', letterSpacing: '0.02em',
                  }}
                >
                  {loggingIn ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <div style={{ borderTop: '1px solid #eee', marginTop: 24, paddingTop: 20, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
                  New customer?{' '}
                  <Link href="/account-register" style={{ color: 'var(--color_primary)', fontWeight: 600 }}>
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Reset password card */}
          {mode === 'reset' && (
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: '36px 36px 28px' }}>
              <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--color_heading)', margin: '0 0 8px', textAlign: 'center' }}>
                Reset password
              </h1>
              <p style={{ fontSize: 13, color: '#666', margin: '0 0 24px', textAlign: 'center', lineHeight: 1.6 }}>
                We&apos;ll email you a link to reset your password.
              </p>

              {resetSent ? (
                <div style={{
                  background: '#f0fff4', border: '1px solid #9ae6b4',
                  color: '#276749', padding: '14px 16px',
                  borderRadius: 4, fontSize: 14, lineHeight: 1.6, textAlign: 'center', marginBottom: 20,
                }}>
                  ✓ Check your email for a reset link.
                </div>
              ) : (
                <form onSubmit={handleReset} noValidate>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#333', marginBottom: 6 }}>
                      Email address
                    </label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="enter your email here"
                      autoFocus
                      style={{
                        width: '100%', height: 44, padding: '0 12px',
                        border: '1px solid #ccc', borderRadius: 4,
                        fontSize: 14, outline: 'none', boxSizing: 'border-box',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                      onBlur={(e)  => e.target.style.borderColor = '#ccc'}
                    />
                  </div>

                  {error && (
                    <p style={{
                      background: '#fff5f5', border: '1px solid #fed7d7',
                      color: '#c53030', fontSize: 13, padding: '9px 12px',
                      borderRadius: 4, margin: '0 0 16px', lineHeight: 1.5,
                    }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={resetLoading}
                    style={{
                      width: '100%', height: 44, borderRadius: 4, border: 'none',
                      background: resetLoading ? '#4444aa' : 'var(--color_primary)',
                      color: '#fff', fontSize: 15, fontWeight: 600,
                      cursor: resetLoading ? 'wait' : 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    {resetLoading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                </form>
              )}

              <div style={{ borderTop: '1px solid #eee', marginTop: 24, paddingTop: 20, textAlign: 'center' }}>
                <button
                  onClick={() => switchMode('login')}
                  style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--color_primary)', cursor: 'pointer', fontWeight: 600 }}
                >
                  ← Back to sign in
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}
