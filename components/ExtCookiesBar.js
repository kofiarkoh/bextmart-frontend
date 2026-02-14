import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useTranslation from './ultils/useTranslation'

const ExtCookiesBar = () => {
    const [open, setOpen] = useState(false);
    const currentday = new Date();
    const { t } = useTranslation();

    useEffect(() => {
        if (localStorage.getItem('yam-cookies-bar') === '' || localStorage.getItem('yam-cookies-bar') === null || localStorage.getItem('yam-cookies-bar') === undefined) {
            setOpen(true);
        } else {
            const checkTime = new Date().getDate() - new Date(localStorage.getItem('yam-cookies-bar')).getDate();
            console.log('Cookies Bar disabled: ' + checkTime + '/3 days');
            if (checkTime > 3 || checkTime < -3) {
                setTimeout(() => {
                    setOpen(localStorage);
                    localStorage.removeItem('yam-cookies-bar');
                }, 7000);
                setOpen(true);
            }
        }

    }, []);

    function close() {
        setOpen(false);
        localStorage.setItem('yam-cookies-bar', currentday);
    }


    return (
        <section className={`html-section cookies-bar ${open ? 'show' : 'hidden'}`}>
            <div className="cookies-bar cookies-bar__layout is-open" data-section="cookies-bar">
                <div className="cookies-bar__content">
                    <div className="cookies-bar__caption">
                        <span className="cookies-bar__title">
                            {t("Cookie_bar_content")}
                        </span>
                        <Link className="action-text" target="_blank" rel="noopener" href="https://cookiesandyou.com">{t("Learn_more")}</Link>
                    </div>
                    <div className="button cookies-bar__action" data-cookies-bar-close="" onClick={close}>{t("Got_it")}</div>
                </div>
            </div>
        </section>
    )

}

export default ExtCookiesBar;