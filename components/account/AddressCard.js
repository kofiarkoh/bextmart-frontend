import React from 'react'

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
  </svg>
)

const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function AddressCard({ address, selectable, selected, onSelect, onEdit, onDelete, deleting }) {
  return (
    <div
      onClick={selectable ? () => onSelect?.(address) : undefined}
      style={{
        border: `2px solid ${selected ? 'var(--color_primary)' : 'var(--color_line)'}`,
        borderRadius: 10, padding: '14px 16px', marginBottom: 12,
        background: selected ? 'rgba(0,0,128,0.03)' : '#fff',
        cursor: selectable ? 'pointer' : 'default',
        position: 'relative', transition: 'border-color 0.15s, background 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color_heading)' }}>
              {address.first_name} {address.last_name}
            </span>
            {address.is_default && (
              <span style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 10,
                background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 600,
              }}>
                Default
              </span>
            )}
          </div>
          <p style={{ margin: '0 0 2px', fontSize: 13, color: 'var(--color_body)' }}>
            {address.phone_number}
            {address.additional_phone_number ? `, ${address.additional_phone_number}` : ''}
          </p>
          <p style={{ margin: '0 0 2px', fontSize: 13, color: 'var(--color_body)' }}>
            {address.address}
          </p>
          {address.additional_info && (
            <p style={{ margin: '0 0 2px', fontSize: 13, color: 'var(--color_body)' }}>
              {address.additional_info}
            </p>
          )}
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color_body)' }}>
            {address.city}, {address.region}
          </p>
        </div>

        {selectable ? (
          <div style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
            border: `2px solid ${selected ? 'var(--color_primary)' : 'var(--color_line)'}`,
            background: selected ? 'var(--color_primary)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}>
            {selected && <IconCheck />}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => onEdit?.(address)}
              title="Edit address"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 6,
                border: '1px solid var(--color_line)', background: '#fff',
                color: 'var(--color_body)', cursor: 'pointer',
              }}
            >
              <IconEdit />
            </button>
            <button
              onClick={() => onDelete?.(address.id)}
              disabled={deleting}
              title="Delete address"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 6,
                border: '1px solid #fecaca', background: '#fff',
                color: '#dc2626', cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.6 : 1,
              }}
            >
              <IconTrash />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
