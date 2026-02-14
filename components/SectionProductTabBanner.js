import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import { DataIndexTabBanner } from './data/DataIndexTabBanner';
import ProductItemGrid from './ultils/ProductItemGrid'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import styles from '../public/assets/styles/Home3.module.css'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';

SwiperCore.use([Navigation, Autoplay]);
const SectionProductTabBanner = () => {
    const [tabisActive, setTabisActive] = useState(1);

    const { t, locale } = useTranslation();
    let { Productdata1, Productdata2 } = {};
    switch (locale) {
        case 'en':
            Productdata1 = Product_en.slice(0, 8);
            Productdata2 = Product_en.slice(3, 11);
            break;
        case 'fr':
            Productdata1 = Product_fr.slice(0, 8);
            Productdata2 = Product_fr.slice(3, 11);
            break;
        case 'it':
            Productdata1 = Product_it.slice(0, 8);
            Productdata2 = Product_it.slice(3, 11);
            break;
        case 'jp':
            Productdata1 = Product_jp.slice(0, 8);
            Productdata2 = Product_jp.slice(3, 11);
            break;
    }

    const carouselOptions = {
        spaceBetween: 20,
        // loop: true,
        navigation: {
            prevEl: ".carousel-nav-prev",
            nextEl: ".carousel-nav-next",
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 5000,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 4,
            }
        }
    };

    return (
        <>
            <section className="index-collection-tab">
                <div className={styles.tabs2_section}>
                    <div className="container">
                        <div className={`${styles.tab2_container} index-collection-tab title-position- title-style-`}>
                            <div className={`${styles.tab2_component} tab-component`}>
                                <div className={`${styles.tab2_divider} box-divider`}>
                                    <ul className={`${styles.tab2_navtab_title} no-bullet`}>
                                        <li className={`${styles.tab2_tabtitle} ${(tabisActive === 1) ? styles.is_active : ''}`} onClick={() => { setTabisActive(1) }}>
                                            <span className={styles.title}>{DataIndexTabBanner().title1}</span>
                                        </li>
                                        <li className={`${styles.tab2_tabtitle} ${(tabisActive === 2) ? styles.is_active : ''} `} onClick={() => { setTabisActive(2) }}>
                                            <span className={styles.title}>{DataIndexTabBanner().title2}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collection-tab__content">
                                    <div className={`${styles.tab2_content}`}>
                                        <div className={`${styles.tab2_content_inner} row ${(tabisActive === 1) ? styles.is_active : ''} `}>
                                            <div className={styles.tab2_content_viewall}><Link href={DataIndexTabBanner().banner1_link}>{DataIndexTabBanner().viewalltext} &gt;&gt;</Link></div>
                                            <div className={styles.tab2_content_banner}><Image src={DataIndexTabBanner().banner1} alt="" width={362} height={570} /></div>
                                            <div className={styles.tab2_content_slider}>
                                                <slider-component>
                                                    <div className="carousel-wrapper carousel-">
                                                        <Swiper {...carouselOptions} className='swiper-container'>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata1.slice(0, 2).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata1.slice(2, 4).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata1.slice(4, 6).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata1.slice(6, 8).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                        </Swiper>
                                                        <div className="carousel-navigation product-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                                        <div className="carousel-navigation product-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                                    </div>
                                                </slider-component>
                                            </div>
                                        </div>
                                        <div className={`${styles.tab2_content_inner} row ${(tabisActive === 2) ? styles.is_active : ''} `}>
                                            <div className={styles.tab2_content_viewall}><Link href={DataIndexTabBanner().banner2_link}>{DataIndexTabBanner().viewalltext} &gt;&gt;</Link></div>
                                            <div className={styles.tab2_content_banner}><Image src={DataIndexTabBanner().banner2} alt="" width={362} height={570} /></div>
                                            <div className={styles.tab2_content_slider}>
                                                <slider-component>
                                                    <div className="carousel-wrapper carousel-">
                                                        <Swiper {...carouselOptions} className='swiper-container'>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata2.slice(0, 2).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata2.slice(2, 4).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata2.slice(4, 6).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                {
                                                                    Productdata2.slice(6, 8).map((item, index) => (
                                                                        <div className={`product-item__content product-${index}`} key={index}>
                                                                            <ProductItemGrid product={item} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </SwiperSlide>
                                                        </Swiper>
                                                        <div className="carousel-navigation product-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                                        <div className="carousel-navigation product-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                                    </div>
                                                </slider-component>
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

export default SectionProductTabBanner;