import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import styles from '../../public/assets/styles/Home.module.css'

SwiperCore.use([Navigation, Autoplay]);

const ElementBannersBrand = (props) => {
    const carouselOptions = {
        spaceBetween: 5,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".bbrand-carousel-nav-prev",
            nextEl: ".bbrand-carousel-nav-next",
        },
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            0: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 5,
            }
        }
    };
    
    return (
        <>
            <div className={styles.banners_brands__block_gr}>
                <div className={`${styles.banners_brands_heading} box-divider`}>
                    <h2 className={`${styles.banners_brands_heading_title} box-title`}>{props.data.title}</h2>
                    <div className="viewall"><Link href={props.data.url}>{props.data.viewall}</Link></div>
                </div>
                <div className={`${styles.banners_brands_block_banners} row`}>
                    {
                        (props.bannerPosition == undefined) ? <>
                            <div className="block-banners-banner col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-none d-md-block">
                                <div className="effect effect-shine">
                                    <Link href={props.data.url} className={`banner-grid__link effect-parent`}>
                                        <Image src={props.data.banner} alt="" width={211} height={387} />
                                    </Link>
                                </div>
                            </div>
                        </>
                            : ''
                    }
                    <div className="block-banners-bannercaption col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                        <div className={`${styles.banners_brands_bannercaption_inner} row`}>
                            <div className={`${styles.banners_brands_bannercaption_elementwrapper} col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6`}>
                                {props.data.block1.map((data, index) => {
                                    return (
                                        <div key={index} className={styles.banners_brands_bannercaption_element}>
                                            <div className={styles.banners_brands_bannercaption_title}>{data.text}</div>
                                            <div className={styles.banners_brands_bannercaption_subtitle}>{data.desc}</div>
                                            <div className={`${styles.banners_brands_bannercaption_img} effect effect-shine`}>
                                                <Link href={data.imglink} className={`${styles.banners_brands_bannercaption_link} banner-grid__link effect-parent`}>
                                                    <Image src={data.img} alt="" width={92} height={92} />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`${styles.banners_brands_bannercaption_elementwrapper} col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6`}>
                                {props.data.block2.map((data, index) => {
                                    return (
                                        <div key={index} className={styles.banners_brands_bannercaption_element}>
                                            <div className={styles.banners_brands_bannercaption_title}>{data.text}</div>
                                            <div className={styles.banners_brands_bannercaption_subtitle}>{data.desc}</div>
                                            <div className={`${styles.banners_brands_bannercaption_img} effect effect-shine`}>
                                                <Link href={data.imglink} className={`${styles.banners_brands_bannercaption_link} banner-grid__link effect-parent`}>
                                                    <Image src={data.img} alt="" width={92} height={92} />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`${styles.banners_brands_bannercaption_elementwrapper} col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6`}>
                                {props.data.block3.map((data, index) => {
                                    return (
                                        <div key={index} className={styles.banners_brands_bannercaption_element}>
                                            <div className={styles.banners_brands_bannercaption_title}>{data.text}</div>
                                            <div className={styles.banners_brands_bannercaption_subtitle}>{data.desc}</div>
                                            <div className={`${styles.banners_brands_bannercaption_img} effect effect-shine`}>
                                                <Link href={data.imglink} className={`${styles.banners_brands_bannercaption_link} banner-grid__link effect-parent`}>
                                                    <Image src={data.img} alt="" width={92} height={92} />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`${styles.banners_brands_bannercaption_elementwrapper} col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6`}>
                                {props.data.block4.map((data, index) => {
                                    return (
                                        <div key={index} className={styles.banners_brands_bannercaption_element}>
                                            <div className={styles.banners_brands_bannercaption_title}>{data.text}</div>
                                            <div className={styles.banners_brands_bannercaption_subtitle}>{data.desc}</div>
                                            <div className={`${styles.banners_brands_bannercaption_img} effect effect-shine`}>
                                                <Link href={data.imglink} className={`${styles.banners_brands_bannercaption_link} banner-grid__link effect-parent`}>
                                                    <Image src={data.img} alt="" width={92} height={92} />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {
                        (props.bannerPosition == 'right') ? <>
                            <div className="block-banners-banner col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-none d-md-block">
                                <div className="effect effect-shine">
                                    <Link href={props.data.url} className={`banner-grid__link effect-parent`}>
                                        <Image src={props.data.banner} alt="" width={211} height={387} />
                                    </Link>
                                </div>
                            </div>
                        </>
                            : ''
                    }
                </div>
                <div className="block-brands">
                    <div className={styles.banners_brands_brandsgr}>
                        <slider-component className="categories__slider">
                            {props.data.brand.map((data, index) => {
                                return (
                                    <div className="carousel-wrapper carousel-" key={index}>
                                        <Swiper {...carouselOptions} className='swiper-container'>
                                            <SwiperSlide >
                                                <div className="effect effect-shine">
                                                    <Link href={data.brand1url} className={`banner-grid__link effect-parent`}>
                                                        <Image src={data.brand1img} alt="" width={140} height={78} />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="effect effect-shine">
                                                    <Link href={data.brand2url} className={`banner-grid__link effect-parent`}>
                                                        <Image src={data.brand2img} alt="" width={140} height={78} />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="effect effect-shine">
                                                    <Link href={data.brand3url} className={`banner-grid__link effect-parent`}>
                                                        <Image src={data.brand3img} alt="" width={140} height={78} />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="effect effect-shine">
                                                    <Link href={data.brand4url} className={`banner-grid__link effect-parent`}>
                                                        <Image src={data.brand4img} alt="" width={140} height={78} />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="effect effect-shine">
                                                    <Link href={data.brand5url} className={`banner-grid__link effect-parent`}>
                                                        <Image src={data.brand5img} alt="" width={140} height={78} />
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                )
                            })}
                        </slider-component>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ElementBannersBrand;