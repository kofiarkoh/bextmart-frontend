import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { useAtom } from 'jotai'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import ProductItemWishlist from '../components/ultils/ProductItemWishlist'
import { wishlistCount } from '../components/ultils/Store'
import SearchPageSkeleton from '../components/ultils/SearchPageSkeleton'

export default function WishlistPage() {
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-wishlist');
    }

    const [wlCount, setwlCount] = useAtom(wishlistCount);
    const [wlData, setwlData] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        let data = localStorage.getItem('yam-wishlist');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setwlCount(data.length);
            setwlData(data);
        }
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, [wlCount, setwlCount, isLoading]);
    useEffect(() => { }, [wlData])

    function loadWishlist() {
        return (
            <>
                <div className='wish-list-template__content row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5'>
                    {
                        wlData.map((item, index) => (
                            <div key={index} className="product-item__content col d-none d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                <ProductItemWishlist product={item} />
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{t("Wishlist_page")}</title>
            </Head>
            <Header />
            <main>
                <Breadcrumbs />
                <div className="wishlist-template">
                    <div className='wishlist-template__layout'>
                        <div className='container'>
                            <div className='wishlist-template__container'>
                                <div className='main-page-content'>
                                    {
                                        (isLoading) ? <SearchPageSkeleton />
                                            : <>
                                                {
                                                    (wlCount === 0)
                                                        ?
                                                        <div className='page-heading wishlist-empty'>
                                                            {t("Wishlist_nothing")}
                                                        </div>
                                                        : (wlCount === 1)
                                                            ?
                                                            <div className='page-heading wishlist-noempty'>
                                                                {t("Wishlist_theris")} {wlCount} {t("Wishlist_text1")}
                                                            </div>
                                                            :
                                                            <div className='page-heading wishlist-noempty'>
                                                                {t("Wishlist_therare")} {wlCount} {t("Wishlist_text2")}
                                                            </div>
                                                }
                                                {
                                                    (wlData != null && wlCount > 0) ? loadWishlist() : ''
                                                }
                                            </>
                                    }
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

