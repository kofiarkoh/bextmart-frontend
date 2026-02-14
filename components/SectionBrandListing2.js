import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { DataIndexBrandsList } from './data/DataIndexBrandsList2';
import styles from '../public/assets/styles/Home3.module.css'


SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionBrandListing2 = () => {
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        pagination: {
            clickable: true,
            enabled: true,
            el: '.carousel-pagination',
            type: 'bullets',
            bulletElement: 'span',
            bulletClass: 'carousel-pagination-bullet',
            bulletActiveClass: 'carousel-pagination-bullet-active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },
        autoplay: {
            disableOnInteraction: false,
            delay: 5000,
            pauseOnMouseEnter: true,
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

    const { t } = useTranslation();

    const BrandItem = (props) => {        
        return (
            <div className="brands__item col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <div className="brand-grid__item">
                    <div className="banner-top effect effect-shine">
                        <Link href={props.link} className="banner-grid__link effect-parent">
                            <Image className='brands__image effect-img' priority="true" alt="" src={props.img} width={200} height={232} />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <section className="html-section index-popular-brands">
                <div className={styles.popularbrands}>
                    <div className="container">
                        <div className={`${styles.popularbrands_container} title-position-left`}>
                            <div className="box-divider no-border">
                                <h2 className="box-title">{DataIndexBrandsList().title}</h2>
                                <div className="viewall"><Link href={DataIndexBrandsList().viewall}>{DataIndexBrandsList().viewalltext} &gt;&gt;</Link></div>
                            </div>
                            <div className={styles.popularbrands_content}>
                                <div className={styles.popularbrands_content_left}>
                                    <slider-component className="brands__listing-slider">
                                        <div className={`${styles.carousel_wrapper} carousel-wrapper carousel-`}>
                                            <Swiper {...carouselOptions} className='swiper-container'>
                                                <SwiperSlide>
                                                    <Link href={DataIndexBrandsList().brandimg1_link}><Image src={DataIndexBrandsList().brandimg1} alt="" width={393} height={376} /></Link>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Link href={DataIndexBrandsList().brandimg2_link}><Image src={DataIndexBrandsList().brandimg2} alt="" width={393} height={376} /></Link>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Link href={DataIndexBrandsList().brandimg3_link}><Image src={DataIndexBrandsList().brandimg3} alt="" width={393} height={376} /></Link>
                                                </SwiperSlide>
                                            </Swiper>
                                            <div className="carousel-pagination carousel-pagination"></div>
                                        </div>
                                    </slider-component>
                                </div>
                                <div className={`${styles.popularbrands_content_right} brands__listing`}>
                                    <div className={`${styles.popularbrands_content_right_content} row`}>
                                        <BrandItem img={DataIndexBrandsList().brand1} link={DataIndexBrandsList().brand1_link} />
                                        <BrandItem img={DataIndexBrandsList().brand2} link={DataIndexBrandsList().brand2_link} />
                                        <BrandItem img={DataIndexBrandsList().brand3} link={DataIndexBrandsList().brand3_link} />
                                        <BrandItem img={DataIndexBrandsList().brand4} link={DataIndexBrandsList().brand4_link} />
                                        <BrandItem img={DataIndexBrandsList().brand5} link={DataIndexBrandsList().brand5_link} />
                                        <BrandItem img={DataIndexBrandsList().brand6} link={DataIndexBrandsList().brand6_link} />
                                        <BrandItem img={DataIndexBrandsList().brand7} link={DataIndexBrandsList().brand7_link} />
                                        <BrandItem img={DataIndexBrandsList().brand8} link={DataIndexBrandsList().brand8_link} />
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

export default SectionBrandListing2;