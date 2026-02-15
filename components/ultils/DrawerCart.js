import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

import CurrencyConvert from './CurrencyConvert'
import useTranslation from './useTranslation'
import { useGetCartQuery } from '../../store/cartApi'
import { useSelector } from 'react-redux'

import { SVGCart, SVGCartMobile, SVGClose } from '../../public/assets/SVG';
import DrawerCartItem from './DrawerCartItem'

const DrawerCart = () => {
    const { t } = useTranslation();
    useGetCartQuery();
    const cartItems = useSelector((state) => state.cart.items);
    const sccount = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
        : 0;
    const scTotal = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => {
            const price = parseFloat(item?.product?.price || item?.price || 0);
            const qty = item?.quantity || 0;
            return sum + (price * qty);
        }, 0)
        : 0;
    // Toggle Drawer
    const [isOpen, setIsOpen] = useState(false);
    const useEscape = () => {
        useEffect(() => {
            const handleEsc = (event) => {
                if (event.keyCode === 27) {
                    close();
                    setIsOpen(false);
                }
            };
            window.addEventListener('keydown', handleEsc);

            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }, []);
    }
    useEscape()

    function openDrawer(e){
        e.preventDefault(); 
        setIsOpen(current => !current);
        if (typeof window !== 'undefined') {
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeDrawer(){
        setIsOpen(false);
        if (typeof window !== 'undefined') {
            document.body.classList.remove('overflow-hidden');
        }
    }

    return (
        <>
            <div id="cartdetails" className={`cartdrawer ${isOpen ? 'menu-opening' : ''}`}>
                <div className="cartsummary header__icon header__icon--cart header__icon--summary link focus-inset header-drawer__toggle" aria-haspopup="dialog" role="button">
                    <div className="drawer__toggle-icon">
                        <Link href="/cart" id="cart-icon-bubble" data-cart-icon-bubble="" onClick={(e) => { openDrawer(e) }}>
                            <div className="main-header__cart-icon">
                                <SVGCart />
                                <SVGCartMobile />
                            </div>
                            <div className="main-header__cart-text">
                                <div className="main-header__cart-textline">{t("CART")} (<span className="main-header__cart-count">{sccount}</span>) </div>
                                <div className="main-header__cart-count-mount">
                                    <div className="main-header__cart-count" data-cart-modal-total="">
                                        <span className="money"><CurrencyConvert amount={parseInt(scTotal)} /></span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="header-drawer__inner  header-drawer__right" role="dialog" aria-modal="true" aria-label="">
                    <div className="header-drawer__overlay" onClick={() => closeDrawer()}></div>
                    <div className="header-drawer_content cart-drawer__content">
                        <div className="header-drawer__title">
                            <h3 className="drawer--title">{t("My_shopping_cart")}</h3>
                            <button type="button" className="drawer__close-button link link--text focus-inset" onClick={() => closeDrawer()}>
                                <SVGClose />
                            </button>
                        </div>
                        <div className="header-drawer__content cart-drawer__content">
                            <div className="cart-drawer__shipping" id="cart-dropdown-shipping" data-cart-dropdown-shipping="">
                                <div className="cart__shipping-content ">
                                    <div className="cart__shipping-heading">
                                        <p className="shipping__heading-free">{t("freeshipping_text1")} <strong>{t("freeshipping_text2")}!</strong></p>
                                    </div>
                                    <div className="cart__shipping-progress-bar">
                                        <span width="100%" data-cart-goal-progress="" className="progress-bar__meter" style={{ width: "100%" }}></span>
                                    </div>
                                </div>
                            </div>
                            <div className="header-drawer__scroll">
                                <div className="cart-drawer__bubble" id="cart-dropdown-bubble">
                                    <cart-dropdown-bubble>
                                        <div className="component-scrollbar cart__dropdown-content ">
                                            <div id="cart-dropdown-bubble-product" className="cart__dropdown-product" data-cart-dropdown-bubble-product="">
                                                <DrawerCartItem />
                                            </div>
                                        </div>
                                    </cart-dropdown-bubble>
                                </div>
                            </div>
                            <div className="header-drawer__bottom" id="cart-dropdown-bottom" data-cart-dropdown-bottom="">
                                <div className="cart__dropdown-bottom ">
                                    <div className="cart__dropdown-subtotal">
                                        <h3 className="totals__subtotal">{t("Subtotal")}</h3>
                                        <p className="totals__subtotal-value" data-cart-modal-total=""><span className="money"><CurrencyConvert amount={parseInt(scTotal)} /></span></p>
                                    </div>
                                    <div className="cart__dropdown-action">
                                        <Link href="/cart" className="button button--secondary">
                                            {t("View_cart")}
                                        </Link>
                                        <Link href="/cart" className="button button--primary">
                                            {t("Check_out")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DrawerCart;
