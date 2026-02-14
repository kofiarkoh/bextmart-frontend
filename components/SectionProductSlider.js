import React from "react";
import Link from 'next/link';
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import {SVGArrowLeft, SVGArrowRight} from '../public/assets/SVG';

import ProductItemGrid from './ultils/ProductItemGrid'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import styles from '../public/assets/styles/Home3.module.css'

SwiperCore.use([Navigation, Autoplay]);

const  SectionProductSlider = (props) => {
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
                slidesPerView: 6,
            }
        }
    };

    const { t, locale } = useTranslation();
    let Productdata, titlecenter = false;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(0, 10); break;
        case 'fr':
            Productdata = Product_fr.slice(0, 10); break;
        case 'it':
            Productdata = Product_it.slice(0, 10); break;
        case 'jp':
            Productdata = Product_jp.slice(0, 10); break;
    }
    if(props.titlecenter) titlecenter = true;
    
    return (
        <>
            <section className="html-section index-collection-slider">
                <div className={`${styles.product_slider} spaced-section`}>
                    <div className="container">
                        <div className={`${styles.product_slider_container} ${titlecenter? 'title-position-center': 'title-position-left'}`}>
                            <div className={`${styles.product_slider_boxdivider} box-divider no-border`}>
                                <h2 className={`${styles.product_slider_boxtitle}`}>{t("BEST_OF_THE_MONTH")}</h2>
                                <div className="viewall"><Link className={styles.collection_slider_viewall_a} href="/collections">{t("VIEW_ALL")} &gt;&gt;</Link></div>
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionProductSlider;