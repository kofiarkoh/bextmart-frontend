import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import { userLoggedData } from '../components/ultils/Store'
import { useAtom } from 'jotai'

import CurrencyConvert from '../components/ultils/CurrencyConvert'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/AccountPage.module.css'
import Account from '../data/Account.json';
import Product_en from '../public/locales/en/en_Product.json';
import Product_jp from '../public/locales/jp/jp_Product.json';
import Product_fr from '../public/locales/fr/fr_Product.json';
import Product_it from '../public/locales/it/it_Product.json';

export default function AccountPage() {
    const router = useRouter();
    const { t, locale } = useTranslation();
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginSuccess, setLoginSuccess] = useState(0);
    const [user, setUser] = useState(userlogged);
    const [order, setOrder] = useState({});
    const [ordertext, setOrderText] = useState(false);
    if (typeof window !== 'undefined') {
        document.body.className= "";
        document.body.classList.add('template-account-order');
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('yam-user'));
        if (data === null) {
            setLoginSuccess(1);
            const timer = setInterval(() => {
                router.push("/account-login")
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        } else {
            const findemail = Account.findIndex(a => (a.email === String(data.email)));
            if (findemail >= 0) {
                setUser(Account[findemail]);
                const orderID = router.asPath.substring(21);
                const findOrderID = Account[findemail].orderlist.findIndex(o => (o.order_id === orderID));
                if (findOrderID >= 0) {
                    setLoginSuccess(2);
                    setOrder(Account[findemail].orderlist[findOrderID]);
                } else {
                    setLoginSuccess(1);
                    setOrderText(true);
                }
            }
        }
    }, [router]);
    useEffect(() => { }, [userlogged, user, ordertext, order, loginSuccess]);

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

    function showOrder() {
        return (
            <>
                <div className={styles.order_content}>
                    <div className={styles.order_content_left}>
                        <h2>{t("Breadcrumb_Order")} #{router.query.order}</h2>
                        <p>{t("Placed_on")} {order.date}</p>
                        <table role="table" className="order-details">
                            <thead role="rowgroup">
                                <tr role="row">
                                    <th id="ColumnProduct" scope="col" role="columnheader">{t("Order_Table_Product")}</th>
                                    <th id="ColumnSku" scope="col" role="columnheader">{t("Order_Table_Options")}</th>
                                    <th id="ColumnPrice" scope="col" role="columnheader">{t("Order_Table_Price")}</th>
                                    <th id="ColumnQuantity" scope="col" role="columnheader">{t("Order_Table_Quantity")}</th>
                                    <th id="ColumnTotal" scope="col" role="columnheader">{t("Order_Table_Total")}</th>
                                </tr>
                            </thead>
                            <tbody role="rowgroup order-products">
                                {
                                    order.productlist.map((item, index) => {
                                        let product = ProductConnect[ProductConnect.findIndex(pc => item.product_id === pc.id)];
                                        return (
                                            <tr role="row" key={index}>
                                                <td headers="ColumnProduct" role="rowheader" scope="row" data-label="Product">
                                                    <Link href={`/product/${product.handle}`} className='product-image'>
                                                        <Image className={styles.order_table_product_image} src={`${product.image[0].imgpath}`} alt={product.name} width={100} height={100} />
                                                        </Link>
                                                    <Link href={`/product/${product.handle}`} className={styles.order_table_product_name}>{product.name}</Link>
                                                </td>
                                                <td headers="ColumnSku" role="cell" data-label="Options">
                                                    {
                                                        item.options.map((option, index) => (
                                                            <div className={styles.order_table_product_option_name} key={index}>{t(option.title)}: {t(option.variant_title)} </div>
                                                        ))
                                                    }
                                                </td>
                                                <td headers="ColumnPrice" role="cell" data-label="Price">
                                                    <CurrencyConvert amount={parseInt(product.price)} />
                                                    </td>
                                                <td headers="ColumnQuantity" role="cell" data-label="Quantity">{item.qty}</td>
                                                <td headers="ColumnTotal" role="cell" data-label="Total"><CurrencyConvert amount={parseInt(item.total)} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot role="rowgroup">
                                <tr role="row">
                                    <td id="RowSubtotal" role="rowheader" scope="row" colSpan="4">
                                        {t("Subtotal")}
                                    </td>
                                    <td headers="RowSubtotal" role="cell" data-label="Subtotal"><span className="money"><CurrencyConvert amount={parseInt(order.total)} /></span></td>
                                </tr><tr role="row">
                                    <td id="RowShipping" role="rowheader" scope="row" colSpan="4">{t("International_Shipping")}</td>
                                    <td headers="RowShipping" role="cell" data-label="Shipping (International Shipping)"><span className="money"><CurrencyConvert amount={parseInt(order.shipping_cost)} /></span></td>
                                </tr><tr role="row">
                                    <td id="RowTotal" role="rowheader" scope="row" colSpan="3">{t("Order_Table_Total")}</td>
                                    <td headers="RowTotal" role="cell" colSpan="2" data-label="Total"><span className="money"><CurrencyConvert amount={parseInt(order.sum_cost)} /></span></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className={styles.order_content_right}>
                        <div>
                            <h2>{t("Billing_Address")}</h2>
                            <p>
                                <strong>{t("Payment_Status")}: </strong>
                                {t(order.payment_status)}
                            </p>
                            <p>{user.firstname} {user.lastname} <br /> {user.address}</p>
                        </div>
                        <div>
                            <h2>{t("Shipping_Address")}</h2>
                            <p>
                                <strong>{t("Shipping_Status")}: </strong>
                                {t(order.fulfillment_status)}
                            </p>
                            <p>{user.firstname}  {user.lastname}<br /> {user.address}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{t("AccountOrder_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className="customer order order-layout">
                    <div className="container">
                        <div className='row'>
                            <div className={`${styles.addresses_redirect_message} ${(loginSuccess === 1) ? 'account-show' : 'hidden'}`}>
                                <h2 className={styles.account_notify}>{ordertext ? t("Not_Owner_Order") : t("Logged_in_Notify2")}</h2>
                            </div>
                            {(loginSuccess === 2) ? showOrder() : ''}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}