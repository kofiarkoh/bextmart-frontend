import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import Paginator from 'react-hooks-paginator';
import useTranslation from '../components/ultils/useTranslation'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../public/assets/styles/BlogPage.module.css'
import { BlogsData } from '../components/data/DataBlog'

export default function BlogPage() {
    const { t } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-bloglist-nosidebar');
    }
    let PostsData = BlogsData().PostsData;

    const pageLimit = 4;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        setCurrentData(PostsData.slice(offset, offset + pageLimit));
    }, [offset, PostsData]);

    return (
        <>
            <Head>
                <title>{t("Blog_ListNoSidebar_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className={styles.blog_template__layout}>
                    <div className="container">
                        <div className='row'>                            
                            <div className={`${styles.blog_template__content} col-12 col-sm-12`}>                                
                                <div className={`blog-template__articles row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 row-cols-xxl-1`}>
                                    {currentData.map((data, index) => (
                                        <div className="article-item__content article-item__layout-list col" key={index}>
                                            <div className={styles.article_item__grid}>
                                                <div className={`${styles.article_item__content__layout_list_article_item__left} effect effect-scope3`}>
                                                    <Link href={data.url} className='article-item__link effect-parent'>
                                                        <Image src={data.image} alt={data.title} className={`article-item__image effect-img ${styles.article_item__image}`} fill
                                                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw" />
                                                    </Link>
                                                </div>
                                                <div className={`${styles.article_item__content__layout_list_article_item__right}`}>
                                                    <Link href={data.url} className={`${styles.article_item__title} h3`}>
                                                        {data.title}
                                                    </Link>
                                                    <ul className={`${styles.article_item__info} no-bullet`}>
                                                        <li className={`${styles.article_item__info_li} article-item__author`}>
                                                            {t("Blog_By")}
                                                            <span className={styles.article_item__author_user}>{data.author}</span>
                                                        </li>
                                                        <li className={`${styles.article_item__info_li} article-item__date`}>
                                                            {data.createat}
                                                        </li>
                                                    </ul>
                                                    <div className={styles.article_item__excerpt} dangerouslySetInnerHTML={{ __html: data.short }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pagination-wrapper">
                                    <nav className="pagination" role="navigation" aria-label="Pagination">
                                        <Paginator
                                            totalRecords={PostsData.length}
                                            pageLimit={pageLimit}
                                            pageNeighbours={2}
                                            setOffset={setOffset}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            pageContainerClass={`${styles.pagination__list} pagination__list list-unstyled`}
                                            pageItemClass="pagination__item"
                                            pageActiveClass="pagination__item--current"
                                            pagePrevText=">>"
                                            pageNextText="<<"
                                            pagePrevClass="pagination__item--next pagination__item-arrow"
                                            pageNextClass="pagination__item--prev pagination__item-arrow"
                                        />
                                    </nav>
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