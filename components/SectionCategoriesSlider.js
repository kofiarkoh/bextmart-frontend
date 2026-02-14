import React from "react";
import Link from 'next/link';
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import {DataIndexCategories} from './data/DataIndexCategories';
import { SVGArrowLeft, SVGArrowRight, SVGIcon1, SVGIcon2, SVGIcon3, SVGIcon4, SVGIcon5, SVGIcon6, SVGIcon7, SVGIcon8, SVGIcon9, SVGIcon10 } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home.module.css'

SwiperCore.use([Navigation, Autoplay]);

const SectionCategoriesSlider = () => {
    const carouselOptions = {
        spaceBetween: 40,
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
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 7,
            },
            1400: {
                slidesPerView: 10,
            }
        }
    };

    const { t } = useTranslation();
    return (
        <>
            <section className="html-section index-categories-slider">
                <div className={`${styles.categories_slider} spaced-section`}>
                    <div className="container">
                        <div className={styles.categories__container}>
                            <div className="box-divider">
                                <h2 className="box-title">{t("BEST_OFFER")}</h2>
                            </div>
                            <div className="categories__content">
                                <slider-component className="categories__slider">
                                    <div className="carousel-wrapper carousel-">
                                        <Swiper {...carouselOptions} className='swiper-container'>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate1_link} className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon1 /></div></Link>
                                                    <Link href={DataIndexCategories().cate1_link} className={styles.category__caption}>{t("Flash_Sale")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate2_link} className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon2 /></div></Link>
                                                    <Link href={DataIndexCategories().cate2_link} className={styles.category__caption} >{t("Free_Shipping")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate3_link} className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon3 /></div></Link>
                                                    <Link href={DataIndexCategories().cate3_link} className={styles.category__caption}>{t("Sale_Up_To50_Off")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate4_link} className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon4 /></div></Link>
                                                    <Link href={DataIndexCategories().cate4_link} className={styles.category__caption}>{t("Vouchers_Coupons")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate5_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon5 /></div></Link>
                                                    <Link href={DataIndexCategories().cate5_link}className={styles.category__caption}>{t("Women_Clothing")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate6_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon6 /></div></Link>
                                                    <Link href={DataIndexCategories().cate6_link}className={styles.category__caption}>{t("New_Collection")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate7_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon7 /></div></Link>
                                                    <Link href={DataIndexCategories().cate7_link}className={styles.category__caption}>{t("Discounts_Online")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate8_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon8 /></div></Link>
                                                    <Link href={DataIndexCategories().cate8_link}className={styles.category__caption}>{t("Gift_Shops")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate9_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon9 /></div></Link>
                                                    <Link href={DataIndexCategories().cate9_link}className={styles.category__caption}>{t("International_Trade")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate10_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon10 /></div></Link>
                                                    <Link href={DataIndexCategories().cate10_link}className={styles.category__caption}>{t("Partner")}</Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className={styles.category__image_content}>
                                                    <Link href={DataIndexCategories().cate11_link}className={styles.category__image_content_image}><div className={styles.category__image_content_image_svg}><SVGIcon7 /></div></Link>
                                                    <Link href={DataIndexCategories().cate11_link}className={styles.category__caption}>{t("Member_Discounts")}</Link>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                        <div className="carousel-navigation carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                        <div className="carousel-navigation carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
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

export default SectionCategoriesSlider;