import React, { useMemo } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import useTranslation from '../components/ultils/useTranslation'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartPageSkeleton from '../components/ultils/CartPageSkeleton'
import ExtNotification from '../components/ExtNotification'
import { SVGTrash } from '../public/assets/SVG';
import styles from '../public/assets/styles/CartPage.module.css'
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation } from '../store/cartApi'
import { useSelector } from 'react-redux'
import { buildImageUrl } from '../components/ultils/Tools'

export default function CartPage() {
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-cart');
    }

    const { t, locale } = useTranslation();
    const authToken = useSelector((state) => state.auth?.token);
    const { isLoading, refetch } = useGetCartQuery(undefined, { skip: !authToken });
    const [updateCartItem] = useUpdateCartItemMutation();
    const [removeCartItem] = useRemoveCartItemMutation();
    const [loadingItemId, setLoadingItemId] = React.useState(null);
    React.useEffect(() => {
        if (authToken) refetch();
    }, [authToken, refetch]);
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
                const variant = item?.variant || item?.product_variant;
                const variantOption = item?.variant_option;
                const price = parseFloat(variantOption?.price ?? variant?.price ?? item?.product?.price ?? item?.price ?? 0);
                const qty = item?.quantity || 0;
                return sum + (price * qty);
            }, 0)
            : 0),
        [cartItems]
    );

    const cartData = cartItems;

    async function handleUpdateQty(itemId, newQty) {
        setLoadingItemId(itemId);
        try {
            if (newQty < 1) {
                await removeCartItem(itemId).unwrap();
            } else {
                await updateCartItem({ id: itemId, quantity: newQty }).unwrap();
            }
        } finally {
            setLoadingItemId(null);
        }
    }

    async function handleRemove(itemId) {
        setLoadingItemId(itemId);
        try {
            await removeCartItem(itemId).unwrap();
        } finally {
            setLoadingItemId(null);
        }
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
                                            const variant = item.variant || item.product_variant || null;
                                            const variantOption = item.variant_option || null;
                                            const variantImage = variant?.photos?.[0];
                                            const productImage = buildImageUrl(variantImage || product?.photos?.[0]);
                                            const unitPrice = parseFloat(variantOption?.price ?? variant?.price ?? product.price ?? item.price ?? 0);
                                            return (
                                                <tr key={index} className={styles.cart_item} id={`CartItem-${index}`}>
                                                    <td className={styles.cart_item__media}>
                                                        <img src={productImage} alt={productName} className='product-item__image' width={80} height={80} />
                                                    </td>
                                                    <td className={styles.cart_item__details}>
                                                        <Link className={`${styles.cart_item__name} break`} href={`/product/${productId}`}>{productName}</Link>
                                                        <dl>
                                                            {variant && (
                                                                <div className={styles.product_option} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                    <dt style={{ flexShrink: 0 }}>Variant:</dt>
                                                                    <dd style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                        {variant.color_code && (
                                                                            <span style={{
                                                                                display: 'inline-block', width: 14, height: 14,
                                                                                borderRadius: '50%', background: variant.color_code,
                                                                                border: '1px solid #ddd', flexShrink: 0,
                                                                            }} />
                                                                        )}
                                                                        {variant.sku}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {variantOption?.type && variantOption?.value && (
                                                                <div className={styles.product_option} style={{ display: 'flex', alignItems: 'center', gap: 6, textTransform: 'capitalize' }}>
                                                                    <dt style={{ flexShrink: 0 }}>{variantOption.type}:</dt>
                                                                    <dd style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                        {variantOption.color_code && (
                                                                            <span style={{
                                                                                display: 'inline-block', width: 14, height: 14,
                                                                                borderRadius: '50%', background: variantOption.color_code,
                                                                                border: '1px solid #ddd', flexShrink: 0,
                                                                            }} />
                                                                        )}
                                                                        {variantOption.value}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                        </dl>
                                                    </td>
                                                    <td className="center cart-item__prices">
                                                        <div className="cart-item__price-wrapper medium-up">
                                                            <span className="price">
                                                                <span className="money"><CurrencyConvert amount={unitPrice} /></span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className={`${styles.cart_item__quantity} center`}>
                                                        <div className="quantity" style={{ margin: '0 auto' }}>
                                                            <button
                                                                type="button"
                                                                className="quantity__button"
                                                                disabled={loadingItemId === item.id}
                                                                onClick={() => handleUpdateQty(item.id, (item.quantity || 1) - 1)}
                                                                aria-label="Decrease quantity"
                                                                style={{ borderRight: '1px solid var(--color_line)' }}
                                                            >−</button>
                                                            <span style={{ flexGrow: 1, textAlign: 'center', fontSize: '1.4rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity || 0}</span>
                                                            <button
                                                                type="button"
                                                                className="quantity__button"
                                                                disabled={loadingItemId === item.id}
                                                                onClick={() => handleUpdateQty(item.id, (item.quantity || 1) + 1)}
                                                                aria-label="Increase quantity"
                                                                style={{ borderLeft: '1px solid var(--color_line)' }}
                                                            >+</button>
                                                        </div>
                                                    </td>
                                                    <td className="center cart-item__totals">
                                                        <CurrencyConvert amount={unitPrice * (item.quantity || 0)} />
                                                    </td>
                                                    <td className={`${styles.cart_item__remove} center`}>
                                                        <button
                                                            type="button"
                                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                                            disabled={loadingItemId === item.id}
                                                            onClick={() => handleRemove(item.id)}
                                                            aria-label="Remove item"
                                                        >
                                                            <SVGTrash />
                                                        </button>
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
                                <Link href="/checkout" className="button button--primary">{t("Cart_checkout")}</Link>
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
        </>
    )
}
