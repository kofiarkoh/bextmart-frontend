import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useForgotPasswordMutation } from '../store/authApi'
import { notifyError, notifySuccess } from '../components/ultils/notify'
import Button from '../components/ultils/Button'

const inputStyle = {
  width: '100%', height: 44, padding: '0 12px', boxSizing: 'border-box',
  border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14,
  outline: 'none', background: '#fff', transition: 'border-color 0.15s',
}

export default function ForgotPasswordPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-forgot-password')
  }

  const router    = useRouter()
  const authToken = useSelector((s) => s.auth?.token)
  useEffect(() => { if (authToken) router.replace('/account') }, [authToken, router])

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  function isValidEmail(v) { return /\S+@\S+\.\S+/.test(v) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }
    setError(null)
    try {
      await forgotPassword({ email }).unwrap()
      notifySuccess('A 6-digit code has been sent to your email.', 'Code Sent')
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err) {
      const msg = err?.data?.message || 'Email not found. Please check and try again.'
      setError(msg)
      notifyError(msg)
    }
  }

  return (
    <>
      <Head><title>Forgot Password — Bextmart</title></Head>
      <Header />

      <main style={{ background: '#f5f5f5', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: '36px 32px' }}>

            {/* Icon + heading */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
                background: 'rgba(0,0,128,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>
                🔐
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color_heading)', margin: '0 0 8px' }}>
                Forgot your password?
              </h1>
              <p style={{ fontSize: 13, color: 'var(--color_body)', margin: 0, lineHeight: 1.65 }}>
                Enter your email and we&apos;ll send you a 6-digit reset code. The code expires in 10 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoFocus
                  autoComplete="email"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                  onBlur={(e)  => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {error && (
                <p style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030', fontSize: 13, padding: '9px 12px', borderRadius: 6, margin: '0 0 16px', lineHeight: 1.5 }}>
                  {error}
                </p>
              )}

              <Button type="submit" loading={isLoading} label="Send Reset Code" size="full" />
            </form>

            <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
              <Link href="/account-login" style={{ fontSize: 13, color: 'var(--color_primary)', fontWeight: 500 }}>
                ← Back to Sign In
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
