import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import { useGetOrderQuery } from '../store/ordersApi'
import { buildImageUrl } from '../components/ultils/Tools'

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}


// ─── status stepper ───────────────────────────────────────────────────────────

const STEPS = [
  {
    label: 'Placed',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
  },
  {
    label: 'Processing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
  },
  {
    label: 'Shipped',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Delivered',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
]

const STATUS_TO_STEP = {
  pending: 0, processing: 1, shipped: 2,
  delivered: 3, completed: 3, success: 3,
}

const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

function StatusStepper({ status }) {
  const s = (status || '').toLowerCase()
  const cancelled = s === 'cancelled' || s === 'failed'
  const activeStep = STATUS_TO_STEP[s] ?? 0

  if (cancelled) {
    return (
      <div style={{
        background: '#fff', borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        padding: '20px 28px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: '#fee2e2',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#dc2626', textTransform: 'capitalize' }}>
            Order {status}
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color_body)' }}>
            This order has been {status}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: '#fff', borderRadius: 12,
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      padding: '24px 28px', marginBottom: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {STEPS.map((step, i) => {
          const done   = i < activeStep
          const active = i === activeStep
          return (
            <React.Fragment key={step.label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 80 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done     ? 'var(--color_primary)'
                             : active  ? '#fff'
                             : '#f3f4f6',
                  border: done     ? '2px solid var(--color_primary)'
                        : active   ? '2px solid var(--color_primary)'
                        : '2px solid #e5e7eb',
                  color: done    ? '#fff'
                       : active  ? 'var(--color_primary)'
                       : '#9ca3af',
                  transition: 'all 0.2s',
                }}>
                  {done ? <Tick /> : step.icon}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: active || done ? 600 : 400, lineHeight: 1.3,
                  color: active || done ? 'var(--color_heading)' : '#9ca3af',
                  textAlign: 'center',
                }}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: 2, marginTop: 20, minWidth: 12,
                  background: i < activeStep ? 'var(--color_primary)' : '#e5e7eb',
                  transition: 'background 0.3s',
                }} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-account-order')
  }

  const router    = useRouter()
  const authToken = useSelector((s) => s.auth?.token)

  // router.query is empty on first render — wait until Next.js is ready
  const orderNumber = router.isReady ? router.query.order : undefined

  // _app.js restores the token via useEffect (child effects run before parent),
  // so we read localStorage directly to avoid a premature redirect on reload.
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

  const { data: orderData, isLoading, isError } = useGetOrderQuery(orderNumber, {
    skip: !authToken || !orderNumber,
  })

  const order = orderData?.data || orderData || null

  const items       = Array.isArray(order?.items)       ? order.items
                    : Array.isArray(order?.order_items)  ? order.order_items
                    : []
  const subtotal    = parseFloat(order?.subtotal     ?? order?.sub_total ?? 0)
  const shippingFee = parseFloat(order?.shipping_fee ?? order?.delivery_fee ?? order?.shipping ?? 0)
  const totalPrice  = parseFloat(order?.total_price  ?? order?.total ?? 0)
  const delivery    = order?.delivery_address || order?.address || null

  // Render nothing until we've confirmed a token exists in localStorage
  if (!tokenChecked) return null

  return (
    <>
      <Head><title>Order #{orderNumber} — Bextmart</title></Head>
      <Header />

      <main style={{ background: '#f4f5f7', minHeight: '70vh', padding: isMobile ? '16px 0 60px' : '32px 0 80px' }}>
        <div className="container">

          {/* Back */}
          <Link href="/account" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--color_body)', marginBottom: 16, textDecoration: 'none',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            My Orders
          </Link>

          {/* Loading */}
          {isLoading && (
            <div style={{ background: '#fff', borderRadius: 12, padding: '80px 24px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '3px solid #e5e7eb', borderTopColor: 'var(--color_primary)',
                margin: '0 auto 16px', animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ color: 'var(--color_body)', fontSize: 14, margin: 0 }}>Loading order details…</p>
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div style={{ background: '#fff', borderRadius: 12, padding: '80px 24px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color_heading)', margin: '0 0 8px' }}>Order not found</p>
              <p style={{ fontSize: 14, color: 'var(--color_body)', margin: '0 0 28px' }}>
                We couldn&apos;t find order #{orderNumber}.
              </p>
              <Link href="/account" className="button button--primary">Back to My Account</Link>
            </div>
          )}

          {/* Content */}
          {order && (
            <>
              {/* ── Header banner ── */}
              <div style={{
                background: 'var(--color_primary)',
                borderRadius: 12, padding: isMobile ? '18px 16px' : '28px 32px',
                marginBottom: 12, color: '#fff',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Order</p>
                    <h1 style={{ margin: '0 0 4px', fontSize: isMobile ? 18 : 24, fontWeight: 700 }}>
                      #{order.order_number}
                    </h1>
                    <p style={{ margin: 0, fontSize: 12, opacity: 0.75 }}>{formatDate(order.created_at)}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 10, opacity: 0.7 }}>Order total</p>
                    <p style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 700 }}>
                      <CurrencyConvert amount={totalPrice} />
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Status stepper ── */}
              <div style={{ overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? 4 : 0 }}>
                <div style={{ minWidth: isMobile ? 360 : 'auto' }}>
                  <StatusStepper status={order.status} />
                </div>
              </div>

              {/* ── Body: stacks on mobile, side-by-side on desktop ── */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 16,
                alignItems: 'flex-start',
                width: '100%',
                overflow: 'hidden',
              }}>

                {/* Left — Items */}
                <div style={{ flex: 1, minWidth: 0, width: isMobile ? '100%' : 'auto', overflow: 'hidden' }}>
                  <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden', width: '100%' }}>
                    <div style={{ padding: isMobile ? '14px 16px' : '16px 24px', borderBottom: '1px solid var(--color_line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Items Ordered</h2>
                      <span style={{ fontSize: 13, color: 'var(--color_body)' }}>
                        {items.length} item{items.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {items.length === 0 ? (
                      <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--color_body)', fontSize: 14 }}>
                        No item details available for this order.
                      </div>
                    ) : (
                      <>
                        {items.map((item, i) => {
                          const product  = item.product || item
                          const name     = product?.name || item?.name || 'Product'
                          const imgSrc   = buildImageUrl(product?.photos?.[0] ?? item?.photos?.[0] ?? null)
                          const qty      = item?.quantity ?? item?.qty ?? 1
                          const price    = parseFloat(item?.price ?? product?.price ?? 0)
                          const rowTotal = parseFloat(item?.total ?? item?.subtotal ?? price * qty)

                          return (
                            <div key={i} style={{
                              display: 'flex', alignItems: 'center', gap: 12,
                              padding: isMobile ? '12px 16px' : '16px 24px',
                              borderBottom: i < items.length - 1 ? '1px solid var(--color_line)' : 'none',
                              overflow: 'hidden',
                              width: '100%',
                              boxSizing: 'border-box',
                            }}>
                              {/* Thumbnail */}
                              <div style={{
                                width: isMobile ? 48 : 64, height: isMobile ? 48 : 64,
                                flexShrink: 0, borderRadius: 8,
                                overflow: 'hidden', border: '1px solid var(--color_line)',
                                background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                {imgSrc ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                ) : (
                                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21 15 16 10 5 21"/>
                                  </svg>
                                )}
                              </div>

                              {/* Name + price */}
                              <div style={{ flex: 1, minWidth: 0, width: 0, overflow: 'hidden' }}>
                                <p style={{
                                  margin: '0 0 4px', fontWeight: 500, fontSize: 14,
                                  color: 'var(--color_heading)',
                                  overflow: 'hidden', textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  maxWidth: '100%',
                                }}>
                                  {name}
                                </p>
                                <p style={{ margin: 0, fontSize: 12, color: 'var(--color_body)' }}>
                                  <CurrencyConvert amount={price} /> each
                                </p>
                              </div>

                              {/* Qty + total stacked on mobile, inline on desktop */}
                              {isMobile ? (
                                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color_heading)' }}>
                                    <CurrencyConvert amount={rowTotal} />
                                  </div>
                                  <div style={{ fontSize: 12, color: 'var(--color_body)', marginTop: 2 }}>× {qty}</div>
                                </div>
                              ) : (
                                <>
                                  <div style={{ padding: '3px 12px', borderRadius: 20, background: '#f3f4f6', fontSize: 13, color: 'var(--color_body)', flexShrink: 0 }}>
                                    × {qty}
                                  </div>
                                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color_heading)', flexShrink: 0, minWidth: 72, textAlign: 'right' }}>
                                    <CurrencyConvert amount={rowTotal} />
                                  </div>
                                </>
                              )}
                            </div>
                          )
                        })}

                        {/* Totals */}
                        <div style={{ padding: isMobile ? '14px 16px' : '16px 24px', borderTop: '2px solid var(--color_line)', background: '#fafafa' }}>
                          {subtotal > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color_body)', marginBottom: 8 }}>
                              <span>Subtotal</span><span><CurrencyConvert amount={subtotal} /></span>
                            </div>
                          )}
                          {shippingFee > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color_body)', marginBottom: 8 }}>
                              <span>Shipping</span><span><CurrencyConvert amount={shippingFee} /></span>
                            </div>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: 'var(--color_heading)', paddingTop: 10, borderTop: '1px solid var(--color_line)', marginTop: 4 }}>
                            <span>Total</span><span><CurrencyConvert amount={totalPrice} /></span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right — Meta */}
                <div style={{ width: isMobile ? '100%' : 260, flexShrink: 0 }}>

                  {/* Order details */}
                  <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: 16 }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color_line)' }}>
                      <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                        Order Details
                      </h3>
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <MetaRow label="Order #" value={`#${order.order_number}`} />
                      <MetaRow label="Date" value={new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} />
                      <MetaRow label="Status" value={
                        <StatusPill status={order.status} />
                      } />
                      {order.payment_method && (
                        <MetaRow label="Payment" value={order.payment_method} capitalize />
                      )}
                    </div>
                  </div>

                  {/* Delivery address */}
                  {delivery && (
                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color_line)' }}>
                        <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                          Delivery Address
                        </h3>
                      </div>
                      <div style={{ padding: '16px 20px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color_primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <div>
                          {(delivery.city?.name || delivery.city) && (
                            <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 500, color: 'var(--color_heading)' }}>
                              {delivery.city?.name || delivery.city}
                            </p>
                          )}
                          {delivery.nearby_city && (
                            <p style={{ margin: '0 0 3px', fontSize: 13, color: 'var(--color_body)' }}>
                              {delivery.nearby_city}
                            </p>
                          )}
                          {delivery.delivery_instructions && (
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--color_body)', fontStyle: 'italic' }}>
                              &ldquo;{delivery.delivery_instructions}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </>
          )}

        </div>
      </main>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Footer />
    </>
  )
}

function StatusPill({ status }) {
  const map = {
    paid:       ['#d1fae5', '#065f46'], success:    ['#d1fae5', '#065f46'],
    completed:  ['#d1fae5', '#065f46'], delivered:  ['#d1fae5', '#065f46'],
    pending:    ['#fef3c7', '#92400e'], unpaid:     ['#fef3c7', '#92400e'],
    processing: ['#dbeafe', '#1e40af'], shipped:    ['#dbeafe', '#1e40af'],
    failed:     ['#fee2e2', '#991b1b'], cancelled:  ['#fee2e2', '#991b1b'],
  }
  const [bg, color] = map[status?.toLowerCase()] || ['#f3f4f6', '#374151']
  return (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: bg, color, textTransform: 'capitalize' }}>
      {status || '—'}
    </span>
  )
}

function MetaRow({ label, value, capitalize }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--color_body)', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--color_heading)', fontWeight: 500, textAlign: 'right', textTransform: capitalize ? 'capitalize' : 'none' }}>
        {value || '—'}
      </span>
    </div>
  )
}
