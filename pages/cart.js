import React, { useMemo } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import { loadStripe } from '@stripe/stripe-js';
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import useTranslation from '../components/ultils/useTranslation'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartPageSkeleton from '../components/ultils/CartPageSkeleton'
import ExtNotification from '../components/ExtNotification'
import { SVGTrash } from '../public/assets/SVG';
import styles from '../public/assets/styles/CartPage.module.css'
import { useGetCartQuery } from '../store/cartApi'
import { useSelector } from 'react-redux'
import { buildImageUrl } from '../components/ultils/Tools'

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
    const { isLoading } = useGetCartQuery();
    const cartItems = useSelector((state) => state.cart.items);
    const scCount = useMemo(
        () => (Array.isArray(cartItems)
            ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
            : 0),
        [cartItems]
    );
    const scTotal = useMemo(
        () => (Array.isArray(cartItems)
            ? cartItems.reduce((sum, item) => {
                const price = parseFloat(item?.product?.price || item?.price || 0);
                const qty = item?.quantity || 0;
                return sum + (price * qty);
            }, 0)
            : 0),
        [cartItems]
    );

    const cartData = cartItems;


    async function handleCheckout() {
        let items = [];
        cartData.map((item) => {
            const product = item.product || {};
            let stripeItem = {
                price: product.stripe_APIID,
                quantity: item.quantity || 0
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
                                            const product = item.product || {};
                                            const productId = product.id || item.product_id;
                                            const productName = product.name || t("Product");
                                            const productImage = buildImageUrl(product?.photos?.[0]);
                                            const productPrice = product.price || item.price || 0;
                                            return (
                                                <tr key={index} className={styles.cart_item} id={`CartItem-${index}`}>
                                                    <td className={styles.cart_item__media}>
                                                        <img src={productImage} alt={productName} className='product-item__image' width={80} height={80} />
                                                    </td>
                                                    <td className={styles.cart_item__details}>
                                                        <Link className={`${styles.cart_item__name} break`} href={`/product/${productId}`}>{productName}</Link>
                                                        <dl>
                                                            {
                                                                (Array.isArray(item.options) && item.options.length > 0)
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
                                                                <span className="money"><CurrencyConvert amount={parseFloat(productPrice)} /></span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className={`${styles.cart_item__quantity} center`}>
                                                        <div className="quantity">
                                                            <input className="quantity__input" type="number" name="updates[]" value={item.quantity || 0} min="0" readOnly />
                                                        </div>
                                                    </td>
                                                    <td className="center cart-item__totals">
                                                        <CurrencyConvert amount={parseFloat(productPrice) * (item.quantity || 0)} />
                                                    </td>
                                                    <td className={`${styles.cart_item__remove} center`}>
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
