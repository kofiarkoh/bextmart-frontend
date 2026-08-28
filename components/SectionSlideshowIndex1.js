
import React from "react";
import Link from 'next/link';
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home.module.css'
import { useGetBannersQuery } from '../store/productsApi';
import { buildImageUrl } from './ultils/Tools';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SectionSlideshowIndex1 = () => {
    const { t, locale } = useTranslation();
    const { data: bannersData } = useGetBannersQuery();
    const published = bannersData?.data?.filter(b => b.status === 'published') || [];
    const sliderBanners = published.filter(b => b.type === 'slider');
    const overlayBanners = published.filter(b => b.type === 'overlay');
    const hasMultipleSlides = sliderBanners.length > 1;

    const carouselOptions = {
        spaceBetween: 40,
        // loop: true,
        pagination: hasMultipleSlides ? {
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
        } : false,
        navigation: hasMultipleSlides ? {
            prevEl: ".tops-carousel-nav-prev",
            nextEl: ".tops.carousel-nav-next",
        } : false,
        autoplay: hasMultipleSlides ? {
            delay: 5000
        } : false,
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

    return (
        <>
            <section className={styles.index_slideshow}>
                <div className={styles.slideshow_spaced}>
                    <div className="container-fluid">
                        <div className={styles.slideshow_categories__content}>
                            <div className={styles.slideshow_component}>
                                <div className={`${styles.slideshow_container} slideshow-template`}>
                                    <Swiper {...carouselOptions} className={`${styles.slideshow_container_swiper_container} swiper-container`}>
                                        {sliderBanners.map((banner) => {
                                            const img = buildImageUrl(banner.file);
                                            return (
                                                <SwiperSlide key={banner.id} className={styles.slideshow_container_swiper_slide}>
                                                    <div className={styles.slideshow_slide_background}>
                                                        <div
                                                            className={styles.slideshow_slide__background}
                                                            style={{ height: 0, backgroundImage: `url(${img})`,
                                                            '--slide-bg-desktop': `url(${img})`,
                                                            paddingBottom: '40%' ,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            backgroundRepeat: 'no-repeat',}}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                    {hasMultipleSlides && (
                                        <>
                                            <div className="index-slideshow-pagination"></div>
                                            <div className="carousel-navigation tops-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                            <div className="carousel-navigation tops-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={styles.slideshow_bottom_overlay}>
                                <div className="container">
                                    <div className={`${styles.slideshow_ontop_row2} row`}>
                                        {overlayBanners.slice(0, 3).map((banner, i) => {
                                            const href = banner.category?.slug ? `/products?category=${banner.category.slug}` : null;
                                            const img = <img src={buildImageUrl(banner.file)} alt={banner.category?.name || ''} style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />;
                                            return (
                                                <div key={banner.id} className={`slideshow-ontop-bbanner slideshow-ontop-bbanner-${i + 1} effect-shine effect col-12 col-md-6 col-lg-3`}>
                                                    {href ? (
                                                        <Link href={href} className="effect-parent">{img}</Link>
                                                    ) : (
                                                        <div className="effect-parent">{img}</div>
                                                    )}
                                                </div>
                                            );
                                        })}
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