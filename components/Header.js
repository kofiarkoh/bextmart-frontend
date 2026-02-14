import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAtom } from 'jotai'

import useTranslation from './ultils/useTranslation'
import Store, { wishlistCount, compareCount, storecurrency, storecurrencySymbol } from './ultils/Store'
import { languageName } from './ultils/Tools'
import LoginDropdown from './ultils/LoginDropdown'
import DrawerMobileMenu from './ultils/DrawerMobileMenu'
import DrawerMobileSearch from './ultils/DrawerMobileSearch'
import DrawerCart from './ultils/DrawerCart'
import DrawerMobileMore from './ultils/DrawerMobileMore'
import AllCategories from './ultils/AllCategories'
import HorizontalMenu from './ultils/HorizontalMenu'

import CurrencyData from '../data/Currency.json';
import Logo from '../public/assets/images/logo.png'
import { SVGArrowDown, SVGSearch, SVGLocation, SVGPhone } from '../public/assets/SVG';

const Header = () => {
    const { t, locale } = useTranslation();
    const languagename = languageName(locale);
    const [currency, setCurrency] = useAtom(storecurrency);
    const [currencySymbol, setCurrencySymbol] = useAtom(storecurrencySymbol);
    const [wlcount] = useAtom(wishlistCount);
    const [cmcount] = useAtom(compareCount);
    const router = useRouter();
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const headerRef = useRef(null);
    const handleScroll = (elTopOffset, elHeight) => {
        if (window.pageYOffset > (elTopOffset + elHeight)) {
            setSticky({ isSticky: true, offset: elHeight });            
        } else {
            setSticky({ isSticky: false, offset: 0 });
        }
    };

    useEffect(() => {
        var header = headerRef.current.getBoundingClientRect();
        const handleScrollEvent = () => {
            handleScroll(header.top, header.height)
        }

        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

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
    // useEffect(() => { }, [currency, currencySymbol]);

    function changeCurrency(code, symbol) {
        setCurrency(code);
        setCurrencySymbol(symbol);
        const currencyData = {
            currency: code,
            symbol: symbol
        }
        localStorage.setItem('yam-currency', JSON.stringify(currencyData));
    }

    return (
        <>
            <header className='layout-header' style={{ marginTop: sticky.offset }}>
                <Store />
                <div className='top-header d-none d-md-block'>
                    <div className='container'>
                        <div className='top-header__content row'>
                            <div className='top-header__content-left col-12 col-sm-12 col-md-12 col-lg-4 col-xl-5 col-xxl-5'>
                                <div className='welcome-text'>
                                    {t("Welcome")}
                                </div>
                            </div>
                            <div className='top-header__content-right col-12 col-sm-12 col-md-12 col-lg-8 col-xl-7 col-xxl-7 d-none d-lg-block'>
                                <nav className='top-header__menu'>
                                    <ul className='top-header__menu-content list-menu--inline no-bullet clearfix'>
                                        <LoginDropdown />
                                        <li className="top-header__menu-root header__menu-currencywrap menu__dropdown">
                                            <div className='dropdown-toggle top-header__menu-item list-menu__item header-currency'>
                                                {currencySymbol} {currency}
                                                <SVGArrowDown />
                                            </div>
                                            <ul className="header__menu-login header__menu-currency no-bullet dropdown-menu">
                                                <li className="header__menu-login-content">
                                                    <ul id="HeaderCountryList" role="list" className="no-bullet localization-form__list">
                                                        {
                                                            CurrencyData.map((data, index) => (
                                                                <li className={`localization-form__item ${(data.code === currency) ? 'localization-form__active' : ''}`} key={index}>
                                                                    <span className="localization-form__link header-currencies" onClick={() => { changeCurrency(data.code, data.symbol) }}> {data.symbol} {data.code} </span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="top-header__menu-root header__wishlist">
                                            <header-wishlist class="header__icon-wishlist main-header__icon-root header__icon-root">
                                                <Link href="/page-wishlist" className="header__icon">
                                                    {t("Wishlist")} (<span aria-hidden="true" className="header__icon-count-bubble">{wlcount}</span>)
                                                </Link>
                                            </header-wishlist>
                                        </li>
                                        <li className="top-header__menu-root header__compare">
                                            <header-compare class="header__icon-compare main-header__icon-root header__icon-root">
                                                <Link href="/page-compare" className="header__icon">
                                                    {t("Compare")}(<span aria-hidden="true" className="header__icon-count-bubble">{cmcount}</span>)
                                                </Link>
                                            </header-compare>
                                        </li>
                                        <li className="top-header__menu-root header__menu-text2">
                                            <Link href="/page-contact">
                                                {t("Help")}
                                            </Link>
                                        </li>
                                        <li className="top-header__menu-root header__menu-text2">
                                            <Link href="/blog">{t("Blog")}</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky-header" className={`navbar${sticky.isSticky ? ' has-sticky' : ''}`} ref={headerRef}>
                    <div className="main-header header-wrapper--border-bottom">
                        <div className="container">
                            <div className="main-header-content row">
                                <div className="mobile-header__left d-block d-lg-none">
                                    <header-drawer data-breakpoint="tablet">
                                        <DrawerMobileMenu />
                                    </header-drawer>
                                    <div className="mobile-header__search header__icon-root">
                                        <DrawerMobileSearch />
                                    </div>
                                </div>
                                <div className="main-header__logo">
                                    <h1 className="header__heading">
                                        <Link href='/' className='header__heading-link link link--text focus-inset'>
                                            <Image className='header__heading-logo d-none d-lg-block' priority="true" alt="Shop logo" src={Logo} />
                                            <Image className='header__heading-logo d-block d-lg-none' priority="true" alt="Shop logo" src={Logo} />
                                        </Link>
                                    </h1>
                                </div>
                                <div className="main-header__right">
                                    <div className="main-header__allcollections d-none d-lg-block">
                                        <AllCategories />
                                    </div>
                                    <div className="main-header__icon">
                                        <div className="header__search d-none d-lg-block">
                                            <div className="search-form">
                                                <form action="/search" method="get" role="search" className="search__form">                                                    
                                                    <input type="text" name="q" className="search_box" placeholder={t("search_inner")} defaultValue={(router.asPath.includes('/search')) ? router.asPath.substring(10) : ''} />
                                                    <button className="search_submit" type="submit" aria-label="icon search">
                                                        <SVGSearch />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="header__delivery header__delivery_location d-none d-lg-block">
                                            <div className="header__delivery-icon">
                                                <SVGLocation />
                                            </div>
                                            <div className="header__delivery-text">
                                                <div className="localization-form__content menu__dropdown">
                                                    <button type="button" className="localization-form__select dropdown-toggle" data-toggle="HeaderCountryList">
                                                        <span className="text">{t("Select_language")}</span>
                                                        <span className="bold">{languagename}</span>
                                                    </button>
                                                    <ul className="header__menu-location no-bullet dropdown-menu">
                                                        <li className="header__menu-login-content">
                                                            <ul id="HeaderCountryList" role="list" className="no-bullet localization-form__list">
                                                                <li className={`localization-form__item ${(languagename === 'English') ? 'localization-form__active' : ''}`}>
                                                                    <Link href="/en" className="localization-form__link">
                                                                        English
                                                                    </Link>
                                                                </li>
                                                                <li className={`localization-form__item ${(languagename === 'Français') ? 'localization-form__active' : ''}`}>
                                                                    <Link href="/fr" className="localization-form__link">
                                                                        Français
                                                                    </Link>
                                                                </li>
                                                                <li className={`localization-form__item ${(languagename === 'Italiana') ? 'localization-form__active' : ''}`}>
                                                                    <Link href="/it" className="localization-form__link">
                                                                        Italiana
                                                                    </Link>
                                                                </li>
                                                                <li className={`localization-form__item ${(languagename === '日本') ? 'localization-form__active' : ''}`}>
                                                                    <Link href="/jp" className="localization-form__link">
                                                                        日本
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="header__delivery d-none d-lg-block">
                                            <div className="header__delivery-icon">
                                                <SVGPhone />
                                            </div>
                                            <div className="header__delivery-text">
                                                <Link href="tel:19006789">
                                                    <span className="text">{t("Hotline")}</span>
                                                    <span className="bold">1900-6789</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="main-header__icon-root header__icon-root header__icon-cart">
                                            <DrawerCart />
                                        </div>
                                        <div className="main-header__icon-root header__icon-root header__icon-account d-block d-lg-none">
                                            <DrawerMobileMore />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navigation-header-content-gr d-none d-lg-block">
                    <div className="container">
                        <div className="navigation-header-content mainmenu-align-center d-none d-md-block">
                            <div className="navigation-header__menu">
                                <HorizontalMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;