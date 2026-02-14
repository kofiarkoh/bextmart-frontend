import React from "react";
import Link from 'next/link';
import useTranslation from './ultils/useTranslation'
import AllCategories from './ultils/LeftAllCategories2'
import CountdownTimer from '../components/ultils/CountdownTimer';

import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';

import ProductItemGrid from './ultils/ProductItemGrid'
import ProductItemList from './ultils/ProductItemList'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import styles from '../public/assets/styles/Home5.module.css'

SwiperCore.use([Navigation, Autoplay]);

const SectionCategoriesProducts = () => {
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".product-carousel-nav-prev",
            nextEl: ".product-carousel-nav-next",
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
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
            1400: {
                slidesPerView: 5,
            }
        }
    };

    const carouselOptions2 = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".product-carousel2-nav-prev",
            nextEl: ".product-carousel2-nav-next",
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

    const { t, locale } = useTranslation();
    let Productdata, Productdata2;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(0, 7);
            Productdata2 = Product_en.slice(8, 13);
            break;
        case 'fr':
            Productdata = Product_fr.slice(0, 7);
            Productdata2 = Product_en.slice(8, 13);
            break;
        case 'it':
            Productdata = Product_it.slice(0, 7);
            Productdata2 = Product_en.slice(8, 13);
            break;
        case 'jp':
            Productdata = Product_jp.slice(0, 7);
            Productdata2 = Product_en.slice(8, 13);
            break;
    }

    const dateText = {
        days: t(""),
        hrs: t(""),
        mins: t(""),
        secs: t("")
    }
    let timer = "Mar 31 2023";

    return (
        <>
            <section className={`html-section index-catepro`}>
                <div className={`spaced-section ${styles.catepro_template}`}>
                    <div className="container">
                        <div className={styles.catepro_content}>
                            <div className={`main-header__allcollections ${styles.catepro_content_left} d-none d-lg-block`}>
                                <div className={`top-header__menu-root header__allcollections ${styles.catepro_left_inner}`}>
                                    <div className="header__categorie-dropdown">
                                        <AllCategories />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.catepro_content_right}>
                                <div className="top-products-slider">
                                    <div className="box-divider no-border">
                                        <h2 className={`box-title ${styles.cateboxtitle}`}>{t("Index5_AllProTitle")}</h2>
                                        <div className="viewall"><Link href="/collections">{t("Index5_AllProViewall")} &gt;</Link></div>
                                    </div>
                                    <div className="collection-slider__content">
                                        <slider-component className="collection__slider">
                                            <div className={`${styles.product_slider_carousel_wrapper} carousel-wrapper carousel-`}>
                                                <Swiper {...carouselOptions} className='swiper-container'>
                                                    {
                                                        Productdata.map((item, index) => (
                                                            <SwiperSlide key={index}>
                                                                <div className={`product-item__content product-${index}`}>
                                                                    <ProductItemGrid product={item} />
                                                                </div>
                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper>
                                                <div className="carousel-navigation product-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                                <div className="carousel-navigation product-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                            </div>
                                        </slider-component>
                                    </div>
                                </div>
                                <div className={styles.catepro_bottomslider}>
                                    <div className={`box-divider no-border ${styles.catepro_bottomslider_boxdivider}`}>
                                        <h2 className={`box-title ${styles.catepro_bottomslider_boxtitle}`}>{t("Index5_AllProTitle2")}</h2>
                                        <div className={styles.catepro_bottomslider_boxcountdown}>
                                            <div className="endin">{t("Index5_AllProText")}</div>
                                            <CountdownTimer targetDate={timer} text={dateText} />
                                        </div>
                                    </div>
                                    <div className="collection-slider__content">
                                        <slider-component className="collection__slider">
                                            <div className={`${styles.product_slider_carousel_wrapper} carousel-wrapper carousel-`}>
                                                <Swiper {...carouselOptions2} className='swiper-container'>
                                                    {
                                                        Productdata2.map((item, index) => (
                                                            <SwiperSlide key={index}>
                                                                <div className={`product-item__content product-${index}`}>
                                                                    <div className="product-item__list ">
                                                                        <ProductItemList product={item} />
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper>
                                                <div className="carousel-navigation product-carousel2-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                                <div className="carousel-navigation product-carousel2-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                            </div>
                                        </slider-component>
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
export default SectionCategoriesProducts;