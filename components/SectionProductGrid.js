import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProductItemGrid from "./ultils/ProductItemGrid";
import useTranslation from "./ultils/useTranslation";
import { useSearchProductsQuery } from "../store/productsApi";
import styles from "../public/assets/styles/Home.module.css";


const SectionProductGrid = (props) => {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useSearchProductsQuery();
    const products = useSelector((state) => state.products.items);
    const resolvedItems = products?.length
        ? products
        : data?.data?.data || data?.data || data?.results || data || [];
    const displayItems = Array.isArray(resolvedItems)
        ? resolvedItems.slice(0, 5)
        : [];
    const titlecenter = Boolean(props.titlecenter);

    return (
        <>
            <section className="html-section index-products-grid">
                <div className={`${styles.products_grid} spaced-section`}>
                    <div className="container">
                        <div className={`${styles.products_grid_container} ${titlecenter? 'title-position-center': 'title-position-left'}`}>
                            <div className={`${styles.products_grid_boxdivider} box-divider`}>
                                <h2 className={styles.products_grid_boxtitle}>{t("BEST_OF_THE_MONTH")}</h2>
                                <Link href="/products" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 5,
                                    padding: '6px 16px', borderRadius: 20,
                                    border: '1.5px solid var(--color_primary)',
                                    color: 'var(--color_primary)',
                                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                                }}>
                                    {t("VIEW_ALL")}
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"/>
                                    </svg>
                                </Link>
                            </div>
                            <div className={styles.products_grid_content}>
                                <div className="collection-grid__content">
                                    <div className={`${styles.products_grid_row } row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5`}>
                                        {isLoading && (
                                            <div className="col">
                                                <div className="product-item__content">Loading...</div>
                                            </div>
                                        )}
                                        {!isLoading && isError && (
                                            <div className="col">
                                                <div className="product-item__content">Failed to load products.</div>
                                            </div>
                                        )}
                                        {!isLoading && !isError && displayItems.map((item, index) => (
                                            <div key={item?.id || index} className="product-item__content col d-none d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-block">
                                                <ProductItemGrid product={item} />
                                            </div>
                                        ))}
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
