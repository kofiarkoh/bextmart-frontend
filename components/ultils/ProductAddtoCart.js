import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image'
import update from 'immutability-helper';
import Popup from "reactjs-popup";
import { unitvariant, groupOption, arrayOption } from './Tools'
import UtilUpsells from './ProductUpsells'
import ProductQuickView from './ProductQuickView'
import useTranslation from './useTranslation'
import CurrencyConvert from './CurrencyConvert'

import { useAtom } from 'jotai'
import { cartCount, cartTotal, cartData } from './Store'

import { SVGCart, SVGClose } from '../../public/assets/SVG';

const ProductCompare = ({ product }) => {
    const [isOneVariant, setIsOneVariant] = useState(false);
    const [scCount, setscCount] = useAtom(cartCount);
    const [scTotal, setscTotal] = useAtom(cartTotal);
    const [scData, setscData] = useAtom(cartData);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const { t } = useTranslation();
    const [classStatus, setClassStatus] = useState('');
    const [statusText, setStatusText] = useState(t("Add_to_Cart"));

    function addtocart() {        
        let data = localStorage.getItem('yam-shoppingcart');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else { data = []; }
        let totaladded = 0;
        const groupoption = groupOption(product.option);
        const productAdded = product.id + '@' + groupoption;
        const productAddedOptions = arrayOption(product.option);
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
                    setOpen(o => !o);
                }, 500);
            }, 1000);
        }
    }

    if (unitvariant(product.option)) {
        return (
            <div className="cart-button bottom-center">
                <div className="product-item__addcart">
                    <button type="button" className={`product-item__icon ${classStatus}`} onClick={addtocart} title={t("Add_to_Cart")}>
                        <SVGCart />
                        <span>{statusText}</span>
                    </button>
                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className="html-section cart-modal">
                            <div className="modal__layout modal-open">
                                <div className="modal__close" onClick={closeModal}></div>
                                <div className="modal__content">
                                    <div className="modal__header">
                                        <div className="modal__title cart-modal__title">
                                            <p className="cart-modal__title-added">{t("Added_cart")}</p>
                                            <p className="cart-modal__title-error">{t("Add_failure")}</p>
                                        </div>
                                        <span className="modal__close-icon" onClick={closeModal}><SVGClose /></span>
                                    </div>
                                    <div className="modal__body">
                                        <div className="cart-modal__content">
                                            <p className="cart-modal__title-error-message"></p>
                                            <div className="cart-modal__content-left">
                                                <div className="cart-modal__product-content" data-cart-modal-product="">
                                                    <div className="cart-modal__content-product">
                                                        <Image className="cart-modal-product__image"
                                                            src={product.image[0].imgpath} alt={product.name} width={70} height={70} />
                                                        <div className="cart-modal-product__info">
                                                            <h3 className="cart-modal-product__name h4">{product.name}</h3>
                                                            <dl>
                                                                {
                                                                    product.option.map((item, index) => (
                                                                        <div key={index} className="cart-modal-product__option h4">
                                                                            <dt>{t(item.title)}: </dt>
                                                                            <dd>{t(item.variant[0].title)}</dd>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </dl>
                                                            <div className="cart-modal-product__price">
                                                                <span className="price">
                                                                    <CurrencyConvert amount={parseInt(product.price)} />
                                                                </span>
                                                            </div>
                                                            <div className="cart-modal-product__qty">
                                                                {t("Qty")}: <span className="cart-modal-product__qty-number">1</span>
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
                                                    <span className="button button--secondary" onClick={closeModal}>
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
            </div>
        )
    } else {
        return (
            <div className="cart-button bottom-center">
                <div className="product-item__addcart">
                    <ProductQuickView product={product} directly="2" />
                </div>
            </div>
        )
    };
}

export default ProductCompare;