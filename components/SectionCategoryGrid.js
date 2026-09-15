import React, { useMemo } from 'react'
import Link from 'next/link'
import { useGetCategoriesQuery } from '../store/productsApi'
import { buildImageUrl } from './ultils/Tools'

// Temporary toggle to preview the cards without their name/"Browse" labels.
const SHOW_CATEGORY_LABELS = false

// Brand palette (blue, gold, near-black), brightened for visibility as a border gradient.
const BRAND_COLORS = ['#2b5cff', '#ffd700', '#2b2b3d']

function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function randomBrandGradient() {
  const angle = Math.floor(Math.random() * 360)
  const [c1, c2, c3] = shuffled(BRAND_COLORS)
  return `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`
}

const SectionCategoryGrid = () => {
  const { data, isLoading } = useGetCategoriesQuery()
  const raw = data?.data?.data ?? data?.data ?? data ?? []
  const categories = (Array.isArray(raw) ? raw : Object.values(raw)).slice(0, 6)

  const cardGradients = useMemo(() => {
    const map = {}
    categories.forEach((cat) => {
      map[cat.id] = randomBrandGradient()
    })
    return map
  }, [categories])

  return (
    <section style={{ padding: '56px 0', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* diagonal stripe pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0px, transparent 24px, rgba(99,102,241,0.04) 24px, rgba(99,102,241,0.04) 25px)',
      }} />
      <div className="container" style={{ position: 'relative' }}>

        <div style={{ marginBottom: 28 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color_primary)' }}>
            Explore
          </p>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: 'var(--color_heading)' }}>
            Shop by Category
          </h2>
        </div>

        <div className="category-grid-mobile-bleed" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 16, background: '#e5e7eb', paddingBottom: '66.71%' }} />
              ))
            : categories.map((cat) => {
                const img = buildImageUrl(cat.cover_image || cat.photo || cat.image || cat.thumbnail || null)
                const href = `/products?category=${cat.slug || cat.id}`
                return (
                  <div
                    key={cat.id}
                    style={{
                      borderRadius: 18,
                      padding: 2,
                      background: cardGradients[cat.id],
                      boxShadow: '0 4px 12px rgba(0,0,128,0.15), 0 2px 4px rgba(0,0,0,0.06)',
                    }}
                  >
                    <Link href={href} style={{ textDecoration: 'none', display: 'block', borderRadius: 16, overflow: 'hidden', position: 'relative', paddingBottom: '66.71%', background: '#e2e8f0' }}>
                      {img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img} alt={cat.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 0.35s ease' }} />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />
                      {/* solid label bar: its height always matches the text content, so a wrapped 2-line
                          name never sticks up into a lighter, less-darkened part of the image */}
                      {SHOW_CATEGORY_LABELS && (
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px 16px', background: 'rgba(228,230,233,0.94)' }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>{cat.name}</p>
                        <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(0,0,0,0.65)', fontWeight: 500 }}>Browse →</p>
                      </div>
                      )}
                    </Link>
                  </div>
                )
              })
          }
        </div>
      </div>
    </section>
  )
}


export default SectionCategoryGrid
