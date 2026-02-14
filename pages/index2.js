import Head from 'next/head'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import SectionSlideshowIndex2 from '../components/SectionSlideshowIndex2'
import SectionProductTabDeal2 from '../components/SectionProductTabDeal2'
import SectionTwoBanners from '../components/SectionTwoBanners'
import SectionBannersBrand from '../components/SectionBannersBrand'
import SectionProductSlider from '../components/SectionProductSlider'
import SectionProductGrid from '../components/SectionProductGrid'
import SectionBannersCaption from '../components/SectionBannersCaption'
import Footer from '../components/Footer'
import ExtNewsletterPopup from '../components/ExtNewsletterPopup'
import ExtCookiesBar from '../components/ExtCookiesBar'
import ExtNotification from '../components/ExtNotification'

import { DataIndexBanners2 } from '../components/data/DataIndexBanners2';
import { DataIndexBannersBrand } from '../components/data/DataIndexBannersBrand';

export default function Home2() {
  if (typeof window !== 'undefined') {
    document.body.className = "";
    document.body.classList.add('template-index');
    document.body.classList.add('yam-react-2');
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
        <SectionSlideshowIndex2 />
        <SectionProductTabDeal2 />
        <SectionTwoBanners
          banner1={DataIndexBanners2().img1}
          banner2={DataIndexBanners2().img2}
          link1={DataIndexBanners2().img1_link}
          link2={DataIndexBanners2().img2_link} />
        <SectionProductGrid titlecenter={true} />
        <SectionBannersBrand
          data1={DataIndexBannersBrand().data1}
          data2={DataIndexBannersBrand().data2}
          bannerPosition={'right'} />
        <SectionTwoBanners
          banner1={DataIndexBanners2().img3}
          banner2={DataIndexBanners2().img4}
          link1={DataIndexBanners2().img3_link}
          link2={DataIndexBanners2().img4_link} />
        <SectionBannersBrand
          data1={DataIndexBannersBrand().data3}
          data2={DataIndexBannersBrand().data4}
          bannerPosition={'right'} />
        <SectionTwoBanners
          banner1={DataIndexBanners2().img5}
          banner2={DataIndexBanners2().img6}
          link1={DataIndexBanners2().img5_link}
          link2={DataIndexBanners2().img6_link} />
        <SectionProductSlider titlecenter={true} />
        <SectionBannersBrand
          data1={DataIndexBannersBrand().data5}
          data2={DataIndexBannersBrand().data6}
          bannerPosition={'right'} />
        <SectionTwoBanners
          banner1={DataIndexBanners2().img7}
          banner2={DataIndexBanners2().img8}
          link1={DataIndexBanners2().img7_link}
          link2={DataIndexBanners2().img8_link} />
        <SectionBannersCaption />
      </main>
      <Footer />
      <ExtNewsletterPopup />
      <ExtCookiesBar />
      <ExtNotification />
    </div>
  )
}
