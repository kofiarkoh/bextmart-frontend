
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
import { DataIndexSlideshow } from './data/DataIndexSlideshow2';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home2.module.css'

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionSlideshowIndex2 = () => {
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
                                                    <Image src={DataIndexSlideshow().slideshow1_caption} alt="" width={773} height={559} />
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
                                                    <Image src={DataIndexSlideshow().slideshow3_caption} alt="" width={413} height={377} />
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
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-2">
                                        <div className={styles.slideshow_ontop_row1_rbanners}>
                                            <div className="slideshow-ontop-productsslider">
                                                <div className={styles.collection__slider}>
                                                    <div className={styles.slideshow2_carousel}>
                                                        <Swiper {...carouselOptions2} className={`swiper-container`}>
                                                            <SwiperSlide>
                                                                <div className={styles.slideshowproduct_item_content} style={{ backgroundColor: DataIndexSlideshow().product_bkg1 }}>
                                                                    <div className={styles.slideshowproduct_heading}>{t("Slideshow2_Product1_Text1")}</div>
                                                                    <div className={styles.slideshowproduct_subheading}>{t("Slideshow2_Product1_Text2")}</div>
                                                                    <div className={styles.slideshowproduct_price}><CurrencyConvert amount={parseInt(10)} /></div>
                                                                    <Link href={DataIndexSlideshow().product_link1} className={`${styles.slideshowproduct_img} effect-parent`}>
                                                                        <div className="product_image lazy-bg effect-img lazyloaded">
                                                                            <Image src={DataIndexSlideshow().product_banner1} className={DataIndexSlideshow().product_banner1} alt='' width={216} height={149} />
                                                                        </div>
                                                                    </Link>
                                                                    <div className="action">
                                                                        <Link className={`${styles.slideshowproduct_button} button`} href={DataIndexSlideshow().product_link1}>{t("Slideshow2_Product1_Text3")}</Link>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                            <SwiperSlide className={`swiper-slide`}>
                                                                <div className={styles.slideshowproduct_item_content} style={{ backgroundColor: DataIndexSlideshow().product_bkg2 }}>
                                                                    <div className={styles.slideshowproduct_heading}>{t("Slideshow2_Product2_Text1")}</div>
                                                                    <div className={styles.slideshowproduct_subheading}>{t("Slideshow2_Product2_Text2")}</div>
                                                                    <div className={styles.slideshowproduct_price}><CurrencyConvert amount={parseInt(250)} /></div>
                                                                    <Link href={DataIndexSlideshow().product_link2} className={`${styles.slideshowproduct_img} effect-parent`}>
                                                                        <div className="product_image lazy-bg effect-img lazyloaded">
                                                                            <Image src={DataIndexSlideshow().product_banner2} className={DataIndexSlideshow().product_banner2} alt='' width={216} height={149} />
                                                                        </div>
                                                                    </Link>
                                                                    <div className="action">
                                                                        <Link className={`${styles.slideshowproduct_button} button`} href={DataIndexSlideshow().product_link2}>{t("Slideshow2_Product1_Text3")}</Link>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                            <SwiperSlide className={`swiper-slide`}>
                                                                <div className={styles.slideshowproduct_item_content} style={{ backgroundColor: DataIndexSlideshow().product_bkg3 }}>
                                                                    <div className={styles.slideshowproduct_heading}>{t("Slideshow2_Product3_Text1")}</div>
                                                                    <div className={styles.slideshowproduct_subheading}>{t("Slideshow2_Product3_Text2")}</div>
                                                                    <div className={styles.slideshowproduct_price}><CurrencyConvert amount={parseInt(700)} /></div>
                                                                    <Link href={DataIndexSlideshow().product_link3} className={`${styles.slideshowproduct_img} effect-parent`}>
                                                                        <div className="product_image lazy-bg effect-img lazyloaded">
                                                                            <Image src={DataIndexSlideshow().product_banner3} className={DataIndexSlideshow().product_banner3} alt='' width={216} height={149} />
                                                                        </div>
                                                                    </Link>
                                                                    <div className="action">
                                                                        <Link className={`${styles.slideshowproduct_button} button`} href={DataIndexSlideshow().product_link3}>{t("Slideshow2_Product1_Text3")}</Link>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        </Swiper>
                                                        <div className="slideshow2-carousel-pagination carousel-pagination"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.slideshow_ontop_row2} row`}>
                                    <div className="slideshow-ontop-bbanner slideshow-ontop-bbanner-1 effect-shine effect col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-">
                                        <Link href={DataIndexSlideshow().img1_link} className={`${styles.need_right} effect-parent`}>
                                            <Image src={DataIndexSlideshow().img1} alt="" width={417} height={140} />
                                            <div className={styles.bbanner_caption}>{t("Slideshow2_CELLPHONE_UNDER")}<br /><span className={styles.bbanner_caption_span}>$59</span></div>
                                        </Link>
                                    </div>
                                    <div className="slideshow-ontop-bbanner slideshow-ontop-bbanner-2 effect-shine effect col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-">

                                        <Link href={DataIndexSlideshow().img2_link} className="effect-parent">
                                            <Image src={DataIndexSlideshow().img2} alt="" width={417} height={140} />
                                            <div className={styles.bbanner_caption}>{t("Slideshow2_VIDEO_GAMES_FROM")}<br /><span className={styles.bbanner_caption_span}>$15</span></div>
                                        </Link>
                                    </div>
                                    <div className="slideshow-ontop-bbanner slideshow-ontop-bbanner-3 effect-shine effect col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-">

                                        <Link href={DataIndexSlideshow().img3_link} className={`${styles.need_right} effect-parent`}>
                                            <Image src={DataIndexSlideshow().img3} alt="" width={417} height={140} />
                                            <div className={styles.bbanner_caption}>{t("Slideshow2_WATCHES_BUY1GET1")}<br /><span className={styles.bbanner_caption_span}>{t("FREE")}</span></div>
                                        </Link>
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

export default SectionSlideshowIndex2;