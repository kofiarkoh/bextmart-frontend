import Head from 'next/head'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import SectionSlideshowIndex4 from '../components/SectionSlideshowIndex4'
import SectionCategoriesSlider from '../components/SectionCategoriesSlider'
import SectionBannersCaption3 from '../components/SectionBannersCaption3'
import SectionCountdown from '../components/SectionCountdown'
import SectionTwoBanners from '../components/SectionTwoBanners'
import SectionProductSlider from '../components/SectionProductSlider'
import SectionProductTabBanner from '../components/SectionProductTabBanner'
import SectionThreeBanners from '../components/SectionThreeBanners'
import SectionProductGrid from '../components/SectionProductGrid'
import Footer from '../components/Footer'
import ExtNewsletterPopup from '../components/ExtNewsletterPopup'
import ExtCookiesBar from '../components/ExtCookiesBar'
import ExtNotification from '../components/ExtNotification'

import { DataIndexBC1, DataIndexBC2 } from '../components/data/DataIndexBannersCaption3'
import { DataIndexBanners, DataIndexBanners2 } from '../components/data/DataIndexBanners';

export default function Home4() {
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-index');
        document.body.classList.add('yam-react-4');
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
                <SectionSlideshowIndex4 />
                <SectionCategoriesSlider />
                <SectionBannersCaption3 data={DataIndexBC1()} />
                <SectionCountdown />
                <SectionBannersCaption3 data={DataIndexBC2()} />
                <SectionTwoBanners
                    banner1={DataIndexBanners().img7}
                    banner2={DataIndexBanners().img8}
                    link1={DataIndexBanners().img7_link}
                    link2={DataIndexBanners().img8_link} />
                <SectionProductSlider />
                <SectionProductTabBanner />
                <SectionThreeBanners
                    banner1={DataIndexBanners2().img1}
                    banner2={DataIndexBanners2().img2}
                    banner3={DataIndexBanners2().img3}
                    link1={DataIndexBanners2().img1_link}
                    link2={DataIndexBanners2().img2_link}
                    link3={DataIndexBanners2().img3_link}
                />
                <SectionProductGrid />
            </main>
            <Footer />
            <ExtNewsletterPopup />
            <ExtCookiesBar />
            <ExtNotification />
        </div>
    )
}
