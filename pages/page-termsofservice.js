import React from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'

import { TermsOfService_en } from "../public/locales/en/en_Pages";
import { TermsOfService_fr } from "../public/locales/fr/fr_Pages";
import { TermsOfService_it } from "../public/locales/it/it_Pages";
import { TermsOfService_jp } from "../public/locales/jp/jp_Pages";

export default function PrivacyPolicyPage() {
    const router = useRouter();
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-termsofservice');
    }
    let PoliciesData = [];
    switch (locale) {
        case 'en':
            PoliciesData = TermsOfService_en; break;
        case 'fr':
            PoliciesData = TermsOfService_fr; break;
        case 'it':
            PoliciesData = TermsOfService_it; break;
        case 'jp':
            PoliciesData = TermsOfService_jp; break;
    }


    return (
        <>
            <Head>
                <title>{t("TermsOfService_page")}</title>
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