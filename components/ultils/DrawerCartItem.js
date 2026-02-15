import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

import CurrencyConvert from './CurrencyConvert'
import useTranslation from './useTranslation'
import { useSelector } from 'react-redux'
import { buildImageUrl } from './Tools'

const DrawerCartItem = () => {
    const { t } = useTranslation();
    const items = useSelector((state) => state.cart.items);

    if (items.length) {
        return (
            <>{
                items.map((item, index) => {
                    const product = item.product || {};
                    const productId = product.id || item.product_id;
                    const productName = product.name || t("Product");
                    const productImage = buildImageUrl(product?.photos?.[0]);
                    const productPrice = product.price || item.price || 0;
                    return (
                        <div className="cart__dropdown-item" key={index}>
                            <div className="cart__dropdown-item">
                                <Link href={`/product/${productId}`} className='cart__dropdown-product-image'>
                                    <Image src={productImage} alt={productName} width={61} height={61} />
                                </Link>
                                <div className="cart__dropdown-product-info">
                                    <h3 className="cart__dropdown-product-title">
                                        <Link href={`/product/${productId}`}>{productName}</Link>
                                    </h3>
                                    <div className="cart__dropdown-product-variants">
                                        {Array.isArray(item.options) && item.options.length > 0
                                            ? item.options.map((option, optionIndex) => (
                                                <div className="option-name" key={optionIndex}>
                                                    {t(option.option)}:
                                                    <div className="variant-name">{t(option.variant)}</div>
                                                </div>
                                            ))
                                            : ''}
                                    </div>
                                    <div className="cart__dropdown-product-price">
                                        <span className="price">
                                            <span className="money"><CurrencyConvert amount={parseFloat(productPrice)} /></span>
                                        </span>
                                    </div>
                                    <div className="cart__dropdown-product-qty">
                                        <div className="quantity">
                                            <input className="quantity__input" type="number" name="updates[]" value={item.quantity || 0} min="0" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="cart__dropdown-remove"></div>
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
