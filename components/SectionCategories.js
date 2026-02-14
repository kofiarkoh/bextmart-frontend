import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from './ultils/useTranslation'
import { DataIndexCategories } from './data/DataIndexCategories2';
import { SVGIcon1, SVGIcon2, SVGIcon3, SVGIcon4, SVGIcon5, SVGIcon6, SVGIcon7, SVGIcon8, SVGIcon9, SVGIcon10 } from '../public/assets/SVG';
import styles from '../public/assets/styles/Home3.module.css'

const SectionCategories = () => {
    const { t } = useTranslation();

    function firstBox(text, link, svgicon) {
        return (
            <div className={`${styles.categories_category__item} col-3 col-sm-3 col-md-6 col-lg-4 col-xl-3 col-xxl-3`}>
                <div className={`${styles.cateitem_content}`}>
                    <Link href={link} className={styles.cateitem_image_gr}>
                        <div className="category__svg">{svgicon}</div>
                    </Link>
                    <Link href={link} className={styles.cateitem_caption}>
                        {text}
                    </Link>
                </div>
            </div>
        )
    }

    function secondBox(text, link, img) {
        return (
            <div className={`${styles.categories_category__item} col-4 col-sm-4 col-md-6 col-lg-6 col-xl-4 col-xxl-4`}>
                <div className={`${styles.cateitem_content}`}>
                <Link href={link} className={styles.cateitem_image_gr}>
                        <Image src={img} alt="" width={84} height={84} />
                    </Link>
                    <Link href={link} className={styles.cateitem_caption}>
                        {text}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className={`html-section ${styles.index_categories}`}>
                <div className={`spaced-section`}>
                    <div className="container">
                        <div className='categories__container'>
                            <div className={`${styles.categories__content} row`}>
                                <div className={`${styles.categories_1} categories-1 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                                    <div className={styles.categories__content_gr}>
                                        <div className={`${styles.categories_box} row`}>
                                            {firstBox(t("Flash_Sale"), DataIndexCategories().cate1_link, <SVGIcon1 />)}
                                            {firstBox(t("Free_Shipping"), DataIndexCategories().cate2_link, <SVGIcon2 />)}
                                            {firstBox(t("Sale_Up_To50_Off"), DataIndexCategories().cate3_link, <SVGIcon3 />)}
                                            {firstBox(t("Vouchers_Coupons"), DataIndexCategories().cate4_link, <SVGIcon4 />)}
                                            {firstBox(t("Women_Clothing"), DataIndexCategories().cate5_link, <SVGIcon5 />)}
                                            {firstBox(t("New_Collection"), DataIndexCategories().cate6_link, <SVGIcon6 />)}
                                            {firstBox(t("Discounts_Online"), DataIndexCategories().cate7_link, <SVGIcon7 />)}
                                            {firstBox(t("Gift_Shops"), DataIndexCategories().cate8_link, <SVGIcon8 />)}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.categories_2} categories-2 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                                    <div className={styles.categories__content_gr}>
                                    <div className={`${styles.categories_box} row`}>
                                            {secondBox(t("Index3_Cate1"), DataIndexCategories().cate9_link, DataIndexCategories().img1)}
                                            {secondBox(t("Index3_Cate2"), DataIndexCategories().cate10_link, DataIndexCategories().img2)}
                                            {secondBox(t("Index3_Cate3"), DataIndexCategories().cate11_link, DataIndexCategories().img3)}
                                            {secondBox(t("Index3_Cate4"), DataIndexCategories().cate12_link, DataIndexCategories().img4)}
                                            {secondBox(t("Index3_Cate5"), DataIndexCategories().cate13_link, DataIndexCategories().img5)}
                                            {secondBox(t("Index3_Cate6"), DataIndexCategories().cate14_link, DataIndexCategories().img6)}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.categories_3} categories-3 col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                                    <div className={styles.categories__content_gr}>
                                    <div className={`${styles.categories_box} row`}>
                                            {secondBox(t("Index3_Cate7"), DataIndexCategories().cate15_link, DataIndexCategories().img7)}
                                            {secondBox(t("Index3_Cate8"), DataIndexCategories().cate16_link, DataIndexCategories().img8)}
                                            {secondBox(t("Index3_Cate9"), DataIndexCategories().cate17_link, DataIndexCategories().img9)}
                                            {secondBox(t("Index3_Cate10"), DataIndexCategories().cate18_link, DataIndexCategories().img10)}
                                            {secondBox(t("Index3_Cate11"), DataIndexCategories().cate19_link, DataIndexCategories().img11)}
                                            {secondBox(t("Index3_Cate12"), DataIndexCategories().cate20_link, DataIndexCategories().img12)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionCategories;