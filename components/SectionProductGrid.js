import React from "react";
import Link from 'next/link';
import ProductItemGrid from './ultils/ProductItemGrid'
import useTranslation from './ultils/useTranslation'
import Product_en from "../public/locales/en/en_Product.json";
import Product_jp from "../public/locales/jp/jp_Product.json";
import Product_fr from "../public/locales/fr/fr_Product.json";
import Product_it from "../public/locales/it/it_Product.json";
import styles from '../public/assets/styles/Home.module.css'

const SectionProductGrid = (props) => {
    const { t, locale } = useTranslation();
    let Productdata, titlecenter = false;
    switch (locale) {
        case 'en':
            Productdata = Product_en.slice(3, 18); break;
        case 'fr':
            Productdata = Product_fr.slice(3, 18); break;
        case 'it':
            Productdata = Product_it.slice(3, 18); break;
        case 'jp':
            Productdata = Product_jp.slice(3, 18); break;
    }
    if(props.titlecenter) titlecenter = true;

    return (
        <>
            <section className="html-section index-products-grid">
                <div className={`${styles.products_grid} spaced-section`}>
                    <div className="container">
                        <div className={`${styles.products_grid_container} ${titlecenter? 'title-position-center': 'title-position-left'}`}>
                            <div className={`${styles.products_grid_boxdivider} box-divider`}>
                                <h2 className={styles.products_grid_boxtitle}>{t("BEST_OF_THE_MONTH")}</h2>
                                <div className="viewall"><Link href="/collections">{t("VIEW_ALL")} &gt;&gt;</Link></div>
                            </div>
                            <div className={styles.products_grid_content}>
                                <div className="collection-grid__content">
                                    <div className={`${styles.products_grid_row } row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5`}>
                                        {
                                            Productdata.map((item, index) => (
                                                <div key={index} className="product-item__content col d-none d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                                    <ProductItemGrid product={item} /> 
                                                </div>
                                            ))
                                        }
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

export default SectionProductGrid;