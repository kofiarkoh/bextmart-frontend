import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useVerifyEmailMutation, useResendEmailVerificationMutation } from '../store/authApi'
import { notifyError, notifySuccess } from '../components/ultils/notify'

// ─── OTP input ────────────────────────────────────────────────────────────────

function OtpInput({ value, onChange }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const digits = value.padEnd(6, ' ').split('').slice(0, 6)

  function handleKey(i, e) {
    if (e.key === 'Backspace') {
      onChange(value.slice(0, i))
      if (i > 0) refs[i - 1].current?.focus()
      return
    }
    if (!/^\d$/.test(e.key)) return
    const next = value.slice(0, i) + e.key
    onChange(next)
    if (i < 5) refs[i + 1].current?.focus()
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) { onChange(pasted); refs[Math.min(pasted.length, 5)].current?.focus() }
    e.preventDefault()
  }

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {digits.map((d, i) => {
        const filled = d.trim() !== ''
        return (
          <input
            key={i}
            ref={refs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={filled ? d : ''}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            onChange={() => {}}
            onClick={() => refs[i].current?.select()}
            style={{
              width: 46, height: 54, textAlign: 'center',
              fontSize: 22, fontWeight: 700,
              border: `2px solid ${filled ? 'var(--color_primary)' : '#e5e7eb'}`,
              borderRadius: 10, outline: 'none',
              background: filled ? 'rgba(0,0,128,0.04)' : '#fff',
              transition: 'all 0.15s', caretColor: 'transparent',
              color: 'var(--color_heading)',
            }}
          />
        )
      })}
    </div>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function VerifyEmailPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-verify-email')
  }

  const router    = useRouter()
  const authToken = useSelector((s) => s.auth?.token)
  const authUser  = useSelector((s) => s.auth?.user)

  const [otp, setOtp]                   = useState('')
  const [error, setError]               = useState(null)
  const [resendStatus, setResendStatus] = useState(null) // null | 'sending' | 'sent'

  const [verifyEmail,  { isLoading: verifying }]   = useVerifyEmailMutation()
  const [resendEmail,  { isLoading: resending }]   = useResendEmailVerificationMutation()

  // If not logged in, they shouldn't be here
  useEffect(() => {
    if (!authToken) router.replace('/account-register')
  }, [authToken, router])

  async function handleVerify(e) {
    e.preventDefault()
    if (otp.length < 6) { setError('Please enter the full 6-digit code.'); return }
    setError(null)
    try {
      await verifyEmail({ otp }).unwrap()
      notifySuccess('Your email has been verified successfully.', 'Email Verified')
      router.push('/account')
    } catch (err) {
      const msg = err?.data?.message || 'Invalid or expired code. Please try again.'
      setError(msg)
      notifyError(msg)
    }
  }

  async function handleResend() {
    if (resending) return
    setResendStatus('sending')
    setOtp('')
    setError(null)
    try {
      await resendEmail().unwrap()
      notifySuccess('A new verification code has been sent to your email.', 'Code Resent')
      setResendStatus('sent')
      setTimeout(() => setResendStatus(null), 4000)
    } catch (err) {
      const msg = err?.data?.message || 'Could not resend code. Please try again.'
      setError(msg)
      notifyError(msg)
      setResendStatus(null)
    }
  }

  if (!authToken) return null

  return (
    <>
      <Head><title>Verify Email — Bextmart</title></Head>
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
                📧
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color_heading)', margin: '0 0 8px' }}>
                Verify your email
              </h1>
              <p style={{ fontSize: 13, color: 'var(--color_body)', margin: 0, lineHeight: 1.65 }}>
                We sent a 6-digit code to{' '}
                <strong style={{ color: 'var(--color_heading)' }}>
                  {authUser?.email || 'your email'}
                </strong>.
                Enter it below to activate your account.
              </p>
            </div>

            <form onSubmit={handleVerify} noValidate>
              {/* OTP boxes */}
              <div style={{ marginBottom: 8 }}>
                <OtpInput value={otp} onChange={setOtp} />
              </div>

              {/* Resend */}
              <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', margin: '10px 0 24px' }}>
                {resendStatus === 'sent' ? (
                  <span style={{ color: '#10b981', fontWeight: 500 }}>✓ New code sent!</span>
                ) : (
                  <>
                    Didn&apos;t receive it?{' '}
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resending}
                      style={{ background: 'none', border: 'none', color: 'var(--color_primary)', fontWeight: 500, cursor: resending ? 'wait' : 'pointer', fontSize: 12, padding: 0 }}
                    >
                      {resending ? 'Sending…' : 'Resend code'}
                    </button>
                  </>
                )}
              </p>

              {error && (
                <p style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030', fontSize: 13, padding: '9px 12px', borderRadius: 6, margin: '0 0 16px', lineHeight: 1.5 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={verifying || otp.length < 6}
                style={{
                  width: '100%', height: 44, borderRadius: 8, border: 'none',
                  background: verifying ? '#4444aa' : otp.length < 6 ? '#d1d5db' : 'var(--color_primary)',
                  fontSize: 15, fontWeight: 600,
                  cursor: verifying || otp.length < 6 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ color: otp.length < 6 && !verifying ? '#9ca3af' : '#fff' }}>
                  {verifying ? 'Verifying…' : 'Verify Email'}
                </span>
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
              <Link href="/account-login" style={{ fontSize: 13, color: 'var(--color_body)' }}>
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
