
import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { DataIndexSlideshow } from './data/DataIndexSlideshow5';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home5.module.css'

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionSlideshowIndex5 = () => {
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
            <section className={`${styles.index_slideshow} ${styles.index_slideshow5}`}>
                <div className={styles.slideshow_spaced}>
                    <div className="container">
                        <div className={styles.slideshow_categories__content}>
                            <div className={styles.slideshow_component}>
                                <div className={`${styles.slideshow_container} slideshow-template`}>
                                <Swiper {...carouselOptions} className={`${styles.slideshow_container_swiper_container} swiper-container`}>
                                        <SwiperSlide className={styles.slideshow_container_swiper_slide}>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow1_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url("+DataIndexSlideshow().slideshow1+")", "paddingBottom": "31.3351%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption1 } index-slideshow-caption-image`} >
                                                    <Image src={DataIndexSlideshow().slideshow1_caption} alt="" width={436} height={352} />
                                                </div>
                                            </>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow2_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url("+DataIndexSlideshow().slideshow2+")", "paddingBottom": "31.3351%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption2 } index-slideshow-caption-image`}>
                                                    <Image src={DataIndexSlideshow().slideshow2_caption} alt="" width={773} height={559} />
                                                </div>
                                            </>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <>
                                                <Link href={DataIndexSlideshow().slideshow3_link} className={styles.slideshow_slide_link}></Link>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div className={styles.slideshow_slide__background} style={{ "height": "0", "backgroundImage": "url("+DataIndexSlideshow().slideshow3+")", "paddingBottom": "31.3351%" }}></div>
                                                </div>
                                                <div className={`${styles.slideshow_slide_caption} ${styles.slideshow_slide_caption3 } index-slideshow-caption-image`}>
                                                    <Image src={DataIndexSlideshow().slideshow3_caption} alt="" width={413} height={377} />
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionSlideshowIndex5;