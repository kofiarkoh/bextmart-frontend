import Head from 'next/head'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import SectionCategoriesSlider from '../components/SectionCategoriesSlider'
import SectionSlideshowIndex5 from '../components/SectionSlideshowIndex5'
import SectionCategoriesProducts from '../components/SectionCategoriesProducts'
import SectionProductSlider from '../components/SectionProductSlider'
import SectionThreeBanners2 from '../components/SectionThreeBanners2'
import SectionBannersProducts from '../components/SectionBannersProducts'
import SectionThreeBanners from '../components/SectionThreeBanners'
import SectionBrandListing3 from '../components/SectionBrandListing3'
import SectionBlogSlider from '../components/SectionBlogSlider'
import SectionInformation from '../components/SectionInformation'
import Footer from '../components/Footer'
import ExtNewsletterPopup from '../components/ExtNewsletterPopup'
import ExtCookiesBar from '../components/ExtCookiesBar'
import ExtNotification from '../components/ExtNotification'
import { DataIndexBanners3 } from '../components/data/DataIndexBanners';
import { DataIndexBP1, DataIndexBP2 } from '../components/data/DataIndexBannersProducts';

export default function Home5() {
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-index');
        document.body.classList.add('yam-react-5');
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
                <SectionCategoriesSlider />
                <SectionSlideshowIndex5 />
                <SectionCategoriesProducts />
                <SectionProductSlider />
                <SectionThreeBanners2
                    banner1={DataIndexBanners3().img1}
                    banner2={DataIndexBanners3().img2}
                    banner3={DataIndexBanners3().img3}
                    link1={DataIndexBanners3().img1_link}
                    link2={DataIndexBanners3().img2_link}
                    link3={DataIndexBanners3().img3_link}
                />
                <SectionBannersProducts data={DataIndexBP1()} count={3} />
                <SectionThreeBanners
                    banner1={DataIndexBanners3().img4}
                    banner2={DataIndexBanners3().img5}
                    banner3={DataIndexBanners3().img6}
                    link1={DataIndexBanners3().img4_link}
                    link2={DataIndexBanners3().img5_link}
                    link3={DataIndexBanners3().img6_link}
                />
                <SectionProductSlider />
                <SectionBrandListing3 />
                <SectionBannersProducts data={DataIndexBP2()} count={2} />
                <SectionThreeBanners
                    banner1={DataIndexBanners3().img7}
                    banner2={DataIndexBanners3().img8}
                    banner3={DataIndexBanners3().img9}
                    link1={DataIndexBanners3().img7_link}
                    link2={DataIndexBanners3().img8_link}
                    link3={DataIndexBanners3().img9_link}
                />
                <SectionBlogSlider />
                <SectionInformation />
            </main>
            <Footer />
            <ExtNewsletterPopup />
            <ExtCookiesBar />
            <ExtNotification />
        </div>
    )
}
