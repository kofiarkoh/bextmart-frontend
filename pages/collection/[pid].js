import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import SortBy from 'sort-by';
import StickyBox from "react-sticky-box";
import Paginator from 'react-hooks-paginator';
import useTranslation from '../../components/ultils/useTranslation'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/ultils/Breadcrumbs'
import Footer from '../../components/Footer'
import CollectionSkeleton from '../../components/ultils/CollectionSkeleton'
import CollectionProduct from '../../components/ultils/CollectionProduct'
import ProductItemList from '../../components/ultils/ProductItemList'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowLeft, SVGArrowRight, SVGArrowDown, SVGGrid, SVGList, SVGClose } from '../../public/assets/SVG';
import ExtNotification from '../../components/ExtNotification'
import styles from '../../public/assets/styles/Collection.module.css'

import Category_en from "../../public/locales/en/en_Category.json";
import Category_fr from "../../public/locales/fr/fr_Category.json";
import Category_it from "../../public/locales/it/it_Category.json";
import Category_jp from "../../public/locales/jp/jp_Category.json";
import Product_en from "../../public/locales/en/en_Product.json";
import Product_jp from "../../public/locales/jp/jp_Product.json";
import Product_fr from "../../public/locales/fr/fr_Product.json";
import Product_it from "../../public/locales/it/it_Product.json";
import { Collections_Menu_en } from "../../public/locales/en/en_TextMenuCol";
import { Collections_Menu_fr } from "../../public/locales/fr/fr_TextMenuCol";
import { Collections_Menu_it } from "../../public/locales/it/it_TextMenuCol";
import { Collections_Menu_jp } from "../../public/locales/jp/jp_TextMenuCol";
import sidebarBanner from "../../public/assets/images/yam-banner-ads.png";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const CollectionPage = () => {
    const { t, locale } = useTranslation();
    let { CategoryData, ProductData, ProductSidebar, Collections_Menu } = [];
    switch (locale) {
        case 'en':
            CategoryData = Category_en;
            ProductData = Product_en;
            Collections_Menu = Collections_Menu_en;
            ProductSidebar = Product_en.slice(0, 5);
            break;
        case 'fr':
            CategoryData = Category_fr;
            ProductData = Product_fr;
            Collections_Menu = Collections_Menu_fr;
            ProductSidebar = Product_fr.slice(0, 5);
            break;
        case 'it':
            CategoryData = Category_it;
            ProductData = Product_it;
            Collections_Menu = Collections_Menu_it;
            ProductSidebar = Product_it.slice(0, 5);
            break;
        case 'jp':
            CategoryData = Category_jp;
            ProductData = Product_jp;
            Collections_Menu = Collections_Menu_jp;
            ProductSidebar = Product_jp.slice(0, 5);
            break;
    }

    const router = useRouter();
    const { pid } = router.query;
    const [isLoading, setisLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [checkHandle, setcheckHandle] = useState(false);
    const [productData, setProductData] = useState([]);
    const [cateView, setCateView] = useState('grid-leftsidebar');
    const [columnView, setColumnView] = useState('col-12 col-md-4-5');
    const [hasSidebar, setHasSidebar] = useState(true);
    const [isGrid, setIsGrid] = useState(true);
    const [sortby, setSortby] = useState('-id');
    const [sortbyName, setSortbyName] = useState(t("Date_decrease"));
    const pageLimit = 12;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sidebarCategory, setSidebarCategory] = useState(true);
    const [sidebarProducts, setSidebarProducts] = useState(true);
    const [sidebarMobile, setsidebarMobile] = useState(false);

    useEffect(() => {
        const findCate = CategoryData.findIndex(a => (a.handle === String(pid)));
        if (findCate >= 0) {
            setCategory(CategoryData[findCate]);
            setcheckHandle(true);
        }

        if (category.productsID != undefined) {
            const ProductIDArray = category.productsID.split(',');
            let remainingItems = [];
            ProductIDArray.map((data) => {
                let getProduct = ProductData.filter((item) => { return parseInt(data) === item.id });
                remainingItems = [...remainingItems, getProduct[0]];
            })
            setProductData(remainingItems);
            if (category.layout !== undefined) {
                setCateView(category.layout);
                if (category.layout.includes('nosidebar')) {
                    setHasSidebar(false);
                    setColumnView('col-12 col-md-12');
                } else {
                    setHasSidebar(true);
                    setColumnView('col-12 col-md-4-5');
                }
                if (category.layout.includes('list')) setIsGrid(false);
            }


        }
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, [pid, category]);

    useEffect(() => {
        setCurrentData(productData.slice(offset, offset + pageLimit));
    }, [offset, productData]);

    useEffect(() => { }, [cateView, checkHandle, columnView, hasSidebar, CategoryData, isGrid]);
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-collection');
        document.body.classList.add(`collection-${cateView}`);
    }

    function sidebar() {
        return (
            <>
                <div className={`collection--template__sidebar ${cateView.includes('leftsidebar') ? styles.sidebar_left : styles.sidebar_right} d-none d-md-block col-12 col-md-2-4`}>
                    <StickyBox offsetTop={0} offsetBottom={0}>
                        <div className='collection-sidebar__content'>
                            <div className={`${styles.sidebar__item} ${styles.sidebar_accordion} accordion collection-sidebar__listing ${sidebarCategory ? styles.sidebar_accordion_open : ''}`}>
                                <h4 className={`${styles.sidebar_accordion_title} accordion__title`} onClick={() => setSidebarCategory(o => !o)}>
                                    <span>{t("Sidebar_Categories")}</span>
                                    <SVGArrowDown />
                                </h4>
                                <div className={`accordion__content component-scrollbar ${sidebarCategory ? '' : 'accordionItemCollapsed'}`}>
                                    <ul className={`${styles.sidebar_content_ul} list-unstyled`}>
                                        {
                                            Collections_Menu.map((data, index) => (
                                                <li key={index}>
                                                    <Link href={data.url} className="link link--text list-menu__item list-menu__item--link">
                                                        {data.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className={`${styles.sidebar__item} ${styles.sidebar_accordion} accordion collection-sidebar__best ${sidebarProducts ? styles.sidebar_accordion_open : ''}`}>
                                <h4 className="accordion__title" onClick={() => setSidebarProducts(o => !o)}>
                                    <span>{t("Sidebar_Products")}</span>
                                    <SVGArrowDown />
                                </h4>
                                <div className={`accordion__content collection-sidebar__best-content ${sidebarProducts ? '' : 'accordionItemCollapsed'}`}>
                                    <div className="accordion__product row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 row-cols-xxl-1">
                                        {
                                            ProductSidebar.map((data, index) => (
                                                <div className="col product-item__content" key={index}>
                                                    <div className="product-item__list ">
                                                        <ProductItemList product={data} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`d-none d-md-block ${styles.sidebar__item} accordion collection-sidebar__banner is-active open`}>
                                <div className="accordion__content collection-sidebar__banner-content effect effect-zoom">
                                    <Link href="/collection/women-fashion">
                                        <Image src={sidebarBanner.src} alt="" width={233} height={234} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </StickyBox>
                </div>
            </>
        )
    }

    function sidebarMobileBar() {
        return (
            <menu-drawer class="mobile-facets__wrapper d-block d-md-none" data-breakpoint="mobile">
                <div className={`mobile-facets__disclosure disclosure-has-popup ${sidebarMobile ? 'menu-opening' : ''}`}>
                    <summary className="mobile-facets__open-wrapper focus-offset" role="button">
                        <span className="mobile-facets__open" onClick={() => setsidebarMobile(o => !o)}>
                            <span className="mobile-facets__open-label button-label">{t("CollSidebar_Mobile_Bar")}</span>
                        </span>
                    </summary>
                    <div className="mobile-facets">
                        <div className="mobile-facets__inner">
                            <div className="mobile-facets__main">
                                <span className="mobile-facets__close mobile-facets__close--no-js" onClick={() => setsidebarMobile(o => !o)}><SVGClose /></span>
                                <div className="collection-sidebar__content">
                                    <div className={`${styles.sidebar__item} ${styles.sidebar_accordion} accordion collection-sidebar__listing ${sidebarCategory ? styles.sidebar_accordion_open : ''}`}>
                                        <h4 className={`${styles.sidebar_accordion_title} accordion__title`} onClick={() => setSidebarCategory(o => !o)}>
                                            <span>{t("Sidebar_Categories")}</span>
                                            <SVGArrowDown />
                                        </h4>
                                        <div className={`accordion__content component-scrollbar ${sidebarCategory ? '' : 'accordionItemCollapsed'}`}>
                                            <ul className={`${styles.sidebar_content_ul} list-unstyled`}>
                                                {
                                                    Collections_Menu.map((data, index) => (
                                                        <li key={index}>
                                                            <Link href={data.url} className="link link--text list-menu__item list-menu__item--link">
                                                                {data.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={`${styles.sidebar__item} ${styles.sidebar_accordion} accordion collection-sidebar__best ${sidebarProducts ? styles.sidebar_accordion_open : ''}`}>
                                        <h4 className="accordion__title" onClick={() => setSidebarProducts(o => !o)}>
                                            <span>{t("Sidebar_Products")}</span>
                                            <SVGArrowDown />
                                        </h4>
                                        <div className={`accordion__content collection-sidebar__best-content ${sidebarProducts ? '' : 'accordionItemCollapsed'}`}>
                                            <div className="accordion__product row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 row-cols-xxl-1">
                                                {
                                                    ProductSidebar.map((data, index) => (
                                                        <div className="col product-item__content" key={index}>
                                                            <div className="product-item__list ">
                                                                <ProductItemList product={data} />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.sidebar__item} accordion collection-sidebar__banner is-active open`}>
                                        <div className="accordion__content collection-sidebar__banner-content effect effect-zoom">
                                            <Link href="/collection/women-fashion">
                                                <Image src={sidebarBanner.src} alt="" width={233} height={234} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </menu-drawer>
        )
    }

    function subCollection() {
        return (
            <>
                <div className={`${styles.collection_subcollections} row row-cols-2 row-cols-sm-2 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2`}>
                    {
                        category.sub_collections.map((data, index) => {
                            return (
                                <div className={`${styles.collection_subcollections_item} col`} key={index}>
                                    <Link className={styles.subcollections_item_content} href={`/collection/${data.handle}`}>
                                        <div className={styles.subcollections_item_image}>
                                            <Image src={data.thumb} alt="" width={69} height={69} />
                                        </div>
                                        <div className={styles.subcollections_item_description}>
                                            <h5 className={styles.subcollections_item_title}>{data.name}
                                                <span className={styles.subcollections_item_count}>{data.product_count}</span>
                                            </h5>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    function collectionBanner() {
        const carouselOptions = {
            spaceBetween: 0,
            slidesPerView: 1,
            pagination: {
                clickable: true,
                enabled: true,
                el: '.collection-banner-pagination',
                type: 'bullets',
                bulletElement: 'span',
                bulletClass: 'carousel-pagination-bullet',
                bulletActiveClass: 'carousel-pagination-bullet-active',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                }
            },
            navigation: {
                prevEl: ".collection-carousel-nav-prev",
                nextEl: ".collection-carousel-nav-next",
            },
            autoplay: {
                delay: 5000
            },
        };
        return (
            <div className={styles.collection_banner_content}>
                <div className={`${styles.collection_banner_slider} collection-image__slider`}>
                    <Swiper {...carouselOptions} className='swiper-container'>
                        {
                            category.banner.map((data, index) => (
                                <SwiperSlide key={index}>
                                    <div className={`collection-image__slider-item collimg-${index}`}>
                                        <Image className={styles.collection_bannerslider_image} src={data.imgpath} alt='' width={1007} height={339} />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className="collection-banner-pagination carousel-pagination"></div>
                    <div className="carousel-navigation collection-carousel-nav-prev swiper-nav-prev carousel-nav-prev"><SVGArrowLeft /></div>
                    <div className="carousel-navigation collection-carousel-nav-next swiper-nav-next carousel-nav-next"><SVGArrowRight /></div>
                </div>
            </div>
        )
    }

    function loadProducts() {
        return (
            <>
                <div id="main-collection-product-grid" className={`${styles.collection_products_row} collection-template__product row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-4 ${isGrid ? 'collection-template__product-grid' : 'collection-template__product-list'}`}>
                    {
                        currentData.sort(SortBy(sortby)).map((data, index) => (
                            <div className="collection-template__product-item col" key={index}>
                                <CollectionProduct product={data} />
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    function changeSoryby(type) {
        setSortby(type);
        currentData.sort(SortBy(type));
        switch (locale) {
            case 'name': setSortbyName(t("Alphabet_increase")); break;
            case '-name': setSortbyName(t("Alphabet_decrease")); break;
            case 'price': setSortbyName(t("Price_increase")); break;
            case '-price': setSortbyName(t("Price_decrease")); break;
            case 'id': setSortbyName(t("Date_increase")); break;
            case '-id': setSortbyName(t("Date_decrease")); break;
        }
    }

    if (category.name != undefined) {
        return (
            <>
                <Head>
                    <title>{category.name}</title>
                </Head>

                <Header />
                <main>
                    <Breadcrumbs text={category.name} />
                    <div className="collection-template">
                        <div className="container">
                            <div className={`${styles.collection_container} row `}>
                                {
                                    cateView.includes('leftsidebar') ? sidebar() : ''
                                }
                                <div className={`collection-template__content ${cateView.includes('leftsidebar') ? styles.padding_left : ''} ${cateView.includes('rightsidebar') ? styles.padding_right : ''}  ${hasSidebar ? 'is-sidebar' : 'no-sidebar'} ${columnView}`}>
                                    <h1 className={styles.collection_title}>{category.name}</h1>
                                    <div className={styles.collection_desc}>{category.desc}</div>
                                    {
                                        (category.sub_collections != undefined) ? subCollection() : ''
                                    }
                                    {
                                        (category.banner != undefined) ? collectionBanner() : ''
                                    }
                                    <div id="CollectionProductGrid">
                                        <div className={`${styles.collection_toolbar} ${styles.collection_toolbar_dmdblock}`}>
                                            <div className={styles.collection_toolbar_left}>
                                                <div className={styles.toolbarleft_wrapper}>
                                                    <div className="collection-template__sorting caption">
                                                        <div className={styles.toolbarleft_field}>
                                                            <label className={`${styles.toolbarleft_label} caption-large`} htmlFor="SortByTop">{t("Sortby")}</label>
                                                            <div className={`${styles.toolbarleft_select} menu__dropdown template-per__dropdown select`}>
                                                                <span className="dropdown-toggle template-per__toggle">{sortbyName} <SVGArrowDown /></span>
                                                                <ul className={`${styles.toolbarleft_dropdownmenu} no-bullet dropdown-menu template-per__menu`} id="SortByTop">
                                                                    <li className={(sortby === 'name') ? styles.toolbarleft_active : ''} onClick={() => changeSoryby("name")}>{t("Alphabet_increase")}</li>
                                                                    <li className={(sortby === '-name') ? styles.toolbarleft_active : ''} onClick={() => changeSoryby("-name")}>{t("Alphabet_decrease")}</li>
                                                                    <li className={(sortby === 'price') ? styles.toolbarleft_active : ''} onClick={() => changeSoryby("price")}>{t("Price_increase")}</li>
                                                                    <li className={(sortby === '-price') ? styles.toolbarleft_active : ''} onClick={() => changeSoryby("-price")}>{t("Price_decrease")}</li>
                                                                    <li className={(sortby === 'id') ? styles.toolbarleft_active : ''} onClick={() => changeSoryby("id")}>{t("Date_increase")}</li>
                                                                    <li className={(sortby === '-id') ? styles.toolbarleft_active : ''} onClick={() => changeSoryby("-id")}>{t("Date_decrease")}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='grid-list-component collection-template__grid-list'>
                                                    <span className={`template__grid-list-item ${isGrid ? 'active' : ''}`} onClick={() => setIsGrid(g => !g)}>
                                                        <SVGGrid />
                                                    </span>
                                                    <span className={`template__grid-list-item ${isGrid ? '' : 'active'}`} onClick={() => setIsGrid(g => !g)}>
                                                        <SVGList />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="pagination-wrapper">
                                                <nav className="pagination" role="navigation" aria-label="Pagination">
                                                    <Paginator
                                                        totalRecords={productData.length}
                                                        pageLimit={pageLimit}
                                                        pageNeighbours={2}
                                                        setOffset={setOffset}
                                                        currentPage={currentPage}
                                                        setCurrentPage={setCurrentPage}
                                                        pageContainerClass={`pagination__list list-unstyled`}
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
                                        {
                                            (cateView.includes('leftsidebar') || cateView.includes('rightsidebar')) ? sidebarMobileBar() : ''
                                        }
                                        <div className={`${styles.collection_products} page-width`}>
                                            {
                                                (category.productsID != undefined) ? loadProducts() : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    cateView.includes('rightsidebar') ? sidebar() : ''
                                }
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <ExtNotification />
            </>
        )
    }
    else {
        return (
            <>
                <Head>
                    <title>{checkHandle ? t("No_found_category") : t("Category_loading")}</title>
                </Head>
                <Header />
                <main>
                    {
                        isLoading ? <CollectionSkeleton /> : <>
                            <div className="collection-template">
                                <div className="container">
                                    <div className='row'>
                                        <div className={`${styles.no_category} no_category`}>
                                            <h2 className={styles.no_category_h2}>{t("No_found_category")}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </main>
                <Footer />
            </>
        )
    }
}

export default CollectionPage