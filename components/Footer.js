import React, { useState, useRef } from "react";
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import useTranslation from './ultils/useTranslation'
import { DataFooter } from './data/DataFooter.js'
import ScrollToTop from "./ultils/ScrollToTop";
import { SVGArrowDown, SVGPhone, SVGLocationPin, SVGEnvolope, SVGTwitter, SVGFacebook, SVGInstagram, SVGTikTok, SVGVisa, SVGMastercard, SVGAmericanExpress, SVGPayPal, SVGDinersClub, SVGDiscover } from '../public/assets/SVG';

const Footer = () => {
    const { t } = useTranslation();
    const ref_email = useRef(null);
    const [currenttoggle, setcurrenttoggle] = useState(0);
    function checkToggle(number) { if (currenttoggle === number) return true; }
    let FooterLink1Data = DataFooter().FooterLink1,
        FooterLink2Data = DataFooter().FooterLink2,
        FooterLink3Data = DataFooter().FooterLink3,
        FooterLink4Data = DataFooter().FooterLink4,
        FooterLink5Data = DataFooter().FooterLink5,
        FooterLink6Data = DataFooter().FooterLink6;
    const [subscribeData, setSubscribeData] = useState({
        subscribeEmail: ""
    })
    const { subscribeemail } = subscribeData;
    const [notify, setnotify] = useState('');
    const [status, setStatus] = useState(t("Subscribe"));
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
                        setStatus(t("Subscribe"));
                        setClassStatus('');
                        setnotify('');
                    }, 3000);
                }, (error) => {
                    console.log('FAILED...', error);
                });
        } else {
            setnotify(t("Email_is_invalid"));
            ref_email.current.focus();
        }
    }

    return (
        <>
            <footer className="footer">
                <div id="html-section-theme-footer" className="html-section">
                    <div className="footer-inner footer-theme-footer">
                        <div className="footer-newsletter-wrapper bordertop-true">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-8 col-xxl-8">
                                        <div className="footer-newsletter ">
                                            <h3 className="footer-newsletter-title">
                                                {t("Subscribe_Newsletter")}
                                            </h3>
                                            <div className="footer-newsletter-content">
                                                <form id="ContactFooterMobile" acceptCharset="UTF-8" className="footer__newsletter newsletter-form" onSubmit={(e) => subscribeSubmit(e)}>
                                                    <input type="hidden" name="form_type" value="customer" />
                                                    <input type="hidden" name="utf8" value="✓" />
                                                    <input type="hidden" name="contact[tags]" value="newsletter" />
                                                    <div className="newsletter-form__field-wrapper">
                                                        <div className="field">
                                                            <input ref={ref_email} id="subscribeEmail" type="email" name="subscribeEmail" className="field__input" placeholder={t("Your_email")} value={subscribeemail} onChange={inputChange} />
                                                            <label className="field__label" htmlFor="subscribeEmail">
                                                                {t("Your_email")}
                                                            </label>
                                                        </div>
                                                        <button type="submit" className={`button button--secondary newsletter-form__button ${classStatus}`} name="commit" id="Subscribe-Mobile">
                                                            {status}
                                                        </button>
                                                    </div>
                                                    <span className='subscribe-notify'>{notify}</span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="scroll-to-top col-12 col-sm-12 col-md-12 col-lg-3 col-xl-4 col-xxl-4">
                                        <ScrollToTop />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-main-wrapper">
                            <div className="container">
                                <div className="footer-main__content">
                                    <div className="bottom-footer__top">
                                        <div data-accordion-parent="true" className="row">
                                            <div className="footer__linklist col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                                                <div className={`footer__linklist-accordion accordion d-block d-lg-none ${checkToggle(1) ? 'open' : ''}`}>
                                                    <h4 className="accordion__title" onClick={(e) => { e.preventDefault(); if (currenttoggle === 1) setcurrenttoggle(0); else setcurrenttoggle(1); }}>
                                                        <span>{t("OUR_COLLECTIONS")}</span>
                                                        <SVGArrowDown />
                                                    </h4>
                                                    <div className={`footer-block__details-content accordion__content ${checkToggle(1) ? 'show' : 'accordionItemCollapsed'}`}>
                                                        <ul className="list-unstyled column-1">
                                                            {FooterLink1Data.map((links, index) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <Link href={links.url} className="link link--text list-menu__item list-menu__item--link">{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className="list-unstyled column-2">
                                                            {FooterLink2Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="footer__linklist-menu d-none d-lg-block">
                                                    <h2 className="footer-block__heading">{t("OUR_COLLECTIONS")}</h2>
                                                    <div className="footer-block__details-content-desktop row">
                                                        <ul className="footer-block__details-content list-unstyled  col-12 col-sm-6 ">
                                                            {FooterLink1Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className="footer-block__details-content list-unstyled col-12 col-sm-6">
                                                            {FooterLink2Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer__linklist col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                                                <div className={`footer__linklist-accordion accordion d-block d-lg-none ${checkToggle(2) ? 'open' : ''}`}>
                                                    <h4 className="accordion__title" onClick={(e) => { e.preventDefault(); if (currenttoggle === 2) setcurrenttoggle(0); else setcurrenttoggle(2); }}>
                                                        <span>{t("CUSTOMER_SERVICES")}</span>
                                                        <SVGArrowDown />
                                                    </h4>
                                                    <div className={`footer-block__details-content accordion__content ${checkToggle(2) ? 'show' : 'accordionItemCollapsed'}`}>
                                                        <ul className="list-unstyled column-1">
                                                            {FooterLink3Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className="list-unstyled column-2">
                                                            {FooterLink4Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="footer__linklist-menu d-none d-lg-block">
                                                    <h2 className="footer-block__heading">{t("CUSTOMER_SERVICES")}</h2>
                                                    <div className="footer-block__details-content-desktop row">
                                                        <ul className="footer-block__details-content list-unstyled  col-12 col-sm-6 ">
                                                            {FooterLink3Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className="footer-block__details-content list-unstyled col-12 col-sm-6">
                                                            {FooterLink4Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer__linklist col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                                                <div className={`footer__linklist-accordion accordion d-block d-lg-none ${checkToggle(3) ? 'open' : ''}`}>
                                                    <h4 className="accordion__title" onClick={(e) => { e.preventDefault(); if (currenttoggle === 3) setcurrenttoggle(0); else setcurrenttoggle(3); }}>
                                                        <span>{t("INFORMATION")}</span>
                                                        <SVGArrowDown />
                                                    </h4>
                                                    <div className={`footer-block__details-content accordion__content ${checkToggle(3) ? 'show' : 'accordionItemCollapsed'}`}>
                                                        <ul className="list-unstyled column-1">
                                                            {FooterLink5Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className="list-unstyled column-2">
                                                            {FooterLink6Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="footer__linklist-menu d-none d-lg-block">
                                                    <h2 className="footer-block__heading">{t("INFORMATION")}</h2>
                                                    <div className="footer-block__details-content-desktop row">
                                                        <ul className="footer-block__details-content list-unstyled  col-12 col-sm-6 ">
                                                            {FooterLink5Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className="footer-block__details-content list-unstyled col-12 col-sm-6">
                                                            {FooterLink6Data.map((links, index) => {
                                                                return (
                                                                    <li key={index} >
                                                                        <Link className="link link--text list-menu__item list-menu__item--link" href={links.url}>{links.text}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer__information col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                                                <div className={`footer__linklist-accordion accordion d-block d-lg-none ${checkToggle(4) ? 'open' : ''}`}>
                                                    <h4 className="accordion__title" onClick={(e) => { e.preventDefault(); if (currenttoggle === 4) setcurrenttoggle(0); else setcurrenttoggle(4); }}>
                                                        <span>{t("SHOP_NAME")}</span>
                                                        <SVGArrowDown />
                                                    </h4>
                                                    <div className={`accordion__content footer-block__details-content ${checkToggle(4) ? 'show' : 'accordionItemCollapsed'}`}>
                                                        <div className="footer__list-info">
                                                            <div className="footer__list-info-item location-area">
                                                                <SVGLocationPin />
                                                                <div className="content">{t("Location")}</div>
                                                            </div>
                                                            <div className="footer__list-info-item phone-area ">
                                                                <SVGPhone />
                                                                <div className="content">{t("Shop_Phone")}</div>
                                                            </div><div className="footer__list-info-item email-area">
                                                                <SVGEnvolope />
                                                                <div className="content">{t("Email")}</div>
                                                            </div>
                                                        </div>
                                                        <div className="footer__list-social">
                                                            <ul className="list-unstyled list-social" role="list">
                                                                <li className="list-social__item list-social__twitter">
                                                                    <Link href="https://twitter.com/kalathemes" className="link link--text list-social__link" >
                                                                        <SVGTwitter />
                                                                        <span className="social-text">Twitter</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-social__item list-social__facebook">
                                                                    <Link href="https://facebook.com/kalathemes" className="link link--text list-social__link" >
                                                                        <SVGFacebook />
                                                                        <span className="social-text">Facebook</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-social__item list-social__instagram">
                                                                    <Link href="http://instagram.com/kalathemes" className="link link--text list-social__link" >
                                                                        <SVGInstagram />
                                                                        <span className="social-text">Instagram</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-social__item list-social__tiktok">
                                                                    <Link href="https://tiktok.com/@kalathemes" className="link link--text list-social__link" >
                                                                        <SVGTikTok />
                                                                        <span className="social-text">TikTok</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="visually-hidden list-social__item--placeholder">Follow us on social media!</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer__newsletter_social d-none d-lg-block">
                                                    <h2 className="footer-block__heading">{t("SHOP_NAME")}</h2><div className="footer-block__details-content">
                                                        <div className="footer__list-info">
                                                            <div className="footer__list-info-item location-area">
                                                                <SVGLocationPin />
                                                                <div className="content">{t("Location")}</div>
                                                            </div>
                                                            <div className="footer__list-info-item phone-area">
                                                                <SVGPhone />
                                                                <div className="content">{t("Shop_Phone")}</div>
                                                            </div>
                                                            <div className="footer__list-info-item email-area">
                                                                <SVGEnvolope />
                                                                <div className="content">{t("Shop_Email")}</div>
                                                            </div>
                                                        </div>
                                                        <div className="footer__list-social">
                                                            <ul className="list-unstyled list-social" role="list">
                                                                <li className="list-social__item list-social__twitter">
                                                                    <Link href="https://twitter.com/kalathemes" className="link link--text list-social__link" >
                                                                        <SVGTwitter />
                                                                        <span className="social-text">Twitter</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-social__item list-social__facebook">
                                                                    <Link href="https://facebook.com/kalathemes" className="link link--text list-social__link" >
                                                                        <SVGFacebook />
                                                                        <span className="social-text">Facebook</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-social__item list-social__instagram">
                                                                    <Link href="http://instagram.com/kalathemes" className="link link--text list-social__link" >
                                                                        <SVGInstagram />
                                                                        <span className="social-text">Instagram</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="list-social__item list-social__tiktok">
                                                                    <Link href="https://tiktok.com/@kalathemes" className="link link--text list-social__link" >
                                                                        <SVGTikTok />
                                                                        <span className="social-text">TikTok</span>
                                                                    </Link>
                                                                </li>
                                                                <li className="visually-hidden list-social__item--placeholder">Follow us on social media!</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom-wrapper">
                            <div className="container">
                                <div className="footer-bottom__content row">
                                    <div className="footer__copyright col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                        {t("Copy_right")} <Link href="/" title="">{t("Shop_info")}</Link>
                                    </div>
                                    <div className="footer__payment col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                        <ul className="list list-payment" role="list">
                                            <li className="list-payment__item">
                                                <SVGVisa />
                                            </li>
                                            <li className="list-payment__item">
                                                <SVGMastercard />
                                            </li>
                                            <li className="list-payment__item">
                                                <SVGAmericanExpress />
                                            </li>
                                            <li className="list-payment__item">
                                                <SVGPayPal />
                                            </li>
                                            <li className="list-payment__item">
                                                <SVGDinersClub />
                                            </li>
                                            <li className="list-payment__item">
                                                <SVGDiscover />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;