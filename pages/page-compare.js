import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useAtom } from 'jotai'
import useTranslation from '../components/ultils/useTranslation'
import Header from '../components/Header'
import Breadcrumbs from '../components/ultils/Breadcrumbs'
import Footer from '../components/Footer'
import { compareCount } from '../components/ultils/Store'
import SearchPageSkeleton from '../components/ultils/SearchPageSkeleton'
import { displayRating, displayPrice } from '../components/ultils/Tools'
import { SVGTrash } from '../public/assets/SVG';
import styles from '../public/assets/styles/ComparePage.module.css'

export default function ComparePage() {
    const { t, locale } = useTranslation();
    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-compare');
    }
    const [cmCount, setcmCount] = useAtom(compareCount);
    const [cmData, setcmData] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        let data = localStorage.getItem('yam-compare');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setcmCount(data.length);
            setcmData(data);
        }
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, [cmCount, setcmCount, isLoading]);
    useEffect(() => { }, [cmData])

    function loadCompare() {
        return (
            <div className={styles.compare_product}>
                <table className="compare-template__table">
                    <tbody>
                        <tr data-type="product">
                            <td className=''>{t("Compare_product")}</td>
                            {
                                cmData.map((item, index) => (
                                    <td key={index} className="compare-item">
                                        <div className={`${styles.compare_product_grid} compare-template__product-item`}>
                                            <Link href={`/product/${item.handle}`} className='product-item__link'>
                                                <Image src={item.image[0].imgpath} alt='' width={229} height={229} />
                                            </Link>
                                            <Link href={`/product/${item.handle}`} className={`${styles.compare_product_title} h5 uppercase-true`}>
                                                {item.name}
                                            </Link>
                                            {displayPrice(item.price, item.price_compare)}
                                            {displayRating(item.stars)}
                                            <div className={styles.compare_product__addcart}>
                                                <Link href={`/product/${item.handle}`} className={`button ${styles.compare_product_icon}`}>
                                                    {t("Compare_detail")}
                                                </Link>
                                            </div>
                                        </div>
                                    </td>

                                ))
                            }
                        </tr>
                        <tr data-type="vendor">
                            <td className=''>{t("Compare_vendor")}</td>
                            {
                                cmData.map((item, index) => (
                                    <td key={index} className="compare-vendor">{item.Brand}</td>
                                ))
                            }
                        </tr>
                        <tr data-type="type">
                            <td className=''>{t("Compare_type")}</td>
                            {
                                cmData.map((item, index) => (
                                    <td key={index} className="compare-type">{item.Type}</td>
                                ))
                            }
                        </tr>
                        <tr data-type="option">
                            <td className=''>{t("Compare_option")}</td>
                            {
                                cmData.map((item, indexi) => (
                                    <td key={indexi} className={styles.compare_option}>
                                        {
                                            item.option.map((opt, indexj) => (
                                                <p key={indexj} className={(opt.title === 'color' || opt.title === 'Color') ? styles.option_color : styles.option_other}>
                                                    <stong>{opt.title}:</stong>
                                                    {
                                                        (opt.title === 'color' || opt.title === 'Color')
                                                            ?
                                                            opt.variant.map((vari, indexk) => (
                                                                <span key={indexk} style={{backgroundColor:vari.title}}>{vari.title}</span>
                                                            ))
                                                            : opt.variant.map((vari, indexk) => (
                                                                <span key={indexk}>{vari.title}</span>
                                                            ))
                                                    }
                                                </p>
                                            ))
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                        <tr data-type="remove">
                            <td className=''>{t("Compare_remove")}</td>
                            {
                                cmData.map((item, index) => (
                                    <td key={index} className="compare-remove" onClick={() => removeCompare(item.id)}>
                                        <SVGTrash />
                                    </td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    function removeCompare(id) {
        let data = localStorage.getItem('yam-compare');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        const cmExisted = data.findIndex(a => a.id === id);
        data.splice(cmExisted, 1);
        localStorage.setItem('yam-compare', JSON.stringify(data));
        setTimeout(() => {
            setcmCount((c) => c - 1);
        }, 500);
    }

    return (
        <>
            <Head>
                <title>{t("Compare_page")}</title>
            </Head>
            <Header />
            <main>
                <Breadcrumbs />
                <div className="compare-template">
                    <div className='compare-template__layout'>
                        <div className='container'>
                            <div className='compare-template__container'>
                                <div className='main-page-content'>
                                    {
                                        (isLoading) ? <SearchPageSkeleton />
                                            : <>
                                                {
                                                    (cmCount === 0)
                                                        ?
                                                        <div className={`page-heading ${styles.compare_empty}`}>
                                                            {t("Compare_nothing")}
                                                        </div>
                                                        : ''
                                                }
                                                {
                                                    (cmData != null && cmCount > 0) ? loadCompare() : ''
                                                }
                                            </>
                                    }
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