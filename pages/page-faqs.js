import React, { useState, useRef } from 'react';
import Head from 'next/head'
import emailjs from '@emailjs/browser';
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/FAQsPage.module.css'

import { Faqs_en } from "../public/locales/en/en_Pages";
import { Faqs_fr } from "../public/locales/fr/fr_Pages";
import { Faqs_it } from "../public/locales/it/it_Pages";
import { Faqs_jp } from "../public/locales/jp/jp_Pages";
import { SVGArrowDown } from '../public/assets/SVG';

export default function FAQsPage() {
    const { t, locale } = useTranslation();
    const ref_email = useRef(null);
    const ref_message = useRef(null);
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-faqs');
    }

    let FaqsData = [];
    switch (locale) {
        case 'en':
            FaqsData = Faqs_en; break;
        case 'fr':
            FaqsData = Faqs_fr; break;
        case 'it':
            FaqsData = Faqs_it; break;
        case 'jp':
            FaqsData = Faqs_jp; break;
    }

    const [faqIndex, setfaqIndex] = useState(0);
    const [status, setStatus] = useState(FaqsData.Form_Send);
    const [notify, setnotify] = useState('');
    const [closeform, setcloseform] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const [contactdata, setcontactdata] = useState({
        contact_name: "",
        contact_email: "",
        contact_message: ""
    });
    const { contact_name, contact_email, contact_message } = contactdata;
    const inputChange = e => {
        setcontactdata({ ...contactdata, [e.target.name]: [e.target.value] });
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function contactSubmit(e) {
        e.preventDefault();
        if (isValidEmail(contactdata.contact_email)) {
            console.log(contactdata.contact_message);
            if (contactdata.contact_message != '') {
                console.log("submit-content:", contactdata);
                setStatus(FaqsData.Sending);
                setClassStatus(styles.contact_submit_button_loading);
                emailjs.send('service_tpg1r0h', 'template_ozg5h0x', contactdata, 'dCVeBV20VeZr1KjP4')
                .then((result) => {
                    setStatus(FaqsData.Completed); 
                    setClassStatus(styles.contact_submit_button_complete);
                    setTimeout(() => {                            
                        setStatus(FaqsData.Form_Send);
                        setClassStatus('');
                        setcloseform(true);
                    }, 1200);                       
                }, (error) => {
                    console.log('FAILED...', error);
                });
            } else {
                setnotify(FaqsData.Message_Empty);
                ref_message.current.focus();
            }
        } else {
            setnotify(FaqsData.Email_is_invalid);
            ref_email.current.focus();
        }
    }

    return (
        <>
            <Head>
                <title>{t("FAQs_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className={styles.main_faqs__layout}>
                    <div className="container">
                        <div className="main-faqs__container">
                            <div className='faqs-questions__content'>
                                <h2 className={styles.main_faqs__title}>
                                    {FaqsData.Heading}
                                </h2>
                                <div className='faqs-questions__list'>
                                    {
                                        FaqsData.FAQS_list.map((data, index) => (
                                            <div className={`${styles.faqs_questions__item} accordion ${(faqIndex === index) ? 'open' : ''}`} key={index}>
                                                <h4 className={`${styles.faqs_questions__item_accordion__title} accordion__title`} onClick={() => setfaqIndex(index)}>
                                                <span className={styles.faqs_questions__item_accordion__title_span}>{data.question}</span>
                                                    <SVGArrowDown />
                                                </h4>
                                                <div className={`${styles.faqs_questions__item_accordion__content} accordion__content ${(faqIndex === index) ? 'show' : 'hidden'}`}>
                                                    {data.answer}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='faqs-contact__content'>
                                <h2 className={styles.main_faqs__title}>
                                    {closeform ? FaqsData.Thanks : FaqsData.Title}
                                </h2>
                                <div className="faqs-contact__form">
                                    <form method="post" id="ContactForm" className={`contact-form ${closeform ? 'hidden' : 'show'}`} onSubmit={(e) => contactSubmit(e)}>
                                        <input type="hidden" name="form_type" value="contact" />
                                        <input type="hidden" name="utf8" value="✓" />
                                        <div className="contact__fields row">
                                            <div className='col-12 col-sm-6'>
                                                <div className={`${styles.faqs_contact__content_contact__fields_field} field`}>
                                                    <input className={`${styles.faqs_contact__content_field__input} field__input`} type="text" id="contact_name" name="contact_name" value={contact_name} placeholder={FaqsData.Form_Name} onChange={inputChange} onFocus={inputChange} />
                                                    <label className="field__label" htmlFor="contact_name">{FaqsData.Form_Name}</label>
                                                </div>
                                                <div className={`${styles.faqs_contact__content_contact__fields_field} field`}>
                                                    <input className={`${styles.faqs_contact__content_field__input} field__input`} type="email" id="contact_email" name="contact_email" value={contact_email} placeholder={FaqsData.Form_Email} ref={ref_email} onChange={inputChange} onFocus={inputChange} />
                                                    <label className="field__label" htmlFor="ContactForm-email">{FaqsData.Form_Email}</label>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-6'>
                                                <div className={`${styles.faqs_contact__content_contact__fields_field} field`}>
                                                    <textarea rows="10" className={`${styles.faqs_contact__content_field__input} ${styles.contact__content_field_textarea} field__input text-area`} id="contact_message" name="contact_message" vaue={contact_message} placeholder={FaqsData.Form_Message} ref={ref_message} onChange={inputChange} onFocus={inputChange} ></textarea>
                                                    <label className={`form__label field__label ${styles.faqs_textarea__label}`} htmlFor="contact_message">{FaqsData.Form_Message}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={styles.contact_notify}>{notify}</span>
                                        <div className={styles.faqs_contact__content_contact__button}>
                                            <button type="submit" className={`${styles.faqs_contact__content_contact__button_button} button contact-submit-button ${classStatus}`}>
                                                {status}
                                            </button>
                                        </div>
                                    </form>
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