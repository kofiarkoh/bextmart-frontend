import React from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'

import { PrivacyPolicy_en } from "../public/locales/en/en_Pages";
import { PrivacyPolicy_fr } from "../public/locales/fr/fr_Pages";
import { PrivacyPolicy_it } from "../public/locales/it/it_Pages";
import { PrivacyPolicy_jp } from "../public/locales/jp/jp_Pages";

export default function PrivacyPolicyPage() {
    const router = useRouter();
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-privacypolicy');
    }
    let PrivacyPolicyData = [];
    switch (locale) {
        case 'en':
            PrivacyPolicyData = PrivacyPolicy_en; break;
        case 'fr':
            PrivacyPolicyData = PrivacyPolicy_fr; break;
        case 'it':
            PrivacyPolicyData = PrivacyPolicy_it; break;
        case 'jp':
            PrivacyPolicyData = PrivacyPolicy_jp; break;
    }


    return (
        <>
            <Head>
                <title>{t("PrivacyPolicy_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className="policy__container">
                    <div className="container">
                        <div className="policy__title">
                            <h1>{PrivacyPolicyData.heading}</h1>
                        </div>
                        <div className="policy__body">                            
                            <div dangerouslySetInnerHTML={ {__html: PrivacyPolicyData.content} } />                            
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}