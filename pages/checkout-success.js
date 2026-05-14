import React, { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer';
import useTranslation from '../components/ultils/useTranslation'
import { useDispatch } from 'react-redux'
import { clearCart } from '../store/cartSlice'

export default function CheckoutSuccessPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <>
            <Head>
                <title>Order Confirmed</title>
            </Head>
            <Header />
            <main>
                <div className='main-cart-items'>
                    <div className='cart-template__layout'>
                        <div className='container'>
                            <div className='cart-template__content checkout-notify' style={{ textAlign: 'center', padding: '60px 0' }}>
                                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                                <h2 style={{ marginBottom: 12 }}>{t("Checkout_Success")}</h2>
                                <p style={{ color: 'var(--color_body)', marginBottom: 32, fontSize: 15 }}>
                                    Your order has been placed. We will contact you shortly.
                                </p>
                                <Link href="/" className="button button--primary">Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
