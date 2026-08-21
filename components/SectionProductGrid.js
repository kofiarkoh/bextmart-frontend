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
        ? resolvedItems.slice(0, 12)
        : [];
    const titlecenter = Boolean(props.titlecenter);

    return (
        <>
            <section className="html-section index-products-grid" style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
                {/* faint crosshatch grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }} />
                {/* top-right accent blob */}
                <div style={{ position: 'absolute', top: -120, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ padding: '48px 0 64px', position: 'relative' }}>
                    <div className="container">
                        {/* Section header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
                            <div>
                                <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color_primary)' }}>
                                    Featured
                                </p>
                                <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: 'var(--color_heading)', lineHeight: 1.2 }}>
                                    {t("BEST_OF_THE_MONTH")}
                                </h2>
                            </div>
                            <Link href="/products" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
                                fontSize: 13, fontWeight: 600, color: 'var(--color_primary)',
                                textDecoration: 'none', paddingBottom: 4,
                            }}>
                                {t("VIEW_ALL")}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"/>
                                </svg>
                            </Link>
                        </div>

                        {/* Grid */}
                        <div className={`${styles.products_grid_row} row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5`}>
                            {isLoading && Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="col">
                                    <div style={{ borderRadius: 12, overflow: 'hidden', background: '#f5f5f5' }}>
                                        <div style={{ paddingBottom: '100%', background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
                                        <div style={{ padding: '12px' }}>
                                            <div style={{ height: 13, background: '#e0e0e0', borderRadius: 4, marginBottom: 8, width: '72%' }} />
                                            <div style={{ height: 13, background: '#e0e0e0', borderRadius: 4, width: '40%' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!isLoading && isError && (
                                <div className="col" style={{ gridColumn: '1 / -1' }}>
                                    <p style={{ color: 'var(--color_body)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Failed to load products.</p>
                                </div>
                            )}
                            {!isLoading && !isError && displayItems.map((item, index) => (
                                <div key={item?.id || index} className="product-item__content col">
                                    <ProductItemGrid product={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <style jsx global>{`
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
            </section>
        </>
    )
}

export default SectionProductGrid;
