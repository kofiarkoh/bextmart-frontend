import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';

import { DataInfo } from './data/DataInformation'
import styles from '../public/assets/styles/Home5.module.css'

SwiperCore.use([Navigation, Autoplay]);

const SectionInformation = () => {
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".product-carousel-nav-prev",
            nextEl: ".product-carousel-nav-next",
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
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 4,
            }
        }
    };

    const { t, locale } = useTranslation();

    const InfoElement = (props) => {
        return (
            <div className="information__item caption-true col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-xxl-3">
                <div className={styles.information_item}>
                    <div className={styles.info_img}>
                        <Image src={props.img} alt="" width={70} height={70}/>
                    </div>
                    <div className={styles.info_text}>
                        <div className={styles.info_heading}>{ props.title }</div>
                        <div className={styles.info_desc}>{ props.desc }</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="html-section index-information">
                <div className={`${styles.information_wrapper} spaced-section`}>
                    <div className="container">
                        <div className={`information`}>
                            <div className={`row ${styles.information_row}`}>
                                <InfoElement img={DataInfo().info1_img} title={DataInfo().info1_title} desc={DataInfo().info1_desc} />
                                <InfoElement img={DataInfo().info2_img} title={DataInfo().info2_title} desc={DataInfo().info2_desc} />
                                <InfoElement img={DataInfo().info3_img} title={DataInfo().info3_title} desc={DataInfo().info3_desc} />
                                <InfoElement img={DataInfo().info4_img} title={DataInfo().info4_title} desc={DataInfo().info4_desc} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionInformation;