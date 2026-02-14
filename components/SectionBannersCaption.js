import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'
import { DataIndexBannersCaption } from './data/DataIndexBannersCaption';
import styles from '../public/assets/styles/Home2.module.css'

const SectionBannersCaption = () => {
    const { t } = useTranslation();

    const ElementCaption = (props) => {
        return (
            <div className={`${styles.banners_caption_item} caption-true col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                <div className="effect effect-shine caption-position-">
                    <Link href={props.link} className='banner-grid__link effect-parent'>
                        <Image className="banner-grid__link effect-parent" src={props.img} alt="" width={440} height={255} />
                    </Link>
                    <div className={styles.banners_caption_captionarea}>
                        <Link href={props.link} className={styles.banners_caption_heading}>{props.title}</Link>
                        <div className={styles.banners_caption_desc}>{props.desc}</div>
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
                        <div className={`${styles.banners_caption_wrapper} title-position-left title-style-`}>
                            <div className={`${styles.box_divider} box-divider no-border`}>
                                <h2 className={`${styles.box_title} box-title`}>{DataIndexBannersCaption().title}</h2>
                            </div>
                            <div className={styles.banners_caption__container}>
                                <div className={`${styles.banners_caption_row} row`}>
                                    <ElementCaption img={DataIndexBannersCaption().element1_img}
                                        link={DataIndexBannersCaption().element1_link}
                                        title={DataIndexBannersCaption().element1_title}
                                        desc={DataIndexBannersCaption().element1_desc} />
                                    <ElementCaption img={DataIndexBannersCaption().element2_img}
                                        link={DataIndexBannersCaption().element2_link}
                                        title={DataIndexBannersCaption().element2_title}
                                        desc={DataIndexBannersCaption().element2_desc} />
                                    <ElementCaption img={DataIndexBannersCaption().element3_img}
                                        link={DataIndexBannersCaption().element3_link}
                                        title={DataIndexBannersCaption().element3_title}
                                        desc={DataIndexBannersCaption().element3_desc} />
                                    <ElementCaption img={DataIndexBannersCaption().element4_img}
                                        link={DataIndexBannersCaption().element4_link}
                                        title={DataIndexBannersCaption().element4_title}
                                        desc={DataIndexBannersCaption().element4_desc} />
                                    <ElementCaption img={DataIndexBannersCaption().element5_img}
                                        link={DataIndexBannersCaption().element5_link}
                                        title={DataIndexBannersCaption().element5_title}
                                        desc={DataIndexBannersCaption().element5_desc} />
                                    <ElementCaption img={DataIndexBannersCaption().element6_img}
                                        link={DataIndexBannersCaption().element6_link}
                                        title={DataIndexBannersCaption().element6_title}
                                        desc={DataIndexBannersCaption().element6_desc} />
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