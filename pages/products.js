import React, { useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import ProductItemGrid from '../components/ultils/ProductItemGrid'
import useTranslation from '../components/ultils/useTranslation'
import { SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG'
import { useSearchProductsQuery } from '../store/productsApi'
import styles from '../public/assets/styles/Home.module.css'

const ProductsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const page = Number(router.query.page || 1)

  const { data, isLoading, isError } = useSearchProductsQuery({ page })

  const pageData = data?.data || {}
  const items = Array.isArray(pageData.data) ? pageData.data : []
  const currentPage = pageData.current_page || page
  const lastPage = pageData.last_page || 1

  const pagesToShow = useMemo(() => {
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(lastPage, currentPage + 2)
    const pages = []
    for (let i = start; i <= end; i += 1) pages.push(i)
    return pages
  }, [currentPage, lastPage])

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > lastPage) return
    router.push({ pathname: '/products', query: { page: nextPage } })
  }

  return (
    <>
      <Head>
        <title>{t('Products')}</title>
      </Head>
      <Header />
      <main>
        <Breadcrumbs />
        <section className="html-section index-products-grid">
          <div className={`${styles.products_grid} spaced-section`}>
            <div className="container">
              <div className={`${styles.products_grid_container} title-position-left`}>
                <div className={`${styles.products_grid_boxdivider} box-divider`}>
                  <h2 className={styles.products_grid_boxtitle}>{t('Products')}</h2>
                </div>
                <div className={styles.products_grid_content}>
                  <div className="collection-grid__content">
                    <div className={`${styles.products_grid_row} row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5`}>
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
                      {!isLoading && !isError && items.map((item, index) => (
                        <div key={item?.id || index} className="product-item__content col d-none d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-block">
                          <ProductItemGrid product={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pagination" style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '32px' }}>
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
                    href={{ pathname: '/products', query: { page: p } }}
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProductsPage
