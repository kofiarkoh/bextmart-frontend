import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image'
import Popup from "reactjs-popup";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { displayRating, displayPrice, arrayOption1, arrayOption2, buildImageUrl } from './Tools';
import UtilUpsells from './ProductUpsells'
import { useAtom } from 'jotai'
import { cartCount, cartTotal, cartData } from './Store'
import update from 'immutability-helper';
import useTranslation from './useTranslation'
import CurrencyConvert from './CurrencyConvert'

import { SVGArrowLeft, SVGArrowRight, SVGEye, SVGClose, SVGTwitter, SVGFacebook, SVGPinterest, SVGCart } from '../../public/assets/SVG';
SwiperCore.use([Navigation, Pagination]);

const ProductQuickView = ({ product, directly }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [openCart, setopenCart] = useState(false);
    const closeModalCart = () => setopenCart(false);
    const [scCount, setscCount] = useAtom(cartCount);
    const [scTotal, setscTotal] = useAtom(cartTotal);
    const [scData, setscData] = useAtom(cartData);
    const [option1, setOption1] = useState();
    const [option2, setOption2] = useState();
    const { t } = useTranslation();
    const [classStatus, setClassStatus] = useState('');
    const [statusText, setStatusText] = useState(t("Add_to_Cart"));
    const [buttonText, setButtonText] = useState(t("Add_to_Cart"));
    const [swiper, setSwiper] = useState(null);
    function qwchangeVariant(index, variant) {
        if (index === 0) {
            setOption1(variant);
        } else { setOption2(variant); }
    }

    useEffect(() => {
        if (product?.option?.length > 0) setOption1(product.option[0].variant[0].title);
        if (product?.option?.length > 1) setOption2(product.option[1].variant[0].title);
    }, [])

    function checkOption() {
        setClassStatus('cart-loadding');
        setButtonText(t("Select_Options"));
        setTimeout(() => {
            setOpen(o => !o)
            setClassStatus('');
            setButtonText(t("Add_to_Cart"));
        }, 1000);
    }

    function qwAddtoCart() {
        let data = localStorage.getItem('yam-shoppingcart');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else { data = []; }
        let totaladded = 0;
        let groupoption = []
        if (product.option.length === 2) groupoption = product.option[0].title + '-' + option1 + '#' + product.option[1].title + '-' + option2;
        else {
            if (product.option.length === 1) groupoption = product.option[0].title + '-' + option1;
            else groupoption = '';
        } 
        const productAdded = product.id + '@' + groupoption;  

        let productAddedOptions = [];
        if (product.option.length === 2) productAddedOptions = arrayOption2(product.option[0].title, option1, product.option[1].title, option2);
        else {
            if (product.option.length === 1) productAddedOptions = arrayOption1(product.option[0].title, option1);
            else productAddedOptions = '';
        }           
        const productObject = { "id": product.id, "productCode": productAdded, options: productAddedOptions, "qty": 1, "total": parseInt(product.price) };
        const indexInStored = data.findIndex(a => a.productCode === productAdded);
        if (indexInStored === -1) {
            // Add New One                
            data = [...data, productObject];
            localStorage.setItem('yam-shoppingcart', JSON.stringify(data));
            setClassStatus('cart-loadding');
            setStatusText(t("Adding_to_Cart"));
            setTimeout(() => {
                setClassStatus('cart-complete');
                setStatusText(t("Added_success"));
                setscCount((c) => c + 1);
                data.map(a => totaladded = totaladded + a.total);
                setscTotal(totaladded);
                setscData(data);
                setTimeout(() => {
                    setClassStatus('');
                    setStatusText(t("Add_to_Cart"))
                    setopenCart(o => !o);
                    setOpen(o => !o);
                }, 500);
            }, 1000);
        } else {
            // Replace existing                 
            const objOld = data[indexInStored];
            const qtyNew = parseInt(objOld.qty) + 1;
            const totalNew = parseInt(objOld.total) + parseInt(product.price);
            const objNew = { "id": product.id, "productCode": productAdded, options: productAddedOptions, "qty": qtyNew, "total": totalNew };
            const newData = update(data, {
                $splice: [[indexInStored, 1, objNew]]
            });
            localStorage.setItem('yam-shoppingcart', JSON.stringify(newData));
            setClassStatus('cart-loadding');
            setStatusText(t("Adding_to_Cart"));
            setTimeout(() => {
                setClassStatus('cart-complete');
                setStatusText(t("Added_success"));
                newData.map(a => totaladded = totaladded + a.total);
                setscTotal(totaladded);
                setscData(newData);
                setTimeout(() => {
                    setClassStatus('');
                    setStatusText(t("Add_to_Cart"))
                    setopenCart(o => !o);
                    setOpen(o => !o);
                }, 500);
            }, 1000);
        }
    }

    function changeImage(index) {
        swiper.slideTo(index);
    }

    const photos = Array.isArray(product?.photos) && product.photos.length > 0
        ? product.photos
        : (product?.image || []).map((item) => item.imgpath)

    return (
        <div className="product-item__quickview">
            <button type="button" className={`product-item__icon ${(directly === "1") ? 'show' : 'hidden'}`} onClick={() => setOpen(o => !o)}>
                <SVGEye />
            </button>
            <button type="button" className={`product-item__icon ${(directly === "1") ? 'hidden' : 'show'} ${classStatus}`} onClick={() => checkOption()}>
                <SVGCart />
                <span title="">{buttonText}</span>
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal__layout modal-open product-quickview">
                    <div className="modal__close" onClick={closeModal}></div>
                    <div className="modal__content">
                        <div className="modal__header">
                            <span className="modal__close-icon" onClick={closeModal}><SVGClose /></span>
                        </div>
                        <div className="modal__body">
                            <div className="product-quickview-modal__content">
                                <div className="product-template__content product-template__content-left col-12 col-sm-12">
                                    <div className="product-template__inner row">
                                        <div className="product-template__media col-12 col-sm-12 col-md-6">
                                            <div className="product-template__media-content row">
                                                <div className="col-12 col-lg-12">
                                                    <div className="product-gallery">
                                                        <Swiper
                                                            navigation={{
                                                                prevEl: ".quickview-carousel-nav-prev",
                                                                nextEl: ".quickview-carousel-nav-next",
                                                            }}
                                                            onSwiper={setSwiper}
                                                            className='swiper-container'>
                                                            {
                                                                photos.map((item, index) => (
                                                                    <SwiperSlide key={`${item}-${index}`}>
                                                                        <div className="product-item__image">
                                                                            <Image src={buildImageUrl(item)} alt={product?.name || "product"} width={560} height={560} />
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))
                                                            }
                                                        </Swiper>
                                                        <div className="carousel-navigation quickview-carousel-nav-prev swiper-nav-prev"><SVGArrowLeft /></div>
                                                        <div className="carousel-navigation quickview-carousel-nav-next swiper-nav-next"><SVGArrowRight /></div>
                                                        <Swiper

                                                            spaceBetween={10}
                                                            slidesPerView={4}
                                                            watchSlidesProgress={true}

                                                            className="quickview-thumbs"
                                                        >
                                                            {
                                                                photos.map((item, index) => (
                                                                    <SwiperSlide key={`thumb-${item}-${index}`}>
                                                                        <div className="product-item__image" onClick={() => changeImage(index)}>
                                                                            <Image src={buildImageUrl(item)} alt={product?.name || "product"} width={133} height={133} />
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))
                                                            }
                                                        </Swiper>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-template__info col-12 col-sm-12 col-md-6">
                                            <div className="product-template__info-left">
                                                <h1 className="product-template__title">{product.name}</h1>
                                                {displayPrice(product.price, product.price_compare)}
                                                {displayRating(product.stars)}
                                                <div className="product-template__details"><div className="product-template__title-area">{t("Details")}</div><div className="product-template__content-area">
                                                    <ul>
                                                        <li id="sku-template--14471996276810__main" className="product-template__sku">
                                                            <span className="product-template__info-title">{t("SKU")}: </span>
                                                            <span className="product-template__info-text">{product.SKU}</span>
                                                        </li>
                                                        <li className="product-template__vendor">
                                                            <span className="product-template__info-title">{t("Brand")}: </span>
                                                            <span className="product-template__info-text">{product.Brand}</span>
                                                        </li>
                                                        <li className="product-template__type">
                                                            <span className="product-template__info-title">{t("Type")}: </span>
                                                            <span className="product-template__info-text">{product.Type}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                </div>
                                                <div className="variant-selects">
                                                    {/* {
                                                        product.option.map((item, indexi) => (
                                                            <fieldset key={item.handle} className="js product-form__input" data-type="input">
                                                                <legend className="form__label">
                                                                    <span className="form__label-title">{t(item.title)}: {(indexi === 0) ? t(option1) : t(option2)}</span>
                                                                </legend>
                                                                <div className={`product-form__item product-form__${item.title.toLowerCase()}`}>
                                                                    {
                                                                        item.variant.map((vari, indexj) => (
                                                                            <label key={vari.handle} className="product-form-value__item product-form__" htmlFor={`option-${item.handle}-variant-${vari.handle}`}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`group-${item.handle}`}
                                                                                    value={vari.title}
                                                                                    id={`option-${item.handle}-variant-${vari.handle}`}
                                                                                    onChange={() => qwchangeVariant(indexi, vari.title)}
                                                                                />
                                                                                {(item.handle == 'color') ? <>
                                                                                    <span title={vari.title} className={`color-${vari.title.toLowerCase()} ${(option1 === vari.title) ? 'checked' : ''} ${(option2 === vari.title) ? 'checked' : ''}`} style={{ backgroundColor: vari.handle }}>{t(vari.title)}</span>
                                                                                </> : <>
                                                                                    <span title={vari.title} className={`color-${vari.title.toLowerCase()} ${(option1 === vari.title) ? 'checked' : ''} ${(option2 === vari.title) ? 'checked' : ''}`}>{t(vari.title.replace(' ', ''))}</span>
                                                                                </>}

                                                                            </label>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </fieldset>
                                                        ))
                                                    } */}
                                                </div>
                                                <div className="product-form__buttons">
                                                    <div className="product-form__buttons-group row">
                                                        <div className="col-6 col-sm-6">
                                                            <button
                                                                type="submit"
                                                                name="add"
                                                                onClick={qwAddtoCart}
                                                                className={`product-form__submit button button--full-width button--primary ${classStatus}`}>{statusText}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-template__description">
                                                    <div className="product-template__title-area">{t("Description")}</div>
                                                    <div className="product-template__content-area">{product.desc}</div>
                                                </div>
                                                <div className="product-template__sharing">
                                                    <div className="product-sharing__desktop">
                                                        <div className="product-sharing__title">{t("Share")}</div>
                                                        <ul className="social-sharing">
                                                            <li>
                                                                <Link target="_blank" href="https://www.facebook.com/sharer.php?u=https://themeforest.net/user/kalathemes" className="btn--share share-facebook">
                                                                    <SVGFacebook />
                                                                    <span className="share-title" aria-hidden="true">Facebook</span>
                                                                    <span className="visually-hidden">Facebook</span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link target="_blank" href="https://twitter.com/share?text=New%20Mint%20Phone&amp;url=https://themeforest.net/user/kalathemes" className="btn--share share-twitter">
                                                                    <SVGTwitter />
                                                                    <span className="share-title" aria-hidden="true">Twitter</span>
                                                                    <span className="visually-hidden">Twitter</span>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link target="_blank" href="https://pinterest.com/pin/create/button/?url=https://themeforest.net/user/kalathemes" className="btn--share share-pinterest">
                                                                    <SVGPinterest />
                                                                    <span className="share-title" aria-hidden="true">Pinterest</span>
                                                                    <span className="visually-hidden">Pinterest</span>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
            <Popup open={openCart} closeOnDocumentClick onClose={closeModalCart}>
                <div className="html-section cart-modal">
                    <div className="modal__layout modal-open">
                        <div className="modal__close" onClick={closeModalCart}></div>
                        <div className="modal__content">
                            <div className="modal__header">
                                <div className="modal__title cart-modal__title">
                                    <p className="cart-modal__title-added">{t("Added_cart")}</p>
                                    <p className="cart-modal__title-error">{t("Add_failure")}</p>
                                </div>
                                <span className="modal__close-icon" onClick={closeModalCart}><SVGClose /></span>
                            </div>
                            <div className="modal__body">
                                <div className="cart-modal__content">
                                    <p className="cart-modal__title-error-message"></p>
                                    <div className="cart-modal__content-left">
                                        <div className="cart-modal__product-content" data-cart-modal-product="">
                                            <div className="cart-modal__content-product">
                                                    <Image className="cart-modal-product__image"
                                                    src={buildImageUrl(photos[0])} alt={product?.name || "product"} width={70} height={70} loading="lazy" />
                                                <div className="cart-modal-product__info">
                                                    <h3 className="cart-modal-product__name h4">{product.name}</h3>
                                                    <dl>
                                                        {/* {
                                                            product.option.map((item, index) => (
                                                                <div key={index} className="cart-modal-product__option h4">
                                                                    <dt>{item.title}: {(index === 0) ? option1 : option2}</dt>
                                                                    <dd>{ }</dd>
                                                                </div>
                                                            ))
                                                        } */}
                                                    </dl>
                                                    <div className="cart-modal-product__price">
                                                        <span className="price">
                                                            <CurrencyConvert amount={parseInt(product.price)} />
                                                        </span>
                                                    </div>
                                                    <div className="cart-modal-product__qty">
                                                        Qty: <span className="cart-modal-product__qty-number">1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-modal__content-right">
                                        <div className="cart-modal__content-count" id="cart-modal-count" data-cart-modal-count="">{t("There_is")} {scCount} {t("item_in_your_cart")}.</div>
                                        <div className="cart-modal__content-total" id="cart-modal-total" data-cart-modal-total=""><CurrencyConvert amount={parseInt(scTotal)} /></div>
                                        <div className="cart-modal__content-buttons">
                                            <Link href="/cart" className="button button--secondary">
                                                {t("View_cart")}
                                            </Link>
                                            <span className="button button--secondary" onClick={closeModalCart}>
                                                {t("Continue_shopping")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-modal__upsell d-none d-md-block">
                                    <h4 className="cart-modal__upsell-title">{t("Other_customers_also_bought")}</h4>
                                    <UtilUpsells product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default ProductQuickView;
