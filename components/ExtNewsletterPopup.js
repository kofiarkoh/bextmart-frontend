import React, { useState, useEffect, useRef } from 'react';
import Popup from "reactjs-popup";
import Image from 'next/image'
import emailjs from '@emailjs/browser';
import useTranslation from './ultils/useTranslation'
import newsletter from '../public/assets/images/yam-newsletter.png'

const ExtNewsletterPopup = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const currentday = new Date();
    const { t } = useTranslation();
    useEffect(() => {
        if (localStorage.getItem('yam-newsletter') === '' || localStorage.getItem('yam-newsletter') === null || localStorage.getItem('yam-newsletter') === undefined) {
            setTimeout(() => {
                setOpen(true);
                localStorage.setItem('yam-newsletter', currentday);
            }, 5000);
        } else {
            const checkTime = new Date().getDate() - new Date(localStorage.getItem('yam-newsletter')).getDate();
            console.log('Newsletter Popup disabled: ' + checkTime + '/3 days');
            if (checkTime > 3 || checkTime < -3) {
                setTimeout(() => {
                    setOpen(true);
                    localStorage.removeItem('yam-newsletter', currentday);
                }, 5000);
            }
        }

    }, [open]);

    const ref_email = useRef(null);
    const [subscribeData, setSubscribeData] = useState({
        subscribeEmail: ""
    })
    const { subscribeemail } = subscribeData;
    const [notify, setnotify] = useState('');
    const [status, setStatus] = useState(t("Get_It"));
    const [classStatus, setClassStatus] = useState('');
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const inputChange = e => {
        setSubscribeData({ ...subscribeData, [e.target.name]: [e.target.value] })
        setnotify('');
    }

    function subscribeSubmit(e) {
        e.preventDefault();
        if (isValidEmail(subscribeData.subscribeEmail)) {
            setStatus(t("Review_form_submitting"));
            emailjs.send('service_cmxchh4', 'template_q878gnz', subscribeData, 'sLDVY6WisVxsJac6k')
                .then((result) => {
                    setStatus(t("Review_form_submitcomplete"));
                    setnotify(t("Subscribe_Thanks"));
                    setTimeout(() => {
                        setStatus(t("Get_It"));
                        setClassStatus('');
                        setnotify('');
                        setOpen(false);
                    }, 2000);
                }, (error) => {
                    console.log('FAILED...', error);
                });
        } else {
            setnotify(t("Email_is_invalid"));
            ref_email.current.focus();
        }
    }

    return (
        <section className='html-section newsletter-popup'>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal__layout newsletter-popup__layout modal-open">
                    <div className="modal__close" onClick={closeModal}></div>
                    <div className='modal__content'>
                        <div className="modal__body newsletter-popup__body">
                            <Image className="top-news-image" src={newsletter} alt="" width={460} height={211} />
                            <div className="newsletter-popup__body-gr">
                                <div className="modal__title newsletter-popup__text">
                                    <div className="line1">{t("Subscribe_to")}</div>
                                    <div className="line2">{t("off30")}</div>
                                    <div className="line3">{t("off_in_your_first_order")}</div>
                                </div>
                                <div className="modal__form newsletter-popup__form"><div>
                                    <form id="contact_form" acceptCharset="UTF-8" className="newsletter-form" onSubmit={(e) => subscribeSubmit(e)}>
                                        <input type="hidden" name="form_type" defaultValue="customer" />
                                        <input type="hidden" name="utf8" defaultValue="✓" />
                                        <input type="hidden" name="contact[tags]" defaultValue="newsletter" />
                                        <div className="newsletter-form__field-wrapper">
                                            <div className="field">
                                                <input ref={ref_email} id="subscribeEmailp" type="email" name="subscribeEmail" className="field__input" value={subscribeemail} placeholder="Enter your email here" onChange={inputChange} />
                                                <label className="field__label" htmlFor="subscribeEmail">
                                                    {t("Enter_your_email_here")}
                                                </label>
                                            </div>
                                            <button type="submit" className={`newsletter-form__button button ${classStatus}`} name="commit">
                                                {status}
                                            </button>
                                        </div>
                                        <span className="subscribe-notify">{notify}</span>
                                    </form>
                                </div>
                                </div>
                                <div className="modal__close-text" data-modal-close="" onClick={closeModal}>{t("No_Thanks")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </section>
    );
}

export default ExtNewsletterPopup;