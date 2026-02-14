import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from "next/router";
import { userLoggedData } from '../components/ultils/Store'
import { useAtom } from 'jotai'

import useTranslation from '../components/ultils/useTranslation'
import Account from '../data/Account.json';
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/AccountPage.module.css'

export default function AccountPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginSuccess, setLoginSuccess] = useState(0);
    const [user, setUser] = useState(userlogged);
    const [updatetext, setUpdatetext] = useState("");
    const [updateData, setUpdateData] = useState({
        update_firstname: "",
        update_lastname: "",
        update_email: "",
        update_phone: "",
        update_address: ""
    });
    const [textStatus, setTextStatus] = useState(t("Update_Information"));
    const [classStatus, setClassStatus] = useState('');

    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-account-edit');
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
            setLoginSuccess(2);
            const findemail = Account.findIndex(a => (a.email === String(data.email)));
            if (findemail === 0) {
                setUser(Account[findemail]);
                setUpdateData({
                    update_firstname: Account[findemail].firstname,
                    update_lastname: Account[findemail].lastname,
                    update_email: Account[findemail].email,
                    update_phone: Account[findemail].phone,
                    update_address: Account[findemail].address
                })
            }
        }
    }, [router, userlogged]);
    useEffect(() => { }, [userlogged, user, updateData]);
    const { update_firstname, update_lastname, update_email, update_phone, update_address } = updateData;

    const udpateInputChange = e => {
        setUpdateData({ ...updateData, [e.target.name]: [e.target.value] });
        setUpdatetext("");
    }
    function updateSubmit(e) {
        e.preventDefault();
        setTextStatus(t("Checking"));
        setClassStatus("submit_loading");
        setTimeout(() => {
            setTextStatus(t("Completed"));
            setClassStatus("submit_complete");
            setTimeout(() => {
                setUpdatetext(t("Save_Information"));
                setTextStatus(t("Update_Information"));
                setClassStatus("");
            }, 500);
        }, 1500);
    }
    return (
        <>
            <Head>
                <title>{t("AccountEdit_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className="address-layout addresses">
                    <div className="container">
                        <div className='row'>
                            <div className={styles.address_content}>
                                <div className={`${(loginSuccess === 2) ? 'account-show' : 'hidden'}`}>
                                    <h2>{t("Breadcrumb_Edit")}</h2>
                                    <form method="post" id="address_form_new" className={styles.address_form} acceptCharset="UTF-8" onSubmit={(e) => updateSubmit(e)}>
                                        <input type="hidden" name="form_type" value="customer_address" />
                                        <input type="hidden" name="utf8" value="✓" />
                                        <div className={`${styles.address_field} field`}>
                                            <input className={`${styles.address_field_input} field__input`} type="text" name="update_firstname" id="update_firstname" value={update_firstname} placeholder={t("First_name")} onChange={udpateInputChange} />
                                            <label className="field__label" htmlFor="update_firstname">
                                                {t("First_name")}
                                            </label>
                                        </div>
                                        <div className={`${styles.address_field} field`}>
                                            <input className={`${styles.address_field_input} field__input`} type="text" name="update_last_name" value={update_lastname} id="update_last_name" placeholder={t("Last_name")} onChange={udpateInputChange} />
                                            <label className="field__label" htmlFor="update_last_name">
                                                {t("Last_name")}
                                            </label>
                                        </div>
                                        <div className={`${styles.address_field} field`}>
                                            <input className={`${styles.address_field_input} field__input`} type="email" name="update_email" id="update_email" disabled="disabled" value={update_email} placeholder={t("Email")} />
                                            <label className="field__label" htmlFor="update_email">
                                                {t("Email")}
                                            </label>
                                        </div>
                                        <div className={`${styles.address_field} field`}>
                                            <input className={`${styles.address_field_input} field__input`} type="text" name="update_phone" id="update_phone" value={update_phone} placeholder={t("Phone")} onChange={udpateInputChange} />
                                            <label className="field__label" htmlFor="update_phone">
                                                {t("Phone")}
                                            </label>
                                        </div>
                                        <div className={`${styles.address_field} field`}>
                                            <input className={`${styles.address_field_input} field__input`} type="text" name="update_address" id="update_address" value={update_address} placeholder={t("Address")} onChange={udpateInputChange} />
                                            <label className="field__label" htmlFor="update_address">
                                                {t("Address")}
                                            </label>
                                        </div>
                                        <span className={styles.address_update_text}>{updatetext}</span>
                                        <div className={`${styles.address_action_bottom} action_bottom`}>
                                            <button type="submit" className={`${styles.address_form_button} ${classStatus} button account-login-submit`}>
                                                {textStatus}
                                            </button>
                                            <Link href="/account" className={`${styles.address_action_link} action-link`}>
                                                {t("Back_Account")}
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className={`${styles.addresses_redirect_message} ${(loginSuccess === 1) ? 'account-show' : 'hidden'}`}>
                                    <h2 className={styles.account_notify}>{t("Logged_in_Notify2")}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}