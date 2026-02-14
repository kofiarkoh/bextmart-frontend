import React, { useState, useRef } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import emailjs from '@emailjs/browser';
import useTranslation from '../components/ultils/useTranslation'
import CountdownTimer from '../components/ultils/CountdownTimer';
import styles from '../public/assets/styles/ComingsoonPage.module.css'

import { Comingsoon_en } from "../public/locales/en/en_Pages";
import { Comingsoon_fr } from "../public/locales/fr/fr_Pages";
import { Comingsoon_it } from "../public/locales/it/it_Pages";
import { Comingsoon_jp } from "../public/locales/jp/jp_Pages";

export default function ComingsoonPage() {
    const { t, locale } = useTranslation();
    const ref_email = useRef(null);
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('password');
        document.body.classList.add('template-password');
        document.body.classList.add(styles.full_height);
    }
    let ComingsoonData = [];
    switch (locale) {
        case 'en':
            ComingsoonData = Comingsoon_en; break;
        case 'fr':
            ComingsoonData = Comingsoon_fr; break;
        case 'it':
            ComingsoonData = Comingsoon_it; break;
        case 'jp':
            ComingsoonData = Comingsoon_jp; break;
    }

    const [status, setStatus] = useState(ComingsoonData.Form_Submit);
    const [notify, setnotify] = useState('');
    const [closeform, setcloseform] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const [subscribeData, setSubscribeData] = useState({
        subscribeEmail: ""
    });
    const { subscribeEmail } = subscribeData;
    const inputChange = e => {
        setSubscribeData({ ...subscribeData, [e.target.name]: [e.target.value] });
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function contactSubmit(e) {
        e.preventDefault();
        if (isValidEmail(subscribeData.subscribeEmail)) {
            setStatus(ComingsoonData.Sending);
            setClassStatus(styles.contact_submit_button_loading);
            emailjs.send('service_cmxchh4', 'template_q878gnz', subscribeData, 'sLDVY6WisVxsJac6k')
                .then((result) => {
                    setStatus(ComingsoonData.Completed);
                    setnotify(t("Subscribe_Thanks"));
                    setClassStatus(styles.contact_submit_button_complete);
                    setTimeout(() => {
                        setcloseform(true);
                        setClassStatus('');
                    }, 3000);
                }, (error) => {
                    console.log('FAILED...', error);
                });
        } else {
            setnotify(ComingsoonData.Email_is_invalid);
            ref_email.current.focus();
        }
    }

    const dateText = {
        days: ComingsoonData.Days,
        hrs: ComingsoonData.Hrs,
        mins: ComingsoonData.Mins,
        secs: ComingsoonData.Secs
    }

    return (
        <>
            <Head>
                <title>{t("Comingsoon_page")}</title>
            </Head>
            <div className="html-section">
                <div className={styles.password_header}>
                    <div className={`container ${styles.password_header_div}`}>
                        <Link href="/" className={styles.password_header_div_a}>
                            <Image className={styles.header_div_a_img} src={ComingsoonData.logo} alt='' width={102} height={41} />
                        </Link>
                    </div>
                </div>
            </div>
            <main className={styles.password_main}>
                <div className={styles.password__content} style={{ backgroundImage: `url(${ComingsoonData.bkg})` }}>
                    <div className="container">
                        <h2 className={styles.password__content_title}>{ComingsoonData.title}</h2>
                        <div className={styles.password__content_newsletter}>
                            <div className={styles.newsletter__subheading}>
                                <p className={styles.newsletter__subheading_p}>{ComingsoonData.subtitle}</p>
                            </div>
                            <div>
                                <h2 className="password-title">
                                    {closeform ? ComingsoonData.Thanks : ''}
                                </h2>
                                <form method="post" id="ContactForm" className={`${styles.newsletter_form} ${closeform ? 'hidden' : 'show'}`} onSubmit={(e) => contactSubmit(e)}>
                                    <input type="hidden" name="form_type" value="contact" />
                                    <input type="hidden" name="utf8" value="✓" />
                                    <div className={styles.newsletter_form__field_wrapper}>
                                        <div className="field">
                                            <input className={`field__input ${styles.field__input}`} type="email" id="subscribeEmail" name="subscribeEmail" value={subscribeEmail} placeholder={ComingsoonData.Form_email} ref={ref_email} onChange={inputChange} onFocus={inputChange} />
                                            <label className="field__label" htmlFor="ContactForm-email">{ComingsoonData.Form_email}</label>
                                        </div>
                                    </div>
                                    <div className="contact__button">
                                        <button type="submit" className={`button ${styles.newsletter__button} contact-submit-button ${classStatus}`}>
                                            {status}
                                        </button>
                                    </div>
                                    <span className={styles.password_notify}>{notify}</span>
                                </form>
                            </div>
                        </div>
                        <div className={`${styles.countdown} countdown`}>
                            <CountdownTimer targetDate={ComingsoonData.Timer} text={dateText} />
                        </div>
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                <div className={styles.password_footer}>
                    <div className="password-footer">
                        <div className="container">
                            <div className={styles.copyright}>{ComingsoonData.Copy_right} <Link href="/" >{ComingsoonData.Shop_info}</Link>. {ComingsoonData.All_Rights_Reserved}</div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}