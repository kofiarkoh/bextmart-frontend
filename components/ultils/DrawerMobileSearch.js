import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import useTranslation from './useTranslation'
import ProductItemList from './ProductItemList'

import Product_en from "../../public/locales/en/en_Product.json";
import Product_jp from "../../public/locales/jp/jp_Product.json";
import Product_fr from "../../public/locales/fr/fr_Product.json";
import Product_it from "../../public/locales/it/it_Product.json";

import { SVGSearchMobile, SVGClose } from '../../public/assets/SVG';

const DrawerMobileSearch = () => {
    const { t, locale } = useTranslation();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    let Productdata;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(3, 7); break;
        case 'fr':
            Productdata = Product_fr.slice(3, 7); break;
        case 'it':
            Productdata = Product_it.slice(3, 7); break;
        case 'jp':
            Productdata = Product_jp.slice(3, 7); break;
    }

    return (
        <>
            <div className={`cartdrawer ${isOpen ? 'menu-opening' : ''}`} open={isOpen ? true : ''}>
                <summary className="cartsummary header__icon header__icon--search header__icon--summary link focus-inset header-drawer__toggle">
                    <div className="drawer__toggle-icon" onClick={(e) => { e.preventDefault(); setIsOpen(current => !current); }}>
                        <SVGSearchMobile />
                    </div>
                </summary>
                <div className="header-drawer__inner header-drawer__left" role="dialog" aria-modal="true" aria-label="">
                    <div className="header-drawer__overlay" onClick={() => setIsOpen(false)}></div>
                    <div className="header-drawer_content search-drawer__content">
                        <div className="header-drawer__title">
                            <h3 className="drawer--title">{t("Search_our_site")}</h3>
                            <button type="button" className="drawer__close-button link link--text focus-inset" onClick={() => setIsOpen(false)}>
                                <SVGClose />
                            </button>
                        </div>
                        <div className="header-drawer__content search-drawer__content">
                            <search-drawer-form data-search-suggested="true">
                                <div className="search-drawer__form">
                                    <form action="/search" method="get" role="search" className="search__form">
                                        <input type="search" name="q" className="search_box" placeholder={t("search_inner")} defaultValue={(router.asPath.includes('/search')) ? router.asPath.substring(10) : ''} />
                                        <button className="search_submit" type="submit" aria-label="icon search">
                                            <SVGSearchMobile />
                                        </button>
                                    </form>
                                    <div className="search-drawer__quick">
                                        <span className="search-drawer__quick-title">{t("Quick_search")}</span>
                                        <ul className="search-drawer__quick-list">
                                            <li>
                                                <Link href="/search?q=blue" className="list-menu__item">
                                                    {t("shoes")}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/search?q=tshirt" className="list-menu__item">
                                                    {t("electronics")}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/search?q=red" className="list-menu__item">
                                                    {t("furniture")}                                                
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/search?q=fashion" className="list-menu__item">                                                    
                                                    {t("beauty")}                                                    
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="search-drawer__heading  search-suggested" data-search-drawer-heading="">
                                    <p className="search-drawer__suggested-heading">{t("Need_some_inspiration")}</p>
                                    <p className="search-drawer__result-heading">{t("Result_Found")}</p>
                                </div>
                                <div className="header-drawer__scroll">
                                    <div className="search-drawer__result component-scrollbar  search-suggested" data-search-drawer-result="">
                                        <div className="search-drawer__result-suggested">
                                            {
                                                Productdata.map((item) => (
                                                    <div className="product-item__content" key={item.id}>
                                                        <div className="product-item__list">
                                                            <ProductItemList product={item} />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="header-drawer__bottom  search-suggested" data-search-drawer-bottom="">
                                    <Link href="/collections" className="search-drawer__action search-drawer__action-suggested">
                                        {t("Show_all")}
                                    </Link>
                                    <Link href="/collections" className="search-drawer__action search-results__action">
                                        {t("Show_all")}
                                    </Link>
                                </div>
                            </search-drawer-form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DrawerMobileSearch;