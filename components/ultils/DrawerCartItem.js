import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import { useAtom } from 'jotai'
import { cartCount, cartTotal, cartData } from './Store'
import CurrencyConvert from './CurrencyConvert'
import { SVGClose, SVGMinus, SVGPlus } from '../../public/assets/SVG';
import update from 'immutability-helper';

import useTranslation from './useTranslation'
import Product_en from '../../public/locales/en/en_Product.json';
import Product_jp from '../../public/locales/jp/jp_Product.json';
import Product_fr from '../../public/locales/fr/fr_Product.json';
import Product_it from '../../public/locales/it/it_Product.json';

const DrawerCartItem = () => {
    const [sccount, setscCount] = useAtom(cartCount);
    const [scTotal, setscTotal] = useAtom(cartTotal);
    const [items, setItems] = useAtom(cartData);

    const { t, locale } = useTranslation();
    let ProductConnect = {};
    switch (locale) {
        case 'en':
            ProductConnect = Product_en; break;
        case 'fr':
            ProductConnect = Product_fr; break;
        case 'it':
            ProductConnect = Product_it; break;
        case 'jp':
            ProductConnect = Product_jp; break;
    }

    function removeItem(item) {
        const data = items;
        const indexInStored = data.findIndex(a => a.productCode === item.productCode);
        data.splice(indexInStored, 1);
        localStorage.setItem('yam-shoppingcart', JSON.stringify(data));
        setscCount((c) => c - 1);
        let totalAfterRemoved = 0;
        data.map(a => totalAfterRemoved = totalAfterRemoved + a.total);
        setscTotal(totalAfterRemoved);
        setItems(data);
    }

    function updateItem(item, qtyNew, totalNew) {
        const data = items;
        const indexInStored = data.findIndex(a => a.productCode === item.productCode);
        const objNew = {"id": item.id, "productCode": item.productCode, options: item.options, "qty": qtyNew, "total": totalNew };
        const newData = update(data, {
            $splice: [[indexInStored, 1, objNew]]
        });
        localStorage.setItem('yam-shoppingcart', JSON.stringify(newData));
        let totaladded = 0;
        newData.map(a => totaladded = totaladded + a.total);
        setscTotal(totaladded);
        setItems(newData);
    }

    function changeQtyInput(item, number, price) {
        const qtyNew = parseInt(number);
        const totalNew = qtyNew * parseInt(price);
        updateItem(item, qtyNew, totalNew);
    }

    function changeQty(item, number, price) {
        let qtyNew = 0;
        (number) ? qtyNew = parseInt(item.qty - 1) : qtyNew = parseInt(item.qty + 1);
        const totalNew = qtyNew * parseInt(price);
        if (qtyNew > 0) {
            updateItem(item, qtyNew, totalNew);
        } else {
            removeItem(item);
        }
    }

    if (items.length) {
        return (
            <>{
                items.map((item, index) => {
                    let product = ProductConnect[ProductConnect.findIndex(pc => item.id === pc.id)];
                    return (
                        <div className="cart__dropdown-item" key={index}>
                            <div className="cart__dropdown-item">
                                <Link href={`/product/${product.handle}`} className='cart__dropdown-product-image'>
                                    <Image src={`${product.image[0].imgpath}`} alt={product.name} width={61} height={61} />
                                </Link>
                                <div className="cart__dropdown-product-info">
                                    <h3 className="cart__dropdown-product-title">
                                        <Link href={`/product/${product.handle}`}>{product.name}</Link>
                                    </h3>
                                    <div className="cart__dropdown-product-variants">
                                        {
                                            (item.options.length > 0)
                                                ?
                                                item.options.map((option, index) => (
                                                    <div className="option-name" key={index}>{t(option.option)}:<div className="variant-name">{t(option.variant)}</div></div>
                                                ))
                                                :
                                                ''
                                        }
                                    </div>
                                    <div className="cart__dropdown-product-price">
                                        <span className="price">
                                            <span className="money"><CurrencyConvert amount={parseInt(product.price)} /></span>
                                        </span>
                                    </div>
                                    <div className="cart__dropdown-product-qty">
                                        <div className="quantity">
                                            <button className="quantity__button no-js-hidden" name="minus" type="button" onClick={(e) => changeQty(item, true, product.price)}>
                                                <span className="visually-hidden">Decrease quantity</span>
                                                <SVGMinus />
                                            </button>
                                            <input onChange={(e) => changeQtyInput(item, e.target.value, product.price)} className="quantity__input" type="number" name="updates[]" value={item.qty} min="0" autoComplete="off" />
                                            <button className="quantity__button no-js-hidden" name="plus" type="button" onClick={(e) => changeQty(item, false, product.price)}>
                                                <span className="visually-hidden">Increase quantit</span>
                                                <SVGPlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart__dropdown-remove" onClick={() => removeItem(item)}>
                                    <SVGClose />
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
            </>
        )
    } else {
        return (
            <>
                <div className="cart__dropdown-empty">
                    <h2 className="cart__empty-text">{t("Your_cart_is_empty")}</h2>
                    <Link href="/collections" className="button button--secondary">
                        {t("Continue_shopping")}
                    </Link>
                </div>
            </>
        )
    }

}

export default DrawerCartItem;