import React from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'

import { RefundPolicy_en } from "../public/locales/en/en_Pages";
import { RefundPolicy_fr } from "../public/locales/fr/fr_Pages";
import { RefundPolicy_it } from "../public/locales/it/it_Pages";
import { RefundPolicy_jp } from "../public/locales/jp/jp_Pages";

export default function PrivacyPolicyPage() {
    const router = useRouter();
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-refundpolicy');
    }
    let PoliciesData = [];
    switch (locale) {
        case 'en':
            PoliciesData = RefundPolicy_en; break;
        case 'fr':
            PoliciesData = RefundPolicy_fr; break;
        case 'it':
            PoliciesData = RefundPolicy_it; break;
        case 'jp':
            PoliciesData = RefundPolicy_jp; break;
    }


    return (
        <>
            <Head>
                <title>{t("RefundPolicy_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className="policy__container">
                    <div className="container">
                        <div className="policy__title">
                            <h1>{PoliciesData.heading}</h1>
                        </div>
                        <div className="policy__body">                            
                            <div dangerouslySetInnerHTML={ {__html: PoliciesData.content} } />                            
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}