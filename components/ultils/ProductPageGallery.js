import React, { useState } from 'react';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { SVGArrowLeft, SVGArrowRight } from '../../public/assets/SVG';

SwiperCore.use([Navigation, Pagination, Zoom]);
const ProductPageGallery = ({ productImg }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <div className='product-template__media-content row gallery-normal'>
                <div className='col-12 col-lg-12'>
                    <div className="product-gallery">
                        <Swiper
                            navigation={{
                                prevEl: ".mainimg-carousel-nav-prev",
                                nextEl: ".mainimg-carousel-nav-next",
                            }}
                            pagination={{
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
                            }}
                            thumbs={{ swiper: thumbsSwiper }}
                            zoom={true}
                            modules={[Thumbs]}
                            className='swiper-container'>
                            {
                                productImg.map((item) => (
                                    <SwiperSlide key={item.idpro}>
                                        <div className="product-item__image swiper-zoom-container">
                                            <Image src={item.imgpath} priority="true" alt={item.imgalt} width={720} height={720} />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="carousel-pagination"></div>
                        <div className="carousel-navigation mainimg-carousel-nav-prev swiper-nav-prev">
                            <SVGArrowLeft /></div>
                        <div className="carousel-navigation mainimg-carousel-nav-next swiper-nav-next">
                            <SVGArrowRight /></div>
                    </div>
                </div>
                <div className='col-12 col-lg-12 d-none d-md-block '>
                    <div className='product-template__thumbnail product-thumbnail__bottom'>
                        <div className='product-template__thumbnail-content'>
                            <div className="product-thumbnail_nav-next">
                                <SVGArrowLeft />
                            </div>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="swiper-container"
                                navigation={{
                                    prevEl: ".product-thumbnail_nav-next",
                                    nextEl: ".product-thumbnail_nav-prev",
                                }}
                            >
                                {
                                    productImg.map((item) => (
                                        <SwiperSlide key={`thumb-${item.idpro}`}>
                                            <div className=".product-item__image">
                                                <Image src={item.imgpath} alt={item.imgalt} width={133} height={133} />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>

                            <div className="product-thumbnail_nav-prev">
                                <SVGArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductPageGallery;