import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import { useGetMeQuery, useLogoutMutation, useResendEmailVerificationMutation } from '../store/authApi'
import { notifyError, notifySuccess } from '../components/ultils/notify'
import { useGetOrdersQuery, useRetryPaymentMutation } from '../store/ordersApi'

// ─── helpers ──────────────────────────────────────────────────────────────────

function getInitials(user) {
  const parts = [user?.first_name || user?.firstname, user?.last_name || user?.lastname].filter(Boolean)
  if (parts.length) return parts.map((p) => p[0].toUpperCase()).join('')
  return (user?.name || user?.email || 'U')[0].toUpperCase()
}

function getFullName(user) {
  if (user?.first_name) return `${user.first_name} ${user.last_name || ''}`.trim()
  return user?.name || 'User'
}

function formatDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ─── small components ─────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    paid:        ['#d1fae5', '#065f46'],
    success:     ['#d1fae5', '#065f46'],
    completed:   ['#d1fae5', '#065f46'],
    delivered:   ['#d1fae5', '#065f46'],
    pending:     ['#fef3c7', '#92400e'],
    unpaid:      ['#fef3c7', '#92400e'],
    processing:  ['#dbeafe', '#1e40af'],
    shipped:     ['#dbeafe', '#1e40af'],
    failed:      ['#fee2e2', '#991b1b'],
    cancelled:   ['#fee2e2', '#991b1b'],
  }
  const labels = { pending: 'Pending Payment', unpaid: 'Pending Payment' }
  const [bg, color] = map[status?.toLowerCase()] || ['#f3f4f6', '#374151']
  const label = labels[status?.toLowerCase()] || status || '—'
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 12,
      fontSize: 12, fontWeight: 500, background: bg, color,
      textTransform: 'capitalize', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

function StatCard({ emoji, label, value }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '20px 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)', flex: 1, minWidth: 120,
    }}>
      <div style={{ fontSize: 26, marginBottom: 10 }}>{emoji}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--color_heading)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--color_body)', marginTop: 5 }}>{label}</div>
    </div>
  )
}

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

function RetryButton({ orderNumber }) {
  const [retryPayment, { isLoading }] = useRetryPaymentMutation()
  const [retrying, setRetrying] = React.useState(false)

  async function handleRetry(e) {
    e.preventDefault()
    e.stopPropagation()
    setRetrying(true)
    try {
      const result = await retryPayment(orderNumber).unwrap()
      const url = result?.payment_url || result?.data?.payment_url
      if (url) window.location.href = url
    } catch (err) {
      const msg = err?.data?.message || 'Could not initiate payment. Please try again.'
      notifyError(msg, 'Payment Error')
    } finally {
      setRetrying(false)
    }
  }

  return (
    <button
      onClick={handleRetry}
      disabled={isLoading || retrying}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: '100%', padding: '10px 16px',
        background: 'var(--color_primary)', color: '#fff',
        fontSize: 13, fontWeight: 600,
        borderRadius: '0 0 10px 10px',
        border: '1px solid var(--color_primary)', borderTop: 'none',
        cursor: isLoading || retrying ? 'not-allowed' : 'pointer',
        opacity: isLoading || retrying ? 0.7 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      {retrying ? (
        <span style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
      )}
      {retrying ? 'Processing…' : 'Retry Payment'}
    </button>
  )
}

function OrdersTable({ orders, loading }) {
  if (loading) {
    return (
      <div style={{ padding: '48px 24px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            height: 80, borderRadius: 10, background: '#f3f4f6',
            marginBottom: 10, animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: '#f3f4f6', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 16px', color: '#9ca3af',
        }}>
          <BagIcon />
        </div>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color_heading)', margin: '0 0 6px' }}>No orders yet</p>
        <p style={{ fontSize: 13, color: 'var(--color_body)', margin: '0 0 20px' }}>
          You haven&apos;t placed any orders yet.
        </p>
        <Link href="/products" style={{
          display: 'inline-block', padding: '9px 20px',
          background: 'var(--color_primary)', color: '#fff',
          borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}>
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: '12px 16px 16px' }}>
      {orders.map((order) => {
        const orderStatus = order.status?.toLowerCase()
        const txStatus = order.transaction?.status?.toLowerCase()
        const canRetry = (orderStatus === 'pending' || orderStatus === 'processing')
          && txStatus !== 'success'
        return (
          <div key={order.id} style={{ marginBottom: 8 }}>
            <Link
              href={`/account-order?order=${order.order_number}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                borderRadius: canRetry ? '10px 10px 0 0' : 10,
                border: '1px solid var(--color_line)',
                borderBottom: canRetry ? '1px solid #f0f0f0' : '1px solid var(--color_line)',
                background: '#fff', transition: 'box-shadow 0.15s',
                cursor: 'pointer',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                  e.currentTarget.style.borderColor = 'var(--color_primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--color_line)'
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(0,0,128,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color_primary)',
                }}>
                  <BagIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color_heading)' }}>
                      #{order.order_number}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color_heading)', whiteSpace: 'nowrap' }}>
                      <CurrencyConvert amount={parseFloat(order.total_price || 0)} />
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--color_body)' }}>{formatDate(order.created_at)}</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
                <div style={{ color: '#d1d5db', flexShrink: 0 }}><ChevronRight /></div>
              </div>
            </Link>

            {canRetry && <RetryButton orderNumber={order.order_number} />}
          </div>
        )
      })}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

function Pagination({ current, last, onChange }) {
  if (last <= 1) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 20px', borderTop: '1px solid var(--color_line)' }}>
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        style={{
          padding: '6px 14px', borderRadius: 4, border: '1px solid var(--color_line)',
          background: '#fff', fontSize: 13, cursor: current === 1 ? 'not-allowed' : 'pointer',
          color: current === 1 ? '#ccc' : 'var(--color_body)',
        }}
      >
        ← Prev
      </button>
      <span style={{ fontSize: 13, color: 'var(--color_body)' }}>
        Page {current} of {last}
      </span>
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === last}
        style={{
          padding: '6px 14px', borderRadius: 4, border: '1px solid var(--color_line)',
          background: '#fff', fontSize: 13, cursor: current === last ? 'not-allowed' : 'pointer',
          color: current === last ? '#ccc' : 'var(--color_body)',
        }}
      >
        Next →
      </button>
    </div>
  )
}

// ─── icons ────────────────────────────────────────────────────────────────────

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const IconBag = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

// ─── nav config ───────────────────────────────────────────────────────────────

const SECTION = { OVERVIEW: 'overview', ORDERS: 'orders', DETAILS: 'details' }

const NAV_ITEMS = [
  { key: SECTION.OVERVIEW, label: 'Overview',        icon: <IconHome /> },
  { key: SECTION.ORDERS,   label: 'My Orders',       icon: <IconBag /> },
  { key: SECTION.DETAILS,  label: 'Account Details', icon: <IconUser /> },
]

function NavBtn({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '12px 20px',
        background: active ? 'rgba(0,0,128,0.07)' : 'none',
        border: 'none',
        borderLeft: `3px solid ${active ? 'var(--color_primary)' : 'transparent'}`,
        color: active ? 'var(--color_primary)' : 'var(--color_body)',
        fontWeight: active ? 600 : 400,
        fontSize: 14, cursor: 'pointer', textAlign: 'left',
        transition: 'color 0.15s, background 0.15s, border-color 0.15s',
      }}
    >
      {item.icon}
      {item.label}
    </button>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-account-dashboard')
  }

  const router    = useRouter()
  const authToken = useSelector((s) => s.auth?.token)
  const authUser  = useSelector((s) => s.auth?.user)

  const [section, setSection]           = useState(SECTION.OVERVIEW)
  const [ordersPage, setOrdersPage]     = useState(1)
  const [tokenChecked, setTokenChecked] = useState(false)
  const [isMobile, setIsMobile]         = useState(false)

  useEffect(() => {
    const local = typeof window !== 'undefined' && localStorage.getItem('auth_token')
    if (!local) router.replace('/account-login')
    setTokenChecked(true)
  }, [router])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // page 1 always fetched for overview stats + recent orders
  const { data: page1Data, isLoading: loadingOrders } = useGetOrdersQuery(1, { skip: !authToken })

  // paginated fetch for My Orders section
  const { data: pagedData, isLoading: loadingPaged, isFetching: fetchingPaged } = useGetOrdersQuery(ordersPage, {
    skip: !authToken || section !== SECTION.ORDERS,
  })

  const { data: meData } = useGetMeQuery(undefined, { skip: !authToken })
  const [logout, { isLoading: loggingOut }] = useLogoutMutation()
  const [resendVerification, { isLoading: sendingVerification }] = useResendEmailVerificationMutation()

  async function handleVerifyNow() {
    try {
      await resendVerification().unwrap()
      notifySuccess('A verification code has been sent to your email.', 'Code Sent')
    } catch (err) {
      notifyError(err?.data?.message || 'Could not send verification code.')
    }
    router.push('/verify-email')
  }

  const user = meData?.data || meData || authUser || {}

  // extract paginated list from response shape: { data: { data: [...], total, last_page, current_page } }
  const recentOrders  = page1Data?.data?.data  ?? []
  const totalCount    = page1Data?.data?.total  ?? 0
  const pendingCount  = recentOrders.filter((o) => o.status === 'pending').length
  const completedCount = recentOrders.filter((o) => ['completed', 'delivered'].includes(o.status)).length

  const pagedOrders   = pagedData?.data?.data   ?? []
  const lastPage      = pagedData?.data?.last_page ?? 1
  const currentPage   = pagedData?.data?.current_page ?? 1

  async function handleLogout() {
    try { await logout().unwrap() } catch {}
    notifySuccess('You have been signed out.', 'Signed Out')
    router.push('/')
  }

  if (!tokenChecked) return null

  const name   = getFullName(user)
  const avatar = getInitials(user)

  // ── shared section content ──────────────────────────────────────────────────
  const sectionContent = (
    <>
      {section === SECTION.OVERVIEW && (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, var(--color_primary) 0%, #2626b3 100%)',
            borderRadius: 10, padding: isMobile ? '20px' : '28px 32px', marginBottom: 16, color: '#fff',
          }}>
            <p style={{ margin: '0 0 4px', fontSize: 13, opacity: 0.75 }}>Welcome back,</p>
            <h1 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 700 }}>{name} 👋</h1>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <StatCard emoji="🛍️" label="Total Orders" value={totalCount} />
            <StatCard emoji="⏳" label="Pending"       value={pendingCount} />
            <StatCard emoji="✅" label="Completed"      value={completedCount} />
          </div>

          <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--color_line)' }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Recent Orders</h3>
              {totalCount > 3 && (
                <button onClick={() => setSection(SECTION.ORDERS)} style={{ background: 'none', border: 'none', color: 'var(--color_primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                  View all ({totalCount}) →
                </button>
              )}
            </div>
            <OrdersTable orders={recentOrders.slice(0, 3)} loading={loadingOrders} />
          </div>
        </div>
      )}

      {section === SECTION.ORDERS && (
        <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color_line)' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
              My Orders
              {totalCount > 0 && <span style={{ fontSize: 12, color: 'var(--color_body)', fontWeight: 400, marginLeft: 8 }}>({totalCount} total)</span>}
            </h3>
          </div>
          <OrdersTable orders={pagedOrders} loading={loadingPaged || fetchingPaged} />
          <Pagination current={currentPage} last={lastPage} onChange={(p) => setOrdersPage(p)} />
        </div>
      )}

      {section === SECTION.DETAILS && (
        <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--color_line)' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Account Details</h3>
            <Link href="/account-edit" style={{ fontSize: 13, color: 'var(--color_primary)', fontWeight: 500 }}>Edit</Link>
          </div>
          <div style={{ padding: '8px 20px 20px' }}>
            {/* Full Name */}
            <div style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--color_line)', alignItems: 'center' }}>
              <span style={{ width: 110, flexShrink: 0, fontSize: 13, color: 'var(--color_body)', fontWeight: 500 }}>Full Name</span>
              <span style={{ fontSize: 14, color: 'var(--color_heading)' }}>{name || '—'}</span>
            </div>

            {/* Email + verification status */}
            <div style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--color_line)', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: 110, flexShrink: 0, fontSize: 13, color: 'var(--color_body)', fontWeight: 500 }}>Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0, flexWrap: 'wrap', rowGap: 6 }}>
                <span style={{ fontSize: 14, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email || '—'}</span>
                {user.email_verified_at ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 10, background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={handleVerifyNow}
                    disabled={sendingVerification}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 10, background: '#fef3c7', color: '#92400e', fontSize: 11, fontWeight: 600, flexShrink: 0, border: '1px solid #fcd34d', cursor: sendingVerification ? 'wait' : 'pointer' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {sendingVerification ? 'Sending…' : 'Verify now'}
                  </button>
                )}
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--color_line)', alignItems: 'center' }}>
              <span style={{ width: 110, flexShrink: 0, fontSize: 13, color: 'var(--color_body)', fontWeight: 500 }}>Phone</span>
              <span style={{ fontSize: 14, color: user.phone || user.phone_number ? 'var(--color_heading)' : 'var(--color_body)' }}>{user.phone || user.phone_number || '—'}</span>
            </div>
          </div>
          {/* Sign out on mobile lives here */}
          {isMobile && (
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color_line)' }}>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                style={{
                  width: '100%', padding: '11px', borderRadius: 8,
                  background: '#fee2e2', border: 'none',
                  color: '#dc2626', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <IconLogout />
                {loggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )

  return (
    <>
      <Head><title>My Account — Bextmart</title></Head>
      <Header />
      <main style={{ background: '#f4f5f7', minHeight: '70vh', paddingBottom: 80 }}>

        {/* ══════════════════ MOBILE LAYOUT ══════════════════ */}
        {isMobile && (
          <>
            {/* Profile strip */}
            <div style={{ background: 'var(--color_primary)', padding: '20px 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 20 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,255,255,0.18)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: '#fff',
                }}>
                  {avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                </div>
                <Link href="/account-edit" style={{ color: 'rgba(255,255,255,0.8)', flexShrink: 0 }} title="Edit Profile">
                  <IconEdit />
                </Link>
              </div>

              {/* Tab bar */}
              <div style={{ display: 'flex' }}>
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSection(item.key)}
                    style={{
                      flex: 1, padding: '10px 4px 12px',
                      background: 'none', border: 'none',
                      borderBottom: `3px solid ${section === item.key ? '#fff' : 'transparent'}`,
                      color: section === item.key ? '#fff' : 'rgba(255,255,255,0.55)',
                      fontSize: 11, fontWeight: section === item.key ? 600 : 400,
                      cursor: 'pointer', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 4, transition: 'all 0.15s',
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile content */}
            <div style={{ padding: '16px' }}>
              {sectionContent}
            </div>
          </>
        )}

        {/* ══════════════════ DESKTOP LAYOUT ══════════════════ */}
        {!isMobile && (
          <div className="container" style={{ paddingTop: 40 }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

              {/* Sidebar */}
              <aside style={{
                width: 240, flexShrink: 0, alignSelf: 'flex-start',
                background: '#fff', borderRadius: 10, overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
              }}>
                <div style={{ background: 'var(--color_primary)', padding: '28px 20px 24px', textAlign: 'center' }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    border: '2px solid rgba(255,255,255,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: 1,
                  }}>
                    {avatar}
                  </div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>{name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: 0, wordBreak: 'break-all' }}>{user.email}</p>
                </div>

                <nav style={{ padding: '8px 0' }}>
                  {NAV_ITEMS.map((item) => (
                    <NavBtn key={item.key} item={item} active={section === item.key} onClick={() => setSection(item.key)} />
                  ))}
                  <div style={{ height: 1, background: 'var(--color_line)', margin: '8px 16px' }} />
                  <Link href="/account-edit" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', textDecoration: 'none', borderLeft: '3px solid transparent', color: 'var(--color_body)', fontSize: 14 }}>
                    <IconEdit />
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 20px', background: 'none', border: 'none', borderLeft: '3px solid transparent', color: '#dc2626', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}
                  >
                    <IconLogout />
                    {loggingOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </nav>
              </aside>

              {/* Main */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {sectionContent}
              </div>

            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
