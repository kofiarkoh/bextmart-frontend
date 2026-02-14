import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer';
import useTranslation from '../components/ultils/useTranslation'

export default function CheckoutCancelPage() {
    const { t } = useTranslation();
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
                                <h2>{t("Checkout_Cancel")}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}