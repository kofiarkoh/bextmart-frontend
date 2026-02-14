import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import Popup from "reactjs-popup";
import useTranslation from './useTranslation'
import { languageName, randomString } from './Tools'
import { useAtom } from 'jotai'
import base64 from 'base-64'
import Account from '../../data/Account.json';
import { userLoggedData, storecurrency, storecurrencySymbol } from './Store'
import CurrencyData from '../../data/Currency.json';

import { SVGMore, SVGClose, SVGHeart, SVGRefresh, SVGPhone, SVGLocation } from '../../public/assets/SVG';

const DrawerMobileMore = () => {
    const { t, locale } = useTranslation();
    const languagename = languageName(locale);
    const [isOpen, setIsOpen] = useState(false);
    const [firstTab, setfirstTab] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => setOpenModal(false);

    // Login
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [logindata, setLoginData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = logindata;
    const ref_email_login = useRef(null);
    const [textStatus, setTextStatus] = useState(t("Sign_In"));
    const [classStatus, setClassStatus] = useState('');

    useEffect(() => {
        if (userlogged.email != undefined || userlogged.email != null) { setLoginSuccess(true) }
    }, [userlogged]);

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
            ref_email_login.current.focus();
        } else {
            setLoginError(null);
            const findemail = Account.findIndex(a => (a.email === String(logindata.email)));
            if (findemail >= 0) {
                const ramdomtext = Account[findemail].randomtext;
                const encodepass = base64.encode(logindata.password + '' + ramdomtext);
                const token = base64.encode(logindata.email + '' + ramdomtext + '' + encodepass);
                const findAccount = Account.findIndex(a => (a.email === String(logindata.email) && a.password === encodepass && a.accessToken === token));
                if (findAccount >= 0) {
                    setTextStatus(t("Checking"));
                    setClassStatus("submit_login_loading");
                    setTimeout(() => {
                        setTextStatus(t("Completed"));
                        setClassStatus("submit_login_complete");
                        setTimeout(() => {
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

    // Register
    const ref_email_register = useRef(null);
    const ref_pass_register = useRef(null);
    const [textRegisterStatus, setTextRegisterStatus] = useState(t("Create_account"));
    const [classRegisterStatus, setClassRegisterStatus] = useState('');
    const [registerError, setRegisterError] = useState(null);
    const [registerdata, setRegisterData] = useState({
        first_name_box: "",
        last_name_box: "",
        register_email_box: "",
        register_password_box: ""
    });
    const { first_name_box, last_name_box, register_email_box, register_password_box } = registerdata;

    const registerInputChange = e => {
        setRegisterData({ ...registerdata, [e.target.name]: [e.target.value] });
    }

    function isValidPassword(pass) {
        return /\S+@\S+\.\S+/.test(pass);
    }

    function registerSubmit(e) {
        e.preventDefault();
        if (isValidEmail(registerdata.register_email_box)) {
            const findemail = Account.findIndex(a => (a.email === String(registerdata.register_email_box)));
            if (findemail === -1) {
                if (String(registerdata.register_password_box).length > 7) {
                    setTextRegisterStatus(t("Checking"));
                    setClassRegisterStatus("submit_login_loading");
                    setTimeout(() => {
                        setTextRegisterStatus(t("Completed"));
                        setClassRegisterStatus("submit_login_complete");
                        setTimeout(() => {
                            setRegisterError(null);
                            const ramdomtext = randomString(15);
                            const encodepass = base64.encode(registerdata.register_password_box + '' + ramdomtext);
                            const token = base64.encode(registerdata.register_email_box + '' + ramdomtext + '' + encodepass);
                            const avatar = '/assets/images/avatar.png';
                            setLoginSuccess(true);
                            const accountObject = { "email": registerdata.register_email_box, "name": registerdata.first_name_box, "avatar": avatar, "token": token }
                            localStorage.setItem('yam-user', JSON.stringify(accountObject));
                            setuserlogged(accountObject);
                        }, 500);
                    }, 1500);
                } else {
                    setRegisterError(t("Password_at_least_7"));
                    ref_pass_register.current.focus();
                }
            } else {
                setRegisterError(t("Password_exited"));
                ref_email_register.current.focus();
            }
        } else {
            setRegisterError(t("Email_is_invalid"));
            ref_email_register.current.focus();
        }

    }

    function logout(e) {
        e.preventDefault();
        setTextStatus(t("Sign_In"));
        setClassStatus("");
        setTextRegisterStatus(t("Create_account"));
        setClassRegisterStatus("");
        setLoginSuccess(false);
        localStorage.removeItem('yam-user');
    }

    // Currency 
    const [currency, setCurrency] = useAtom(storecurrency);
    const [currencySymbol, setCurrencySymbol] = useAtom(storecurrencySymbol);
    useEffect(() => {
        const currencyStored = JSON.parse(localStorage.getItem('yam-currency'));
        if (currencyStored === null) {
            const currencyData = {
                currency: currency,
                symbol: currencySymbol
            }
            localStorage.setItem('yam-currency', JSON.stringify(currencyData));
        } else {
            setCurrency(currencyStored.currency);
            setCurrencySymbol(currencyStored.symbol);
        }
    }, [currency, currencySymbol, setCurrency, setCurrencySymbol]);
    //useEffect(() => { }, [currency, currencySymbol]);

    function changeCurrency(code, symbol) {
        setCurrency(code);
        setCurrencySymbol(symbol);
        const currencyData = {
            currency: code,
            symbol: symbol
        }
        localStorage.setItem('yam-currency', JSON.stringify(currencyData));
    }

    function renderLoginContent() {
        return (
            <div className={`account-login`}>
                <tab-component>
                    <ul className="nav-tabs__title no-bullet">
                        <li className={`tabs-title ${firstTab ? 'is-active' : ''}`} onClick={() => setfirstTab(true)}>
                            {t("Sign_In")}
                        </li>
                        <li className={`tabs-title ${firstTab ? '' : 'is-active'}`} onClick={() => setfirstTab(false)}>
                            {t("Register")}
                        </li>
                    </ul>
                    <div className="nav-tabs__content">
                        <div className={`tab-content ${firstTab ? 'is-active' : ''}`} id="tab-header-login" data-tabs-panel="">
                            <form method="post" id="customer_login_boxmobile" acceptCharset="UTF-8" noValidate="novalidate" onSubmit={(e) => loginSubmit(e)}>
                                <input type="hidden" name="form_type" defaultValue="customer_login" />
                                <input type="hidden" name="utf8" defaultValue="✓" />
                                <div className="field">
                                    <input className="field__input" type="email" name="email" id="LoginFormBox-Email" ref={ref_email_login} value={email} placeholder={`${t("typing")}:yam@gmail.com`} onChange={loginInputChange} />
                                    <label className="field__label" htmlFor="LoginFormBox-Email">
                                        {`${t("typing")}:yam@gmail.com`}
                                    </label>
                                </div>
                                <div className="field">
                                    <input className="field__input" type="password" value={password} name="password" id="LoginFormBox-Password" placeholder={`${t("typing")}:123456789`} onChange={loginInputChange} />
                                    <label className="field__label" htmlFor="password">
                                        {`${t("typing")}:123456789`}
                                    </label>
                                </div>
                                <Link href="/account-login" className="account-login-recover">
                                    {t("Forgot_your_password")}?</Link>
                                <span className='login-errortext'>{loginError}</span>
                                <div className="sign-in_create-account">
                                    <button type="submit" className={`button account-login-submit ${classStatus}`}>{textStatus}</button>
                                </div>
                            </form>
                        </div>
                        <div className={`tab-content ${firstTab ? '' : 'is-active'}`} id="tab-header-register" data-tabs-panel="">
                            <form method="post" id="customer_register_box" acceptCharset="UTF-8" noValidate="novalidate" onSubmit={(e) => registerSubmit(e)}>
                                <input type="hidden" name="form_type" defaultValue="create_customer" />
                                <input type="hidden" name="utf8" defaultValue="✓" />
                                <div className="field">
                                    <input className="field__input" type="text" name="first_name_box" id="first_name_box" value={first_name_box} placeholder={t("First_name")} onChange={registerInputChange} />
                                    <label className="field__label" htmlFor="first_name_box">
                                        {t("First_name")}
                                    </label>
                                </div>
                                <div className="field">
                                    <input className="field__input" type="text" name="last_name_box" value={last_name_box} id="last_name_box" placeholder={t("Last_name")} onChange={registerInputChange} />
                                    <label className="field__label" htmlFor="last_name_box">
                                        {t("Last_name")}
                                    </label>
                                </div>
                                <div className="field">
                                    <input className="field__input" type="email" name="register_email_box" ref={ref_email_register} id="register_email_box" value={register_email_box} placeholder={t("Email")} onChange={registerInputChange} />
                                    <label className="field__label" htmlFor="register_email_box">
                                        {t("Email")}
                                    </label>
                                </div>
                                <div className="field">
                                    <input className="field__input" type="password" name="register_password_box" ref={ref_pass_register} id="register_password_box" value={register_password_box} placeholder={t("Password")} onChange={registerInputChange} />
                                    <label className="field__label" htmlFor="register_password_box">
                                        {t("Password")}
                                    </label>
                                </div>
                                <span className='register-errortext'>{registerError}</span>
                                <div className="action_bottom">
                                    <button type="submit" className={`button account-login-submit ${classRegisterStatus}`}>
                                        {textRegisterStatus}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </tab-component>
            </div>
        )
    }

    function renderAccountInfo() {
        let avatar = "/assets/images/avatar.png";
        if (userlogged.avatar != "" && userlogged.avatar != undefined) avatar = userlogged.avatar;
        return (
            <div className={`account-logged`}>
                <div className="account-avatar">
                    <Link href="/account">
                        <Image src={avatar} alt='' width={100} height={100} />
                    </Link>
                </div>
                <div className='name'>{t("Hi")} {userlogged.firstname}!</div>
                <div className='account-links'>
                    <Link href="/account" className="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                        {t("My_Account")}
                    </Link>
                    <Link href="#" className="menu-drawer__menu-item list-menu__item link link--text focus-inset" onClick={(e) => logout(e)}>
                        {t("Logout")}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`cartdrawer ${isOpen ? 'menu-opening' : ''}`}>
                <div className="cartsummary header__icon header__icon--account header__icon--summary link focus-inset header-drawer__toggle">
                    <div className="drawer__toggle-icon" onClick={(e) => { e.preventDefault(); setIsOpen(current => !current); }}>
                        <SVGMore />
                    </div>
                </div>
                <div className="header-drawer__inner header-drawer__right">
                    <div className="header-drawer__overlay" onClick={() => setIsOpen(false)}></div>
                    <div className="header-drawer_content account-drawer__content">
                        <div className="header-drawer__title">
                            <h3 className="drawer--title">{t("More_Information")}</h3>
                            <button type="button" className="drawer__close-button link link--text focus-inset" onClick={() => setIsOpen(false)}>
                                <SVGClose />
                            </button>
                        </div>
                        <div className="header-drawer__content">
                            <div className="header-drawer__scroll">
                                <div className={`account-drawer__tab ${loginSuccess ? 'logged' : 'guess'}`}>
                                    {
                                        loginSuccess ? renderAccountInfo() : renderLoginContent()
                                    }
                                </div>
                                <ul className="menu-drawer__wish-compare list-menu" role="list">
                                    <li className="menu--wish-compare__root">
                                        <Link href="/page-wishlist" className="menu--wish-compare__item">
                                            <SVGHeart />
                                            <span className="menu--wish-compare__title">{t("Wishlist")}</span>
                                        </Link>
                                    </li>
                                    <li className="menu--wish-compare__root">
                                        <Link href="/page-compare" className="menu--wish-compare__item">
                                            <SVGRefresh />
                                            <span className="menu--wish-compare__title">{t("Compare")}</span>
                                        </Link>
                                    </li>
                                    <li className="menu--wish-compare__root">
                                        <Link href="/page-contact" className="header__menu-text2 menu--wish-compare__item">
                                            {t("Help")}
                                        </Link>
                                    </li>
                                    <li className="menu--wish-compare__root">
                                        <Link href="/blog" className="header__menu-text2 menu--wish-compare__item">
                                            {t("Blog")}
                                        </Link>
                                    </li>
                                </ul>
                                <ul role="list" className="no-bullet localization-form__list">
                                    {
                                        CurrencyData.map((data, index) => (
                                            <li className={`localization-form__item ${(data.code === currency) ? 'localization-form__active' : ''}`} key={index}>
                                                <span className={`localization-form__link header-currencies`} onClick={() => { changeCurrency(data.code, data.symbol) }}> {data.symbol} {data.code} </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="header__delivery-gr">
                                    <div className="header__delivery">
                                        <div className="header__delivery-icon">
                                            <SVGLocation />
                                        </div>
                                        <div className="header__delivery-text">
                                            <div className="localization-form__content menu__dropdown">
                                                <button type="button" className="localization-form__select dropdown-toggle" data-toggle="HeaderCountryList" onClick={() => setOpenModal(o => !o)}>
                                                    <span className="text">{t("Select_language")}</span>
                                                    <span className="bold" >{languagename}</span>
                                                </button>
                                                <Popup open={openModal} closeOnDocumentClick onClose={closeModal}>
                                                    <div className="modal__layout modal-open mobile-language">
                                                        <div className="modal__close" onClick={closeModal}></div>
                                                        <div className="modal__content">
                                                            <div className="modal__header">
                                                                <span className="modal__close-icon" onClick={closeModal}><SVGClose /></span>
                                                            </div>
                                                            <div className="modal__body">
                                                                <ul id="HeaderCountryList" role="list" className="no-bullet localization-form__list">
                                                                    <li className={`localization-form__item ${(languagename === 'English') ? 'localization-form__active' : ''}`}>
                                                                        <Link className="localization-form__link" href="/en"> English </Link>
                                                                    </li>
                                                                    <li className={`localization-form__item ${(languagename === 'Français') ? 'localization-form__active' : ''}`}>
                                                                        <Link className="localization-form__link" href="/fr"> Français </Link>
                                                                    </li>
                                                                    <li className={`localization-form__item ${(languagename === 'Italiana') ? 'localization-form__active' : ''}`}>
                                                                        <Link className="localization-form__link" href="/it"> Italiana </Link>
                                                                    </li>
                                                                    <li className={`localization-form__item ${(languagename === '日本') ? 'localization-form__active' : ''}`}>
                                                                        <Link className="localization-form__link" href="/jp"> 日本 </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header__delivery">
                                        <div className="header__delivery-icon">
                                            <SVGPhone />
                                        </div>
                                        <div className="header__delivery-text">
                                            <Link href="tel:19006789">
                                                <span className="text">{t("Hotline")}</span> <span className="bold">1900-6789</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DrawerMobileMore;