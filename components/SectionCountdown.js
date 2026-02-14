import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import useTranslation from './ultils/useTranslation'
import CountdownTimer from '../components/ultils/CountdownTimer';
import styles from '../public/assets/styles/Home3.module.css'

const SectionCountdown = () => {
    const { t, locale } = useTranslation();
    let bkg, banner, timer="Mar 31 2023";
    switch (locale) {
        case 'en':
            bkg = '/assets/images/yam3-countdown-bkg.png';
            banner = '/assets/images/yam3-countdown-banner.png';
            break;
        case 'fr':
            bkg = '/assets/images/yam3-countdown-bkg.png';
            banner = '/assets/images/yam3-countdown-banner.png';
            break;
        case 'it':
            bkg = '/assets/images/yam3-countdown-bkg.png';
            banner = '/assets/images/yam3-countdown-banner.png';
            break;
        case 'jp':
            bkg = '/assets/images/yam3-countdown-bkg.png';
            banner = '/assets/images/yam3-countdown-banner.png';
            break;
    }

    const dateText = {
        days: t("Index3_Days"),
        hrs: t("Index3_Hrs"),
        mins: t("Index3_Mins"),
        secs: t("Index3_Secs")
    }

    return (
        <>
            <section className="index-banner-countdown">
                <div className={styles.bannercountdown}>
                    <div className="container">
                        <div className={`${styles.bannercountdown__container} bannercountdown__container`}>
                            <div className={styles.bannercountdown_bkg}>
                                <Image src={bkg} alt="" width={1290} height={105} />
                            </div>
                            <div className={styles.bannercountdown_caption_gr}>
                                <div className={styles.bannercountdown_caption_banner}>
                                    <Image src={banner} alt="" width={302} height={68} />
                                </div>
                                <div className={styles.bannercountdown_caption_caption}>
                                    <div className={styles.bannercountdown_caption_endin}>{t("Index3_Endin")}</div>
                                    <CountdownTimer targetDate={timer} text={dateText} />
                                    <Link className={`${styles.bannercountdown_caption_button} action button`} href="/collection/women-fashion">{t("Index3_Action")}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionCountdown;