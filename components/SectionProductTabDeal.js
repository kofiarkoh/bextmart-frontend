import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import ProductItemGrid from './ultils/ProductItemGrid'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import styles from '../public/assets/styles/Home.module.css'

let checkTab = 0;
const SectionProductTabDeal = () => {
    const [currentTime, setcurrentTime] = useState({ hour: 0, min: 0, sec: 0 });
    const [tab1, setTab1] = useState({ UTCisActive: false, UTCStart: 0, UTCEnd: 9 });   // tab1 0:0 > 9:0
    const [tab2, setTab2] = useState({ UTCisActive: false, UTCStart: 9, UTCEnd: 12 });  // tab2 9:0 > 12:0
    const [tab3, setTab3] = useState({ UTCisActive: false, UTCStart: 12, UTCEnd: 21 }); // tab3 12:0 > 21:0
    const [tab4, setTab4] = useState({ UTCisActive: false, UTCStart: 21, UTCEnd: 24 }); // tab4 21:0 > 24:0
    const [tabisActive, setTabisActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentday = new Date();
            const currentHour = currentday.getUTCHours() + 7; // UTC+7
            setcurrentTime({ hour: currentHour, min: currentday.getUTCMinutes(), sec: currentday.getUTCSeconds() });
            if (checkTab != currentHour) {
                if (currentHour >= tab1.UTCStart && currentHour < tab1.UTCEnd) { setTab1({ ...tab1, UTCisActive: true }); setTabisActive(1)}
                if (currentHour >= tab2.UTCStart && currentHour < tab2.UTCEnd) { setTab2({ ...tab2, UTCisActive: true }); setTabisActive(2)}
                if (currentHour >= tab3.UTCStart && currentHour < tab3.UTCEnd) { setTab3({ ...tab3, UTCisActive: true }); setTabisActive(3)}
                if (currentHour >= tab4.UTCStart && currentHour < tab4.UTCEnd) { setTab4({ ...tab4, UTCisActive: true }); setTabisActive(4)}
                checkTab = currentHour;                
            }
            checkTab = currentHour;
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [tab1, tab2, tab3, tab4]);

    // useEffect(() => {        
    // }, []);

    function checkTabisActive(number) { if (tabisActive === number) return true; else return false; }

    const { t, locale } = useTranslation();
    let {Productdata1, Productdata2, Productdata3, Productdata4} = {};
    switch (locale) {
        case 'en':
            Productdata1 = Product_en.slice(0, 5);
            Productdata2 = Product_en.slice(3, 8);
            Productdata3 = Product_en.slice(2, 7);
            Productdata4 = Product_en.slice(4, 9);
            break;
        case 'fr':
            Productdata1 = Product_fr.slice(0, 5);
            Productdata2 = Product_fr.slice(3, 8);
            Productdata3 = Product_fr.slice(2, 7);
            Productdata4 = Product_fr.slice(4, 9);
            break;
        case 'it':
            Productdata1 = Product_it.slice(0, 5);
            Productdata2 = Product_it.slice(3, 8);
            Productdata3 = Product_it.slice(2, 7);
            Productdata4 = Product_it.slice(4, 9);
            break;
        case 'jp':
            Productdata1 = Product_jp.slice(0, 5);
            Productdata2 = Product_jp.slice(3, 8);
            Productdata3 = Product_jp.slice(2, 7);
            Productdata4 = Product_jp.slice(4, 9);
            break;
    }

    return (
        <>
            <section className={styles.collection_tab_wrapper}>
                <div className={styles.collection_tab}>
                    <div className="container">
                        <div className="collection-tab__container index-collection-tab title-position- title-style-">
                            <div className={styles.collection_tab_component}>
                                <div className="box-divider">
                                    <ul className={`${styles.collection_navtab_title} no-bullet`}>
                                        <li className={`${styles.collection_navtab_tabstitle} tabpro-title ${tab1.UTCisActive ? styles.tab_utcactive : styles.tab_utcdeactivate} ${checkTabisActive(1) ? styles.tab_isactive : ''}`} data-tabs-title="1" data-tabs-collection="/collections" data-tabs-utcstart="0" data-tabs-utcend="9" onClick={() => { setTabisActive(1) }}>
                                            <div className={styles.title}>0 : 00</div>
                                            <div className={`${styles.status_active} ${styles.tab_status}`}>{t("On_going")}</div>
                                            <div className={`${styles.status_inactive} ${styles.tab_status}`}>{t("Coming_Soon")}</div>
                                        </li>
                                        <li className={`${styles.collection_navtab_tabstitle} tabpro-title ${tab2.UTCisActive ? styles.tab_utcactive : styles.tab_utcdeactivate} ${checkTabisActive(2) ? styles.tab_isactive : ''}`} data-tabs-title="2" data-tabs-collection="/collections" data-tabs-utcstart="9" data-tabs-utcend="12" onClick={() => { setTabisActive(2) }}>
                                            <div className={styles.title}>9 : 00</div>
                                            <div className={`${styles.status_active} ${styles.tab_status}`}>{t("On_going")}</div>
                                            <div className={`${styles.status_inactive} ${styles.tab_status}`}>{t("Coming_Soon")}</div>
                                        </li>
                                        <li className={`${styles.collection_navtab_tabstitle} tabpro-title ${tab3.UTCisActive ? styles.tab_utcactive : styles.tab_utcdeactivate} ${checkTabisActive(3) ? styles.tab_isactive : ''}`} data-tabs-title="3" data-tabs-collection="/collections" data-tabs-utcstart="12" data-tabs-utcend="21" onClick={() => { setTabisActive(3)}}>
                                            <div className={styles.title}>12 : 00</div>
                                            <div className={`${styles.status_active} ${styles.tab_status}`}>{t("On_going")}</div>
                                            <div className={`${styles.status_inactive} ${styles.tab_status}`}>{t("Coming_Soon")}</div>
                                        </li>
                                        <li className={`${styles.collection_navtab_tabstitle} tabpro-title ${tab4.UTCisActive ? styles.tab_utcactive : styles.tab_utcdeactivate} ${checkTabisActive(4) ? styles.tab_isactive : ''}`} data-tabs-title="4" data-tabs-collection="/collections" data-tabs-utcstart="21" data-tabs-utcend="24" onClick={() => { setTabisActive(4) }}>
                                            <div className={styles.title}>21 : 00</div>
                                            <div className={`${styles.status_active} ${styles.tab_status}`}>{t("On_going")}</div>
                                            <div className={`${styles.status_inactive} ${styles.tab_status}`}>{t("Coming_Soon")}</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collection-tab__content">
                                    <div className={styles.navtabs__content}>
                                        <div id="tab-template--14471995654218__1652951226954c5b12-1" className="tabs-panel is-active">
                                            <div className={styles.tab_gr}>
                                                <div className={styles.tab_gr_info}>
                                                    <div className="tab-info-gr">
                                                        <div className="mobile-left">
                                                            <div className={styles.tab_info_notify}>{t("Time_zone")}</div>
                                                            <div className={styles.tab_info_timer} data-timer="" data-time-utc="7">
                                                                <span className={styles.timer_hrs_wrapper}><span className={`${styles.timer_value} timer-hrs`}>{currentTime.hour}</span><span className={styles.timer_text}>{t("hrs")}</span></span>
                                                                <span className={styles.timer_spacing}>:</span>
                                                                <span className={styles.timer_min_wrapper}><span className={`${styles.timer_value} timer-min`}>{currentTime.min}</span><span className={styles.timer_text}>{t("min")}</span></span>
                                                                <span className={styles.timer_spacing}>:</span>
                                                                <span className={styles.timer_sec_wrapper}><span className={`${styles.timer_value} timer-sec`}>{currentTime.sec}</span><span className={styles.timer_text}>{t("sec")}</span></span>
                                                            </div>
                                                        </div>
                                                        <div className="mobile-right">
                                                            <div className={styles.tab_info_banner}>
                                                                <Image className="brands__image effect-img" src="/assets/images/banner/YMShop-home1-deal.png" alt="" width={190} height={190} />
                                                            </div>
                                                            <div className={styles.info_viewall}>
                                                                <Link href="/collections">{t("VIEW_ALL")} &gt;&gt;</Link>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.tab_products_gr}>
                                                    <div className={`${styles.tab_products_row} row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 row-cols-xxl-5 tab-1 ${checkTabisActive(1) ? styles.tab_show : styles.tab_hide }`} data-tabs="1">
                                                        {
                                                            Productdata1.map((item, index) => (
                                                                <div key={index} className="product-item__content col d-none d-xxl-block
                                                                d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                                                    <ProductItemGrid product={item} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className={`${styles.tab_products_row}  row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 row-cols-xxl-5 tab-2 ${checkTabisActive(2) ? styles.tab_show : styles.tab_hide }`} data-tabs="2">
                                                        {
                                                            Productdata2.map((item, index) => (
                                                                <div key={index} className="product-item__content col d-none d-xxl-block
                                                                d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                                                    <ProductItemGrid product={item} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className={`${styles.tab_products_row}  row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 row-cols-xxl-5 tab-3 ${checkTabisActive(3) ? styles.tab_show : styles.tab_hide }`} data-tabs="3">
                                                        {
                                                            Productdata3.map((item, index) => (
                                                                <div key={index} className="product-item__content col d-none d-xxl-block
                                                                d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                                                    <ProductItemGrid product={item} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className={`${styles.tab_products_row}  row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 row-cols-xxl-5 tab-4 ${checkTabisActive(4) ? styles.tab_show : styles.tab_hide }`} data-tabs="4">
                                                        {
                                                            Productdata4.map((item, index) => (
                                                                <div key={index} className="product-item__content col d-none d-xxl-block
                                                                d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                                                    <ProductItemGrid product={item} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionProductTabDeal;