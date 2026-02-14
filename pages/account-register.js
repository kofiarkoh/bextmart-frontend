import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import { useAtom } from 'jotai'
import base64 from 'base-64'

import { userLoggedData } from '../components/ultils/Store'
import useTranslation from '../components/ultils/useTranslation'
import { randomString } from '../components/ultils/Tools'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/AccountPage.module.css'
import Account from '../data/Account.json';

export default function AccountPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const ref_email = useRef(null);
    const ref_pass = useRef(null);    
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [textStatus, setTextStatus] = useState(t("Create_account"));
    const [classStatus, setClassStatus] = useState('');
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-account-register');
    }
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('yam-user')) != null) {
            setLoginSuccess(true);
            setRegisterSuccess(t("Logged_in_Notify3"));
            const timer = setInterval(() => {
                router.push("/account")
            }, 500);
            return () => {
                clearInterval(timer);
            };
        }
    }, [userlogged, router, t]);

    const [registerdata, setRegisterData] = useState({
        first_name: "",
        last_name: "",
        register_email: "",
        register_password: ""
    });
    const { first_name, last_name, register_email, register_password } = registerdata;

    const registerInputChange = e => {
        setRegisterData({ ...registerdata, [e.target.name]: [e.target.value] });
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function isValidPassword(pass) {
        return /\S+@\S+\.\S+/.test(pass);
    }
    function registerSubmit(e) {
        e.preventDefault();
        if (isValidEmail(registerdata.register_email)) {
            const findemail = Account.findIndex(a => (a.email === String(registerdata.register_email)));
            if (findemail === -1) {
                if (String(registerdata.register_password).length > 7) {
                    setTextStatus(t("Checking"));
                    setClassStatus("submit_loading");
                    setTimeout(() => {
                        setTextStatus(t("Completed"));
                        setClassStatus("submit_complete");
                        setTimeout(() => {
                            setClassStatus('');
                            setRegisterError(null);
                            const ramdomtext = randomString(15);
                            const encodepass = base64.encode(registerdata.register_password + '' + ramdomtext);
                            const token = base64.encode(registerdata.register_email + '' + ramdomtext + '' + encodepass);
                            const avatar = '/assets/images/avatar.png';
                            setLoginSuccess(true);
                            const accountObject = { "email": registerdata.register_email, "firstname": registerdata.first_name, "avatar": avatar, "token": token }
                            localStorage.setItem('yam-user', JSON.stringify(accountObject));
                            setuserlogged(accountObject);
                            setRegisterSuccess(t("Logged_in_Notify"));
                        }, 500);
                    }, 1500);
                } else {
                    setRegisterError(t("Password_at_least_7"));
                    ref_pass.current.focus();
                }
            } else {
                setRegisterError(t("Password_exited"));
                ref_email.current.focus();
            }
        } else {
            setRegisterError(t("Email_is_invalid"));
            ref_email.current.focus();
        }

    }
    return (
        <>
            <Head>
                <title>{t("Register_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className={styles.customers_layout}>
                    <div className="container">
                        <div className="row">
                            <div className={styles.customers_content}>
                                <div className={styles.customers_register__layout}>
                                    <div className="customers-register__content">
                                        <div id="customers-register" className={`${styles.register_customer} ${loginSuccess ? 'hidden' : 'show'}`}>
                                            <h2 className={styles.customers_layout_customer_h2}>{t("Create_account")}</h2>
                                            <form method="post" className={styles.customer_form} id="customer_register" acceptCharset="UTF-8" noValidate="novalidate" onSubmit={(e) => registerSubmit(e)}>
                                                <input type="hidden" name="form_type" defaultValue="create_customer" />
                                                <input type="hidden" name="utf8" defaultValue="✓" />
                                                <div className={`${styles.customer_field} ${styles.customers_register_field}  field`}>
                                                    <input className={`${styles.customer_field_input} field__input`} type="text" name="first_name" id="first_name" value={first_name} placeholder={t("First_name")} onChange={registerInputChange} />
                                                    <label className="field__label" htmlFor="first_name">
                                                        {t("First_name")}
                                                    </label>
                                                </div>
                                                <div className={`${styles.customer_field} ${styles.customers_register_field}  field`}>
                                                    <input className={`${styles.customer_field_input} field__input`} type="text" name="last_name" value={last_name} id="last_name" placeholder={t("Last_name")} onChange={registerInputChange} />
                                                    <label className="field__label" htmlFor="last_name">
                                                        {t("Last_name")}
                                                    </label>
                                                </div>
                                                <div className={`${styles.customer_field} ${styles.customers_register_field}  field`}>
                                                    <input className={`${styles.customer_field_input} field__input`} type="email" name="register_email" id="register_email" value={register_email} placeholder={t("Email")} ref={ref_email} onChange={registerInputChange} />
                                                    <label className="field__label" htmlFor="register_email">
                                                        {t("Email")}
                                                    </label>
                                                </div>
                                                <div className={`${styles.customer_field} ${styles.customers_register_field}  field`}>
                                                    <input className={`${styles.customer_field_input} field__input`} type="password" name="register_password" id="register_password" value={register_password} placeholder={t("Password")} ref={ref_pass} onChange={registerInputChange} />
                                                    <label className="field__label" htmlFor="register_password">
                                                        {t("Password")}
                                                    </label>
                                                </div>
                                                <span className={`register-errortext ${styles.register_errortext}`}>{registerError}</span>
                                                <div className={`${styles.customer_action_bottom} action_bottom`}>
                                                    <button type="submit" className={`button account-login-submit ${classStatus}`}>
                                                        {textStatus}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className={`${styles.redirect_message} ${loginSuccess ? 'show' : 'hidden'}`}>
                                            <h2>{registerSuccess}</h2>
                                        </div>
                                    </div>
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