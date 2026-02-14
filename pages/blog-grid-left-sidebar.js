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
import { SVGArrowDown, SVGClose } from '../public/assets/SVG';
import { BlogsData } from '../components/data/DataBlog'

export default function BlogPage() {
    const { t } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-bloggrid-leftsidebar');
    }
    let BlogData = BlogsData().BlogData,
        PostsData = BlogsData().PostsData,
        RelatedPosts = BlogsData().RelatedPosts;

    const pageLimit = 4;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sidebarCategory, setSidebarCategory] = useState(true);
    const [sidebarRelatedArticles, setSidebarRelatedArticles] = useState(true);
    const [sidebarMobile, setsidebarMobile] = useState(false);

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
                <title>{t("Blog_GridLeftSidebar_page")}</title>
            </Head>
            <Header/>
            <main>
                <Breadcrumbs />
                <div className={styles.blog_template__layout}>
                    <div className="container">
                        <div className='row'>
                        <div className={`${styles.blog_template__sidebar__left} col-12 col-sm-3 d-none d-md-block`}>
                                <div className="blog-sidebar__content">
                                    <div className={`${styles.blog_sidebar__item} accordion blog-sidebar__listing is-active ${sidebarCategory ? 'open' : ''}`}>
                                        <h4 className={`accordion__title ${styles.blog_sidebar__item_accordion__title}`} onClick={() => setSidebarCategory(o => !o)}>
                                            <span>{BlogData.category_title}</span>
                                            <SVGArrowDown />
                                        </h4>
                                        <div className={`${styles.blog_sidebar__item_accordion__content} accordion__content ${sidebarCategory ? '' : 'accordionItemCollapsed'}`}>
                                            <ul className="blog-sidebar__listing-content list-unstyled">
                                                {
                                                    BlogData.category_list.map((data, index) => (
                                                        <li key={index} className={styles.blog_sidebar__listing_content_li}>
                                                            <Link href={data.cate_link} className={`${styles.blog_sidebar__listing_content_li_list_menu__item} link link--text list-menu__item list-menu__item--link`}>
                                                                {data.cate_name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={`${styles.blog_sidebar__item}  accordion blog-sidebar__listing is-active ${sidebarRelatedArticles ? 'open' : ''}`}>
                                        <h4 className={`accordion__title ${styles.blog_sidebar__item_accordion__title}`} onClick={() => setSidebarRelatedArticles(o => !o)}>
                                            <span>{BlogData.sidebar_relatedPosts}</span>
                                            <SVGArrowDown />
                                        </h4>
                                        <div className={`${styles.blog_sidebar__item_accordion__content} accordion__content ${sidebarRelatedArticles ? '' : 'accordionItemCollapsed'}`}>
                                            {
                                                RelatedPosts.map((data, index) => (
                                                    <div className='article-item__content' key={index}>
                                                        <div className={`${styles.sidebar__item_article_item__grid} ${styles.article_item__grid}`}>
                                                            <div className={`${styles.article_item__left} effect effect-zoom`}>
                                                                <Link href={data.url} className="article-item__link effect-parent">
                                                                    <Image src={data.image} alt="" width={120} height={70} />
                                                                </Link>
                                                            </div>
                                                            <div className={`${styles.articles_article_item__right} ${styles.article_item__right}`}>
                                                                <Link href={data.url} className={`${styles.article_item__title} ${styles.sidebar__article_item_right_title} h3`}>
                                                                    {data.title}
                                                                </Link>
                                                                <ul className={`${styles.sidebar__article_item__right_info} article-item__info no-bullet`}>
                                                                    <li className={`article-item__author ${styles.article_item__info_li}`}>
                                                                        {t("Blog_By")}
                                                                        <span className={`article-item__author-user ${styles.article_item__author_user}`}>{data.author}</span>
                                                                    </li>
                                                                    <li className={`article-item__date ${styles.article_item__info_li}`}>
                                                                        {data.createat}
                                                                    </li>
                                                                </ul>
                                                                <div className={styles.sidebar__item_article_item__grid_readmore}>
                                                                    <Link href={data.url}>
                                                                        {t("Blog_Read_more")}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={`${styles.blog_sidebar__item}  accordion blog-sidebar__listing is-active open`}>
                                        <div className={`${styles.blog_sidebar__item_accordion__content} effect effect-shine`}>
                                            <Link href={BlogData.sidebar_bannerlink} className='blog-sidebar__banner-link effect-parent'>
                                                <Image src={BlogData.sidebar_banner} alt="" width={300} height={300} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.blog_template__content} ${styles.blog_template__content_padding_left} is-sidebar col-12 col-sm-9`}>
                                <menu-drawer class="mobile-facets__wrapper d-block d-md-none" data-breakpoint="mobile">
                                    <div className={`mobile-facets__disclosure disclosure-has-popup ${sidebarMobile ? 'menu-opening' : ''}`}>
                                        <summary className="mobile-facets__open-wrapper focus-offset" role="button">
                                            <span className="mobile-facets__open" onClick={() => setsidebarMobile(o => !o)}>
                                                <span className="mobile-facets__open-label button-label">{t("Blog_sidebar")}</span>
                                            </span>
                                        </summary>
                                        <div className="mobile-facets">
                                            <div className="mobile-facets__inner">
                                                <div className="mobile-facets__main">
                                                    <span className="mobile-facets__close mobile-facets__close--no-js" onClick={() => setsidebarMobile(o => !o)}><SVGClose /></span>
                                                    <div className="blog-sidebar__content">
                                                        <div className={`${styles.blog_sidebar__item}  accordion blog-sidebar__listing is-active ${sidebarCategory ? 'open' : ''}`}>
                                                            <h4 className={`accordion__title ${styles.blog_sidebar__item_accordion__title}`} onClick={() => setSidebarCategory(o => !o)}>
                                                                <span>{BlogData.category_title}</span>
                                                                <SVGArrowDown />
                                                            </h4>
                                                            <div className={`${styles.blog_sidebar__item_accordion__content} accordion__content ${sidebarCategory ? '' : 'accordionItemCollapsed'}`}>
                                                                <ul className="blog-sidebar__listing-content list-unstyled">
                                                                    {
                                                                        BlogData.category_list.map((data, index) => (
                                                                            <li key={index} className={styles.blog_sidebar__listing_content_li}>
                                                                                <Link href={data.cate_link} className={`${styles.blog_sidebar__listing_content_li_list_menu__item} link link--text list-menu__item list-menu__item--link`}>
                                                                                    {data.cate_name}
                                                                                </Link>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.blog_sidebar__item}  accordion blog-sidebar__listing is-active ${sidebarRelatedArticles ? 'open' : ''}`}>
                                                            <h4 className={`accordion__title ${styles.blog_sidebar__item_accordion__title}`} onClick={() => setSidebarRelatedArticles(o => !o)}>
                                                                <span>{BlogData.sidebar_relatedPosts}</span>
                                                                <SVGArrowDown />
                                                            </h4>
                                                            <div className={`${styles.blog_sidebar__item_accordion__content} accordion__content ${sidebarRelatedArticles ? '' : 'accordionItemCollapsed'}`}>
                                                                {
                                                                    RelatedPosts.map((data, index) => (
                                                                        <div className='article-item__content' key={index}>
                                                                            <div className={`${styles.sidebar__item_article_item__grid} ${styles.article_item__grid}`}>
                                                                                <div className={`${styles.article_item__left} effect effect-zoom`}>
                                                                                    <Link href={data.url} className="article-item__link effect-parent">
                                                                                        <Image src={data.image} alt="" width={148} height={87} />
                                                                                    </Link>
                                                                                </div>
                                                                                <div className={`${styles.articles_article_item__right} ${styles.article_item__right}`}>
                                                                                    <Link href={data.url} className={`${styles.article_item__title} ${styles.sidebar__article_item_right_title} h3`}>
                                                                                        {data.title}
                                                                                    </Link>
                                                                                    <ul className={`${styles.sidebar__article_item__right_info} article-item__info no-bullet`}>
                                                                                        <li className={`article-item__author ${styles.article_item__info_li}`}>
                                                                                            {t("Blog_By")}
                                                                                            <span className={`article-item__author-user ${styles.article_item__author_user}`}>{data.author}</span>
                                                                                        </li>
                                                                                        <li className={`article-item__date ${styles.article_item__info_li}`}>
                                                                                            {data.createat}
                                                                                        </li>
                                                                                    </ul>
                                                                                    <div className={styles.sidebar__item_article_item__grid_readmore}>
                                                                                        <Link href={data.url}>
                                                                                            {t("Blog_Read_more")}
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.blog_sidebar__item}  accordion blog-sidebar__listing is-active open`}>
                                                            <div className={`${styles.blog_sidebar__item_accordion__content} effect effect-shine`}>
                                                                <Link href={BlogData.sidebar_bannerlink} className='blog-sidebar__banner-link effect-parent'>
                                                                    <Image src={BlogData.sidebar_banner} alt="" width={360} height={362} />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </menu-drawer>
                                <div className={`blog-template__articles row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2`}>
                                    {currentData.map((data, index) => (
                                        <div className="article-item__content article-item__layout-grid col" key={index}>
                                            <div className={styles.article_item__grid}>
                                                <div className={`${styles.article_item__layout_grid_left} effect effect-scope3`}>
                                                    <Link href={data.url} className='article-item__link effect-parent'>
                                                    <Image src={data.image} alt={data.title} className={`article-item__image effect-img ${styles.article_item__image}`} fill
                                                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw" />
                                                    </Link>
                                                </div>
                                                <div className={`${styles.article_item__layout_grid_right}`}>
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