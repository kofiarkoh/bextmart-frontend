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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <SectionSlideshowIndex1 />
        <SectionCategoriesSlider />
        <SectionProductTabDeal />
        <SectionBrandListing />
        <SectionTwoBanners
          banner1={DataIndexBanners().img1}
          banner2={DataIndexBanners().img2}
          link1={DataIndexBanners().img1_link}
          link2={DataIndexBanners().img2_link} />
        <SectionBannersBrand
          data1={DataIndexBannersBrand().data1}
          data2={DataIndexBannersBrand().data2} />
        <SectionTwoBanners
          banner1={DataIndexBanners().img3}
          banner2={DataIndexBanners().img4}
          link1={DataIndexBanners().img3_link}
          link2={DataIndexBanners().img4_link} />
        <SectionBannersBrand
          data1={DataIndexBannersBrand().data3}
          data2={DataIndexBannersBrand().data4} />
        <SectionTwoBanners
          banner1={DataIndexBanners().img5}
          banner2={DataIndexBanners().img6}
          link1={DataIndexBanners().img5_link}
          link2={DataIndexBanners().img6_link} />
        <SectionBannersBrand
          data1={DataIndexBannersBrand().data5}
          data2={DataIndexBannersBrand().data6} />
        <SectionTwoBanners
          banner1={DataIndexBanners().img7}
          banner2={DataIndexBanners().img8}
          link1={DataIndexBanners().img7_link}
          link2={DataIndexBanners().img8_link} />
        <SectionProductSlider />
        <SectionProductGrid />
      </main>
      <Footer />
      <ExtNewsletterPopup />
      <ExtCookiesBar />
      <ExtNotification />
    </div>
  )
}
