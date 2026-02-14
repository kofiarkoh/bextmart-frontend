import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'
import { DataIndexBannersCaption } from './data/DataIndexBannersCaption2';
import styles from '../public/assets/styles/Home3.module.css'

const SectionBannersCaption = () => {
    const { t } = useTranslation();

    const ElementCaption = (props) => {
        return (
            <div className={`${styles.banners_caption_item} caption-true col-6 col-sm-4 col-md-2-4 col-lg-2-4 col-xl-2-4 col-xxl-2-4`}>
                <div className="effect effect-shine caption-position-">
                    <Link href={props.link} className='banner-grid__link effect-parent'>
                        <Image className="banner-grid__link effect-parent" src={props.img} alt="" width={440} height={255} />
                    </Link>
                    <div className={styles.banners_caption_captionarea}>
                        <Link href={props.link} className={styles.banners_caption_heading}>{props.title}</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className="html-section index-banners-caption">
                <div className={styles.banners_caption}>
                    <div className="container">
                        <div className={`banners_caption_wrapper} title-position-left title-style-`}>
                            <div className={`${styles.box_divider} box-divider no-border`}>
                                <h2 className={`${styles.box_title} box-title`}>{DataIndexBannersCaption().title}</h2>
                            </div>
                            <div className={styles.banners_caption__container}>
                                <div className={`${styles.banners_caption_row} row`}>
                                    <ElementCaption img={DataIndexBannersCaption().element1_img}
                                        link={DataIndexBannersCaption().element1_link}
                                        title={DataIndexBannersCaption().element1_title} />
                                    <ElementCaption img={DataIndexBannersCaption().element2_img}
                                        link={DataIndexBannersCaption().element2_link}
                                        title={DataIndexBannersCaption().element2_title} />
                                    <ElementCaption img={DataIndexBannersCaption().element3_img}
                                        link={DataIndexBannersCaption().element3_link}
                                        title={DataIndexBannersCaption().element3_title} />
                                    <ElementCaption img={DataIndexBannersCaption().element4_img}
                                        link={DataIndexBannersCaption().element4_link}
                                        title={DataIndexBannersCaption().element4_title} />
                                    <ElementCaption img={DataIndexBannersCaption().element5_img}
                                        link={DataIndexBannersCaption().element5_link}
                                        title={DataIndexBannersCaption().element5_title} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionBannersCaption;