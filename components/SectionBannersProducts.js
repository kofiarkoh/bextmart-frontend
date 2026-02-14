import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'

import ProductItemGrid from './ultils/ProductItemGrid'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import styles from '../public/assets/styles/Home5.module.css'

import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
SwiperCore.use([Navigation, Autoplay]);

const SectionBannersProducts = ({ data, count }) => {
    const { t, locale } = useTranslation();
    let Productdata, DivClass, ImgW, ImgH;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(0, 7);
            break;
        case 'fr':
            Productdata = Product_fr.slice(0, 7);
            break;
        case 'it':
            Productdata = Product_it.slice(0, 7);
            break;
        case 'jp':
            Productdata = Product_jp.slice(0, 7);
            break;
    }

    switch (count) {
        case 2:
            DivClass = 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6';
            ImgW = 611;
            ImgH = 236;
            break;
        default:
            DivClass = 'col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4';
            ImgW = 401;
            ImgH = 235;
            break;
    }

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

    const ElementTop = (props) => {
        return (
            <div className={`${styles.bp_griditem} ${DivClass}`}>
                <div className="effect effect-shine">
                    <Link href={props.link} className='banner-grid__link effect-parent'>
                        <Image className="banner-grid__link effect-parent" src={props.bkg} alt="" width={ImgW} height={ImgH} />
                    </Link>
                    <div className={styles.bp_captionarea}>
                        <div className={styles.bp_heading}>{props.title}</div>
                        <div className={styles.bp_desc}>{props.desc}</div>
                        <div className={styles.bp_action}><Link href={props.link} className={`${styles.bp_action_button} button`}>{props.action}</Link></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className={`html-section index-banners-productslider`}>
            <div className={`spaced-section ${styles.banners_productslider}`}>
                <div className="container">
                    <div className={styles.bp_container}>
                        <div className={`box-divider no-border ${styles.bp_boxdivider}`}>
                            <h2 className={`box-title ${styles.bp_boxtitle}`}>{t("Index5_BPTitle")}</h2>
                            <div className={`viewall ${styles.bp_viewall}`}><Link href="/collections">{t("Index5_BPViewall")}</Link></div>
                        </div>
                        <div className={styles.bp_content}>
                            <div className={styles.bp_bannersarea}>
                                <div className={`row ${styles.bp_row}`}>
                                    <ElementTop bkg={data.top_banner1_bkg}
                                        title={data.top_banner1_title}
                                        desc={data.top_banner1_desc}
                                        action={data.top_banner1_action}
                                        link={data.top_banner1_link} />
                                    <ElementTop bkg={data.top_banner2_bkg}
                                        title={data.top_banner2_title}
                                        desc={data.top_banner2_desc}
                                        action={data.top_banner2_action}
                                        link={data.top_banner2_link} />
                                    {
                                        (count == 3)
                                            ?
                                            <ElementTop bkg={data.top_banner3_bkg}
                                                title={data.top_banner3_title}
                                                desc={data.top_banner3_desc}
                                                action={data.top_banner3_action}
                                                link={data.top_banner3_link} />
                                            :
                                            ''
                                    }

                                </div>
                            </div>
                            <slider-component class={`collection__slider ${styles.bp_slider}`}>
                                <div className={`${styles.bp_slider_wrapper} carousel-wrapper carousel-`}>
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
    )
}
export default SectionBannersProducts;