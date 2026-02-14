import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useAtom } from 'jotai'
import base64 from 'base-64'
import Account from '../../data/Account.json';
import { userLoggedData } from './Store'
import useTranslation from './useTranslation'
import { SVGArrowDown } from '../../public/assets/SVG';
import { useRouter } from "next/router";

const LoginDropdown = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const ref_email = useRef(null);
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [logindata, setLoginData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = logindata;
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
            ref_email.current.focus();
        } else {
            setLoginError(null);
            const findemail = Account.findIndex(a => (a.email === String(logindata.email)));
            if (findemail >= 0) {
                const ramdomtext = Account[findemail].randomtext;
                const encodepass = base64.encode(logindata.password + '' + ramdomtext);
                const token = base64.encode(logindata.email + '' + ramdomtext + '' + encodepass);
                const findAccount = Account.findIndex(a => (a.email === String(logindata.email) && a.password === encodepass && a.accessToken === token));
                //console.log(findAccount + '>>' + logindata.email + ">>" + encodepass + '>>' + token);
                if (findAccount >= 0) {
                    setTextStatus(t("Checking"));
                    setClassStatus("submit_loading");
                    setTimeout(() => {
                        setTextStatus(t("Completed"));
                        setClassStatus("submit_complete");
                        setTimeout(() => {
                            setLoginSuccess(true);
                            const accountObject = { "email": Account[findAccount].email, "firstname": Account[findAccount].firstname, "avatar": Account[findAccount].avatar, "token": token }
                            localStorage.setItem('yam-user', JSON.stringify(accountObject));
                            setuserlogged(accountObject);
                        }, 800);
                    }, 800);
                } else {
                    setLoginError(t("Email_incorrect"));
                }
            } else {
                setLoginError(t("Email_incorrect"));
            }
        }
    }

    function logout(e) {
        e.preventDefault();
        setTextStatus(t("Sign_In"));
        setClassStatus("");
        setLoginSuccess(false);
        localStorage.removeItem('yam-user');
        setuserlogged({});
        if (router.pathname === '/account') router.push("/");
    }

    function renderLoginContent() {
        return (
            <div className="account-login">
                <form method="post" id="customer_login_box" acceptCharset="UTF-8" noValidate="novalidate" onSubmit={(e) => loginSubmit(e)}>
                    <input type="hidden" name="form_type" defaultValue="customer_login" />
                    <input type="hidden" name="utf8" defaultValue="✓" />
                    <input type="email" name="email" className="account-field " value={email} ref={ref_email} placeholder={`${t("typing")}:yam@gmail.com`} onChange={loginInputChange} />
                    <input type="password" name="password" className="account-field " value={password} placeholder={`${t("typing")}:123456789`} onChange={loginInputChange} />
                    <div className="sign-in_create-account">
                        <button type="submit" className={`button account-login-submit ${classStatus}`}>{textStatus}</button>
                    </div>
                    <Link href="/account-login" className="account-login-recover">&gt; {t("Forgot_your_password")}</Link>
                    <Link href="/account-register">&gt; {t("Create_account")}</Link>
                </form>
                <span className='login-errortext'>{loginError}</span>
            </div>
        )
    }

    function renderAccountInfo() {
        let avatar="/assets/images/avatar.png";
        if (userlogged.avatar != "" && userlogged.avatar != undefined) avatar = userlogged.avatar;         
        return (
            <div className="account-logged">
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
            <li className='top-header__menu-root header__menu-account menu__dropdown'>
                <Link href={loginSuccess ? "/account" : "/account-login"} className='dropdown-toggle top-header__menu-item list-menu__item'>
                    {loginSuccess ? t("My_Account") : t("Sign_In")}
                    <SVGArrowDown />
                </Link>
                <ul className={`header__menu-login no-bullet dropdown-menu ${loginSuccess ? 'logged' : 'guess'}`}>
                    <li className="header__menu-login-content">
                        {
                            loginSuccess ? renderAccountInfo() : renderLoginContent()
                        }
                    </li>
                </ul>
            </li>
            <li className={`top-header__menu-root header__menu-register ${loginSuccess ? 'hidden' : 'show'}`}>
                <Link href="/account-register">
                    {t("Register")}
                </Link>
            </li>
        </>
    )

}
export default LoginDropdown;