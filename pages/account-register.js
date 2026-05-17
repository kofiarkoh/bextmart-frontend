import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRegisterMutation } from '../store/authApi'
import { notifyError, notifySuccess } from '../components/ultils/notify'

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

const inputStyle = {
  width: '100%', height: 44, padding: '0 12px', boxSizing: 'border-box',
  border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14,
  outline: 'none', background: '#fff', transition: 'border-color 0.15s',
}
const focusIn  = (e) => { e.target.style.borderColor = 'var(--color_primary)' }
const focusOut = (e) => { e.target.style.borderColor = '#e5e7eb' }

function PasswordStrength({ password }) {
  if (!password) return null
  const strength =
    password.length >= 12 && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
    : password.length >= 10 && /[A-Z]/.test(password) && /\d/.test(password) ? 3
    : password.length >= 8 ? 2
    : 1
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981']
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map((l) => (
          <div key={l} style={{ flex: 1, height: 3, borderRadius: 2, background: l <= strength ? colors[strength] : '#e5e7eb', transition: 'background 0.2s' }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[strength] }}>{labels[strength]}</span>
    </div>
  )
}

export default function RegisterPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-account-register')
  }

  const router    = useRouter()
  const authToken = useSelector((s) => s.auth?.token)
  useEffect(() => { if (authToken) router.replace('/account') }, [authToken, router])

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    password: '', password_confirmation: '',
  })
  const [showPw, setShowPw]         = useState(false)
  const [showPwConf, setShowPwConf] = useState(false)
  const [error, setError]           = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const [register, { isLoading }] = useRegisterMutation()

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: undefined }))
  }

  function validate() {
    const errs = {}
    if (!form.first_name.trim())         errs.first_name = 'First name is required.'
    if (!form.last_name.trim())          errs.last_name  = 'Last name is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email    = 'Enter a valid email address.'
    if (!form.phone.trim())              errs.phone      = 'Phone number is required.'
    if (form.password.length < 8)        errs.password   = 'Password must be at least 8 characters.'
    if (form.password !== form.password_confirmation) errs.password_confirmation = 'Passwords do not match.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setError(null)
    setFieldErrors({})
    try {
      await register(form).unwrap()
      notifySuccess('Account created! Please verify your email.', 'Welcome')
      router.push('/verify-email')
    } catch (err) {
      const apiErrors = err?.data?.errors || {}
      if (Object.keys(apiErrors).length) {
        const mapped = {}
        Object.entries(apiErrors).forEach(([k, v]) => { mapped[k] = Array.isArray(v) ? v[0] : v })
        setFieldErrors(mapped)
        notifyError('Please fix the errors in the form.')
      } else {
        const msg = err?.data?.message || 'Registration failed. Please try again.'
        setError(msg)
        notifyError(msg)
      }
    }
  }

  return (
    <>
      <Head><title>Create Account — Bextmart</title></Head>
      <Header />

      <main style={{ background: '#f5f5f5', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
        <div style={{ width: '100%', maxWidth: 500 }}>
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: '36px 32px' }}>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color_heading)', margin: '0 0 6px' }}>Create an account</h1>
              <p style={{ fontSize: 13, color: 'var(--color_body)', margin: 0 }}>
                Already have one?{' '}
                <Link href="/account-login" style={{ color: 'var(--color_primary)', fontWeight: 600 }}>Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                <Field label="First Name *" error={fieldErrors.first_name}>
                  <input name="first_name" type="text" value={form.first_name} onChange={change}
                    placeholder="" autoComplete="given-name"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </Field>
                <Field label="Last Name *" error={fieldErrors.last_name}>
                  <input name="last_name" type="text" value={form.last_name} onChange={change}
                    placeholder="" autoComplete="family-name"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </Field>
              </div>

              <Field label="Email Address *" error={fieldErrors.email}>
                <input name="email" type="email" value={form.email} onChange={change}
                  placeholder="" autoComplete="email"
                  style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
              </Field>

              <Field label="Phone Number *" error={fieldErrors.phone}>
                <input name="phone" type="tel" value={form.phone} onChange={change}
                  placeholder="" autoComplete="tel"
                  style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
              </Field>

              <Field label="Password *" error={fieldErrors.password}>
                <div style={{ position: 'relative' }}>
                  <input name="password" type={showPw ? 'text' : 'password'} value={form.password}
                    onChange={change} placeholder="Min. 8 characters" autoComplete="new-password"
                    style={{ ...inputStyle, paddingRight: 42 }} onFocus={focusIn} onBlur={focusOut} />
                  <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0 }}>
                    {showPw ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
              </Field>

              <Field label="Confirm Password *" error={fieldErrors.password_confirmation}>
                <div style={{ position: 'relative' }}>
                  <input name="password_confirmation" type={showPwConf ? 'text' : 'password'}
                    value={form.password_confirmation} onChange={change}
                    placeholder="Repeat your password" autoComplete="new-password"
                    style={{ ...inputStyle, paddingRight: 42 }} onFocus={focusIn} onBlur={focusOut} />
                  <button type="button" tabIndex={-1} onClick={() => setShowPwConf(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', padding: 0 }}>
                    {showPwConf ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </Field>

              {error && (
                <p style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030', fontSize: 13, padding: '9px 12px', borderRadius: 6, margin: '0 0 16px', lineHeight: 1.5 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%', height: 44, borderRadius: 8, border: 'none',
                  background: isLoading ? '#4444aa' : 'var(--color_primary)',
                  fontSize: 15, fontWeight: 600,
                  cursor: isLoading ? 'wait' : 'pointer', transition: 'background 0.2s',
                }}
              >
                <span style={{ color: '#fff' }}>{isLoading ? 'Creating account…' : 'Create Account'}</span>
              </button>

              <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" style={{ color: 'var(--color_primary)' }}>Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" style={{ color: 'var(--color_primary)' }}>Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {error && <p style={{ fontSize: 12, color: '#dc2626', margin: '4px 0 0' }}>{error}</p>}
    </div>
  )
}
