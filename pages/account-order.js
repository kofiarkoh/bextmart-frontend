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

function orderEstimatedArrival(createdAt, days) {
  if (!days || !createdAt) return null;
  const d = new Date(createdAt);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-GH', { day: 'numeric', month: 'long', year: 'numeric' });
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
    label: 'Confirmed',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
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
  pending: 0, confirmed: 1, processing: 2, shipped: 3,
  delivered: 4, completed: 4, success: 4,
}


function ItemStepper({ status }) {
  const s = (status || '').toLowerCase()
  const cancelled = s === 'cancelled' || s === 'failed' || s === 'returned' || s === 'refunded'
  const activeStep = STATUS_TO_STEP[s] ?? 0
  const fillPct = (activeStep / (STEPS.length - 1)) * 100

  if (cancelled) {
    return (
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600, textTransform: 'capitalize' }}>
          This item has been {status}
        </span>
      </div>
    )
  }

  return (
    <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid #f3f4f6' }}>
      {/* Track + nodes */}
      <div style={{ position: 'relative', marginBottom: 8 }}>
        {/* Background track, positioned center-of-first-col to center-of-last-col */}
        <div style={{ position: 'absolute', top: 7, left: '12.5%', right: '12.5%', height: 3, background: '#e5e7eb', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${fillPct}%`, background: 'var(--color_primary)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>

        {/* Step columns */}
        <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
          {STEPS.map((step, i) => {
            const done = i < activeStep
            const active = i === activeStep
            return (
              <div key={step.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: done ? 'var(--color_primary)' : '#fff',
                  border: `2.5px solid ${done || active ? 'var(--color_primary)' : '#d1d5db'}`,
                  boxShadow: active ? '0 0 0 4px rgba(0,0,100,0.1)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  {done && (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <span style={{
                  fontSize: 10, textAlign: 'center', lineHeight: 1.2, whiteSpace: 'nowrap',
                  fontWeight: active ? 700 : done ? 500 : 400,
                  color: active ? 'var(--color_primary)' : done ? '#374151' : '#9ca3af',
                }}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
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

  const cityDeliveryType = order?.delivery_city?.delivery_types?.find(
    dt => String(dt.delivery_type_id) === String(order?.delivery_type_id)
  )
  const estimatedArrival = orderEstimatedArrival(order?.created_at, cityDeliveryType?.estimated_days)

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
                <div style={{ flex: 1, minWidth: 0, width: isMobile ? '100%' : 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* Section label */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 2 }}>
                    <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                      Items Ordered
                    </h2>
                    <span style={{ fontSize: 13, color: 'var(--color_body)' }}>
                      {items.length} item{items.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', padding: '48px 24px', textAlign: 'center', color: 'var(--color_body)', fontSize: 14 }}>
                      No item details available for this order.
                    </div>
                  ) : (
                    <>
                      {items.map((item, i) => {
                        const product  = item.product || item
                        const variant  = item.variant || null
                        const name     = product?.name || item?.name || 'Product'
                        const imgSrc   = buildImageUrl(variant?.photos?.[0] ?? product?.photos?.[0] ?? item?.photos?.[0] ?? null)
                        const qty      = item?.quantity ?? item?.qty ?? 1
                        const price    = parseFloat(item?.price ?? product?.price ?? 0)
                        const rowTotal = parseFloat(item?.total_price ?? item?.total ?? item?.subtotal ?? price * qty)
                        const variantLabel = variant?.attribute_values?.map(av => av.value || av.name).join(', ') || variant?.sku || null
                        const itemStatus = item?.status || null
                        const effectiveStatus = itemStatus || order.status

                        return (
                          <div key={i} style={{
                            background: '#fff', borderRadius: 12,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                            padding: isMobile ? '16px' : '20px 24px',
                            boxSizing: 'border-box',
                          }}>
                            {/* Top row */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                              {/* Thumbnail */}
                              <div style={{
                                width: isMobile ? 56 : 72, height: isMobile ? 56 : 72,
                                flexShrink: 0, borderRadius: 10,
                                overflow: 'hidden', border: '1px solid #f0f0f0',
                                background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                {imgSrc ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                ) : (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                                    <circle cx="8.5" cy="8.5" r="1.5"/>
                                    <polyline points="21 15 16 10 5 21"/>
                                  </svg>
                                )}
                              </div>

                              {/* Info */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                  margin: '0 0 3px', fontWeight: 600, fontSize: 14,
                                  color: 'var(--color_heading)',
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                }}>
                                  {name}
                                </p>
                                {variantLabel && (
                                  <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--color_body)' }}>{variantLabel}</p>
                                )}
                                <span style={{ fontSize: 12, color: '#9ca3af' }}>
                                  <CurrencyConvert amount={price} /> × {qty}
                                </span>
                              </div>

                              {/* Total */}
                              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color_heading)' }}>
                                  <CurrencyConvert amount={rowTotal} />
                                </div>
                              </div>
                            </div>

                            {/* Per-item progress stepper */}
                            <ItemStepper status={effectiveStatus} />
                          </div>
                        )
                      })}

                      {/* Totals card */}
                      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', padding: isMobile ? '14px 16px' : '16px 24px' }}>
                        {subtotal > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color_body)', marginBottom: 10 }}>
                            <span>Subtotal</span><span><CurrencyConvert amount={subtotal} /></span>
                          </div>
                        )}
                        {shippingFee > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color_body)', marginBottom: 10 }}>
                            <span>Shipping</span><span><CurrencyConvert amount={shippingFee} /></span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: 'var(--color_heading)', paddingTop: 10, borderTop: '1px solid #f3f4f6', marginTop: subtotal > 0 || shippingFee > 0 ? 4 : 0 }}>
                          <span>Order Total</span><span><CurrencyConvert amount={totalPrice} /></span>
                        </div>
                      </div>
                    </>
                  )}
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
{estimatedArrival && order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <MetaRow label="Est. delivery" value={
                          <span style={{ color: 'var(--color_heading)', fontWeight: 500 }}>
                            {estimatedArrival}
                          </span>
                        } />
                      )}
                      {order.payment_method && (
                        <MetaRow label="Payment" value={order.payment_method.replace(/_/g, ' ')} capitalize />
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
    pending:    ['#fef3c7', '#92400e'],
    confirmed:  ['#d1fae5', '#065f46'],
    processing: ['#dbeafe', '#1e40af'],
    shipped:    ['#e0e7ff', '#3730a3'],
    delivered:  ['#d1fae5', '#065f46'],
    cancelled:  ['#fee2e2', '#991b1b'],
    returned:   ['#fef3c7', '#92400e'],
    refunded:   ['#f3e8ff', '#6b21a8'],
    failed:     ['#fee2e2', '#991b1b'],
    success:    ['#d1fae5', '#065f46'],
    paid:       ['#d1fae5', '#065f46'],
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
