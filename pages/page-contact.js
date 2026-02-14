import React, { useState, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import emailjs from '@emailjs/browser';
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/ContactPage.module.css'

import { Contact_en } from "../public/locales/en/en_Pages";
import { Contact_fr } from "../public/locales/fr/fr_Pages";
import { Contact_it } from "../public/locales/it/it_Pages";
import { Contact_jp } from "../public/locales/jp/jp_Pages";

export default function ContactPage() {
    const { t, locale } = useTranslation();
    const ref_email = useRef(null);
    const ref_message = useRef(null);
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-page-contact');
    }

    let ContactData = [];
    switch (locale) {
        case 'en':
            ContactData = Contact_en; break;
        case 'fr':
            ContactData = Contact_fr; break;
        case 'it':
            ContactData = Contact_it; break;
        case 'jp':
            ContactData = Contact_jp; break;
    }

    const [status, setStatus] = useState(ContactData.Form_Send);
    const [notify, setnotify] = useState('');
    const [closeform, setcloseform] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const [contactdata, setcontactdata] = useState({
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        contact_message: ""
    });
    const { contact_name, contact_email, contact_phone, contact_message } = contactdata;
    const inputChange = e => {
        setcontactdata({ ...contactdata, [e.target.name]: [e.target.value] });
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function contactSubmit(e) {
        e.preventDefault();
        if (isValidEmail(contactdata.contact_email)) {
            if (contactdata.contact_message != '') {
                setStatus(ContactData.Sending);
                setClassStatus(styles.contact_submit_button_loading);
                emailjs.send('service_tpg1r0h', 'template_ozg5h0x', contactdata, 'dCVeBV20VeZr1KjP4')
                .then((result) => {
                    setStatus(ContactData.Completed); 
                    setClassStatus(styles.contact_submit_button_complete);
                    setTimeout(() => {                            
                        setStatus(ContactData.Form_Send);
                        setClassStatus('');
                        setcloseform(true);
                    }, 1200);                       
                }, (error) => {
                    console.log('FAILED...', error);
                });
            } else {
                setnotify(ContactData.Message_Empty);
                ref_message.current.focus();
            }
        } else {
            setnotify(ContactData.Email_is_invalid);
            ref_email.current.focus();
        }
    }

    return (
        <>
            <Head>
                <title>{t("Contact_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className="contact-detail__layout">
                    <div className="container">
                        <div className="contact-detail__container">
                            <div className="contact-template__title">
                                <h2 className={styles.contact_title}>
                                    {ContactData.Heading}
                                </h2>
                            </div>
                            <div className="contact-detail__content row">
                                <div className={`${styles.contact_detail__item} col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                                    <div className="contact-detail__item-icon">
                                        <Image className="icon" src="/assets/images/pages/contact-img1.png" width={64} height={64} alt="" />
                                    </div>
                                    <div className="contact-detail__item-content">
                                        <p className={styles.contact_detail__item_heading}>
                                            {ContactData.Phone}
                                        </p>
                                        <div className={styles.contact_detail__item_caption}>
                                            <a href="tel:+84%2001122000">{ContactData.Phone_Text1}</a>
                                            <a href="tel:+84%2001122000">{ContactData.Phone_Text2}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.contact_detail__item}  col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                                    <div className="contact-detail__item-icon">
                                        <Image className="icon" src="/assets/images/pages/contact-img2.png" width={64} height={64} alt="" />
                                    </div>
                                    <div className="contact-detail__item-content">
                                        <p className={styles.contact_detail__item_heading}>
                                            {ContactData.Address}
                                        </p>
                                        <div className={styles.contact_detail__item_caption}>
                                            <address>{ContactData.Address_Text}</address>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.contact_detail__item}  col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                                    <div className="contact-detail__item-icon">
                                        <Image className="icon" src="/assets/images/pages/contact-img3.png" width={64} height={64} alt="" />
                                    </div>
                                    <div className="contact-detail__item-content">
                                        <p className={styles.contact_detail__item_heading}>
                                            {ContactData.Email}
                                        </p>
                                        <div className={styles.contact_detail__item_caption}>
                                            <a href="mailto:support@kalathemes.com">{ContactData.Email_Text1}</a>
                                            <a href="mailto:kalathemes@gmail.com">{ContactData.Email_Text2}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="contact-form__layout">
                    <div className="container">
                        <div className={styles.contact_form__container}>
                            <div className="contact-template__title">
                                <h2 className={styles.contact_title}>
                                    {closeform ? ContactData.Thanks : ContactData.More}
                                </h2>
                                <p className={`${styles.contact_subtitle} ${closeform ? 'hidden' : 'show'}`}>
                                    {ContactData.More_Desc}
                                </p>
                            </div>
                            <div className="contact-form__content">
                                <form method="post" id="ContactForm" className={`contact-form ${closeform ? 'hidden' : 'show'}`} onSubmit={(e) => contactSubmit(e)}>
                                    <input type="hidden" name="form_type" value="contact" />
                                    <input type="hidden" name="utf8" value="✓" />
                                    <div className="contact__fields row">
                                        <div className={`${styles.contact__fields_div} col-12 col-sm-4`}>
                                            <div className="field">
                                                <input className={`${styles.contact__fields_field__input} ${styles.contact__fields_input} field__input`} type="text" id="contact_name" name="contact_name" value={contact_name} placeholder={ContactData.Form_Name} onChange={inputChange} onFocus={inputChange} />
                                                <label className="field__label" htmlFor="contact_name">{ContactData.Form_Name}</label>
                                            </div>
                                        </div>
                                        <div className={`${styles.contact__fields_div} col-12 col-sm-4`}>
                                            <div className="field field--with-error">
                                                <input className={`${styles.contact__fields_field__input} ${styles.contact__fields_input} field__input`} type="email" id="contact_email" name="contact_email" value={contact_email} placeholder={ContactData.Form_Email} ref={ref_email} onChange={inputChange} onFocus={inputChange} />
                                                <label className="field__label" htmlFor="ContactForm-email">{ContactData.Form_Email}</label>
                                            </div>
                                        </div>
                                        <div className={`${styles.contact__fields_div} col-12 col-sm-4`}>
                                            <div className="field">
                                                <input className={`${styles.contact__fields_field__input} ${styles.contact__fields_input} field__input`} type="text" id="contact_phone" name="contact_phone" value={contact_phone} placeholder={ContactData.Form_Phone} onChange={inputChange} onFocus={inputChange} />
                                                <label className="field__label" htmlFor="ContactForm-phone">{ContactData.Form_Phone}</label>
                                            </div>
                                        </div>
                                        <div className={`${styles.contact__fields_div} col-12 col-sm-12`}>
                                            <div className="field">
                                                <textarea rows="10" className={`${styles.contact__fields_textarea} ${styles.contact__fields_field__input} text-area field__input`} id="contact_message" name="contact_message" vaue={contact_message} placeholder={ContactData.Form_Message} ref={ref_message} onChange={inputChange} onFocus={inputChange} ></textarea>
                                                <label className={`${styles.contact__fields_textarea_form__label} form__label field__label`} htmlFor="contact_message">{ContactData.Form_Message}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={styles.contact_notify}>{notify}</span>
                                    <div className="contact__button">
                                        <button type="submit" className={`${styles.contact__button_button} button contact-submit-button ${classStatus}`}>
                                            {status}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='spaced-section '>
                    <div className={`${styles.map_container_fluid} container_fluid`}>
                        <div className="map__container row">
                            <iframe className={styles.map_iframe} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6044.969830807474!2d-73.993056!3d40.7513582!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzEyLjQiTiA3M8KwNTgnNTQuNyJX!5e0!3m2!1svi!2s!4v1600333050767!5m2!1svi!2s" width="1920" height="450" frameBorder="0" allowFullScreen=""></iframe>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}