import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/Collection.module.css'
import { useGetCategoriesQuery } from '../store/productsApi'
import { buildImageUrl } from '../components/ultils/Tools'

export default function CollectionsPage() {
    const { t } = useTranslation();
    const { data, isLoading } = useGetCategoriesQuery();

    const collections = (data?.data?.data || []).filter((cat) => cat.is_collection);

    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-list-collections');
    }

    return (
        <>
            <Head>
                <title>{t("Breadcrumb_Collections")}</title>
            </Head>

            <Header />
            <main>
                <Breadcrumbs />
                <div className={styles.collections_list}>
                    <div className="collections-list-template__layout">
                        <div className="container">
                            <div className="collections-list-template__content">
                                {isLoading && (
                                    <p style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>Loading collections...</p>
                                )}
                                {!isLoading && collections.length === 0 && (
                                    <p style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>No collections found.</p>
                                )}
                                <div className={`${styles.collections_list_collection} row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3`}>
                                    {collections.map((cat) => (
                                        <div className={`col ${styles.collections_list_content}`} key={cat.id}>
                                            <div className={styles.collections_list_item_grid}>
                                                <Link href={`/products?category=${cat.slug}`} className={styles.collections_list_item_grid_link}>
                                                    {cat.cover_image ? (
                                                        <img
                                                            src={buildImageUrl(cat.cover_image)}
                                                            alt={cat.name}
                                                            className="product-item__image"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div style={{ width: '100%', aspectRatio: '1', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <i className={`ph ${cat.icon}`} style={{ fontSize: 48, color: '#ccc' }} />
                                                        </div>
                                                    )}
                                                </Link>
                                                <div className={styles.collections_list_item_hover}>
                                                    <Link href={`/products?category=${cat.slug}`} className="collection-item__info">
                                                        <h4 className={styles.collections_list_item_hover_title}>{cat.name}</h4>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
