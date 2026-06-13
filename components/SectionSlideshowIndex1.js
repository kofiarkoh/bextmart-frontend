
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
import {DataIndexSlideshow} from './data/DataIndexSlideshow';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home.module.css'
import { useGetBannersQuery } from '../store/productsApi';
import { buildImageUrl } from './ultils/Tools';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionSlideshowIndex1 = () => {
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

    const { t, locale } = useTranslation();
    const { data: bannersData } = useGetBannersQuery();
    const published = bannersData?.data?.filter(b => b.status === 'published') || [];
    const sliderBanners = published.filter(b => b.type === 'slider');
    const overlayBanners = published.filter(b => b.type === 'overlay');
    const fallbackSlides = DataIndexSlideshow();

    return (
        <>
            <section className={styles.index_slideshow}>
                <div className={styles.slideshow_spaced}>
                    <div className="container-fluid">
                        <div className={styles.slideshow_categories__content}>
                            <div className={styles.slideshow_component}>
                                <div className={`${styles.slideshow_container} slideshow-template`}>
                                    <Swiper {...carouselOptions} className={`${styles.slideshow_container_swiper_container} swiper-container`}>
                                        {sliderBanners.length > 0 ? sliderBanners.map((banner) => (
                                            <SwiperSlide key={banner.id} className={styles.slideshow_container_swiper_slide}>
                                                <div className={styles.slideshow_slide_background}>
                                                    <div
                                                        className={styles.slideshow_slide__background}
                                                        style={{ height: 0, backgroundImage: `url(${buildImageUrl(banner.file)})`, paddingBottom: '31.25%' }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )) : (
                                            <>
                                                <SwiperSlide className={styles.slideshow_container_swiper_slide}>
                                                    <div className={styles.slideshow_slide_background}>
                                                        <div className={styles.slideshow_slide__background} style={{ height: 0, backgroundImage: `url(${fallbackSlides.slideshow1})`, paddingBottom: '31.25%' }} />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className={styles.slideshow_slide_background}>
                                                        <div className={styles.slideshow_slide__background} style={{ height: 0, backgroundImage: `url(${fallbackSlides.slideshow2})`, paddingBottom: '31.25%' }} />
                                                    </div>
                                                </SwiperSlide>
                                            </>
                                        )}
                                    </Swiper>
                                    <div className="index-slideshow-pagination"></div>
                                    <div className="carousel-navigation tops-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                    <div className="carousel-navigation tops-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.slideshow_ontop}>
                            <div className="container">
                                <div className={`${styles.slideshow_ontop_row1 } row`}>
                                    <div className={`${styles.slideshow_ontop_row1_allcollections } col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-2 d-none d-lg-block`}>
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
                                            {overlayBanners.length > 0 ? overlayBanners.slice(0, 2).map((banner, i) => {
                                                const href = banner.category?.slug ? `/products?category=${banner.category.slug}` : null;
                                                const img = <img src={buildImageUrl(banner.file)} alt={banner.category?.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
                                                return (
                                                    <div key={banner.id} className={`slideshow-ontop-rbanner slideshow-ontop-rbanner-${i + 1} effect-shine effect`}>
                                                        {href ? (
                                                            <Link href={href} className="effect-parent">{img}</Link>
                                                        ) : (
                                                            <div className="effect-parent">{img}</div>
                                                        )}
                                                    </div>
                                                );
                                            }) : (
                                                <>
                                                    <div className="slideshow-ontop-rbanner slideshow-ontop-rbanner-1 effect-shine effect">
                                                        <Link href={fallbackSlides.img1_link} className="effect-parent">
                                                            <Image src={fallbackSlides.img1} alt="" width={250} height={225} />
                                                        </Link>
                                                    </div>
                                                    <div className="slideshow-ontop-rbanner slideshow-ontop-rbanner-2 effect-shine effect">
                                                        <Link href={fallbackSlides.img2_link} className="effect-parent">
                                                            <Image src={fallbackSlides.img2} alt="" width={250} height={225} />
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
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

export default SectionSlideshowIndex1;