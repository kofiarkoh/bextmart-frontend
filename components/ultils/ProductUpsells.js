import React from "react";
import useTranslation from './useTranslation'

import ProductItemGrid from './ProductItemGrid'
import Product_en from "../../public/locales/en/en_Product.json";
import Product_jp from "../../public/locales/jp/jp_Product.json";
import Product_fr from "../../public/locales/fr/fr_Product.json";
import Product_it from "../../public/locales/it/it_Product.json";

import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight } from '../../public/assets/SVG';

SwiperCore.use([Navigation, Autoplay]);

const UtilUpsells = ({ product }) => {
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".upsells-carousel-nav-prev",
            nextEl: ".upsells-carousel-nav-next",
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
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 4,
            }
        }
    };
    const { t, locale } = useTranslation();
    let Productdata;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(0, 7); break;
        case 'fr':
            Productdata = Product_fr.slice(0, 7); break;
        case 'it':
            Productdata = Product_it.slice(0, 7); break;
        case 'jp':
            Productdata = Product_jp.slice(0, 7); break;
    }
    let remainingItems = Productdata.filter((item) => { return product.id !== item.id });    
    return (
        <div className="slider-component">
            <slider-component className="upsells__slider">
                <div className="carousel-wrapper carousel-">
                    <Swiper {...carouselOptions} className='swiper-container'>
                        {
                            remainingItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={`product-item__content product-${index}`}>
                                        <ProductItemGrid product={item} />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="carousel-navigation upsells-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                    <div className="carousel-navigation upsells-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                </div>
            </slider-component>
        </div>
    )
}
export default UtilUpsells;