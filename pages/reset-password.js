import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useResetPasswordMutation, useForgotPasswordMutation } from '../store/authApi'
import { notifyError, notifySuccess } from '../components/ultils/notify'

// ─── icons ────────────────────────────────────────────────────────────────────

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

// ─── OTP: 6 individual boxes ──────────────────────────────────────────────────

function OtpInput({ value, onChange }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const digits = value.padEnd(6, ' ').split('').slice(0, 6)

  function handleKey(i, e) {
    if (e.key === 'Backspace') {
      const next = value.slice(0, Math.max(0, value.length - (value[i] ? 1 : 2) + (i === value.length - 1 ? 1 : 0)))
      const trimmed = value.slice(0, i === value.trimEnd().length ? i : i + 1).slice(0, -1)
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
    if (pasted) {
      onChange(pasted)
      refs[Math.min(pasted.length, 5)].current?.focus()
    }
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
              fontSize: 22, fontWeight: 700, letterSpacing: 0,
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

// ─── shared input style ───────────────────────────────────────────────────────

const inputStyle = {
  width: '100%', height: 44, padding: '0 42px 0 12px', boxSizing: 'border-box',
  border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14,
  outline: 'none', background: '#fff', transition: 'border-color 0.15s',
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-reset-password')
  }

  const router    = useRouter()
  const authToken = useSelector((s) => s.auth?.token)
  useEffect(() => { if (authToken) router.replace('/account') }, [authToken, router])

  const email = router.isReady ? (router.query.email || '') : ''

  const [otp, setOtp]                   = useState('')
  const [password, setPassword]         = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [showPw, setShowPw]             = useState(false)
  const [showPwConf, setShowPwConf]     = useState(false)
  const [error, setError]               = useState(null)
  const [done, setDone]                 = useState(false)
  const [resendStatus, setResendStatus] = useState(null) // null | 'sending' | 'sent'

  const [resetPassword,  { isLoading }]          = useResetPasswordMutation()
  const [forgotPassword, { isLoading: resending }] = useForgotPasswordMutation()

  async function handleResend() {
    if (!email || resending) return
    setResendStatus('sending')
    setOtp('')
    setError(null)
    try {
      await forgotPassword({ email }).unwrap()
      notifySuccess('A new code has been sent to your email.', 'Code Resent')
      setResendStatus('sent')
      setTimeout(() => setResendStatus(null), 4000)
    } catch (err) {
      const msg = err?.data?.message || 'Could not resend code. Please try again.'
      setError(msg)
      notifyError(msg)
      setResendStatus(null)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (otp.length < 6)            { setError('Please enter the full 6-digit code.'); return }
    if (password.length < 8)       { setError('Password must be at least 8 characters.'); return }
    if (password !== passwordConf) { setError('Passwords do not match.'); return }
    setError(null)
    try {
      await resetPassword({ email, otp, password, password_confirmation: passwordConf }).unwrap()
      notifySuccess('Your password has been reset successfully.', 'Password Updated')
      setDone(true)
    } catch (err) {
      const msg = err?.data?.message || 'Invalid or expired code. Please try again.'
      setError(msg)
      notifyError(msg)
    }
  }

if (done) {
    return (
      <>
        <Head><title>Password Reset — Bextmart</title></Head>
        <Header />
        <main style={{ background: '#f5f5f5', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
          <div style={{ width: '100%', maxWidth: 420 }}>
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color_heading)', margin: '0 0 10px' }}>
                Password Updated!
              </h1>
              <p style={{ fontSize: 14, color: 'var(--color_body)', margin: '0 0 32px', lineHeight: 1.65 }}>
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <Link href="/account-login" style={{
                display: 'inline-block', padding: '12px 32px', borderRadius: 8,
                background: 'var(--color_primary)', color: '#fff',
                fontSize: 15, fontWeight: 600, textDecoration: 'none',
              }}>
                Sign In
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head><title>Reset Password — Bextmart</title></Head>
      <Header />

      <main style={{ background: '#f5f5f5', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: '36px 32px' }}>

            {/* Heading */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
                background: 'rgba(0,0,128,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>
                📩
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color_heading)', margin: '0 0 8px' }}>
                Check your inbox
              </h1>
              <p style={{ fontSize: 13, color: 'var(--color_body)', margin: 0, lineHeight: 1.65 }}>
                We sent a 6-digit code to{' '}
                <strong style={{ color: 'var(--color_heading)' }}>{email || 'your email'}</strong>.
                Enter it below along with your new password.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* OTP */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', textAlign: 'center', marginBottom: 12 }}>
                  6-digit reset code
                </label>
                <OtpInput value={otp} onChange={setOtp} />
                <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', margin: '8px 0 0' }}>
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
              </div>

              {/* New password */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                    onBlur={(e)  => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0 }}>
                    {showPw ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPwConf ? 'text' : 'password'}
                    value={passwordConf}
                    onChange={(e) => setPasswordConf(e.target.value)}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color_primary)'}
                    onBlur={(e)  => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPwConf(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0 }}>
                    {showPwConf ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Password strength hint */}
              {password.length > 0 && (
                <div style={{ marginBottom: 16, display: 'flex', gap: 4 }}>
                  {[1, 2, 3, 4].map((level) => {
                    const strength = password.length >= 12 && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
                                   : password.length >= 10 && /[A-Z]/.test(password) && /\d/.test(password) ? 3
                                   : password.length >= 8 ? 2
                                   : 1
                    const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981']
                    return (
                      <div key={level} style={{ flex: 1, height: 4, borderRadius: 2, background: level <= strength ? colors[strength - 1] : '#e5e7eb', transition: 'background 0.2s' }} />
                    )
                  })}
                </div>
              )}

              {error && (
                <p style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030', fontSize: 13, padding: '9px 12px', borderRadius: 6, margin: '0 0 16px', lineHeight: 1.5 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                style={{
                  width: '100%', height: 44, borderRadius: 8, border: 'none',
                  background: isLoading ? '#4444aa' : otp.length < 6 ? '#d1d5db' : 'var(--color_primary)',
                  color: otp.length < 6 && !isLoading ? '#9ca3af' : '#fff',
                  fontSize: 15, fontWeight: 600,
                  cursor: isLoading || otp.length < 6 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isLoading ? 'Resetting…' : 'Reset Password'}
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
