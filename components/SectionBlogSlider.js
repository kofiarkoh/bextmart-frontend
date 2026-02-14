import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';

import { BlogsData } from './data/DataBlog'
import styles from '../public/assets/styles/Home5.module.css'

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionBlogSlider = (props) => {
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        pagination: {
            clickable: true,
            enabled: true,
            el: '.carousel2-pagination',
            type: 'bullets',
            bulletElement: 'span',
            bulletClass: 'carousel-pagination-bullet',
            bulletActiveClass: 'carousel-pagination-bullet-active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },
        // navigation: {
        //     prevEl: ".product-carousel-nav-prev",
        //     nextEl: ".product-carousel-nav-next",
        // },
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
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 3,
            }
        }
    };

    const { t, locale } = useTranslation();
    let PostsData = BlogsData().PostsData;

    return (
        <>
            <section className="html-section index-banners-textslider">
                <div className={`${styles.blogslider_wrapper} spaced-section`}>
                    <div className="container">
                        <div className={`banners-textslider__container`}>
                            <div className={`${styles.blogslider_boxdivider} box-divider no-border`}>
                                <h2 className={`${styles.blogslider_boxtitle} box-title`}>{t("Index5_BlogTitle")}</h2>
                                <div className="viewall"><Link className={styles.collection_slider_viewall_a} href="/blog">{t("Index5_BPViewall")}</Link></div>
                            </div>
                            <div className="banners-textslider__content">
                                <div className="banners-textslider__listing">
                                    <slider-component className="banners-textslider-slider">
                                        <div className={`${styles.product_slider_carousel_wrapper} carousel-wrapper carousel-`}>
                                            <Swiper {...carouselOptions} className='swiper-container'>
                                                {
                                                    PostsData.map((data, index) => (
                                                        <SwiperSlide key={index}>
                                                            <div className="article-item__content article-item__layout-list col ">
                                                                <div className={`brand-grid__item`}>
                                                                    <div className={`banner-top effect effect-zoom`}>
                                                                        <Link href={data.url} className='article-item__link effect-parent'>
                                                                            <Image src={data.image} alt={data.title} className={`effect-img`} width={308} height={308} />
                                                                        </Link>
                                                                    </div>
                                                                    <div className={styles.blogslider_text}>
                                                                        <Link href={data.url} className={`${styles.blogslider_text_title} h3`}>
                                                                            {data.title}
                                                                        </Link>
                                                                        <div className={styles.blogslider_text_desc} dangerouslySetInnerHTML={{ __html: data.short }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                            <div className="carousel2-pagination"></div>
                                            {/* <div className="carousel-navigation product-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                            <div className="carousel-navigation product-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div> */}
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

export default SectionBlogSlider;