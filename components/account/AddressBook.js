import React, { useState } from 'react'
import { useGetAddressesQuery, useDeleteAddressMutation } from '../../store/addressesApi'
import { notifyError, notifySuccess } from '../ultils/notify'
import Button from '../ultils/Button'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm'

export default function AddressBook({ selectable = false, selectedId, onSelect, skip = false }) {
  const { data, isLoading } = useGetAddressesQuery(undefined, { skip })
  const [deleteAddress, { isLoading: deleting }] = useDeleteAddressMutation()
  const [formMode, setFormMode] = useState(null) // null | 'create' | <address object being edited>

  const addresses = Array.isArray(data?.data) ? data.data : []

  async function handleDelete(id) {
    if (typeof window !== 'undefined' && !window.confirm('Delete this address?')) return
    try {
      await deleteAddress(id).unwrap()
      notifySuccess('Address deleted.')
    } catch (err) {
      notifyError(err?.data?.message || 'Could not delete this address.')
    }
  }

  function handleSaved(saved) {
    setFormMode(null)
    if (selectable && saved?.id) onSelect?.(saved)
  }

  if (skip) return null

  if (isLoading) {
    return <p style={{ padding: '20px 0', color: 'var(--color_body)', fontSize: 14 }}>Loading addresses...</p>
  }

  return (
    <div>
      {!addresses.length && !formMode && (
        <p style={{ fontSize: 14, color: 'var(--color_body)', marginBottom: 16 }}>
          You don&apos;t have any saved addresses yet.
        </p>
      )}

      {addresses.map((addr) => (
        formMode?.id === addr.id ? (
          <AddressForm key={addr.id} address={addr} onCancel={() => setFormMode(null)} onSaved={handleSaved} />
        ) : (
          <AddressCard
            key={addr.id}
            address={addr}
            selectable={selectable}
            selected={selectable && String(selectedId) === String(addr.id)}
            onSelect={onSelect}
            onEdit={(a) => setFormMode(a)}
            onDelete={handleDelete}
            deleting={deleting}
          />
        )
      ))}

      {formMode === 'create' ? (
        <AddressForm onCancel={() => setFormMode(null)} onSaved={handleSaved} />
      ) : (
        !formMode && (
          <Button type="button" label="+ Add New Address" variant="secondary" onClick={() => setFormMode('create')} />
        )
      )}
    </div>
  )
}
