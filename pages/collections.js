import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import ExtNotification from '../components/ExtNotification'
import styles from '../public/assets/styles/Collection.module.css'
import Category_en from "../public/locales/en/en_Category.json";
import Category_fr from "../public/locales/fr/fr_Category.json";
import Category_it from "../public/locales/it/it_Category.json";
import Category_jp from "../public/locales/jp/jp_Category.json";

export default function CollectionsPage() {
    const { t, locale } = useTranslation();
    let { CategoryData } = [];
    switch (locale) {
        case 'en':
            CategoryData = Category_en; break;
        case 'fr':
            CategoryData = Category_fr; break;
        case 'it':
            CategoryData = Category_it; break;
        case 'jp':
            CategoryData = Category_jp; break;
    }
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-list-collections');
    }

    return (
        <>
            <Head>
                <title>{t("Breadcrumb_Collections")}</title>
            </Head>

            <Header />
            <main>
                <Breadcrumbs />
                <div className={styles.collections_list}>
                    <div className="collections-list-template__layout">
                        <div className="container">
                            <div className="collections-list-template__content">
                                <div className={`${styles.collections_list_collection} row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3`}>
                                    {
                                        CategoryData.map((data, index) => (
                                            <div className={`col ${styles.collections_list_content}`} key={index}>
                                                <div className={styles.collections_list_item_grid}>
                                                    <Link href={`collection/${data.handle}`} className={styles.collections_list_item_grid_link}>
                                                        <Image src={data.featured_image} alt='' className='product-item__image' width={410} height={410} />
                                                    </Link>
                                                    <div className={styles.collections_list_item_hover}>
                                                        <Link href={`collection/${data.handle}`} className="collection-item__info">
                                                            <h4 className={styles.collections_list_item_hover_title}>{data.name}</h4>
                                                            <p className={styles.collections_list_item_hover_count}>{data.productsID.replace(',','').length} {t("ListColl_products")}</p>
                                                            <p className={`${styles.collections_list_item_hover_action} action`}>{t("ListColl_view_More")}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <ExtNotification />
        </>
    )
}
