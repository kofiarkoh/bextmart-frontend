import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'
import styles from '../public/assets/styles/Home4.module.css'

const SectionBannersCaption3 = ({ data }) => {
    const { t } = useTranslation();

    const ElementTop = (props) => {
        return (
            <div className={`banner-grid__item caption-true col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                <div className="effect effect-shine">
                    <Link href={props.link} className='banner-grid__link effect-parent'>
                        <Image className="banner-grid__link effect-parent" src={props.bkg} alt="" width={417} height={201} />
                    </Link>
                    <div className={styles.bannercap3_top_captionarea}>
                        <div className={styles.bannercap3_top_captionarea_heading}>{props.title}</div>
                        <div className={styles.bannercap3_top_captionarea_desc}>{props.desc}</div>
                        <div className={styles.bannercap3_top_captionarea_action}><Link href={props.link} className={`${styles.bannercap3_top_captionarea_action_button} button`}>{props.action}</Link></div>                        
                    </div>
                </div>
            </div>
        )
    }

    const ElementBottom = (props) => {
        return (
            <div className={`banners-grid__item caption-true col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4`}>
                <div className={styles.bannercap3_bottom_itemgr}>
                    <div className={`${styles.bannercap3_bottom_boxdiv} box-divider`}>
                        <h2 className={`${styles.bannercap3_bottom_boxtitle} box-title`}>{props.title}</h2>
                        <div className="viewall"><Link href={props.link}>{props.action}</Link></div>
                    </div>
                    <div className={`${styles.bannercap3_bottom_content} box-content row`}>
                        <ElementInner title={props.block1_title} desc={props.block1_desc} img={props.block1_img} link={props.block1_link} />
                        <ElementInner title={props.block2_title} desc={props.block2_desc} img={props.block2_img} link={props.block2_link} />
                        <ElementInner title={props.block3_title} desc={props.block3_desc} img={props.block3_img} link={props.block3_link} />
                        <ElementInner title={props.block4_title} desc={props.block4_desc} img={props.block4_img} link={props.block4_link} />
                    </div>
                </div>
            </div>
        )
    }

    const ElementInner = (props) => {
        return (
            <div className="banners-effect effect-zoom col-6">
                <div className={styles.bannercap3_bottom_captionarea}>
                    <div className={styles.bannercap3_bottom_captionarea_heading}>
                        <Link href={props.link}>{props.title}</Link>
                    </div>
                    <div className={styles.bannercap3_bottom_captionarea_desc}>{props.desc}</div>
                </div>
                <Link href={props.link} className={`${styles.bannercap3_bottom_captionarea_link} effect-parent`}>
                    <Image className="banner-grid__link effect-parent" src={props.img} alt="" width={140} height={140} />
                </Link>
            </div>
        )
    }

    return (
        <>
            <section className="html-section index-banners-caption">
                <div className={styles.bannercap3_template}>
                    <div className="container">
                        <div className={`banner-grid__wrapper title-position-left title-style-`}>
                            <div className={styles.bannercap3_container}>
                                <div className={`row ${styles.row}`}>
                                    <ElementTop bkg={data.top_banner1_bkg}
                                        title={data.top_banner1_title}
                                        desc={data.top_banner1_desc}
                                        action={data.top_banner1_action}
                                        link={data.top_banner1_link} />
                                    <ElementTop bkg={data.top_banner2_bkg}
                                        title={data.top_banner2_title}
                                        desc={data.top_banner2_desc}
                                        action={data.top_banner2_action}
                                        link={data.top_banner2_link} />
                                    <ElementTop bkg={data.top_banner3_bkg}
                                        title={data.top_banner3_title}
                                        desc={data.top_banner3_desc}
                                        action={data.top_banner3_action}
                                        link={data.top_banner3_link} />
                                    <ElementBottom title={data.left_title} action={data.left_action} link={data.left_link}
                                        block1_title={data.left_block1_title} block1_desc={data.left_block1_desc} block1_img={data.left_block1_img} block1_link={data.left_block1_link}
                                        block2_title={data.left_block2_title} block2_desc={data.left_block2_desc} block2_img={data.left_block2_img} block2_link={data.left_block2_link}
                                        block3_title={data.left_block3_title} block3_desc={data.left_block3_desc} block3_img={data.left_block3_img} block3_link={data.left_block3_link}
                                        block4_title={data.left_block4_title} block4_desc={data.left_block4_desc} block4_img={data.left_block4_img} block4_link={data.left_block4_link}
                                    />
                                    <ElementBottom title={data.middle_title} action={data.middle_action} link={data.middle_link}
                                        block1_title={data.middle_block1_title} block1_desc={data.middle_block1_desc} block1_img={data.middle_block1_img} block1_link={data.middle_block1_link}
                                        block2_title={data.middle_block2_title} block2_desc={data.middle_block2_desc} block2_img={data.middle_block2_img} block2_link={data.middle_block2_link}
                                        block3_title={data.middle_block3_title} block3_desc={data.middle_block3_desc} block3_img={data.middle_block3_img} block3_link={data.middle_block3_link}
                                        block4_title={data.middle_block4_title} block4_desc={data.middle_block4_desc} block4_img={data.middle_block4_img} block4_link={data.middle_block4_link}
                                    />
                                    <ElementBottom title={data.right_title} action={data.right_action} link={data.right_link}
                                        block1_title={data.right_block1_title} block1_desc={data.right_block1_desc} block1_img={data.right_block1_img} block1_link={data.right_block1_link}
                                        block2_title={data.right_block2_title} block2_desc={data.right_block2_desc} block2_img={data.right_block2_img} block2_link={data.right_block2_link}
                                        block3_title={data.right_block3_title} block3_desc={data.right_block3_desc} block3_img={data.right_block3_img} block3_link={data.right_block3_link}
                                        block4_title={data.right_block4_title} block4_desc={data.right_block4_desc} block4_img={data.right_block4_img} block4_link={data.right_block4_link}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionBannersCaption3;