import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAtom } from 'jotai'
import update from 'immutability-helper';
import { loadStripe } from '@stripe/stripe-js';
import { cartCount, cartTotal } from '../components/ultils/Store'
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import useTranslation from '../components/ultils/useTranslation'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import CartPageSkeleton from '../components/ultils/CartPageSkeleton'
import ExtNotification from '../components/ExtNotification'
import { SVGTrash, SVGMinus, SVGPlus } from '../public/assets/SVG';
import styles from '../public/assets/styles/CartPage.module.css'
import { Quantity } from '../public/locales/en/en';

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};

export default function CartPage() {
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-cart');
    }

    const router = useRouter();
    const { t, locale } = useTranslation();
    const [scCount, setscCount] = useAtom(cartCount);
    const [scTotal, setscTotal] = useAtom(cartTotal);
    const [cartData, setCartData] = useState(null);
    const [isLoading, setisLoading] = useState(true);

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

    useEffect(() => {
        let data = localStorage.getItem('yam-shoppingcart');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setCartData(data);
        }
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, [isLoading]);
    useEffect(() => { }, [cartData])

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

    function changeQtyInput(item, number, price) {
        const qtyNew = parseInt(number);
        const totalNew = qtyNew * parseInt(price);
        updateItem(item, qtyNew, totalNew);
    }

    function updateItem(item, qtyNew, totalNew) {
        const data = cartData;
        const indexInStored = data.findIndex(a => a.productCode === item.productCode);
        const objNew = { "id": item.id, "productCode": item.productCode, options: item.options, "qty": qtyNew, "total": totalNew };
        const newData = update(data, {
            $splice: [[indexInStored, 1, objNew]]
        });
        localStorage.setItem('yam-shoppingcart', JSON.stringify(newData));
        let totaladded = 0;
        newData.map(a => totaladded = totaladded + a.total);
        setscTotal(totaladded);
        setCartData(newData);
    }

    function removeItem(item) {
        let data = localStorage.getItem('yam-shoppingcart');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        const cartExisted = data.findIndex(a => a.productCode === item.productCode);
        data.splice(cartExisted, 1);
        localStorage.setItem('yam-shoppingcart', JSON.stringify(data));
        setscCount((c) => c - 1);
        let totalAfterRemoved = 0;
        data.map(a => totalAfterRemoved = totalAfterRemoved + a.total);
        setscTotal(totalAfterRemoved);
        setCartData(data);
    }

    async function handleCheckout() {
        let items = [];
        cartData.map((item, index) => {
            let product = ProductConnect[ProductConnect.findIndex(pc => item.id === pc.id)];
            let stripeItem = {
                price: product.stripe_APIID,
                quantity: item.qty
            }
            if (product.stripe_APIID != '' || product.stripe_APIID != undefined) {
                if (items.findIndex(a => a.price === product.stripe_APIID) === -1) {
                    items = items.concat(stripeItem);
                }
            }
        })
        
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: items,
            mode: 'payment',
            successUrl: `${window.location.origin}/checkout-success`,
            cancelUrl: `${window.location.origin}/checkout-cancel`,
        });
        console.warn(error.message);
    }



    function loadCartItem() {
        return (
            <>
                <div className='cart__contents'>
                    <div className={styles.cart__items}>
                        <div className='js-contents'>
                            <table className={styles.cart_items}>
                                <thead>
                                    <tr>
                                        <th className="caption-with-letter-spacing" colSpan="2" scope="col">{t("Carttable_Product")}</th>
                                        <th className={`${styles.medium_up} center caption-with-letter-spacing`} colSpan="1" scope="col">{t("Carttable_Price")}</th>
                                        <th className={`${styles.medium_up} center cart-items__heading--wide caption-with-letter-spacing`} colSpan="1" scope="col">{t("Carttable_Quantity")}</th>
                                        <th className="center caption-with-letter-spacing" colSpan="1" scope="col">{t("Carttable_Total")}</th>
                                        <th className={`${styles.medium_up} center caption-with-letter-spacing`} colSpan="1" scope="col">{t("Carttable_Remove")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartData.map((item, index) => {
                                            let product = ProductConnect[ProductConnect.findIndex(pc => item.id === pc.id)];
                                            return (
                                                <tr key={index} className={styles.cart_item} id={`CartItem-${index}`}>
                                                    <td className={styles.cart_item__media}>
                                                        <Image src={product.image[0].imgpath} alt='' className='product-item__image' width={80} height={80} />
                                                    </td>
                                                    <td className={styles.cart_item__details}>
                                                        <Link className={`${styles.cart_item__name} break`} href={`/product/${product.handle}`}>{product.name}</Link>
                                                        <dl>
                                                            {
                                                                (item.options.length > 0)
                                                                    ?
                                                                    item.options.map((option, index) => (
                                                                        <div className={styles.product_option} key={index}>
                                                                            <dt>{t(option.option)}:</dt>
                                                                            <dd>{t(option.variant)}</dd>
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    ''
                                                            }
                                                        </dl>
                                                    </td>
                                                    <td className="center cart-item__prices">
                                                        <div className="cart-item__price-wrapper medium-up">
                                                            <span className="price">
                                                                <span className="money"><CurrencyConvert amount={parseInt(product.price)} /></span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className={`${styles.cart_item__quantity} center`}>
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
                                                    </td>
                                                    <td className="center cart-item__totals">
                                                        <CurrencyConvert amount={parseInt(item.total)} />
                                                    </td>
                                                    <td className={`${styles.cart_item__remove} center`} onClick={() => removeItem(item)}>
                                                        <SVGTrash />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='main-cart-footer'>
                        <div className={styles.cart_template__totals}>
                            <div className={`${styles.cart_totals_totals} ${styles.totals}`}>
                                <h3 className={styles.totals__subtotal}>{t("Cart_Subtotal")}</h3>
                                <p className={styles.subtotal_value}><span className="money"><CurrencyConvert amount={parseInt(scTotal)} /></span></p>
                            </div>
                            <small className={`${styles.tax_note} caption-large rte`}>{t("Cart_note")}</small>
                        </div>
                        <div className={`${styles.cart_template__button} row`}>
                            <div className="col-12 col-sm-6">
                                <Link href="/" className="button button--secondary">{t("Cart_Continueshopping")}</Link>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="button button--secondary" onClick={handleCheckout}>{t("Cart_checkout")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{t("Cart_page")}</title>
            </Head>
            <Header />
            <main>
                <Breadcrumbs />
                <div className='main-cart-items'>
                    <div className='cart-template__layout '>
                        <div className='container'>
                            <div className='cart-template__content'>
                                {
                                    (isLoading) ? <CartPageSkeleton />
                                        : <>
                                            {
                                                (scCount === 0)
                                                    ?
                                                    <div className='page-heading wishlist-empty'>
                                                        {t("Cart_nothing")}
                                                    </div>
                                                    : (scCount === 1)
                                                        ?
                                                        <div className='page-heading wishlist-noempty'>
                                                            {t("Cart_theris")} {scCount} {t("Cart_text1")}
                                                        </div>
                                                        :
                                                        <div className='page-heading wishlist-noempty'>
                                                            {t("Cart_therare")} {scCount} {t("Cart_text2")}
                                                        </div>
                                            }
                                            {
                                                (cartData != null && scCount > 0) ? loadCartItem() : ''
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <ExtNotification />
        </>
    )
}