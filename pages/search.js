import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import useTranslation from '../components/ultils/useTranslation'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductItemGrid from '../components/ultils/ProductItemGrid'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import SearchPageSkeleton from '../components/ultils/SearchPageSkeleton'
import ExtNotification from '../components/ExtNotification'
import styles from '../public/assets/styles/SearchPage.module.css'

export default function SearchPage() {
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-search');
    }

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [notify, setnotify] = useState('');
    const [result, setResult] = useState(null);
    const { t, locale } = useTranslation();
    let Productdata;
    switch (locale) {
        case 'en':
            Productdata = Product_en; break;
        case 'fr':
            Productdata = Product_fr; break;
        case 'it':
            Productdata = Product_it; break;
        case 'jp':
            Productdata = Product_jp; break;
    }

    useEffect(() => {
        const getQuery = router.asPath.substring(10).toLowerCase();
        if (getQuery.length > 2) {
            setSearchQuery(getQuery);
            let remainingresult;
            let filterName = Productdata.filter((product) => { return product.name.toLowerCase().includes(getQuery) })
            let filterSKU = Productdata.filter((product) => { return product.SKU.toLowerCase().includes(getQuery) })
            let filterBrand = Productdata.filter((product) => { return product.Brand.toLowerCase().includes(getQuery) })
            let filterType = Productdata.filter((product) => { return product.Type.toLowerCase().includes(getQuery) })
            let filterOption = Productdata.filter((product) => { return product.option.some(o => o.variant.some(v => v.title.toLowerCase().includes(getQuery))) });
            remainingresult = filterName.concat(filterSKU, filterBrand, filterType, filterOption);
            let uniqResult = remainingresult.reduce(function (a, b) {
                if (a.indexOf(b) < 0) a.push(b);
                return a;
            }, []);
            setResult(uniqResult);
        } else {
            setnotify(t("Search_atleast_3"));
        }
        setTimeout(() => {
            setisLoading(false);
        }, 1500);

    }, [searchQuery, isLoading, notify])
    useEffect(() => { }, [result]);

    function loadResult() {
        return (
            <div className='search-template__results'>
                <div className='row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5'>
                    {
                        result.map((item, index) => (
                            <div key={index} className="product-item__content col d-none d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                <ProductItemGrid product={item} />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    if (result != null) {
        return (
            <>
                <Head>
                    <title>{t("Search_page")}</title>
                </Head>
                <Header />
                <main>
                    <Breadcrumbs text={searchQuery} />
                    <div className='search-template'>
                        <div className='search-template__layout'>
                            <div className='container'>
                                <div className={styles.search_content}>
                                    <p className={styles.search_toptext}>{(result.length === 0) ? t("Search_no_result1") + ' "' + router.asPath.substring(10) + '" ' + t("Search_no_result2")
                                        : result.length + ' ' + t("Search_result_text") + ' "' + router.asPath.substring(10) + '"'
                                    }</p>
                                    {(result.length > 0) ? loadResult() : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <ExtNotification />
            </>
        )
    } else {
        return (
            <>
                <Header />
                <main>
                    {
                        isLoading ? <SearchPageSkeleton /> : <>
                            <div className="search-template">
                                <div className={`search-template__layout `}>
                                    <div className="container">
                                        <div className='product-template__container row'>
                                            <div className={styles.no_product}>
                                                <h2>{notify}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </main>
                <Footer />
            </>
        )
    }
}
