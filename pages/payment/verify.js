import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { useDispatch } from 'react-redux'
import { clearCart } from '../../store/cartSlice'
import { useGetOrderQuery, useRetryPaymentMutation } from '../../store/ordersApi'
import { notifyError } from '../../components/ultils/notify'
import CurrencyConvert from '../../components/ultils/CurrencyConvert'
import { buildImageUrl } from '../../components/ultils/Tools'

const SUCCESS_STATUSES = ['paid', 'success', 'completed', 'delivered']
const FAILED_STATUSES  = ['failed', 'cancelled']

function isSuccess(s) { return SUCCESS_STATUSES.includes((s || '').toLowerCase()) }
function isFailed(s)  { return FAILED_STATUSES.includes((s || '').toLowerCase()) }

function formatDate(str) {
    if (!str) return '—'
    return new Date(str).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function StatusPill({ status }) {
    const map = {
        paid: ['#d1fae5', '#065f46'], success: ['#d1fae5', '#065f46'],
        completed: ['#d1fae5', '#065f46'], delivered: ['#d1fae5', '#065f46'],
        pending: ['#fef3c7', '#92400e'], unpaid: ['#fef3c7', '#92400e'],
        processing: ['#dbeafe', '#1e40af'], shipped: ['#dbeafe', '#1e40af'],
        failed: ['#fee2e2', '#991b1b'], cancelled: ['#fee2e2', '#991b1b'],
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

export default function PaymentVerifyPage() {
    const dispatch  = useDispatch()
    const router    = useRouter()

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // router.query is empty on first render — wait until Next.js is ready
    const orderId = router.isReady ? (router.query.order_number || null) : undefined

    const { data, isLoading, isError } = useGetOrderQuery(orderId, { skip: !orderId })
    const [retryPayment, { isLoading: retrying }] = useRetryPaymentMutation()

    const order       = data?.data || null
    // payment status lives on the transaction, order.status is the fulfillment status
    const transaction = order?.transaction || null
    const txStatus    = transaction?.status || null
    const orderNumber = order?.order_number || order?.id || orderId
    const succeeded   = isSuccess(txStatus)
    const failed      = isFailed(txStatus)
    const pending     = txStatus && !succeeded && !failed

    const items       = Array.isArray(order?.items) ? order.items : []
    const subtotal    = parseFloat(order?.cart_price   ?? 0)
    const shippingFee = parseFloat(order?.delivery_fee ?? 0)
    const weightCost  = parseFloat(order?.weight_cost  ?? 0)
    const totalPrice  = parseFloat(order?.total_price  ?? 0)
    // delivery info: address object + top-level nearby_city / delivery_instructions
    const address     = order?.address || null

    useEffect(() => {
        if (succeeded) dispatch(clearCart())
    }, [succeeded, dispatch])

    async function handleRetry() {
        // use existing payment_url from transaction if available, otherwise fetch a new one
        const existingUrl = transaction?.payment_url
        if (existingUrl) { window.location.href = existingUrl; return }
        try {
            const res = await retryPayment(orderId).unwrap()
            const url = res?.data?.payment_url || res?.payment_url
            if (url) { window.location.href = url }
            else notifyError('Could not initiate retry. Please try again.', 'Retry Failed')
        } catch (err) {
            notifyError(err?.data?.message || 'Retry failed. Please try again.', 'Retry Failed')
        }
    }

    const pageTitle = failed ? 'Payment Failed' : succeeded ? 'Order Confirmed' : 'Order Confirmation'

    return (
        <>
            <Head><title>{pageTitle} — Bextmart</title></Head>
            <Header />

            <main style={{ background: '#f4f5f7', minHeight: '70vh', padding: isMobile ? '16px 0 60px' : '40px 0 80px' }}>
                <div className="container" style={{ maxWidth: 860, paddingLeft: isMobile ? 12 : undefined, paddingRight: isMobile ? 12 : undefined }}>

                    {/* Loading — also shown while router resolves query params */}
                    {(!router.isReady || isLoading) && (
                        <div style={{ background: '#fff', borderRadius: 12, padding: '80px 24px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                border: '3px solid #e5e7eb', borderTopColor: 'var(--color_primary)',
                                margin: '0 auto 16px', animation: 'spin 0.8s linear infinite',
                            }} />
                            <p style={{ color: 'var(--color_body)', fontSize: 14, margin: 0 }}>Checking your order…</p>
                        </div>
                    )}

                    {/* No order ID / error fallback — only shown once router is ready */}
                    {router.isReady && !isLoading && (isError || !orderId) && (
                        <div style={{ background: '#fff', borderRadius: 12, padding: '60px 24px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                            <h2 style={{ marginBottom: 12 }}>Thank you for your order!</h2>
                            <p style={{ color: 'var(--color_body)', marginBottom: 32, fontSize: 15 }}>
                                Your order has been placed. We will contact you shortly.
                            </p>
                            <Link href="/" className="button button--primary">Continue Shopping</Link>
                        </div>
                    )}

                    {/* Order loaded */}
                    {router.isReady && !isLoading && !isError && order && (
                        <>
                            {/* ── Status banner ── */}
                            <div style={{
                                borderRadius: 12, padding: isMobile ? '24px 18px' : '28px 32px',
                                marginBottom: 16, textAlign: 'center',
                                background: succeeded ? '#ecfdf5'
                                          : failed    ? '#fef2f2'
                                          : '#fffbeb',
                                border: `1px solid ${succeeded ? '#a7f3d0' : failed ? '#fecaca' : '#fde68a'}`,
                            }}>
                                <div style={{ fontSize: isMobile ? 44 : 56, marginBottom: 12, lineHeight: 1 }}>
                                    {succeeded ? '✅' : failed ? '❌' : '⏳'}
                                </div>
                                <h1 style={{
                                    margin: '0 0 8px', fontSize: isMobile ? 20 : 24, fontWeight: 700,
                                    color: succeeded ? '#065f46' : failed ? '#991b1b' : '#92400e',
                                }}>
                                    {succeeded ? `Thank you for your order!`
                                              : failed ? 'Payment Failed'
                                              : 'Payment Pending'}
                                </h1>
                                <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--color_body)' }}>
                                    {succeeded
                                        ? "Your payment was successful. We'll get your order ready and notify you when it ships."
                                        : failed
                                        ? "We were unable to process your payment. You can retry below or go back to your cart."
                                        : "Your payment is being processed. We'll notify you once it's confirmed."}
                                </p>
                                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {failed ? (
                                        <>
                                            <button className="button button--primary" onClick={handleRetry} disabled={retrying}>
                                                {retrying ? 'Redirecting…' : 'Retry Payment'}
                                            </button>
                                            <Link href="/cart" className="button button--secondary">Back to Cart</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/" className="button button--primary">Continue Shopping</Link>
                                            <Link href="/account" className="button button--secondary">View Orders</Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* ── Order header ── */}
                            <div style={{
                                background: 'var(--color_primary)', borderRadius: 12,
                                padding: isMobile ? '16px 18px' : '22px 28px',
                                marginBottom: 12, color: '#fff',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                            }}>
                                <div>
                                    <p style={{ margin: '0 0 2px', fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Order</p>
                                    <p style={{ margin: '0 0 3px', fontSize: isMobile ? 18 : 22, fontWeight: 700 }}>#{orderNumber}</p>
                                    <p style={{ margin: 0, fontSize: 12, opacity: 0.75 }}>{formatDate(order.created_at)}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ margin: '0 0 2px', fontSize: 10, opacity: 0.7 }}>Order total</p>
                                    <p style={{ margin: 0, fontSize: isMobile ? 20 : 24, fontWeight: 700 }}>
                                        <CurrencyConvert amount={totalPrice} />
                                    </p>
                                </div>
                            </div>

                            {/* ── Body ── */}
                            <div style={{
                                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                                gap: 12, alignItems: isMobile ? 'stretch' : 'flex-start',
                            }}>

                                {/* Items */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                                        <div style={{ padding: isMobile ? '14px 16px' : '16px 24px', borderBottom: '1px solid var(--color_line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Items Ordered</h2>
                                            <span style={{ fontSize: 13, color: 'var(--color_body)' }}>
                                                {items.length} item{items.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>

                                        {items.length === 0 ? (
                                            <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--color_body)', fontSize: 14 }}>
                                                No item details available.
                                            </div>
                                        ) : (
                                            <>
                                                {items.map((item, i) => {
                                                    const product  = item.product || {}
                                                    const variant  = item.variant  || null
                                                    const name     = product?.name || 'Product'
                                                    const imgSrc   = buildImageUrl(product?.photos?.[0] ?? null)
                                                    const qty      = item.quantity ?? 1
                                                    const price    = parseFloat(item.price ?? 0)
                                                    const rowTotal = parseFloat(item.total_price ?? price * qty)
                                                    const variantLabel = variant?.attribute_values?.map(av => av.value || av.name).join(', ') || variant?.sku || null

                                                    return (
                                                        <div key={i} style={{
                                                            display: 'flex', alignItems: 'center', gap: 12,
                                                            padding: isMobile ? '12px 16px' : '16px 24px',
                                                            borderBottom: i < items.length - 1 ? '1px solid var(--color_line)' : 'none',
                                                        }}>
                                                            <div style={{
                                                                width: isMobile ? 48 : 60, height: isMobile ? 48 : 60,
                                                                flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                                                                border: '1px solid var(--color_line)', background: '#f9fafb',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            }}>
                                                                {imgSrc ? (
                                                                    // eslint-disable-next-line @next/next/no-img-element
                                                                    <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                                                ) : (
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                                                                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                                                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                                                        <polyline points="21 15 16 10 5 21"/>
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <p style={{ margin: '0 0 2px', fontWeight: 500, fontSize: 14, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                    {name}
                                                                </p>
                                                                {variantLabel && (
                                                                    <p style={{ margin: '0 0 2px', fontSize: 12, color: 'var(--color_body)' }}>{variantLabel}</p>
                                                                )}
                                                                <p style={{ margin: 0, fontSize: 12, color: 'var(--color_body)' }}>
                                                                    <CurrencyConvert amount={price} /> each
                                                                </p>
                                                            </div>

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
                                                            <span>Cart Subtotal</span><span><CurrencyConvert amount={subtotal} /></span>
                                                        </div>
                                                    )}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color_body)', marginBottom: 8 }}>
                                                        <span>Delivery Fee</span>
                                                        <span>{shippingFee > 0 ? <CurrencyConvert amount={shippingFee} /> : 'Free'}</span>
                                                    </div>
                                                    {weightCost > 0 && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color_body)', marginBottom: 8 }}>
                                                            <span>Weight Cost</span>
                                                            <span><CurrencyConvert amount={weightCost} /></span>
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

                                {/* Sidebar */}
                                <div style={{ width: isMobile ? '100%' : 240, flexShrink: 0 }}>

                                    {/* Order details */}
                                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: 12 }}>
                                        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color_line)' }}>
                                            <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                                                Order Details
                                            </h3>
                                        </div>
                                        <div style={{ padding: '16px 18px' }}>
                                            <MetaRow label="Order #" value={`#${orderNumber}`} />
                                            {order.created_at && (
                                                <MetaRow label="Date" value={new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} />
                                            )}
                                            <MetaRow label="Payment" value={<StatusPill status={txStatus} />} />
                                            <MetaRow label="Order Status" value={<StatusPill status={order.status} />} />
                                            {order.payment_method && (
                                                <MetaRow label="Method" value={order.payment_method.replace(/_/g, ' ')} capitalize />
                                            )}
                                            {transaction?.amount && (
                                                <MetaRow label="Charged" value={<CurrencyConvert amount={parseFloat(transaction.amount)} />} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Delivery address */}
                                    {(address || order.nearby_city || order.delivery_instructions) && (
                                        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                                            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color_line)' }}>
                                                <h3 style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                                                    Delivery Address
                                                </h3>
                                            </div>
                                            <div style={{ padding: '16px 18px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color_primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                                </svg>
                                                <div>
                                                    {(address?.city?.name || address?.city) && (
                                                        <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 500, color: 'var(--color_heading)' }}>
                                                            {address.city?.name || address.city}
                                                        </p>
                                                    )}
                                                    {order.nearby_city && (
                                                        <p style={{ margin: '0 0 3px', fontSize: 13, color: 'var(--color_body)' }}>
                                                            {order.nearby_city}
                                                        </p>
                                                    )}
                                                    {order.delivery_instructions && (
                                                        <p style={{ margin: 0, fontSize: 12, color: 'var(--color_body)', fontStyle: 'italic' }}>
                                                            &ldquo;{order.delivery_instructions}&rdquo;
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
