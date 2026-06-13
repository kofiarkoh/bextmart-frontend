import React, { useState } from 'react'
import { useCreateAddressMutation, useUpdateAddressMutation } from '../../store/addressesApi'
import { useGetAddressOptionsQuery } from '../../store/checkoutApi'
import { notifyError, notifySuccess } from '../ultils/notify'
import Button from '../ultils/Button'

const inputStyle = {
  width: '100%', padding: '10px 12px', boxSizing: 'border-box',
  border: '1px solid var(--color_line)', borderRadius: 4, fontSize: 14,
}

const labelStyle = { display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13 }

const errorStyle = { color: '#dc2626', fontSize: 12, marginTop: 4 }

function Field({ label, error, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {children}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

export default function AddressForm({ address, onSaved, onCancel }) {
  const isEdit = !!address?.id

  const [form, setForm] = useState({
    first_name: address?.first_name || '',
    last_name: address?.last_name || '',
    phone_number: address?.phone_number || '',
    additional_phone_number: address?.additional_phone_number || '',
    address: address?.address || '',
    additional_info: address?.additional_info || '',
    region: address?.region || '',
    city: address?.city || '',
    is_default: address?.is_default || false,
  })
  const [errors, setErrors] = useState({})

  const { data: optionsData, isLoading: loadingOptions } = useGetAddressOptionsQuery()
  const regions = Array.isArray(optionsData?.data) ? optionsData.data : []
  const selectedRegion = regions.find((r) => r.name === form.region)
  const cities = selectedRegion?.cities || []

  const [createAddress, { isLoading: creating }] = useCreateAddressMutation()
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation()
  const saving = creating || updating

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})

    try {
      const result = isEdit
        ? await updateAddress({ id: address.id, ...form }).unwrap()
        : await createAddress(form).unwrap()

      notifySuccess(isEdit ? 'Address updated successfully.' : 'Address added successfully.')
      onSaved?.(result?.data || result)
    } catch (err) {
      if (err?.data?.errors) {
        setErrors(err.data.errors)
      } else {
        notifyError(err?.data?.message || 'Could not save this address. Please try again.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff', border: '1px solid var(--color_line)', borderRadius: 10, padding: 20,
    }}>
      <h4 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}>
        {isEdit ? 'Edit Address' : 'Add New Address'}
      </h4>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="First Name" required error={errors.first_name?.[0]}>
            <input
              type="text" style={inputStyle} value={form.first_name}
              onChange={(e) => update('first_name', e.target.value)}
            />
          </Field>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="Last Name" required error={errors.last_name?.[0]}>
            <input
              type="text" style={inputStyle} value={form.last_name}
              onChange={(e) => update('last_name', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="Phone Number" required error={errors.phone_number?.[0]}>
            <input
              type="text" style={inputStyle} value={form.phone_number}
              onChange={(e) => update('phone_number', e.target.value)}
            />
          </Field>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="Additional Phone Number" error={errors.additional_phone_number?.[0]}>
            <input
              type="text" style={inputStyle} value={form.additional_phone_number}
              onChange={(e) => update('additional_phone_number', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="Region" required error={errors.region?.[0]}>
            <select
              style={inputStyle}
              value={form.region}
              disabled={loadingOptions}
              onChange={(e) => { update('region', e.target.value); update('city', '') }}
            >
              <option value="">Select a region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.name}>{region.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <Field label="City" required error={errors.city?.[0]}>
            <select
              style={inputStyle}
              value={form.city}
              disabled={!form.region}
              onChange={(e) => update('city', e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <Field label="Street Address" required error={errors.address?.[0]}>
        <textarea
          rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="House number, street name..."
        />
      </Field>

      <Field label="Additional Info" error={errors.additional_info?.[0]}>
        <textarea
          rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.additional_info}
          onChange={(e) => update('additional_info', e.target.value)}
          placeholder="Landmark, delivery notes... (optional)"
        />
      </Field>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
          <input
            type="checkbox" checked={form.is_default}
            onChange={(e) => update('is_default', e.target.checked)}
          />
          Set as default address
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button type="submit" label={isEdit ? 'Save Changes' : 'Add Address'} loading={saving} />
        <Button type="button" label="Cancel" variant="secondary" onClick={onCancel} disabled={saving} />
      </div>
    </form>
  )
}
