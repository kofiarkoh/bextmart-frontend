import React from 'react'
import Link from 'next/link'
import { useGetCategoriesQuery } from '../store/productsApi'
import { buildImageUrl } from './ultils/Tools'

const SectionCategoryGrid = () => {
  const { data, isLoading } = useGetCategoriesQuery()
  const raw = data?.data?.data ?? data?.data ?? data ?? []
  const categories = (Array.isArray(raw) ? raw : Object.values(raw)).slice(0, 6)

  return (
    <section style={{ padding: '56px 0', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* diagonal stripe pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0px, transparent 24px, rgba(99,102,241,0.04) 24px, rgba(99,102,241,0.04) 25px)',
      }} />
      <div className="container" style={{ position: 'relative' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color_primary)' }}>
              Explore
            </p>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: 'var(--color_heading)' }}>
              Shop by Category
            </h2>
          </div>
          <Link href="/products" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color_primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, paddingBottom: 4 }}>
            All categories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>

        <div className="category-grid-mobile-bleed" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 16, background: '#e5e7eb', paddingBottom: '115%' }} />
              ))
            : categories.map((cat) => {
                const img = buildImageUrl(cat.cover_image || cat.photo || cat.image || cat.thumbnail || null)
                const href = `/products?category=${cat.slug || cat.id}`
                return (
                  <Link key={cat.id} href={href} style={{ textDecoration: 'none', display: 'block', borderRadius: 16, overflow: 'hidden', position: 'relative', paddingBottom: '115%', background: '#e2e8f0' }}>
                    {img && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={cat.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 0.35s ease' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
                    {/* solid label bar: its height always matches the text content, so a wrapped 2-line
                        name never sticks up into a lighter, less-darkened part of the image */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px 16px', background: 'rgba(0,0,0,0.62)' }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{cat.name}</p>
                      <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Browse →</p>
                    </div>
                  </Link>
                )
              })
          }
        </div>
      </div>
    </section>
  )
}


export default SectionCategoryGrid
