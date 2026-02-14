import React, { useState, useEffect } from 'react';
import useTranslation from './useTranslation'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import ProductItemGrid from '../../components/ultils/ProductItemGrid'
import Product_en from "../../public/locales/en/en_Product.json";
import Product_jp from "../../public/locales/jp/jp_Product.json";
import Product_fr from "../../public/locales/fr/fr_Product.json";
import Product_it from "../../public/locales/it/it_Product.json";
import { SVGArrowLeft, SVGArrowRight } from '../../public/assets/SVG';
import styles from '../../public/assets/styles/ProductPage.module.css'

SwiperCore.use([Navigation, Autoplay]);

const ProductPageRelated = ({ data }) => {
    const { t, locale } = useTranslation();
    const [productData, setProductData] = useState([]);
    let ProductData = [];
    switch (locale) {
        case 'en':
            ProductData = Product_en;
            break;
        case 'fr':
            ProductData = Product_fr;
            break;
        case 'it':
            ProductData = Product_it;
            break;
        case 'jp':
            ProductData = Product_jp;;
            break;
    }

    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".related-carousel-nav-prev",
            nextEl: ".related-carousel-nav-next",
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
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 4,
            }
        }
    };

    useEffect(() => {
        if (data != undefined) {
            const ProductIDArray = data.split(',');
            let remainingItems = [];
            ProductIDArray.map((data) => {
                let getProduct = ProductData.filter((item) => { return parseInt(data) === item.id });
                remainingItems = [...remainingItems, getProduct[0]];
            })
            setProductData(remainingItems);
        }
    }, []);
    useEffect(() => {},[productData, data])    

    return (
        <>
            <div className='product-recommendations page-width'>
                <div className='product-collection__item accordion product-collection__recently'>
                    <div className="box-divider">
                        <h4 className="box-title">{t("Related_title")}</h4>
                    </div>
                    <div className='product-collection__content product-collection__recently-content navigation-top-right'>
                        <slider-component className="related__slider">
                            <div className={`carousel-wrapper carousel-`}>
                                <Swiper {...carouselOptions} className='swiper-container'>
                                    {
                                        productData.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div className={`product-item__content product-${index}`}>
                                                    <ProductItemGrid product={item} />
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <div className="carousel-navigation related-carousel-nav-prev carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                <div className="carousel-navigation related-carousel-nav-next carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                            </div>
                        </slider-component>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductPageRelated;