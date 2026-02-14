import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAtom } from 'jotai'

import { userLoggedData } from '../components/ultils/Store'
import useTranslation from '../components/ultils/useTranslation'
import CurrencyConvert from '../components/ultils/CurrencyConvert'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/AccountPage.module.css'
import Account from '../data/Account.json';

export default function AccountPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginSuccess, setLoginSuccess] = useState(0);
    const [user, setUser] = useState(userlogged);
    const [newuser, setNewUser] = useState(true);
    const [orderCount, setOrderCount] = useState(0);
    const [accountNotify, setAccountNotify] = useState('');
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-account-dashboard');
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('yam-user'));
        if (JSON.parse(localStorage.getItem('yam-user')) === null) {
            setLoginSuccess(1);
            setAccountNotify(t("Logged_in_Notify2"));
            const timer = setInterval(() => {
                router.push("/account-login")
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        } else {
            setLoginSuccess(2);
            const findemail = Account.findIndex(a => (a.email === String(data.email)));
            if (findemail === 0) {
                setUser(Account[findemail]);
                setNewUser(false);
                setOrderCount(Account[findemail].orderlist.length);
            }
        }
    }, [router, t]);
    useEffect(() => { }, [loginSuccess, userlogged, user, newuser, orderCount, accountNotify]);

    function renderAccountInfo() {
        let avatar="/assets/images/avatar.png";
        if (user.avatar != "" && user.avatar != undefined) avatar = user.avatar;         
        return (
            <div className={`account-show`}>
                <div className={`${styles.account_content__info_div} account-content__info row`}>
                    <div className="account-content__details col-sm-6">
                        <h3 className={styles.account_details__title}>{t("Account_details")}</h3>
                        <div className="account-details__content">
                            <div className={styles.account_details__item}>
                                <span className={styles.details_item__title}>{t("Name")}:</span>
                                <span className={styles.details_item__content}>{user.firstname} {user.lastname}</span>
                            </div>
                            <div className={styles.account_details__item}>
                                <span className={styles.details_item__title}>{t("Email")}:</span>
                                <span className={styles.details_item__content}>{user.email}</span>
                            </div>
                            <div className={styles.account_details__item}>
                                <span className={styles.details_item__title}>{t("Address")}:</span>
                                <span className={styles.details_item__content}>{user.address}</span>
                            </div>
                            <div className={styles.account_details__item}>
                                <span className={styles.details_item__title}>{t("Phone")}:</span>
                                <span className={styles.details_item__content}>{user.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.account_content__info_div} account-content__link col-sm-6`}>
                        <h3 className={styles.account_link__title}>{newuser ? t("My_Account_info2") : t("My_Account_info")}</h3>
                        <div className={styles.account_link__content}>
                            <div className='row'>
                                <div className='account-avatar col-sm-12 col-md-4 col-sm-4'>
                                    <Image src={avatar} alt='' width={100} height={100} />
                                </div>
                                <ul className="account-link__list col-sm-12 col-md-6 col-sm-6">
                                    <li className={styles.account_link__item}>
                                        <span onClick={(e) => logout(e)} className={styles.account_link__item_a}>
                                            {t("Logout")}
                                        </span>
                                    </li>
                                    <li className={styles.account_link__item}>
                                        <Link href="/account-edit" className={styles.account_link__item_a}>
                                            {t("My_Account_edit")}
                                        </Link>
                                    </li>
                                    <li className={styles.account_link__item}>
                                        <Link href="/page-wishlist" className={styles.account_link__item_a}>
                                            {t("Wishlist")}
                                        </Link>
                                    </li>
                                    <li className={styles.account_link__item}>
                                        <Link href="/page-compare" className={styles.account_link__item_a}>
                                            {t("Compare")}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="account-content__orders">
                    <div className={styles.account_orders__content}>
                        {
                            (orderCount > 0) ? listorder() : t("No_order")
                        }
                    </div>
                </div>
            </div>
        )
    }

    function renderNotify() {
        return (
            <div className={`redirect-message account-show`}>
                <h2 className={styles.account_notify}>{accountNotify}</h2>
            </div>
        )
    }

    function listorder() {
        return (
            <table className={styles.account_orders_table}>
                <thead>
                    <tr>
                        <th className="order_number">{t("Order")}</th>
                        <th className="date">{t("Date")}</th>
                        <th className="payment_status">{t("Payment_status")}</th>
                        <th className="fulfillment_status">{t("Fulfillment_status")}</th>
                        <th className="total">{t("Total")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.orderlist.map((item, index) => (
                            <tr className="odd " key={index}>
                                <td className="td-name"><Link href={`/account-order?order=${item.order_id}`}>#{item.order_id}</Link></td>
                                <td className="td-note"><span className="note">{item.date}</span></td>
                                <td className="td-authorized"><span className="status_authorized">{t(item.payment_status)}</span></td>
                                <td className="td-unfulfilled"><span className="status_fulfilled">{t(item.fulfillment_status)}</span></td>
                                <td className="td-total"><span className="total money"><CurrencyConvert amount={parseInt(item.total)} /></span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    function logout(e) {
        e.preventDefault();
        setLoginSuccess(1);
        localStorage.removeItem('yam-user');
        setuserlogged({});
        setAccountNotify(t("Logged_in_Notify4"));
        setTimeout(() => {
            if (router.pathname === '/account') router.push("/");
        }, 1000);
    }

    return (
        <>
            <Head>
                <title>{t("Account_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className={styles.account_layout}>
                    <div className="container">
                        <div className={styles.account_content}>
                            {
                                (loginSuccess === 2) ? renderAccountInfo() : ''
                            }
                            {
                                (loginSuccess === 1) ? renderNotify() : ''
                            }
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </>
    )
}