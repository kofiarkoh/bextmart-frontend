import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import styles from '../public/assets/styles/Custom404.module.css'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { Custom404_en } from "../public/locales/en/en_Pages";
import { Custom404_fr } from "../public/locales/fr/fr_Pages";
import { Custom404_it } from "../public/locales/it/it_Pages";
import { Custom404_jp } from "../public/locales/jp/jp_Pages";

export default function Custom404() {    
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-404');
    }
    let Custom404Data = [];
    switch (locale) {
        case 'en':
            Custom404Data = Custom404_en;
            break;
        case 'fr':
            Custom404Data = Custom404_fr;
            break;
        case 'it':
            Custom404Data = Custom404_it;
            break;
        case 'jp':
            Custom404Data = Custom404_jp;
            break;
    }

    return (
        <>
            <Head>
                <title>{t("Custom404")}</title>
            </Head>
            <Header/>
            <main>
                <div className={styles.template404__layout} style={{ backgroundImage: `url(${Custom404Data.bkg})` }}>
                    <div className="container">
                        <div className={styles.template404__content}>
                            <p className={styles.template404__sub_title}>{Custom404Data.subtitle}</p>
                            <h1 className={styles.template404__title}>{Custom404Data.title}</h1>
                            <Link href={Custom404Data.link_target} className={styles.template404__caption}>
                                {Custom404Data.notify} <strong>{Custom404Data.link_text}</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}