import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import emailjs from '@emailjs/browser';
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css';
import { SVGArrowDown, SVGClose, SVGTwitter, SVGFacebook, SVGPinterest, SVGArrowLeft, SVGArrowRight } from '../public/assets/SVG';
import styles from '../public/assets/styles/ArticlePage.module.css'

import { Blog_en } from "../public/locales/en/en_Blog";
import { Blog_fr } from "../public/locales/fr/fr_Blog";
import { Blog_it } from "../public/locales/it/it_Blog";
import { Blog_jp } from "../public/locales/jp/jp_Blog";

SwiperCore.use([Navigation, Autoplay]);

export default function ArticlePage() {
    const router = useRouter();
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-article');
    }
    let { BlogData, PostsData } = [];
    switch (locale) {
        case 'en':
            BlogData = Blog_en;
            PostsData = Blog_en.blog_list;
            break;
        case 'fr':
            BlogData = Blog_fr;
            PostsData = Blog_fr.blog_list;
            break;
        case 'it':
            BlogData = Blog_it;
            PostsData = Blog_it.blog_list;
            break;
        case 'jp':
            BlogData = Blog_jp;
            PostsData = Blog_jp.blog_list;
            break;
    }

    const shortURL = router.asPath.substring(16).split('&layout=');
    const handle = shortURL[0];
    const view = shortURL[1];
    const [article, setArticle] = useState([]);
    const [checkHandle, setcheckHandle] = useState(false);
    useEffect(() => {
        const findArticle = PostsData.findIndex(a => (a.id === String(handle)));
        if (findArticle >= 0) {
            setArticle(PostsData[findArticle]);
        }
        setcheckHandle(true);
    }, [shortURL, article, checkHandle, setcheckHandle, PostsData, handle]);
    const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    const FullURL = `${origin}${asPath}`;

    let remainingItems = PostsData.filter((item) => { return article.id !== item.id }).slice(0, 5);
    let largeScreenView = 3;
    if (view === "nosidebar") largeScreenView = 4;
    let mediumScreenview = largeScreenView - 1;
    const carouselOptions = {
        spaceBetween: 30,
        // loop: true,
        slidesPerView: 1,
        navigation: {
            prevEl: ".article-carousel-nav-prev",
            nextEl: ".article-carousel-nav-next",
        },
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: mediumScreenview,
            },
            1200: {
                slidesPerView: largeScreenView,
            },
            1400: {
                slidesPerView: largeScreenView,
            }
        }
    };

    const [sidebarCategory, setSidebarCategory] = useState(true);
    const [sidebarRelatedArticles, setSidebarRelatedArticles] = useState(true);
    const [sidebarMobile, setsidebarMobile] = useState(false);

    function sidebar(text) {
        return (
            <div className={`blog-template__sidebar ${text} col-12 col-sm-3 d-none d-md-block`}>
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
                                remainingItems.map((data, index) => (
                                    <div className='article-item__content' key={index}>
                                        <div className={`${styles.sidebar__item_article_item__grid} ${styles.article_item__grid}`}>
                                            <div className={`${styles.article_item__left} effect effect-zoom`}>
                                                <Link href={data.url} className="article-item__link effect-parent">
                                                    <Image src={data.image} alt="" width={120} height={70} />
                                                </Link>
                                            </div>
                                            <div className={`${styles.articles_article_item__right} ${styles.article_item__right}`}>
                                                <Link href={data.url} className={`${styles.sidebar__article_item_right_title} h3`}>
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
        )
    }

    function mobileSidebar() {
        return (
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
                                                remainingItems.map((data, index) => (
                                                    <div className='article-item__content' key={index}>
                                                        <div className={`${styles.sidebar__item_article_item__grid} ${styles.article_item__grid}`}>
                                                            <div className={`${styles.article_sidebar_item__left} effect effect-zoom`}>
                                                                <Link href={data.url} className="article-item__link effect-parent">
                                                                    <Image src={data.image} alt="" width={148} height={87} />
                                                                </Link>
                                                            </div>
                                                            <div className={`${styles.article_sidebar_item__right}`}>
                                                                <Link href={data.url} className={`${styles.sidebar__article_item_right_title} ${styles.sidebar__article_item_right_title} h3`}>
                                                                    {data.title}
                                                                </Link>
                                                                <ul className={`${styles.sidebar__article_item__right_info} article-item__info no-bullet`}>
                                                                    <li className={`article-item__author ${styles.article_sidebar_item__info_li}`}>
                                                                        {t("Blog_By")}
                                                                        <span className={`article-item__author-user ${styles.article_item__author_user}`}>{data.author}</span>
                                                                    </li>
                                                                    <li className={`article-item__date ${styles.article_sidebar_item__info_li}`}>
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
        )
    }

    const ref_email = useRef(null);
    const ref_message = useRef(null);
    const [status, setStatus] = useState(t("Form_Send"));
    const [notify, setnotify] = useState('');
    const [closeform, setcloseform] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const [contactdata, setcontactdata] = useState({
        article:"",
        contact_name: "",
        contact_email: "",
        contact_message: ""
    });
    const { contact_name, contact_email, contact_message } = contactdata;
    const inputChange = e => {
        setcontactdata({ ...contactdata, [e.target.name]: [e.target.value] });
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function contactSubmit(e) {
        e.preventDefault();
        if (isValidEmail(contactdata.contact_email)) {            
            if (contactdata.contact_message != '') {                
                setStatus(t("Sending"));
                setClassStatus(styles.contact_submit_button_loading);
                contactdata.article = article.title;
                emailjs.send('service_cmxchh4', 'template_oro7og2', contactdata, 'sLDVY6WisVxsJac6k')
                .then((result) => {
                    setStatus(t("Completed")); 
                    setClassStatus(styles.contact_submit_button_complete);
                    setTimeout(() => {                            
                        setStatus(t("Form_Send"));
                        setClassStatus('');
                        setcloseform(true);
                    }, 1200);                       
                }, (error) => {
                    console.log('FAILED...', error);
                });
            } else {
                setnotify(t("Message_Empty"));
                ref_message.current.focus();
            }
        } else {
            setnotify(t("Email_is_invalid"));
            ref_email.current.focus();
        }
    }

    if (article.title != undefined) {
        return (
            <>
                <Head>
                    <title>{article.title}</title>
                </Head>
                <Header />
                <main>
                    <Breadcrumbs text={article.title} />
                    <div className={styles.article_template__layout}>
                        <div className="container">
                            <div className={`row ${(view === 'leftsidebar' || view === 'rightsidebar') ? 'has-sidebar' : 'no-sidebar'} `}>
                                {
                                    (view === 'leftsidebar') ? sidebar('blog-sidebar__left') : ''
                                }
                                <div className={`${styles.article_template__content} 
                                ${(view === 'leftsidebar') ? styles.article_content_padding_left : styles.article_content_padding_right} 
                                ${(view === 'leftsidebar' || view === 'rightsidebar') ? 'is-sidebar col-12 col-sm-9' : 'col-12 col-sm-12'} `}>
                                    {
                                        (view === 'leftsidebar' || view === 'rightsidebar') ? mobileSidebar() : ''
                                    }
                                    <div className={styles.article_template__image} itemProp="image">
                                        {/* {
                                        (view !== 'nosidebar') ? 
                                        <Image className="article-template__image-content" src={article.image} alt={article.title} width={950} height={560} /> : <Image className="article-template__image-content" src={article.image} alt={article.title} width={1270} height={745} />
                                    } */}
                                        <Image className={`article-template__image-content ${styles.article_item__image}`} src={article.image} alt={article.title} fill />
                                    </div>
                                    <div className={styles.article_template__group}>
                                        <div className={styles.article_template__info}>
                                            <span className="article-template__info-item" itemProp="author" itemScope="" itemType="http://schema.org/Person">
                                                <span className="info-item__by">{t("Blog_By")} </span>
                                                <span itemProp="name" className={styles.article_template__info_item_author}>{article.author} </span>
                                            </span>
                                            <span className="article-template__info-item" itemProp="dateCreated pubdate datePublished">
                                                <time dateTime={article.createat}>{article.createat}</time>
                                            </span>
                                        </div>
                                        <h1 className={styles.article_template__title} itemProp="headline">{article.title}</h1>
                                        <div className={`${styles.article_template__description} article_template__description`} itemProp="articleBody" dangerouslySetInnerHTML={{ __html: article.desc }} />
                                        <div className={styles.article_template__share}>
                                            <div className="article-share__desktop d-none d-md-block">
                                                <ul className="social-sharing">
                                                    <li>
                                                        <Link target="_blank" href={`https://www.facebook.com/sharer.php?u=${FullURL}`} className="btn--share share-facebook">
                                                            <SVGTwitter />
                                                            <span className="share-title" aria-hidden="true">Facebook</span>
                                                            <span className="visually-hidden">Facebook</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link target="_blank" href={`https://twitter.com/share?text=Duis%20sagittis%20porta&amp;url=${FullURL}`} className="btn--share share-twitter">
                                                            <SVGFacebook />
                                                            <span className="share-title" aria-hidden="true">Twitter</span>
                                                            <span className="visually-hidden">Twitter</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link target="_blank" href={`https://pinterest.com/pin/create/button/?url=${FullURL}`} className="btn--share share-pinterest">
                                                            <SVGPinterest />
                                                            <span className="share-title" aria-hidden="true">Pinterest</span>
                                                            <span className="visually-hidden">Pinterest</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={styles.article_template__tags}>
                                            <span className={styles.article_template__tags_title}>{t("Tags")}:</span>
                                            <span className={styles.article_template__tags_title_span}>{article.tags}</span>
                                        </div>

                                    </div>
                                    <div className={styles.article_comment}>
                                        <div className={styles.article_comment_wrapper}>
                                            <div className={styles.article_comment_title}>
                                                <h2 className="article-related__title">
                                                    {closeform ? t("Thanks") : t("Your_comment")}
                                                </h2>
                                            </div>
                                            <div className="faqs-contact__form">
                                                <form method="post" id="ContactForm" className={`${styles.article_comment_form} ${closeform ? 'hidden' : 'show'}`} onSubmit={(e) => contactSubmit(e)}>
                                                    <input type="hidden" name="form_type" value="contact" />
                                                    <input type="hidden" name="utf8" value="✓" />
                                                    <div className="contact__fields row">
                                                        <div className='col-12 col-sm-6'>
                                                            <div className={`${styles.faqs_contact__content_contact__fields_field} field`}>
                                                                <input className={`${styles.faqs_contact__content_field__input} field__input`} type="text" id="contact_name" name="contact_name" value={contact_name} placeholder={t("Form_Name")} onChange={inputChange} onFocus={inputChange} />
                                                                <label className="field__label" htmlFor="contact_name">{t("Form_Name")}</label>
                                                            </div>
                                                            <div className={`${styles.faqs_contact__content_contact__fields_field} field`}>
                                                                <input className={`${styles.faqs_contact__content_field__input} field__input`} type="email" id="contact_email" name="contact_email" value={contact_email} placeholder={t("Form_Email")} ref={ref_email} onChange={inputChange} onFocus={inputChange} />
                                                                <label className="field__label" htmlFor="ContactForm-email">{t("Form_Email")}</label>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-sm-6'>
                                                            <div className={`${styles.faqs_contact__content_contact__fields_field} field`}>
                                                                <textarea rows="10" className={`${styles.faqs_contact__content_field__input} ${styles.contact__content_field_textarea} field__input text-area`} id="contact_message" name="contact_message" vaue={contact_message} placeholder={t("Form_Message")} ref={ref_message} onChange={inputChange} onFocus={inputChange} ></textarea>
                                                                <label className={`form__label field__label ${styles.faqs_textarea__label}`} htmlFor="contact_message">{t("Form_Message")}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={styles.contact_notify}>{notify}</span>
                                                    <div className={styles.faqs_contact__content_contact__button}>
                                                        <button type="submit" className={`${styles.faqs_contact__content_contact__button_button} button contact-submit-button ${classStatus}`}>
                                                            {status}
                                                        </button>
                                                    </div>
                                                    <p className={styles.article_comment_warning}>* {t("Comment_Note")}</p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.article_related}>
                                        <div className={styles.article_related_title}>
                                            <h2 className={`${styles.article_related_title_h2} article-related__title`}>{t("Related_Post")}</h2>
                                        </div>
                                        <slider-component class="article-related__slider navigation-top-right">
                                            <div className="carousel-wrapper carousel-">
                                                <Swiper {...carouselOptions} className='swiper-container'>
                                                    {
                                                        remainingItems.map((data, index) => (
                                                            <SwiperSlide key={index}>
                                                                <div className={`article-item__content article-${index}`}>
                                                                    <div className={styles.article_related_item__grid}>
                                                                        <div className={`${styles.article_related_item_left} effect effect-scope3`}>
                                                                            <Link href={data.url} className='article-item__link effect-parent'>
                                                                                <Image src={data.image} alt={data.title} className='article-item__image effect-img' width={300} height={175} />
                                                                            </Link>
                                                                        </div>
                                                                        <div className={`${styles.article_related_item_right} `}>
                                                                            <Link href={data.url} className={`${styles.article_related_title_h3} h3`}>
                                                                                {data.title}
                                                                            </Link>
                                                                            <ul className={`${styles.article_related_item_info} no-bullet`}>
                                                                                <li className={styles.article_related_item__author}>
                                                                                    {t("Blog_By")}
                                                                                    <span className={styles.article_related_item__author_user}>{data.author}</span>
                                                                                </li>
                                                                                <li className={styles.article_related_item__date}>
                                                                                    {data.createat}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper>
                                                <div className="carousel-navigation article-carousel-nav-prev swiper-nav-prev carousel-nav-prev"><SVGArrowLeft /></div>
                                                <div className="carousel-navigation article-carousel-nav-next swiper-nav-next carousel-nav-next"><SVGArrowRight /></div>
                                            </div>
                                        </slider-component>
                                    </div>
                                </div>
                                {
                                    (view === 'rightsidebar') ? sidebar('blog-sidebar__right') : ''
                                }
                            </div>
                        </div >
                    </div >
                </main >
                <Footer />
            </>
        )
    }
    // else {
    //     return (
    //         <>
    //             <Head>
    //                 <title>{ checkHandle ? t("No_found_article") : t("Article_loading")}</title>
    //             </Head>
    //             <Header/>
    //             <main>
    //                 <div className="article-template__layout">
    //                     <div className="container">
    //                         <div className='row'>
    //                             <div className={`${styles.article_template__content} no_article`}>
    //                                 <h2 className={styles.no_article_h2}>{ checkHandle ? t("No_found_article") : t("Article_loading")}</h2>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </main>
    //             <Footer />
    //         </>
    //     )
    // }

}