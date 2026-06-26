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
import { buildImageUrl } from '../components/ultils/Tools'
import { notifyError, notifySuccess } from '../components/ultils/notify'
import Button from '../components/ultils/Button'
import AddressBook from '../components/account/AddressBook'
import {
  useGetAddressOptionsQuery,
  useProcessPaymentMutation,
  useGetCheckoutSummaryQuery,
} from '../store/checkoutApi'
import { useGetCartQuery } from '../store/cartApi'

const STEP_ADDRESS = 0
const STEP_REVIEW = 1

const STEP_LABELS = ['Delivery Address', 'Review & Pay']

const CHECKOUT_KEY = 'bextmart_checkout'

function loadSaved() {
  try {
    const raw = typeof window !== 'undefined' && sessionStorage.getItem(CHECKOUT_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

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
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [regionId, setRegionId] = useState('')
  const [cityId, setCityId] = useState('')
  const [nearbyCity, setNearbyCity] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [addressError, setAddressError] = useState(null)
  const [paymentError, setPaymentError] = useState(null)
  const [tokenChecked, setTokenChecked] = useState(false)

  // restore saved checkout state after mount (client-only, avoids SSR hydration mismatch)
  useEffect(() => {
    const saved = loadSaved()
    if (!saved || !Object.keys(saved).length) return
    if (saved.regionId)             setRegionId(saved.regionId)
    if (saved.cityId)               setCityId(saved.cityId)
    if (saved.nearbyCity)           setNearbyCity(saved.nearbyCity)
    if (saved.deliveryInstructions) setDeliveryInstructions(saved.deliveryInstructions)
    if (saved.selectedAddressId)    setSelectedAddressId(saved.selectedAddressId)
    if (saved.step != null)         setStep(saved.step)
  }, [])

  // persist whenever any address field or step changes
  useEffect(() => {
    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify({
      step, selectedAddressId, regionId, cityId, nearbyCity, deliveryInstructions,
    }))
  }, [step, selectedAddressId, regionId, cityId, nearbyCity, deliveryInstructions])

  const { isLoading: cartLoading } = useGetCartQuery(undefined, { skip: !tokenChecked || !authToken })

  useEffect(() => {
    const local = typeof window !== 'undefined' && localStorage.getItem('auth_token')
    if (!local) router.replace('/account-login')
    setTokenChecked(true)
  }, [router])

  useEffect(() => {
    if (!tokenChecked) return
    if (!authToken) return // auth useEffect already handles redirect to login
    if (cartLoading) return
    if (Array.isArray(cartItems) && cartItems.length === 0) {
      router.replace('/')
    }
  }, [tokenChecked, authToken, cartLoading, cartItems, router])

  const { data: addressOptionsData, isLoading: loadingAddresses } = useGetAddressOptionsQuery(
    undefined,
    { skip: !authToken }
  )

  const regions = Array.isArray(addressOptionsData?.data) ? addressOptionsData.data : []
  const selectedRegion = regions.find((r) => String(r.id) === String(regionId))
  const cities = selectedRegion?.cities || []

  function handleSelectAddress(addr) {
    setSelectedAddressId(addr.id)

    const matchedRegion = regions.find((r) => r.name?.toLowerCase() === addr.region?.toLowerCase())
    if (matchedRegion) {
      setRegionId(String(matchedRegion.id))
      const matchedCity = (matchedRegion.cities || []).find((c) => c.name?.toLowerCase() === addr.city?.toLowerCase())
      setCityId(matchedCity ? String(matchedCity.id) : '')
    }

    if (addr.additional_info) setNearbyCity(addr.additional_info)
    setAddressError(null)
  }

  const [processPayment, { isLoading: processingPayment }] = useProcessPaymentMutation()

  const { data: summaryData, isLoading: loadingSummary, refetch: refetchSummary } = useGetCheckoutSummaryQuery(cityId, {
    skip: !cityId || step !== STEP_REVIEW,
  })
  const summary = summaryData?.data || null

  useEffect(() => {
    if (cityId && step === STEP_REVIEW) refetchSummary()
  }, [cartItems])

  function handleContinue() {
    if (!regionId) {
      setAddressError('Please select a region.')
      return
    }
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
        const msg = 'Could not initiate payment. Please try again.'
        setPaymentError(msg)
        notifyError(msg, 'Payment Error')
        return
      }

      sessionStorage.removeItem(CHECKOUT_KEY)
      window.location.href = paymentUrl
    } catch (err) {
      const msg = err?.data?.message || 'Payment initiation failed. Please try again.'
      setPaymentError(msg)
      notifyError(msg, 'Payment Error')
    }
  }

  const selectedCity = cities.find((c) => String(c.id) === String(cityId)) || null

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
                      {/* Saved addresses */}
                      <div style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--color_heading)' }}>
                          Choose a saved address
                        </h3>
                        <AddressBook
                          selectable
                          skip={!authToken}
                          selectedId={selectedAddressId}
                          onSelect={handleSelectAddress}
                        />
                      </div>

                      <div style={{ height: 1, background: 'var(--color_line)', margin: '0 0 24px' }} />

                      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--color_heading)' }}>
                        Delivery Zone
                      </h3>

                      {/* Region */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                          Region <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                          value={regionId}
                          onChange={(e) => { setRegionId(e.target.value); setCityId(''); }}
                          style={{
                            width: '100%', padding: '10px 12px',
                            border: '1px solid var(--color_line)', borderRadius: 4,
                            fontSize: 14, backgroundColor: '#fff', appearance: 'auto',
                          }}
                        >
                          <option value="">Select a region</option>
                          {regions.map((region) => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* City — only shown once a region is chosen */}
                      {regionId && (
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                            City <span style={{ color: 'red' }}>*</span>
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
                              <option key={city.id} value={city.id}>
                                {city.name} — GHC {city.delivery_fee} delivery
                              </option>
                            ))}
                          </select>
                          {cityId && (() => {
                            const city = cities.find((c) => String(c.id) === String(cityId));
                            return city ? (
                              <p style={{ fontSize: 13, color: 'var(--color_body)', marginTop: 6 }}>
                                Delivery fee: <strong>GHC {city.delivery_fee}</strong>
                              </p>
                            ) : null;
                          })()}
                        </div>
                      )}

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
                        <Button type="button" label="Continue →" onClick={handleContinue} />
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
                    {selectedRegion && (
                      <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                        <strong>Region:</strong> {selectedRegion.name}
                      </p>
                    )}
                    <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                      <strong>City:</strong> {selectedCity?.name || cityId}
                    </p>
                    {selectedCity?.delivery_fee != null && (
                      <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                        <strong>Delivery fee:</strong> GHC {selectedCity.delivery_fee}
                      </p>
                    )}
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
                  <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--color_line)', marginBottom: 16 }}>
                    <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid var(--color_line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                        Order Items
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--color_body)' }}>
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {cartItems.map((item, i) => {
                      const product       = item.product || item
                      const variant       = item.variant || item.product_variant
                      const variantOption = item.variant_option
                      const name          = product?.name || 'Product'
                      const price         = parseFloat(variantOption?.price ?? variant?.price ?? product?.price ?? item?.price ?? 0)
                      const qty           = item?.quantity || 1
                      const imgSrc        = buildImageUrl(variant?.photos?.[0] ?? product?.photos?.[0] ?? null)
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '14px 16px',
                          borderBottom: i < cartItems.length - 1 ? '1px solid var(--color_line)' : 'none',
                          background: '#fff',
                        }}>
                          {/* Thumbnail */}
                          <div style={{
                            width: 52, height: 52, flexShrink: 0, borderRadius: 8,
                            overflow: 'hidden', border: '1px solid var(--color_line)',
                            background: '#f3f4f6',
                          }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>

                          {/* Name */}
                          <div style={{ flex: 1, minWidth: 0, width: 0 }}>
                            <p style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 500, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {name}
                            </p>
                            <p style={{ margin: 0, fontSize: 12, color: 'var(--color_body)' }}>
                              <CurrencyConvert amount={price} /> × {qty}
                            </p>
                          </div>

                          {/* Row total */}
                          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color_heading)', flexShrink: 0 }}>
                            <CurrencyConvert amount={price * qty} />
                          </div>
                        </div>
                      )
                    })}

                    {/* Totals breakdown — from API summary */}
                    <div style={{ background: '#f9fafb', borderTop: '2px solid var(--color_line)' }}>
                      {loadingSummary ? (
                        <div style={{ padding: '16px', textAlign: 'center', fontSize: 13, color: 'var(--color_body)' }}>
                          Calculating totals…
                        </div>
                      ) : (
                        <>
                          <div style={{ padding: '12px 16px 4px', display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color_body)' }}>
                            <span>Subtotal</span>
                            <span><CurrencyConvert amount={parseFloat(summary?.cart_total ?? 0)} /></span>
                          </div>
                          <div style={{ padding: '4px 16px 4px', display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color_body)' }}>
                            <span>Delivery fee ({selectedCity?.name})</span>
                            <span><CurrencyConvert amount={parseFloat(summary?.delivery_fee ?? selectedCity?.delivery_fee ?? 0)} /></span>
                          </div>
                          {parseFloat(summary?.weight_cost ?? 0) > 0 && (
                            <div style={{ padding: '4px 16px 12px', display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color_body)', borderBottom: '1px solid var(--color_line)' }}>
                              <span>Weight cost</span>
                              <span><CurrencyConvert amount={parseFloat(summary.weight_cost)} /></span>
                            </div>
                          )}
                          <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: parseFloat(summary?.weight_cost ?? 0) > 0 ? 'none' : '1px solid var(--color_line)' }}>
                            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color_heading)' }}>Total</span>
                            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--color_primary)' }}>
                              <CurrencyConvert amount={parseFloat(summary?.total_amount ?? 0)} />
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Payment method */}
                  <div style={{
                    border: '2px solid var(--color_primary)', borderRadius: 10,
                    padding: '16px 20px', marginBottom: 24,
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'rgba(0,0,128,0.03)',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                      background: 'var(--color_primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22,
                    }}>
                      📱
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 2px', color: 'var(--color_heading)' }}>Mobile Money</p>
                      <p style={{ fontSize: 12, color: 'var(--color_body)', margin: 0 }}>MTN · Vodafone · AirtelTigo</p>
                    </div>
                    <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--color_primary)', background: 'var(--color_primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {paymentError && (
                    <p style={{ color: 'red', fontSize: 14, marginBottom: 16 }}>{paymentError}</p>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <Button type="button" label="← Back" variant="secondary" onClick={() => setStep(STEP_ADDRESS)} />
                    <Button
                      type="button"
                      label="Pay with Mobile Money"
                      loading={processingPayment}
                      onClick={handleProcessPayment}
                      style={{ flex: 1 }}
                    />
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
