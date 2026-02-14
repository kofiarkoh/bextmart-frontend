import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer';
import useTranslation from '../components/ultils/useTranslation'
import { useAtom } from 'jotai'
import { cartCount, cartTotal, cartData } from '../components/ultils/Store'

export default function CheckoutSuccessPage() {
    const { t } = useTranslation();
    const [sccount, setscCount] = useAtom(cartCount);
    const [scTotal, setscTotal] = useAtom(cartTotal);
    const [items, setItems] = useAtom(cartData);

    useEffect(() => {
        setscCount(0);
        setscTotal(0);
        setItems([]);
        localStorage.removeItem('yam-shoppingcart');
    }, []);
    useEffect(() => { }, [sccount, scTotal, items])

    return (
        <>
            <Head>
                <title>{t("Cart_page")}</title>
            </Head>
            <Header />
            <main>
                <div className='main-cart-items'>
                    <div className='cart-template__layout '>
                        <div className='container'>
                            <div className='cart-template__content checkout-notify'>
                                <h2>{t("Checkout_Success")}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}