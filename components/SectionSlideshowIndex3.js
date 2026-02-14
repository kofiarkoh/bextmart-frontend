
import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import AllCategories from './ultils/LeftAllCategories'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import CurrencyConvert from './ultils/CurrencyConvert'
import { DataIndexSlideshow } from './data/DataIndexSlideshow3';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home3.module.css'

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionSlideshowIndex3 = () => {
    const carouselOptions = {
        spaceBetween: 40,
        // loop: true,
        pagination: {
            clickable: true,
            enabled: true,
            el: '.index-slideshow-pagination',
            type: 'bullets',
            bulletElement: 'span',
            bulletClass: 'index-slideshow-pagination-bullet',
            bulletActiveClass: 'index-slideshow-pagination-bullet-active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },
        navigation: {
            prevEl: ".tops-carousel-nav-prev",
            nextEl: ".tops.carousel-nav-next",
        },
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 1,
            },
            1400: {
                slidesPerView: 1,
            }
        }
    };

    const carouselOptions2 = {
        spaceBetween: 40,
        // loop: true,
        pagination: {
            clickable: true,
            enabled: true,
            el: '.slideshow2-carousel-pagination',
            type: 'bullets',
            bulletElement: 'span',
            bulletClass: 'carousel-pagination-bullet',
            bulletActiveClass: 'carousel-pagination-bullet-active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 1,
            },
            1400: {
                slidesPerView: 1,
            }
        }
    };

    const { t, locale } = useTranslation();

    return (
        <>
            <section className={`${styles.index_slideshow} ${styles.index_slideshow2}`}>
                <div className={styles.slideshow_spaced}>
                    <div className="container-fluid">
                        <div className={styles.slideshow_categories__content}>
                            <div className={styles.slideshow_component}>
                                <div className={`${styles.slideshow_container} slideshow-template`}>
                                    <Swiper {...carouselOptions} className={`${styles.slideshow_container_swiper_container} swiper-container`}>
                                        <SwiperSlide className={styles.slideshow_container_swiper_slide}>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow1_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url(" + DataIndexSlideshow().slideshow1 + ")", "paddingBottom": "31.25%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption1} index-slideshow-caption-image`} >
                                                    <Image src={DataIndexSlideshow().slideshow1_caption} alt="" width={413} height={377} />
                                                </div>
                                            </>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow2_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url(" + DataIndexSlideshow().slideshow2 + ")", "paddingBottom": "31.25%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption2} index-slideshow-caption-image`}>
                                                    <Image src={DataIndexSlideshow().slideshow2_caption} alt="" width={436} height={352} />
                                                </div>
                                            </>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow3_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url(" + DataIndexSlideshow().slideshow3 + ")", "paddingBottom": "31.25%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption3} index-slideshow-caption-image`}>
                                                    <Image src={DataIndexSlideshow().slideshow3_caption} alt="" width={773} height={559} />
                                                </div>
                                            </>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow4_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url(" + DataIndexSlideshow().slideshow4 + ")", "paddingBottom": "31.25%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption4} index-slideshow-caption-image`}>
                                                    <Image src={DataIndexSlideshow().slideshow4_caption} alt="" width={355} height={375} />
                                                </div>
                                            </>
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="index-slideshow-pagination"></div>
                                    <div className="carousel-navigation tops-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                    <div className="carousel-navigation tops-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.slideshow_ontop}>
                            <div className="container">
                                <div className={`${styles.slideshow_ontop_row1} row`}>
                                    <div className={`${styles.slideshow_ontop_row1_allcollections} col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-2 d-none d-lg-block`}>
                                        <div className="main-header__allcollections">
                                            <div className="top-header__menu-root header__allcollections">
                                                <div className="header__categorie-dropdown">
                                                    <AllCategories />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slideshow_ontop_row2} row`}>
                                    <div className="slideshow-ontop-bbanner slideshow-ontop-bbanner-1 effect-shine effect col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                        <Image src={DataIndexSlideshow().img1} alt="" className="bbanner-bkg" width={638} height={141} />
                                        <div className={styles.bbanner_caption}>
                                            <div className="bbanner-caption-gr">
                                                <div className={styles.bbanner_caption_topheading}>{t("Slideshow3_Text1")} <span>{t("Slideshow3_Text2")}</span></div>
                                                <div className={styles.bbanner_caption_bottom}>
                                                <Link href={DataIndexSlideshow().img1_link}><div className={styles.bbanner_caption_bottom_desc}>{t("Slideshow3_Text3")}</div></Link>
                                                    <Link href={DataIndexSlideshow().img1_link} className={`button ${styles.bbanner_caption_bottom_button}`}>{t("Slideshow3_Text4")}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slideshow-ontop-bbanner slideshow-ontop-bbanner-2 effect-shine effect col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <Image src={DataIndexSlideshow().img2} alt="" className="bbanner-bkg" width={638} height={141} />
                                        <div className={styles.bbanner_caption}>
                                            <div className="bbanner-caption-gr">
                                                <div className={styles.bbanner_caption_topheading}>{t("Slideshow3_Text5")}</div>
                                                <div className={styles.bbanner_caption_bottom}>
                                                    <Link href={DataIndexSlideshow().img2_link} className={`button ${styles.bbanner_caption_bottom_button}`}>{t("Slideshow3_Text4")}</Link>
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

export default SectionSlideshowIndex3;