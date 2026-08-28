import React from 'react'

const STEPS = [
  {
    title: 'Browse Products',
    description: 'Discover thousands of products across all categories at the best prices in Ghana.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    title: 'Add to Cart',
    description: 'Pick your items and choose your preferred variants like size or colour.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    title: 'Secure Checkout',
    description: 'Pay safely with Mobile Money. Every transaction is encrypted and protected.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Get Delivered',
    description: 'Sit back and relax — your order is packed and delivered straight to your door.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
]

const SectionHowItWorks = () => (
  <section style={{ padding: '72px 0', position: 'relative', overflow: 'hidden', background: '#fff' }}>
    {/* large radial glow top-left */}
    <div style={{ position: 'absolute', top: -80, left: -80, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
    {/* dot grid */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
    }} />
    <div className="container" style={{ position: 'relative' }}>

      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color_primary)' }}>
          Simple &amp; fast
        </p>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: 'var(--color_heading)' }}>
          How It Works
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px 24px' }}>
        {STEPS.map((step, i) => (
          <div key={step.title} style={{ textAlign: 'center' }}>
            {/* Icon circle */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 22 }}>
              <div style={{
                width: 76, height: 76, borderRadius: '50%', margin: '0 auto',
                background: 'linear-gradient(135deg, var(--color_primary) 0%, #0a0a80 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', boxShadow: '0 8px 28px rgba(0,0,128,0.22)',
              }}>
                {step.icon}
              </div>
              {/* Step number badge */}
              <div style={{
                position: 'absolute', top: -4, right: -4,
                width: 22, height: 22, borderRadius: '50%',
                background: '#fff', border: '2px solid var(--color_primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: 'var(--color_primary)', lineHeight: 1,
              }}>
                {i + 1}
              </div>
            </div>

            <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: 'var(--color_heading)' }}>
              {step.title}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--color_body)', lineHeight: 1.65, maxWidth: 230, marginLeft: 'auto', marginRight: 'auto' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
)

export default SectionHowItWorks
