import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import CurrencyConvert from './ultils/CurrencyConvert'

import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
const currentday = new Date();

const ExtNotification = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [isStored, setIsStored] = useState(false);
    const [count, setCount] = useState(0);
    const [notiImg, setNotiImg] = useState('/assets/images/68.png');
    const [notiName, setNotiName] = useState('');
    const [notiPrice, setNotiPrice] = useState('');
    const [notiURL, setNotiURL] = useState(''); 
    const { t, locale } = useTranslation();
    let Productdata;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(0, 12); break;
        case 'fr':
            Productdata = Product_fr.slice(0, 12); break;
        case 'it':
            Productdata = Product_it.slice(0, 12); break;
        case 'jp':
            Productdata = Product_jp.slice(0, 12); break;
    }   
    useEffect(() => {
        if (localStorage.getItem('yam-notification') === '' || localStorage.getItem('yam-notification') === null || localStorage.getItem('yam-notification') === undefined) {
            setTimeout(() => {
                setIsStored(false);
            }, 7000);
        } else {
            const checkTime = new Date().getDate() - new Date(localStorage.getItem('yam-notification')).getDate();
            console.log('Notification disabled: ' + checkTime + '/3 days');
            if (checkTime > 3 || checkTime < -3) {
                setTimeout(() => {
                    setIsStored(false);
                    localStorage.removeItem('yam-notification');
                }, 7000);
            } else {
                setIsStored(true);
            }
        }        

        if (!isStored) {
            const timer = setInterval(() => {
                if (!isShowing) {
                    setIsShowing(true);
                    if (count > 10) setCount(0);
                    const prod = Productdata[count];
                    setNotiImg(prod.image[0].imgpath);
                    setNotiName(prod.name);
                    setNotiURL("/product/"+prod.handle);
                    setNotiPrice(prod.price);
                    setCount((prevCount) => prevCount + 1);                    
                } else {
                    setIsShowing(false);
                }
            }, 5000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [isShowing, count, isStored, Productdata, notiImg, notiPrice]);

    function close() {
        setIsShowing(false);
        setIsStored(true);
        localStorage.setItem('yam-notification', currentday);
    }    

    return (
        <>
            <div className={`notification-component ajax-notification__layout ${isShowing ? 'show' : 'hide'}-popup`}>
                <div className="ajax-notification__content">
                    <div className="ajax-notification__image">
                        <Link href={notiURL}><Image src={notiImg} alt="" width={68} height={68} /></Link>
                    </div>
                    <div className="ajax-notification__info">
                        <p className="ajax-notification__title">{t("Other_customer_are_viewing")}</p>
                        <div className="ajax-notification__product">
                            <div className="ajax-notification__product-title"><Link href={notiURL}>{notiName}</Link></div>
                            <div className="ajax-notification__product-price"><CurrencyConvert amount={parseInt(notiPrice)} /></div>
                        </div>
                    </div>
                    <span className="ajax-notification__close" data-close onClick={close}>
                        x
                    </span>
                </div>
            </div>
        </>
    )
}

export default ExtNotification;