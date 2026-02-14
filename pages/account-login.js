import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import { useAtom } from 'jotai'

import { userLoggedData } from '../components/ultils/Store'
import useTranslation from '../components/ultils/useTranslation'
import base64 from 'base-64'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/AccountPage.module.css'
import Account from '../data/Account.json';

export default function AccountPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const ref_email = useRef(null);
    const ref_email_reset = useRef(null);    
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginSuccess, setLoginSuccess] = useState(false);
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-account-login');
    }
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('yam-user')) != null) {
            setLoginSuccess(true);
            const timer = setInterval(() => {
                router.push("/account")
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [userlogged, router]);

    const [loginError, setLoginError] = useState(null);
    const [resetNotify, setResetNotify] = useState(null);
    const [callReset, setCallReset] = useState(false);
    const [logindata, setLoginData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = logindata;
    const [resetEmail, setResetEmail] = useState('');
    const [textStatus, setTextStatus] = useState(t("Sign_In"));
    const [classStatus, setClassStatus] = useState('');

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const loginInputChange = e => {
        setLoginData({ ...logindata, [e.target.name]: [e.target.value] });
    }

    function loginSubmit(e) {
        e.preventDefault();
        if (!isValidEmail(logindata.email)) {
            setLoginError(t("Email_is_invalid"));
            ref_email.current.focus();
        } else {
            setLoginError(null);
            const findemail = Account.findIndex(a => (a.email === String(logindata.email)));
            if (findemail >= 0) {
                const ramdomtext = Account[findemail].randomtext;
                const encodepass = base64.encode(logindata.password + '' + ramdomtext);
                const token = base64.encode(logindata.email + '' + ramdomtext + '' + encodepass);
                const findAccount = Account.findIndex(a => (a.email === String(logindata.email) && a.password === encodepass && a.accessToken === token));
                if (findemail >= 0) {
                    setTextStatus(t("Checking"));
                    setClassStatus("submit_loading");
                    setTimeout(() => {
                        setTextStatus(t("Completed"));
                        setClassStatus("submit_complete");
                        setTimeout(() => {
                            setClassStatus('');                            
                            setLoginSuccess(true);
                            const accountObject = { "email": Account[findAccount].email, "name": Account[findAccount].firstname, "avatar": Account[findAccount].avatar, "token": token }
                            localStorage.setItem('yam-user', JSON.stringify(accountObject));
                            setuserlogged(accountObject);
                        }, 500);
                    }, 1500);
                } else {
                    setLoginError(t("Email_incorrect"));                    
                }
            } else {
                setLoginError(t("Email_incorrect"));                
            }
        }
    }

    const resetInputChange = e => {
        setResetEmail(e.target.value);
    }

    function resetSubmit(e) {
        e.preventDefault();
        if (!isValidEmail(resetEmail)) {
            setResetNotify(t("Email_is_invalid"));
            ref_email_reset.current.focus();
        } else {
            setTextStatus(t("Checking"));
            setClassStatus("submit_loading");
            setTimeout(() => {
                setTextStatus(t("Completed"));
                setClassStatus("submit_complete");
                setTimeout(() => {
                    setResetNotify(t("Reset_Success"));                    
                }, 500);
            }, 1500);
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
                                <div className={styles.customers_login__layout}>
                                    <div className="customers-login__content">
                                        <div id="customers-login" className={`login ${loginSuccess ? 'hidden' : 'show'}`}>
                                            <div className={`customer ${styles.login_customer} ${callReset ? 'hidden' : 'show'}`}>
                                                <h2 className={styles.customers_layout_customer_h2}>{t("Login")}</h2>
                                                <form method="post" className={styles.customer_form} acceptCharset="UTF-8" noValidate="novalidate" onSubmit={(e) => loginSubmit(e)}>
                                                    <input type="hidden" name="form_type" defaultValue="customer_login" />
                                                    <input type="hidden" name="utf8" defaultValue="✓" />
                                                    <div className={`${styles.customer_field} field`}>
                                                        <input type="email" name="email" className={`${styles.customer_field_input} account-field`} value={email} placeholder={`${t("typing")}:yam@gmail.com`} ref={ref_email} onChange={loginInputChange} />
                                                        <label className="field__label" htmlFor="email">
                                                            {`${t("typing")}:yam@gmail.com`}
                                                        </label>
                                                    </div>
                                                    <div className={`${styles.customer_field} field`}>
                                                        <input type="password" name="password" className={`${styles.customer_field_input} account-field`} value={password} placeholder={`${t("typing")}:123456789`} onChange={loginInputChange} />
                                                        <label className="field__label" htmlFor="password">
                                                            {`${t("typing")}:123456789`}
                                                        </label>
                                                    </div>
                                                    <span className='login-errortext'>{loginError}</span>
                                                    <div className={`${styles.customer_action_bottom} action_bottom`}>
                                                        <button type="submit" className={`button account-login-submit ${classStatus}`}>{textStatus}</button>
                                                        <a className={`${styles.customer_action_link} action-link`} onClick={(e) => { e.preventDefault(); setCallReset(current => !current); setTextStatus(t("Sign_In")); }}>{t("Forgot_your_password")}</a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div id="customers-recover-password" className={`reset ${loginSuccess ? 'hidden' : 'show'}`}>
                                            <div className={`customer ${styles.login_customer} ${callReset ? 'show' : 'hidden'}`}>
                                                <h2 className={styles.customers_layout_customer_h2}>{t("Reset_Password")}</h2>
                                                <p className={styles.customer_note}>{t("Reset_note")}</p>
                                                <form method="post" className={styles.customer_form} acceptCharset="UTF-8" onSubmit={(e) => resetSubmit(e)}>
                                                    <input type="hidden" name="form_type" value="recover_customer_password" />
                                                    <input type="hidden" name="utf8" value="✓" />
                                                    <div className={`${styles.customer_field} field`}>
                                                        <input type="email" value={resetEmail} name="email" id="RecoverEmail" className={`${styles.customer_field_input} account-field`} placeholder={t("Email")} ref={ref_email_reset} onChange={resetInputChange} />
                                                        <label htmlFor="RecoverEmail">
                                                            {t("Email")}
                                                        </label>
                                                    </div>
                                                    <span className='login-errortext'>{resetNotify}</span>
                                                    <div className={`${styles.customer_action_bottom} action_bottom`}>
                                                        <button type="submit" className={`button account-login-submit ${classStatus}`}>{textStatus}</button>
                                                        <span className={styles.customer_note}>
                                                            <span className={styles.customer_note_or}>{t("or")} </span>
                                                            <a className={`${styles.customer_action_link} action-link`} onClick={(e) => { e.preventDefault(); setCallReset(current => !current); setTextStatus(t("Sign_In")); }}>{t("Cancel")}</a>
                                                        </span>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className={`${styles.redirect_message} ${loginSuccess ? 'show' : 'hidden'}`}>
                                            <h2>{t("Logged_in_Notify3")}</h2>
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