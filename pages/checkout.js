import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import useTranslation from '../components/ultils/useTranslation'
import {
  useGetAddressOptionsQuery,
  useProcessPaymentMutation,
} from '../store/checkoutApi'

const STEP_ADDRESS = 0
const STEP_REVIEW = 1

const STEP_LABELS = ['Delivery Address', 'Review & Pay']

export default function CheckoutPage() {
  if (typeof window !== 'undefined') {
    document.body.className = ''
    document.body.classList.add('template-cart')
  }

  const { t } = useTranslation()
  const router = useRouter()
const authToken = useSelector((state) => state.auth?.token)
  const cartItems = useSelector((state) => state.cart.items)

  const [step, setStep] = useState(STEP_ADDRESS)
  const [cityId, setCityId] = useState('')
  const [nearbyCity, setNearbyCity] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [addressError, setAddressError] = useState(null)
  const [paymentError, setPaymentError] = useState(null)

  useEffect(() => {
    if (!authToken) router.replace('/account-login')
  }, [authToken, router])

  const { data: addressOptionsData, isLoading: loadingAddresses } = useGetAddressOptionsQuery(
    undefined,
    { skip: !authToken }
  )

  const cities = Array.isArray(addressOptionsData?.data?.cities)
    ? addressOptionsData.data.cities
    : Array.isArray(addressOptionsData?.data)
    ? addressOptionsData.data
    : []

  const [processPayment, { isLoading: processingPayment }] = useProcessPaymentMutation()

  function handleContinue() {
    if (!cityId) {
      setAddressError('Please select a delivery city.')
      return
    }
    setAddressError(null)
    setStep(STEP_REVIEW)
  }

  async function handleProcessPayment() {
    setPaymentError(null)
    try {
      const result = await processPayment({
        payment_method: 'mobile_money',
        city_id: Number(cityId),
        nearby_city: nearbyCity || '',
        delivery_instructions: deliveryInstructions || '',
      }).unwrap()

      const paymentUrl =
        result?.payment_url ||
        result?.data?.payment_url

      if (!paymentUrl) {
        setPaymentError('Could not initiate payment. Please try again.')
        return
      }

      window.location.href = paymentUrl
    } catch (err) {
      setPaymentError(err?.data?.message || 'Payment initiation failed. Please try again.')
    }
  }

  const selectedCity = cities.find((c) => String(c.id) === String(cityId))

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Header />
      <main>
        <Breadcrumbs />
        <div className="main-cart-items">
          <div className="cart-template__layout">
            <div className="container">

              {/* Step indicator */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: '32px auto 40px', maxWidth: 500 }}>
                {STEP_LABELS.map((label, i) => (
                  <React.Fragment key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 100 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        backgroundColor: i <= step ? 'var(--color_primary)' : 'transparent',
                        border: `2px solid ${i <= step ? 'var(--color_primary)' : 'var(--color_line)'}`,
                        color: i <= step ? '#fff' : 'var(--color_body)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s',
                      }}>
                        {i === 0 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            <circle cx="12" cy="9" r="2.5"/>
                          </svg>
                        )}
                        {i === 1 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                            <rect x="9" y="3" width="6" height="4" rx="1"/>
                            <line x1="9" y1="12" x2="15" y2="12"/>
                            <line x1="9" y1="16" x2="13" y2="16"/>
                          </svg>
                        )}
                        {i === 2 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="2"/>
                            <line x1="2" y1="10" x2="22" y2="10"/>
                          </svg>
                        )}
                      </div>
                      <span style={{
                        fontSize: 12, fontWeight: i === step ? 600 : 400,
                        color: i <= step ? 'var(--color_heading)' : 'var(--color_body)',
                        textAlign: 'center',
                      }}>
                        {label}
                      </span>
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div style={{
                        flex: 1, height: 2, marginTop: 23, minWidth: 24,
                        backgroundColor: i < step ? 'var(--color_primary)' : 'var(--color_line)',
                        transition: 'background-color 0.2s',
                      }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1: Delivery Address */}
              {step === STEP_ADDRESS && (
                <div style={{ maxWidth: 560, margin: '0 auto' }}>
                  <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Delivery Address</h2>

                  {loadingAddresses ? (
                    <p>Loading delivery options...</p>
                  ) : (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                          Delivery City <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                          value={cityId}
                          onChange={(e) => setCityId(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 12px',
                            border: '1px solid var(--color_line)', borderRadius: 4,
                            fontSize: 14, backgroundColor: '#fff', appearance: 'auto',
                          }}
                        >
                          <option value="">Select a city</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                          Nearby City / Landmark{' '}
                          <span style={{ fontWeight: 400, color: 'var(--color_body)' }}>(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={nearbyCity}
                          onChange={(e) => setNearbyCity(e.target.value)}
                          placeholder="e.g. Near Accra Mall"
                          style={{
                            width: '100%', padding: '10px 12px', boxSizing: 'border-box',
                            border: '1px solid var(--color_line)', borderRadius: 4, fontSize: 14,
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: 28 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                          Delivery Instructions{' '}
                          <span style={{ fontWeight: 400, color: 'var(--color_body)' }}>(optional)</span>
                        </label>
                        <textarea
                          value={deliveryInstructions}
                          onChange={(e) => setDeliveryInstructions(e.target.value)}
                          placeholder="Any special instructions for your delivery..."
                          rows={3}
                          style={{
                            width: '100%', padding: '10px 12px', boxSizing: 'border-box',
                            border: '1px solid var(--color_line)', borderRadius: 4,
                            fontSize: 14, resize: 'vertical',
                          }}
                        />
                      </div>

                      {addressError && (
                        <p style={{ color: 'red', fontSize: 14, marginBottom: 16 }}>{addressError}</p>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                        <Link href="/cart" className="button button--secondary">← Back to Cart</Link>
                        <button
                          type="button"
                          className="button button--primary"
                          onClick={handleContinue}
                        >
                          Continue →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Review & Pay */}
              {step === STEP_REVIEW && (
                <div style={{ maxWidth: 640, margin: '0 auto' }}>
                  <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Review & Pay</h2>

                  {/* Delivery summary */}
                  <div style={{
                    backgroundColor: 'var(--color_content_bg)',
                    border: '1px solid var(--color_line)',
                    borderRadius: 6, padding: '16px 20px', marginBottom: 24,
                  }}>
                    <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10, color: 'var(--color_body)' }}>
                      Delivery Details
                    </p>
                    <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                      <strong>City:</strong> {selectedCity?.name || cityId}
                    </p>
                    {nearbyCity && (
                      <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                        <strong>Nearby:</strong> {nearbyCity}
                      </p>
                    )}
                    {deliveryInstructions && (
                      <p style={{ fontSize: 14, margin: 0 }}>
                        <strong>Instructions:</strong> {deliveryInstructions}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setStep(STEP_ADDRESS)}
                      style={{ background: 'none', border: 'none', color: 'var(--color_primary)', fontSize: 13, cursor: 'pointer', padding: 0, marginTop: 10 }}
                    >
                      Edit address
                    </button>
                  </div>

                  {/* Order items */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color_line)' }}>
                        <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 13, textTransform: 'uppercase', fontWeight: 600 }}>Product</th>
                        <th style={{ textAlign: 'center', padding: '10px 0', fontSize: 13, textTransform: 'uppercase', fontWeight: 600 }}>Qty</th>
                        <th style={{ textAlign: 'right', padding: '10px 0', fontSize: 13, textTransform: 'uppercase', fontWeight: 600 }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, i) => {
                        const product = item.product || item
                        const price = parseFloat(product?.price || item?.price || 0)
                        const qty = item?.quantity || 1
                        return (
                          <tr key={i} style={{ borderBottom: '1px solid var(--color_line)' }}>
                            <td style={{ padding: '14px 0', fontSize: 14 }}>{product?.name || 'Product'}</td>
                            <td style={{ padding: '14px 0', fontSize: 14, textAlign: 'center' }}>{qty}</td>
                            <td style={{ padding: '14px 0', fontSize: 14, textAlign: 'right' }}>
                              <CurrencyConvert amount={price * qty} />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>

                  {/* Payment method */}
                  <div style={{
                    border: '2px solid var(--color_primary)', borderRadius: 8,
                    padding: '20px 24px', marginBottom: 28,
                    display: 'flex', alignItems: 'center', gap: 16,
                    backgroundColor: 'var(--color_content_bg)',
                  }}>
                    <span style={{ fontSize: 32 }}>📱</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, margin: '0 0 2px' }}>Mobile Money</p>
                      <p style={{ fontSize: 13, color: 'var(--color_body)', margin: 0 }}>MTN · Vodafone · AirtelTigo</p>
                    </div>
                  </div>

                  {paymentError && (
                    <p style={{ color: 'red', fontSize: 14, marginBottom: 16 }}>{paymentError}</p>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <button type="button" className="button button--secondary" onClick={() => setStep(STEP_ADDRESS)}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="button button--primary"
                      disabled={processingPayment}
                      onClick={handleProcessPayment}
                      style={{ flex: 1 }}
                    >
                      {processingPayment ? 'Redirecting...' : 'Pay with Mobile Money'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
