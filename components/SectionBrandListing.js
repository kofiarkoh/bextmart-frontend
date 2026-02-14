import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { DataIndexBrandsList } from './data/DataIndexBrandsList';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home.module.css'


SwiperCore.use([Navigation, Autoplay]);

const SectionBrandListing = () => {
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".brand-carousel-nav-prev",
            nextEl: ".brand-carousel-nav-next",
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

    const { t } = useTranslation();

    const BrandItem = (props) => {
        return (
            <div className="brand-grid__item">
                <div className="banner-top effect effect-shine">
                    <Link href={props.brand1_link} className="banner-grid__link effect-parent">
                        <Image className='brands__image effect-img' priority="true" alt="" src={props.brand1} width={200} height={232} />
                    </Link>
                </div>
                <div className={`${styles.brands_listing_banner_bottom} effect effect-shine`}>
                    <Link href={props.brand2_link} className="banner-grid__link effect-parent">
                        <Image className='brands__image effect-img' priority="true" alt="" src={props.brand2} width={200} height={232} />
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="html-section index-brands-listing">
                <div className={styles.brands_listing}>
                    <div className="container">
                        <div className={`${styles.brands_listing_container} title-position-left`}>
                            <div className="box-divider no-border">
                                <h2 className="box-title">{DataIndexBrandsList().title}</h2>
                                <div className="viewall"><Link href={DataIndexBrandsList().viewall}>{DataIndexBrandsList().viewalltext} &gt;&gt;</Link></div>
                            </div>
                            <div className="brands__content">
                                <div className="brands__listing">
                                    <slider-component className="brands__listing-slider">
                                        <div className="carousel-wrapper carousel-">
                                            <Swiper {...carouselOptions} className='swiper-container'>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand1}
                                                        brand1_link={DataIndexBrandsList().brand1_link}
                                                        brand2={DataIndexBrandsList().brand2}
                                                        brand2_link={DataIndexBrandsList().brand2_link} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand3}
                                                        brand1_link={DataIndexBrandsList().brand3_link}
                                                        brand2={DataIndexBrandsList().brand4}
                                                        brand2_link={DataIndexBrandsList().brand4_link} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand5}
                                                        brand1_link={DataIndexBrandsList().brand5_link}
                                                        brand2={DataIndexBrandsList().brand6}
                                                        brand2_link={DataIndexBrandsList().brand6_link} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand7}
                                                        brand1_link={DataIndexBrandsList().brand7_link}
                                                        brand2={DataIndexBrandsList().brand8}
                                                        brand2_link={DataIndexBrandsList().brand8_link} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand9}
                                                        brand1_link={DataIndexBrandsList().brand9_link}
                                                        brand2={DataIndexBrandsList().brand10}
                                                        brand2_link={DataIndexBrandsList().brand10_link} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand11}
                                                        brand1_link={DataIndexBrandsList().brand11_link}
                                                        brand2={DataIndexBrandsList().brand12}
                                                        brand2_link={DataIndexBrandsList().brand12_link} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <BrandItem brand1={DataIndexBrandsList().brand3}
                                                        brand1_link={DataIndexBrandsList().brand3_link}
                                                        brand2={DataIndexBrandsList().brand7}
                                                        brand2_link={DataIndexBrandsList().brand7_link} />
                                                </SwiperSlide>
                                            </Swiper>
                                            <div className="carousel-navigation brand-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                            <div className="carousel-navigation brand-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                        </div>
                                    </slider-component>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionBrandListing;