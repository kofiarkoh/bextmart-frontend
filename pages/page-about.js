import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/AboutPage.module.css'

import { Aboutus_en } from "../public/locales/en/en_Pages";
import { Aboutus_fr } from "../public/locales/fr/fr_Pages";
import { Aboutus_it } from "../public/locales/it/it_Pages";
import { Aboutus_jp } from "../public/locales/jp/jp_Pages";
import { SVGTwitter, SVGFacebook, SVGInstagram, SVGTikTok, SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';

import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
SwiperCore.use([Navigation, Autoplay]);

export default function AboutPage() {
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-about');
    }
    let AboutusData = [];
    switch (locale) {
        case 'en':
            AboutusData = Aboutus_en; break;
        case 'fr':
            AboutusData = Aboutus_fr; break;
        case 'it':
            AboutusData = Aboutus_it; break;
        case 'jp':
            AboutusData = Aboutus_jp; break;
    }

    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".about-carousel-nav-prev",
            nextEl: ".about-carousel-nav-next",
        },
        autoplay: {
            delay: 5000
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
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 4,
            }
        }
    };

    return (
        <>
            <Head>
                <title>{t("Account_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className="main-about__layout">
                    <div className="container">
                        <div className={styles.main_about__container}>
                            <div className={styles.about_quote__content}>
                                <p className={styles.about_quote__title}>{AboutusData.Heading}</p>
                                <div className="about-quote__name">
                                    <span className={styles.about_quote__name_span}>{AboutusData.Author}</span>
                                    <span className={styles.about_quote__name_span}>{AboutusData.CEO}</span>
                                </div>
                            </div>
                            <div className={styles.about_info__content}>
                                <div className="row">
                                    <div className="about-info__left col-12 col-md-6">
                                        <Image className='about-info__image' src={AboutusData.Image1} alt="" width={470} height={620} />
                                        <div className={styles.about_info__group}>
                                            <div className="about-info__contact">
                                                <div className={styles.about_info__item}>
                                                    <span className={styles.about_info__title}>{AboutusData.Address}</span>
                                                    <address>{AboutusData.Address_Text}</address>
                                                </div>
                                                <div className={styles.about_info__item}>
                                                    <span className={styles.about_info__title}>{AboutusData.Phone}</span>
                                                    <div>
                                                        <div className="item">
                                                            {AboutusData.Phone_Text1}
                                                        </div>
                                                        <div className="item">
                                                            {AboutusData.Phone_Text2}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.about_info__item}>
                                                    <span className={styles.about_info__title}>{AboutusData.Email}</span>
                                                    <Link className={styles.about_info__content_a} href="mailto:kalathemes@gmail.com">{AboutusData.Email_Text}</Link>
                                                </div>
                                            </div>
                                            <div className={styles.about_info__social}>
                                                <span className={`${styles.about_info__title__social} ${styles.about_info__title}`}>{AboutusData.Social}</span>
                                                <div className={styles.about_social_content}>
                                                    <ul className={`list-unstyled ${styles.about_info__social_list_social}`} role="list">
                                                        <li className={`${styles.about_list_social__item} list-social__item list-social__twitter`}>
                                                            <Link className={`${styles.about_list_social__item_a} link link--text list-social__link`} href={AboutusData.Social_TW}>
                                                                <SVGTwitter />
                                                            </Link>
                                                        </li>
                                                        <li className={`${styles.about_list_social__item} list-social__item list-social__facebook`}>
                                                            <Link className={`${styles.about_info__content_a} ${styles.about_list_social__item_a} link link--text list-social__link`} href={AboutusData.Social_TW}>
                                                                <SVGFacebook />
                                                            </Link>
                                                        </li>
                                                        <li className={`${styles.about_list_social__item} list-social__item list-social__instagram`}>
                                                            <Link className={`${styles.about_info__content_a} ${styles.about_list_social__item_a} link link--text list-social__link`} href={AboutusData.Social_TW}>
                                                                <SVGInstagram />
                                                            </Link>
                                                        </li>
                                                        <li className={`${styles.about_list_social__item} list-social__item list-social__tiktok`}>
                                                            <Link className={`${styles.about_info__content_a} ${styles.about_list_social__item_a} link link--text list-social__link`} href={AboutusData.Social_TW}>
                                                                <SVGTikTok />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.about_info__right} col-12 col-md-6`}>
                                        <Image className='about-info__image' src={AboutusData.Image2} alt="" width={490} height={700} />
                                        <div className={styles.about_info__our}>
                                            <h2 className={styles.about_our__title}>{AboutusData.Story}</h2>
                                            <div className={styles.about_our__caption}>{AboutusData.Content}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.about_team__content}>
                                <h2 className={styles.about_team__title}>
                                    {AboutusData.Staff_Heading}
                                </h2>
                                <div className="about-team__list">
                                    <slider-component class="about-team__slider">
                                        <div className="carousel-wrapper carousel-">
                                            <Swiper {...carouselOptions} className='swiper-container'>
                                                {
                                                    AboutusData.Staff.map((data, index) => (
                                                        <SwiperSlide key={index}>
                                                            <div className={`about-team__item about-${index}`}>
                                                                <div className={styles.about_team__avatar}>
                                                                    <Image className={styles.about_team__avatar_categories__image} src={data.image} alt="" width={310} height={335} />
                                                                    </div>
                                                                <p className={styles.about_team__name}>{data.name}</p>
                                                                <p className={styles.about_team__position}>{data.job}</p>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                            <div className="carousel-navigation about-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                            <div className="carousel-navigation about-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                        </div>
                                    </slider-component>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}