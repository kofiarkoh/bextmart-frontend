import Head from 'next/head'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import SectionSlideshowIndex1 from '../components/SectionSlideshowIndex1'
import SectionCategoriesSlider from '../components/SectionCategoriesSlider'
import SectionProductTabDeal from '../components/SectionProductTabDeal'
import SectionBrandListing from '../components/SectionBrandListing'
import SectionTwoBanners from '../components/SectionTwoBanners'
import SectionBannersBrand from '../components/SectionBannersBrand'
import SectionProductSlider from '../components/SectionProductSlider'
import SectionProductGrid from '../components/SectionProductGrid'
import SectionCategoryGrid from '../components/SectionCategoryGrid'
import SectionHowItWorks from '../components/SectionHowItWorks'
import Footer from '../components/Footer'
import ExtNewsletterPopup from '../components/ExtNewsletterPopup'
import ExtCookiesBar from '../components/ExtCookiesBar'
import ExtNotification from '../components/ExtNotification'

import { DataIndexBanners } from '../components/data/DataIndexBanners';
import { DataIndexBannersBrand } from '../components/data/DataIndexBannersBrand';

export default function Home() {
  if (typeof window !== 'undefined') {
    document.body.className = "";
    document.body.classList.add('template-index');
    document.body.classList.add('yam-react-1');
  }
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t('Index_page')}</title>
        <meta name="description" content={t('Index_page')} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header />
      <main>
        <SectionSlideshowIndex1 />

        <SectionCategoryGrid />

        <SectionProductGrid />

        {/* Delivery CTA Banner */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '72px 0', background: 'linear-gradient(135deg, #2828c8 0%, #1414a0 55%, #0c0c6e 100%)' }}>

          {/* SVG grid — guaranteed visible */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
            {/* dot at each intersection */}
            <defs>
              <pattern id="cta-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.3)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>

          {/* glowing orbs */}
          <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: 400, height: 400, borderRadius: '50%', background: 'rgba(80,80,220,0.55)', filter: 'blur(70px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', right: '-40px', width: 320, height: 320, borderRadius: '50%', background: 'rgba(60,60,200,0.5)', filter: 'blur(65px)', pointerEvents: 'none' }} />

          {/* decorative rings */}
          <div style={{ position: 'absolute', top: '50%', left: '-100px', transform: 'translateY(-50%)', width: 380, height: 380, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 320, height: 320, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
              <div style={{
                width: 68, height: 68, borderRadius: 20, flexShrink: 0,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div>
                <h2 style={{ margin: '0 0 12px', fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                  Fast &amp; Reliable Delivery<br />Across Ghana
                </h2>
                <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: 480 }}>
                  From Accra to Kumasi, Takoradi to Tamale — we deliver to your doorstep quickly and safely, every time.
                </p>
              </div>
              <a href="/products" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: 'var(--color_primary)', fontWeight: 700,
                fontSize: 14, padding: '14px 36px', borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              }}>
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <SectionHowItWorks />
      </main>
      <Footer />
      {/* <ExtCookiesBar /> */}
      {/* <ExtNotification /> */}
    </div>
  )
}
