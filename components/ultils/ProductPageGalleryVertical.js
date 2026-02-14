import React, { useState } from 'react';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { SVGArrowLeft, SVGArrowRight, SVGArrowUp, SVGArrowDown } from '../../public/assets/SVG';

SwiperCore.use([Navigation, Pagination, Zoom]);
const ProductPageGalleryVertical = ({ productImg }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);      
            return (
                <>
                    <div className='product-template__media-content row gallery-vertical'>
                        <div className='col-12 col-lg-2 d-none d-lg-block'>
                            <div className='product-template__thumbnail product-thumbnail__bottom'>
                                <div className='product-template__thumbnail-content'>
                                    <div className="carousel-navigation product-thumbnail_nav-next swiper-nav-next">
                                        <SVGArrowLeft /></div>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={5}
                                        direction={"vertical"}
                                        watchSlidesProgress={true}
                                        modules={[Thumbs]}
                                        className="quickview-thumbs swiper-container-vertical"
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

                                    <div className="carousel-navigation product-thumbnail_nav-prev swiper-nav-prev">
                                        <SVGArrowRight /></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-10'>
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
                                    <SVGArrowUp /></div>
                                <div className="carousel-navigation mainimg-carousel-nav-next swiper-nav-next">
                                    <SVGArrowDown /></div>
                            </div>
                        </div>

                    </div>
                </>
            )

}

export default ProductPageGalleryVertical;