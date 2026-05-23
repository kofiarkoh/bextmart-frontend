import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import useTranslation from './useTranslation'
import { SVGMenu, SVGClose, SVGArrowDown } from '../../public/assets/SVG';
import { HorizontalData } from '../data/DataHeader'
import ProductItemList from './ProductItemList'
import MenuSub from './MenuSub';
import { useGetCategoriesQuery } from '../../store/productsApi';

const DrawerMobileMenu = () => {
    const { t, locale } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [currenttoggle, setcurrenttoggle] = useState(0);
    const router = useRouter();

    const { data: categoriesData } = useGetCategoriesQuery();
    const categories = categoriesData?.data?.data?.slice(0, 10) || [];

    let TextMenu = HorizontalData().TextMenu,
    TextMenuCol1 = HorizontalData().TextMenuCol1,
    TextMenuCol2 = HorizontalData().TextMenuCol2,
    TextMenuCol3 = HorizontalData().TextMenuCol3,
    TextMenuCol4 = HorizontalData().TextMenuCol4,
    TextMenuCol5 = HorizontalData().TextMenuCol5,
    Blogdata = HorizontalData().Blogdata,
    Productdata = HorizontalData().Productdata,
    MenuBanner = HorizontalData().MenuBanner;

    function checkToggle(number) { if (currenttoggle === number) return true; }

    return (
        <>
            <div className={`menu-drawer-container cartdrawer ${isOpen ? 'menu-opening' : ''}`}>
                <summary className="cartsummary header__icon header__icon--menu header__icon--summary link focus-inset">
                    <div className="drawer__toggle-icon" onClick={(e) => { e.preventDefault(); setIsOpen(current => !current); setcurrenttoggle(0); }}>
                        <SVGMenu />
                    </div>
                </summary>
                <div className="header-drawer__inner header-drawer__left" role="dialog" aria-modal="true" aria-label="">
                    <div className="header-drawer__overlay" onClick={() => { setIsOpen(false); setcurrenttoggle(0); }}></div>
                    <div className="header-drawer_content search-drawer__content">
                        <div className="menu-drawer__inner-container">
                            <div className="header-drawer__title">
                                <h3 className="drawer--title">{t("Shop_Menu")}</h3>
                                <button type="button" className="drawer__close-button link link--text focus-inset" onClick={() => { setIsOpen(false); setcurrenttoggle(0); }}>
                                    <SVGClose />
                                </button>
                            </div>
                            <div className="menu-drawer__navigation-container" style={{ flex: 'none' }}>
                                <div className="component-scrollbar" style={{ position: 'relative', height: 'auto', overflow: 'visible' }}>
                                    <nav className="menu-drawer__navigation">
                                        <toggle-component>
                                            <ul className="menu-drawer__menu list-menu" role="list">
                                                <li className="header__menu-root accordion mobile-menu-accordion">
                                                    <Link href={TextMenu.find((m) => m.id === 1).url} className="header__menu-item list-menu__item ">
                                                        {TextMenu.find((m) => m.id === 1).text}
                                                    </Link>
                                                </li>
                                                <li className={`header__menu-root menu__dropdown menu__mega mobile-menu-toggle toggle__area ${checkToggle(1) ? 'open' : ''}`} data-toggle="1">
                                                    <Link href={TextMenu.find((m) => m.id === 2).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 2).url)? 'header__menu-active':'' }`} onClick={(e) => { e.preventDefault(); if (currenttoggle === 1) setcurrenttoggle(0); else setcurrenttoggle(1); }}>
                                                        {TextMenu.find((m) => m.id === 2).text}

                                                    </Link>
                                                   
                                                </li>
                                               
                                                <li className={`header__menu-root menu__dropdown menu__mega mobile-menu-toggle toggle__area ${checkToggle(5) ? 'open' : ''}`} data-toggle="5">
                                                    <Link href={TextMenu.find((m) => m.id === 6).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 6).url)? 'header__menu-active':'' }`} aria-current="page" onClick={(e) => { e.preventDefault(); if (currenttoggle === 5) setcurrenttoggle(0); else setcurrenttoggle(5); }}>
                                                        {TextMenu.find((m) => m.id === 6).text}
                                                    </Link>
                                                    
                                                </li>
                                            </ul>
                                        </toggle-component>
                                    </nav>
                                </div>
                            </div>
                            <div className="header-drawer__title">
                                <h3 className="drawer--title">{t("All_Categories")}</h3>
                            </div>
                            <div className="menu-drawer__navigation-container" style={{ flex: 1, minHeight: 0 }}>
                                <div className="component-scrollbar">
                                    <div className="mobile-header__allcollections">
                                        <nav className="menu-drawer__navigation">
                                            <ul className="header__submenu list-menu list-menu--disclosure" role="list">
                                                {categories.map((cat) => (
                                                    <li key={cat.id} className="header__menu-root accordion mobile-menu-accordion">
                                                        <Link
                                                            href={`/products?category=${cat.slug}`}
                                                            className="header__menu-item list-menu__item"
                                                            onClick={() => setIsOpen(false)}
                                                            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                                                        >
                                                            <span className="header__vertical-icon icon-type-svg">
                                                                <i className={`ph ${cat.icon}`} style={{ fontSize: 18 }} />
                                                            </span>
                                                            <span className="text">{cat.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DrawerMobileMenu;