import Head from 'next/head'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import SectionSlideshowIndex3 from '../components/SectionSlideshowIndex3'
import SectionCategories from '../components/SectionCategories'
import SectionCountdown from '../components/SectionCountdown'
import SectionProductSlider from '../components/SectionProductSlider'
import SectionBrandListing2 from '../components/SectionBrandListing2'
import SectionBannersCaption2 from '../components/SectionBannersCaption2'
import SectionTwoBanners from '../components/SectionTwoBanners'
import SectionProductTabBanner from '../components/SectionProductTabBanner'
import SectionProductGrid from '../components/SectionProductGrid'
import Footer from '../components/Footer'
import ExtNewsletterPopup from '../components/ExtNewsletterPopup'
import ExtCookiesBar from '../components/ExtCookiesBar'
import ExtNotification from '../components/ExtNotification'

import { DataIndexBanners2 } from '../components/data/DataIndexBanners3';

export default function Home3() {
  if (typeof window !== 'undefined') {
    document.body.className = "";
    document.body.classList.add('template-index');
    document.body.classList.add('yam-react-3');
  }
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>{t('Index_page')}</title>
        <meta name="description" content={t('Index_page')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <SectionSlideshowIndex3 />
        <SectionCategories />
        <SectionCountdown />
        <SectionProductSlider titlecenter={true} />
        <SectionBrandListing2 />
        <SectionBannersCaption2 />
        <SectionTwoBanners
          banner1={DataIndexBanners2().img1}
          banner2={DataIndexBanners2().img2}
          link1={DataIndexBanners2().img1_link}
          link2={DataIndexBanners2().img2_link} />
        <SectionProductTabBanner />
        <SectionProductGrid />
      </main>
      <Footer />
      <ExtNewsletterPopup />
      <ExtCookiesBar />
      <ExtNotification />
    </div>
  )
}
