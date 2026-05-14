import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image'
import Popup from "reactjs-popup";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { buildImageUrl } from './Tools'
import UtilUpsells from './ProductUpsells'
import useTranslation from './useTranslation'
import CurrencyConvert from './CurrencyConvert'
import { useAddToCartMutation } from '../../store/cartApi'
import { SVGCart, SVGClose } from '../../public/assets/SVG';

const ProductAddtoCart = ({ product }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const authToken = useSelector((state) => state.auth?.token);
    const cartItems = useSelector((state) => state.cart.items);

    const [addToCart, { isLoading }] = useAddToCartMutation();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    const scCount = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
        : 0;
    const scTotal = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => {
            const price = parseFloat(item?.product?.price || item?.price || 0);
            return sum + price * (item.quantity || 0);
        }, 0)
        : 0;

    async function handleAddToCart() {
        if (!authToken) {
            router.push('/account-login');
            return;
        }
        setError(null);
        try {
            await addToCart({ product_id: product.id, quantity: 1 }).unwrap();
            setOpen(true);
        } catch (err) {
            setError(err?.data?.message || t("Add_failure"));
        }
    }

    const buttonLabel = isLoading ? t("Adding_to_Cart") : t("Add_to_Cart");
    const buttonClass = `product-item__icon${isLoading ? ' cart-loadding' : ''}`;

    return (
        <div className="cart-button bottom-center">
            <div className="product-item__addcart">
                <button
                    type="button"
                    className={buttonClass}
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    title={t("Add_to_Cart")}
                >
                    <SVGCart />
                    <span>{buttonLabel}</span>
                </button>

                {error && (
                    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error}</p>
                )}

                <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                    <div className="html-section cart-modal">
                        <div className="modal__layout modal-open">
                            <div className="modal__close" onClick={() => setOpen(false)}></div>
                            <div className="modal__content">
                                <div className="modal__header">
                                    <div className="modal__title cart-modal__title">
                                        <p className="cart-modal__title-added">{t("Added_cart")}</p>
                                    </div>
                                    <span className="modal__close-icon" onClick={() => setOpen(false)}>
                                        <SVGClose />
                                    </span>
                                </div>
                                <div className="modal__body">
                                    <div className="cart-modal__content">
                                        <div className="cart-modal__content-left">
                                            <div className="cart-modal__product-content">
                                                <div className="cart-modal__content-product">
                                                    <Image
                                                        className="cart-modal-product__image"
                                                        src={buildImageUrl(product?.photos?.[0])}
                                                        alt={product?.name || "product"}
                                                        width={70}
                                                        height={70}
                                                    />
                                                    <div className="cart-modal-product__info">
                                                        <h3 className="cart-modal-product__name h4">{product.name}</h3>
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
                                            <div className="cart-modal__content-count">
                                                {t("There_is")} {scCount} {t("item_in_your_cart")}.
                                            </div>
                                            <div className="cart-modal__content-total">
                                                <CurrencyConvert amount={parseInt(scTotal)} />
                                            </div>
                                            <div className="cart-modal__content-buttons">
                                                <Link href="/cart" className="button button--secondary">
                                                    {t("View_cart")}
                                                </Link>
                                                <span className="button button--secondary" onClick={() => setOpen(false)}>
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
    );
};

export default ProductAddtoCart;
