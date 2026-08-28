import React, { useState, useEffect, useRef } from 'react'
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
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation } from '../store/cartApi'

const STEP_ADDRESS = 0
const STEP_REVIEW = 1

const STEP_LABELS = ['Delivery Address', 'Review & Pay']

const CHECKOUT_KEY = 'bextmart_checkout'

function hasActivePickupPoints(city) {
  return Array.isArray(city?.pickup_points) && city.pickup_points.some(p => p.is_active)
}

function firstUsableDeliveryType(city) {
  const types = (city?.delivery_types || []).filter(dt => dt.is_available)
  const usable = types.find(dt => dt.type?.slug !== 'pickup' || hasActivePickupPoints(city))
  return usable || types[0] || null
}

function getDeliveryEstimate(days, isPickup, cityName) {
  if (!days) return null;
  const d = new Date();
  d.setDate(d.getDate() + days);
  const date = d.toLocaleDateString('en-GH', { day: 'numeric', month: 'long', year: 'numeric' });
  if (isPickup) {
    return `Your item will be ready for pickup by ${date}. Please bring a valid ID and your Order Number to collect your item, and ensure pickup is completed within 5 days of notice.`;
  }
  return `Your item will be delivered by ${date}. Delivery times may vary slightly based on your exact location within ${cityName || 'the city'}.`;
}

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
  const [deliveryTypeId, setDeliveryTypeId] = useState('')
  const [pickupPointId, setPickupPointId] = useState('')
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
    if (saved.deliveryTypeId)       setDeliveryTypeId(saved.deliveryTypeId)
    if (saved.pickupPointId)        setPickupPointId(saved.pickupPointId)
    if (saved.nearbyCity)           setNearbyCity(saved.nearbyCity)
    if (saved.deliveryInstructions) setDeliveryInstructions(saved.deliveryInstructions)
    if (saved.selectedAddressId)    setSelectedAddressId(saved.selectedAddressId)
    if (saved.step != null)         setStep(saved.step)
  }, [])

  // persist whenever any address field or step changes
  useEffect(() => {
    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify({
      step, selectedAddressId, regionId, cityId, deliveryTypeId, pickupPointId, nearbyCity, deliveryInstructions,
    }))
  }, [step, selectedAddressId, regionId, cityId, deliveryTypeId, pickupPointId, nearbyCity, deliveryInstructions])

  const { isLoading: cartLoading, refetch: refetchCart } = useGetCartQuery(undefined, { skip: !tokenChecked || !authToken })

  useEffect(() => {
    const local = typeof window !== 'undefined' && localStorage.getItem('auth_token')
    if (!local) router.replace('/account-login')
    setTokenChecked(true)
  }, [router])

  const hasCheckedInitialCart = useRef(false)
  useEffect(() => {
    if (!tokenChecked) return
    if (!authToken) return // auth useEffect already handles redirect to login
    if (cartLoading) return
    if (hasCheckedInitialCart.current) return
    hasCheckedInitialCart.current = true
    if (Array.isArray(cartItems) && cartItems.length === 0) {
      router.replace('/')
    }
  }, [tokenChecked, authToken, cartLoading, cartItems, router])

  const { data: addressOptionsData, isLoading: loadingAddresses } = useGetAddressOptionsQuery(undefined, { skip: !tokenChecked || !authToken })

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
      const firstType = firstUsableDeliveryType(matchedCity)
      setDeliveryTypeId(firstType ? String(firstType.delivery_type_id) : '')
      setPickupPointId('')
    }

    if (addr.additional_info) setNearbyCity(addr.additional_info)
    setAddressError(null)
  }

  const [processPayment, { isLoading: processingPayment }] = useProcessPaymentMutation()
  const [updateCartItem] = useUpdateCartItemMutation()
  const [removeCartItem] = useRemoveCartItemMutation()
  const [loadingItemId, setLoadingItemId] = useState(null)

  async function handleUpdateQty(itemId, newQty) {
    setLoadingItemId(itemId)
    try {
      if (newQty < 1) {
        await removeCartItem(itemId).unwrap()
      } else {
        await updateCartItem({ id: itemId, quantity: newQty }).unwrap()
      }
      refetchCart()
      if (cityId && deliveryTypeId) refetchSummary()
    } catch {
      notifyError('Could not update item. Please try again.')
    } finally {
      setLoadingItemId(null)
    }
  }

  async function handleRemoveItem(itemId) {
    setLoadingItemId(itemId)
    try {
      await removeCartItem(itemId).unwrap()
      refetchCart()
      if (cityId && deliveryTypeId) refetchSummary()
    } catch {
      notifyError('Could not remove item. Please try again.')
    } finally {
      setLoadingItemId(null)
    }
  }

  const { data: summaryData, isLoading: loadingSummary, refetch: refetchSummary } = useGetCheckoutSummaryQuery(
    { cityId, deliveryTypeId },
    { skip: !cityId || !deliveryTypeId }
  )
  const summary = summaryData?.data || null

  useEffect(() => {
    if (cityId && deliveryTypeId) refetchSummary()
  }, [cartItems])

  function handleContinue() {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      setAddressError('Your cart is empty.')
      return
    }
    if (!regionId) {
      setAddressError('Please select a region.')
      return
    }
    if (!cityId) {
      setAddressError('Please select a delivery city.')
      return
    }
    if (!deliveryTypeId) {
      setAddressError('Please select a delivery type.')
      return
    }
    if (requiresPickupPoint && !pickupPointId) {
      setAddressError('Please select a pickup point.')
      return
    }
    if (hasShippingConflict) {
      setAddressError(null)
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
        delivery_type_id: Number(deliveryTypeId),
        ...(requiresPickupPoint ? { pickup_point_id: Number(pickupPointId) } : {}),
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
  const availableDeliveryTypes = (selectedCity?.delivery_types || []).filter(dt => dt.is_available)
  const selectedDeliveryType = availableDeliveryTypes.find(dt => String(dt.delivery_type_id) === String(deliveryTypeId)) || null
  const isPickupSelected = selectedDeliveryType?.type?.slug === 'pickup'
  const cityPickupPoints = Array.isArray(selectedCity?.pickup_points) ? selectedCity.pickup_points.filter(p => p.is_active) : []
  const requiresPickupPoint = isPickupSelected && cityPickupPoints.length > 0
  const selectedPickupPoint = cityPickupPoints.find((p) => String(p.id) === String(pickupPointId)) || null

  const restrictedItems = Array.isArray(summary?.restricted_items) ? summary.restricted_items : []
  const hasShippingConflict = restrictedItems.length > 0

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

                  {/* Cart items — editable */}
                  <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--color_line)', marginBottom: 28 }}>
                    <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid var(--color_line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color_body)' }}>
                        Your Items
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
                      const isUpdating    = loadingItemId === item.id
                      return (
                        <div key={item.id ?? i} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '14px 16px',
                          borderBottom: i < cartItems.length - 1 ? '1px solid var(--color_line)' : 'none',
                          background: '#fff',
                          opacity: isUpdating ? 0.5 : 1,
                          transition: 'opacity 0.15s',
                        }}>
                          {/* Thumbnail */}
                          <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color_line)', background: '#f3f4f6' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>

                          {/* Name + variant */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {name}
                            </p>
                            {variant && (
                              <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--color_body)' }}>
                                {variant.color_code && (
                                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: variant.color_code, border: '1px solid #ddd', marginRight: 4, verticalAlign: 'middle' }} />
                                )}
                                {variantOption?.value || variant?.sku || ''}
                              </p>
                            )}
                            {/* Quantity stepper */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--color_line)', borderRadius: 6, width: 'fit-content', overflow: 'hidden' }}>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleUpdateQty(item.id, qty - 1)}
                                aria-label="Decrease quantity"
                                style={{ width: 28, height: 28, background: '#f9fafb', border: 'none', borderRight: '1px solid var(--color_line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: 'var(--color_heading)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >−</button>
                              <span style={{ minWidth: 28, textAlign: 'center', fontSize: 13, fontWeight: 600, padding: '0 4px' }}>{qty}</span>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleUpdateQty(item.id, qty + 1)}
                                aria-label="Increase quantity"
                                style={{ width: 28, height: 28, background: '#f9fafb', border: 'none', borderLeft: '1px solid var(--color_line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: 'var(--color_heading)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >+</button>
                            </div>
                          </div>

                          {/* Price + remove */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                            <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--color_heading)' }}>
                              <CurrencyConvert amount={price * qty} />
                            </span>
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label="Remove item"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#9ca3af', display: 'flex', alignItems: 'center' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {(!tokenChecked || loadingAddresses) ? (
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
                          onChange={(e) => { setRegionId(e.target.value); setCityId(''); setDeliveryTypeId(''); }}
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

                      {/* City — shown once a region is chosen */}
                      {regionId && (
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                            City <span style={{ color: 'red' }}>*</span>
                          </label>
                          <select
                            value={cityId}
                            onChange={(e) => {
                              const newCityId = e.target.value;
                              setCityId(newCityId);
                              const city = cities.find((c) => String(c.id) === String(newCityId));
                              const firstType = firstUsableDeliveryType(city);
                              setDeliveryTypeId(firstType ? String(firstType.delivery_type_id) : '');
                              setPickupPointId('');
                            }}
                            style={{
                              width: '100%', padding: '10px 12px',
                              border: `1px solid ${hasShippingConflict ? '#fca5a5' : 'var(--color_line)'}`, borderRadius: 4,
                              fontSize: 14, backgroundColor: '#fff', appearance: 'auto',
                            }}
                          >
                            <option value="">Select a city</option>
                            {cities.map((city) => (
                              <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                          </select>

                          {/* Delivery type selection */}
                          {cityId && !hasShippingConflict && availableDeliveryTypes.length > 0 && (
                            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                              {availableDeliveryTypes.map((dt) => {
                                const isPickup = dt.type?.slug === 'pickup';
                                const icon = isPickup ? '🏪' : '🚚';
                                const isSelected = String(dt.delivery_type_id) === String(deliveryTypeId);
                                const isDisabled = isPickup && !hasActivePickupPoints(selectedCity);
                                return (
                                  <button
                                    key={dt.delivery_type_id}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => { if (isDisabled) return; setDeliveryTypeId(String(dt.delivery_type_id)); setPickupPointId(''); }}
                                    style={{
                                      flex: 1, minWidth: 160, padding: '12px 14px', borderRadius: 10, fontSize: 13,
                                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                                      opacity: isDisabled ? 0.5 : 1,
                                      border: `2px solid ${isSelected ? 'var(--color_primary)' : 'var(--color_line)'}`,
                                      background: isSelected ? 'rgba(0,0,128,0.04)' : '#fff',
                                      color: 'var(--color_heading)', fontWeight: isSelected ? 600 : 400,
                                      textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 10,
                                      transition: 'border-color 0.15s, background 0.15s',
                                    }}
                                  >
                                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 1 }}>{icon}</span>
                                    <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <span style={{ fontSize: 13, fontWeight: isSelected ? 600 : 500 }}>
                                        {dt.type?.name}
                                      </span>
                                      {isDisabled ? (
                                        <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500 }}>
                                          No pickup points available
                                        </span>
                                      ) : (
                                        <span style={{ fontSize: 12, color: isSelected ? 'var(--color_primary)' : '#6b7280', fontWeight: 500 }}>
                                          <DeliveryTypeCost cityId={cityId} deliveryTypeId={dt.delivery_type_id} fallbackFee={dt.fee} />
                                        </span>
                                      )}
                                      {!isDisabled && getDeliveryEstimate(dt.estimated_days, isPickup, selectedCity?.name) && (
                                        <span style={{ fontSize: 12, fontWeight: 400, color: '#6b7280', marginTop: 2 }}>
                                          {getDeliveryEstimate(dt.estimated_days, isPickup, selectedCity?.name)}
                                        </span>
                                      )}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          {cityId && availableDeliveryTypes.length === 0 && (
                            <p style={{ fontSize: 13, color: 'var(--color_body)', marginTop: 6 }}>
                              No delivery options available for this city yet.
                            </p>
                          )}

                          {/* Pickup point selection */}
                          {isPickupSelected && (
                            cityPickupPoints.length > 0 ? (
                              <div style={{ marginTop: 16 }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                                  Pickup Point <span style={{ color: 'red' }}>*</span>
                                </label>
                                <select
                                  value={pickupPointId}
                                  onChange={(e) => setPickupPointId(e.target.value)}
                                  style={{
                                    width: '100%', padding: '10px 12px',
                                    border: '1px solid var(--color_line)', borderRadius: 4,
                                    fontSize: 14, backgroundColor: '#fff', appearance: 'auto',
                                  }}
                                >
                                  <option value="">Select a pickup point</option>
                                  {cityPickupPoints.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}{p.address ? ` — ${p.address}` : ''}</option>
                                  ))}
                                </select>
                                {selectedPickupPoint?.address && (
                                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#6b7280' }}>
                                    {selectedPickupPoint.address}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p style={{ fontSize: 13, color: 'var(--color_body)', marginTop: 12 }}>
                                No pickup points are set up for this city yet.
                              </p>
                            )
                          )}
                        </div>
                      )}

                      {/* Shipping restriction warning */}
                      {hasShippingConflict && (
                        <div style={{ marginBottom: 20, padding: '12px 16px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#dc2626' }}>
                              Unfortunately, a few items in your cart aren&apos;t available for delivery to this area:
                            </span>
                          </div>
                          <ul style={{ margin: 0, padding: '0 0 0 24px', fontSize: 13, color: '#b91c1c' }}>
                            {restrictedItems.map((name, i) => (
                              <li key={i}>{name}</li>
                            ))}
                          </ul>
                          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#6b7280' }}>
                            You can remove these items above or choose a different delivery city to continue.
                          </p>
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
                        <Button type="button" label="Continue →" onClick={handleContinue} disabled={hasShippingConflict} />
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
                    {selectedDeliveryType && (
                      <>
                        <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                          <strong>Delivery type:</strong>{' '}
                          {selectedDeliveryType.type?.slug === 'pickup' ? '🏪' : '🚚'}{' '}
                          {selectedDeliveryType.type?.name}
                        </p>
                        {parseFloat(selectedDeliveryType.fee) > 0 && (
                          <p style={{ fontSize: 14, margin: '0 0 4px' }}>
                            <strong>Delivery fee:</strong> GH₵ {selectedDeliveryType.fee}
                          </p>
                        )}
                        {getDeliveryEstimate(selectedDeliveryType.estimated_days, selectedDeliveryType.type?.slug === 'pickup', selectedCity?.name) && (
                          <p style={{ fontSize: 14, color: '#6b7280', fontWeight: 400, margin: '6px 0 0' }}>
                            {getDeliveryEstimate(selectedDeliveryType.estimated_days, selectedDeliveryType.type?.slug === 'pickup', selectedCity?.name)}
                          </p>
                        )}
                        {selectedPickupPoint && (
                          <p style={{ fontSize: 14, margin: '6px 0 0' }}>
                            <strong>Pickup point:</strong> {selectedPickupPoint.name}
                            {selectedPickupPoint.address ? ` — ${selectedPickupPoint.address}` : ''}
                          </p>
                        )}
                      </>
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
                      const isUpdating    = loadingItemId === item.id
                      return (
                        <div key={item.id ?? i} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '14px 16px',
                          borderBottom: i < cartItems.length - 1 ? '1px solid var(--color_line)' : 'none',
                          background: '#fff',
                          opacity: isUpdating ? 0.5 : 1,
                          transition: 'opacity 0.15s',
                        }}>
                          {/* Thumbnail */}
                          <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color_line)', background: '#f3f4f6' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          </div>

                          {/* Name + variant + stepper */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {name}
                            </p>
                            {variant && (
                              <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--color_body)' }}>
                                {variant.color_code && (
                                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: variant.color_code, border: '1px solid #ddd', marginRight: 4, verticalAlign: 'middle' }} />
                                )}
                                {variantOption?.value || variant?.sku || ''}
                              </p>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--color_line)', borderRadius: 6, width: 'fit-content', overflow: 'hidden' }}>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleUpdateQty(item.id, qty - 1)}
                                aria-label="Decrease quantity"
                                style={{ width: 28, height: 28, background: '#f9fafb', border: 'none', borderRight: '1px solid var(--color_line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: 'var(--color_heading)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >−</button>
                              <span style={{ minWidth: 28, textAlign: 'center', fontSize: 13, fontWeight: 600, padding: '0 4px' }}>{qty}</span>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleUpdateQty(item.id, qty + 1)}
                                aria-label="Increase quantity"
                                style={{ width: 28, height: 28, background: '#f9fafb', border: 'none', borderLeft: '1px solid var(--color_line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: 'var(--color_heading)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >+</button>
                            </div>
                          </div>

                          {/* Total + remove */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                            <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--color_heading)' }}>
                              <CurrencyConvert amount={price * qty} />
                            </span>
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label="Remove item"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#9ca3af', display: 'flex', alignItems: 'center' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                              </svg>
                            </button>
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

                  {hasShippingConflict && (
                    <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#dc2626' }}>
                          We&apos;re sorry — the following items can&apos;t be delivered to {selectedCity?.name || selectedRegion?.name || 'your selected location'}:
                        </span>
                      </div>
                      <ul style={{ margin: 0, padding: '0 0 0 24px', fontSize: 13, color: '#b91c1c' }}>
                        {restrictedItems.map((name, i) => (
                          <li key={i}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

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
                      disabled={hasShippingConflict}
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

function DeliveryTypeCost({ cityId, deliveryTypeId, fallbackFee }) {
  const { data, isFetching } = useGetCheckoutSummaryQuery(
    { cityId, deliveryTypeId },
    { skip: !cityId || !deliveryTypeId }
  )
  const summary = data?.data || null

  if (isFetching && !summary) {
    return <span style={{ fontSize: 12, color: '#9ca3af' }}>Calculating…</span>
  }

  const cost = summary
    ? parseFloat(summary.delivery_fee || 0) + parseFloat(summary.weight_cost || 0)
    : parseFloat(fallbackFee || 0)

  return cost > 0
    ? <>GH₵ {cost.toFixed(2)}</>
    : <span style={{ color: '#059669' }}>Free delivery</span>
}
