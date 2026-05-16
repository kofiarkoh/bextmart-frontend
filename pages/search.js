import React, { useMemo, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from '../components/ultils/useTranslation'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductItemGrid from '../components/ultils/ProductItemGrid'
import SearchPageSkeleton from '../components/ultils/SearchPageSkeleton'
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG'
import { useSearchProductsQuery, useSaveSearchMutation } from '../store/productsApi'
import styles from '../public/assets/styles/SearchPage.module.css'

export default function SearchPage() {
    if (typeof window !== 'undefined') {
        document.body.className = ''
        document.body.classList.add('template-search')
    }

    const router = useRouter()
    const { t } = useTranslation()
    const q = router.query.q || ''
    const page = Number(router.query.page || 1)

    const { data, isLoading, isError } = useSearchProductsQuery(
        { q, page },
        { skip: q.length < 2 }
    )

    const [saveSearch] = useSaveSearchMutation()

    useEffect(() => {
        if (q.length >= 2) {
            saveSearch({ query: q }).catch(() => {})
        }
    }, [q])

    const pageData = data?.data || {}
    const items = Array.isArray(pageData.data) ? pageData.data : (Array.isArray(data?.data) ? data.data : [])
    const currentPage = pageData.current_page || page
    const lastPage = pageData.last_page || 1
    const total = pageData.total ?? items.length

    const pagesToShow = useMemo(() => {
        const start = Math.max(1, currentPage - 2)
        const end = Math.min(lastPage, currentPage + 2)
        const pages = []
        for (let i = start; i <= end; i++) pages.push(i)
        return pages
    }, [currentPage, lastPage])

    const goToPage = (nextPage) => {
        if (nextPage < 1 || nextPage > lastPage) return
        router.push({ pathname: '/search', query: { q, page: nextPage } })
    }

    if (q.length < 2) {
        return (
            <>
                <Head><title>{t('Search_page')}</title></Head>
                <Header />
                <main>
                    <Breadcrumbs text={q} />
                    <div className="search-template">
                        <div className="search-template__layout">
                            <div className="container">
                                <div className={styles.no_product}>
                                    <h2>{t('Search_atleast_3')}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Head><title>{t('Search_page')}</title></Head>
            <Header />
            <main>
                <Breadcrumbs text={q} />
                <div className="search-template">
                    <div className="search-template__layout">
                        <div className="container">
                            {isLoading ? (
                                <SearchPageSkeleton />
                            ) : isError ? (
                                <div className={styles.no_product}>
                                    <h2>{t('Search_no_result1')} &ldquo;{q}&rdquo;</h2>
                                </div>
                            ) : (
                                <div className={styles.search_content}>
                                    <p className={styles.search_toptext}>
                                        {items.length === 0
                                            ? `${t('Search_no_result1')} "${q}" ${t('Search_no_result2')}`
                                            : `${total} ${t('Search_result_text')} "${q}"`}
                                    </p>

                                    {items.length > 0 && (
                                        <>
                                            <div className="search-template__results">
                                                <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5" style={{ gap: '16px', margin: 0 }}>
                                                    {items.map((item, index) => (
                                                        <div key={item?.id || index} style={{ padding: 0, minWidth: 0 }}>
                                                            <ProductItemGrid product={item} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {lastPage > 1 && (
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '32px' }}>
                                                    <button
                                                        type="button"
                                                        className="button button--secondary"
                                                        onClick={() => goToPage(currentPage - 1)}
                                                        disabled={currentPage <= 1}
                                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' }}
                                                        aria-label="Previous page"
                                                    >
                                                        <SVGArrowLeft />
                                                    </button>
                                                    {pagesToShow.map((p) => (
                                                        <Link
                                                            key={p}
                                                            href={{ pathname: '/search', query: { q, page: p } }}
                                                            className="button button--secondary"
                                                            style={{
                                                                minWidth: 40,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                padding: '8px 12px',
                                                                fontWeight: p === currentPage ? 700 : 400,
                                                                backgroundColor: p === currentPage ? 'var(--color_primary)' : '',
                                                                color: p === currentPage ? '#fff' : '',
                                                                borderColor: p === currentPage ? 'var(--color_primary)' : '',
                                                            }}
                                                        >
                                                            {p}
                                                        </Link>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="button button--secondary"
                                                        onClick={() => goToPage(currentPage + 1)}
                                                        disabled={currentPage >= lastPage}
                                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' }}
                                                        aria-label="Next page"
                                                    >
                                                        <SVGArrowRight />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
