import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
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
import { getSessionSeed } from '../components/ultils/sessionSeed'
import styles from '../public/assets/styles/Home.module.css'

const PRODUCTS_SEED_KEY = 'bextmart_products_seed'

// Must match .products_page_grid's grid-template-columns in Home.module.css
// (repeat(auto-fill, minmax(GRID_CARD_MIN_WIDTH, 1fr))) with gap GRID_GAP.
const GRID_CARD_MIN_WIDTH = 180
const GRID_GAP = 16
const GRID_ROWS_PER_PAGE = 4

function columnsForWidth(width) {
  if (!width) return 1
  return Math.max(1, Math.floor((width + GRID_GAP) / (GRID_CARD_MIN_WIDTH + GRID_GAP)))
}

const ProductsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const page = Number(router.query.page || 1)
  const category = router.query.category || undefined
  const urlSort = router.query.sort || undefined
  const urlSeed = router.query.seed || undefined

  const [mounted, setMounted] = useState(false)
  const [sessionSeed, setSessionSeed] = useState(undefined)
  useEffect(() => {
    setMounted(true)
    setSessionSeed(getSessionSeed(PRODUCTS_SEED_KEY))
  }, [])

  // Default to a randomized, session-stable order when the URL has no explicit sort.
  const sort = urlSort || (router.isReady ? 'random' : undefined)
  const seed = urlSeed || (sort === 'random' ? sessionSeed : undefined)

  // Ask the API for exactly as many products as will fill whole grid rows,
  // so the last page never leaves a lone, stretched-out card behind.
  const gridRef = useRef(null)
  const [perPage, setPerPage] = useState(undefined)
  const updatePerPage = useCallback(() => {
    const width = gridRef.current?.clientWidth
    if (!width) return
    setPerPage((prev) => {
      const next = Math.min(100, columnsForWidth(width) * GRID_ROWS_PER_PAGE)
      return next === prev ? prev : next
    })
  }, [])

  useEffect(() => {
    if (!mounted) return
    updatePerPage()
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(updatePerPage, 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [mounted, updatePerPage])

  // If the fill count changes (e.g. window resized into a different column
  // count) after we've already loaded a page, jump back to page 1 rather
  // than risk landing on a now out-of-range page under the new page size.
  const lastPerPage = useRef(perPage)
  useEffect(() => {
    if (lastPerPage.current === undefined) {
      lastPerPage.current = perPage
      return
    }
    if (perPage !== undefined && perPage !== lastPerPage.current) {
      lastPerPage.current = perPage
      if (page !== 1) {
        const query = { page: 1 }
        if (category) query.category = category
        if (sort) query.sort = sort
        if (seed) query.seed = seed
        router.replace({ pathname: '/products', query }, undefined, { shallow: true })
      }
    }
  }, [perPage])

  const { data, isLoading: isQueryLoading, isError } = useSearchProductsQuery(
    { page, per_page: perPage, ...(category && { category }), ...(sort && { sort }), ...(seed && { seed }) },
    { skip: !router.isReady || !perPage || (sort === 'random' && !seed) }
  )
  const isLoading = !mounted || !perPage || isQueryLoading

  const pageData = data?.data || {}
  const items = Array.isArray(pageData.data) ? pageData.data : []
  const currentPage = pageData.current_page || page
  const lastPage = pageData.last_page || 1

  useEffect(() => {
    if (router.isReady && !urlSort && !urlSeed && seed) {
      router.replace(
        { pathname: '/products', query: { page, ...(category && { category }), sort, seed } },
        undefined,
        { shallow: true }
      )
    }
  }, [router.isReady, urlSort, urlSeed, seed])

  const pagesToShow = useMemo(() => {
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(lastPage, currentPage + 2)
    const pages = []
    for (let i = start; i <= end; i += 1) pages.push(i)
    return pages
  }, [currentPage, lastPage])

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > lastPage) return
    const query = { page: nextPage }
    if (category) query.category = category
    if (sort) query.sort = sort
    if (seed) query.seed = seed
    router.push({ pathname: '/products', query })
  }

  return (
    <>
      <Head>
        <title>{category ? `${category} — Products` : t('Products')}</title>
      </Head>
      <Header />
      <main>
        <Breadcrumbs />
        <section className="html-section index-products-grid">
          <div className={styles.products_grid}>
            <div className="container">
              <div className={styles.products_grid_container}>
                {category && (
                  <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, textTransform: 'capitalize' }}>
                      {category.replace(/-/g, ' ')}
                    </h2>
                    <Link href="/products" style={{ fontSize: 13, color: '#888' }}>
                      Clear filter ×
                    </Link>
                  </div>
                )}
                <div className={styles.products_grid_content}>
                  <div className="collection-grid__content">
                    <div ref={gridRef} className={styles.products_page_grid}>
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
                      {!isLoading && !isError && items.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px', width: '100%' }}>
                          <p style={{ fontSize: 16, color: '#888' }}>No products found for this search. Please try again...</p>
                        </div>
                      )}
                      {!isLoading && !isError && items.map((item, index) => (
                        <div key={item?.id || index} className="product-item__content">
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 12px',
                    backgroundColor: '#fff',
                    color: 'var(--color_heading)',
                    borderColor: 'var(--color_line)',
                  }}
                  aria-label="Previous page"
                >
                  <SVGArrowLeft />
                </button>
                {pagesToShow.map((p) => (
                  <Link
                    key={p}
                    href={{
                      pathname: '/products',
                      query: { page: p, ...(category && { category }), ...(sort && { sort }), ...(seed && { seed }) },
                    }}
                    className="button button--secondary"
                    style={{
                      minWidth: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 12px',
                      fontWeight: p === currentPage ? 700 : 400,
                      backgroundColor: p === currentPage ? 'var(--color_primary)' : '#fff',
                      color: p === currentPage ? '#fff' : 'var(--color_heading)',
                      borderColor: p === currentPage ? 'var(--color_primary)' : 'var(--color_line)',
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 12px',
                    backgroundColor: '#fff',
                    color: 'var(--color_heading)',
                    borderColor: 'var(--color_line)',
                  }}
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
