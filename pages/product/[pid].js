import React, { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import StickyBox from "react-sticky-box";
import Popup from "reactjs-popup";
import useTranslation from '../../components/ultils/useTranslation'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/ultils/Breadcrumbs'
import Footer from '../../components/Footer'
import ProductPageSkeleton from '../../components/ultils/ProductPageSkeleton'
import ProductPageGallery from '../../components/ultils/ProductPageGallery'
import ProductPageGalleryVertical from '../../components/ultils/ProductPageGalleryVertical'
import ProductPageGalleryStacked from '../../components/ultils/ProductPageGalleryStacked'
import ProductItemList from '../../components/ultils/ProductItemList'
import ProductPageRelated from '../../components/ultils/ProductPageRelated'
import ProductPageReview from '../../components/ultils/ProductPageReview'
import { displayRating, displayPrice, buildImageUrl } from '../../components/ultils/Tools'
import ProductWishlist from '../../components/ultils/ProductWishlist'
import ExtNotification from '../../components/ExtNotification'
import { SVGArrowLeft, SVGArrowRight, SVGArrowDown, SVGDiamond, SVGMinus, SVGPlus, SVGTwitter, SVGFacebook, SVGPinterest, SVGClose } from '../../public/assets/SVG';
import styles from '../../public/assets/styles/ProductPage.module.css'
import Product_en from "../../public/locales/en/en_Product.json";
import Product_jp from "../../public/locales/jp/jp_Product.json";
import Product_fr from "../../public/locales/fr/fr_Product.json";
import Product_it from "../../public/locales/it/it_Product.json";
import { Collections_Menu_en } from "../../public/locales/en/en_TextMenuCol";
import { Collections_Menu_fr } from "../../public/locales/fr/fr_TextMenuCol";
import { Collections_Menu_it } from "../../public/locales/it/it_TextMenuCol";
import { Collections_Menu_jp } from "../../public/locales/jp/jp_TextMenuCol";
import sidebarBanner from "../../public/assets/images/yam-banner-ads.png";
import safecheckout from "../../public/assets/images/yam-safecheckout.png";
import sizechart from "../../public/assets/images/sizechart.png";
import { useGetProductQuery } from '../../store/productsApi'
import { useAddToCartMutation } from '../../store/cartApi'

const ProductPage = () => {

    const t = (text) =>  text;
    let { Collections_Menu, ProductSidebar } = [];

     Collections_Menu = Collections_Menu_en;
     ProductSidebar = Product_en.slice(0, 5);
    // switch (locale) {
    //     case 'en':
           
    //         break;
    //     case 'fr':
    //         Collections_Menu = Collections_Menu_fr;
    //         ProductSidebar = Product_fr.slice(0, 5);
    //         break;
    //     case 'it':
    //         Collections_Menu = Collections_Menu_it;
    //         ProductSidebar = Product_it.slice(0, 5);
    //         break;
    //     case 'jp':
    //         Collections_Menu = Collections_Menu_jp;
    //         ProductSidebar = Product_jp.slice(0, 5);
    //         break;
    // }
    
    const [option1, setOption1] = useState(null);
    const [option2, setOption2] = useState(null);
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(0);
    const [classStatus, setClassStatus] = useState('');
    const [statusText, setStatusText] = useState(t("Add_to_Cart"));
    const [addToCartApi] = useAddToCartMutation();
    const [proView, setProView] = useState('sidebar');
    const [columnView, setColumnView] = useState('col-12 col-md-4-5');
    const [hasSidebar, setHasSidebar] = useState(true);
    const [sidebarCategory, setSidebarCategory] = useState(true);
    const [sidebarProducts, setSidebarProducts] = useState(true);
    const [sidebarMobile, setsidebarMobile] = useState(false);
    const ref_reviewbox = useRef();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [groupImages, setGroupImages] = useState([]);

    const router = useRouter();
    const { pid } = router.query;
    const productId = router.isReady ? (Array.isArray(pid) ? pid[0] : pid) : null;
    const { data, isLoading: isProductLoading, isError } = useGetProductQuery(productId, { skip: !productId });
    const selectedProduct = useSelector((state) => state.products.selected);
    const apiProduct = selectedProduct || data?.data || data?.product || data || null;


    const product = useMemo(() => {

        if (!apiProduct) return null;
        const photos = Array.isArray(apiProduct.photos) ? apiProduct.photos : [];
        const image = photos.length
            ? photos.map((photo, index) => ({
                idpro: `${apiProduct.id || productId}-${index}`,
                imgpath: buildImageUrl(photo),
                imgalt: apiProduct.name || 'product',
            }))
            : [{
                idpro: `${apiProduct.id || productId}-0`,
                imgpath: buildImageUrl(null),
                imgalt: apiProduct.name || 'product',
            }];

         setGroupImages(photos);
        return {
            id: apiProduct.id,
            name: apiProduct.name,
            price: apiProduct.price,
            price_compare: apiProduct.price_compare || apiProduct.compare_price || apiProduct.price,
            quantity: apiProduct.quantity ?? 0,
            quantity_total: apiProduct.quantity ?? 0,
            stars: apiProduct.stars ?? 0,
            desc: apiProduct.description || '',
            shortdesc: apiProduct.description || '',
            description: apiProduct.description || '',
            photos,
            image,
            handle: apiProduct.slug || apiProduct.handle || apiProduct.id || productId,
            option: Array.isArray(apiProduct.option) ? apiProduct.option : [],
            advanced: apiProduct.advanced,
            related_product: apiProduct.related_product,
            review: apiProduct.review,
            layout: apiProduct.layout,
            SKU: apiProduct.SKU || apiProduct.sku || '',
            Brand: apiProduct.Brand || apiProduct.brand || '',
            Type: apiProduct.Type || apiProduct.type || '',
        };
    }, [apiProduct, productId]);
    

    // useEffect(() => {
    //     if (!product) return;
    //     setGroupImages(product.image || []);
    //     if (product.option.length > 0) setOption1(product.option[0].variant[0].title);
    //     if (product.option.length > 1) setOption2(product.option[1].variant[0].title);
    //     setTotal(qty * parseInt(product.price));
    //     if (product.layout !== undefined) setProView(product.layout);
    //     if (proView.includes('sidebar') || proView.includes('rightbar') || proView.includes('advanced') || proView.includes('group-images')) {
    //         setHasSidebar(true);
    //         setColumnView('col-12 col-md-4-5');
    //     } else {
    //         setHasSidebar(false);
    //         setColumnView('col-12 col-md-12');
    //     }
    // }, [product, qty, proView])
    const isLoading = isProductLoading;

    const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    const FullURL = `${origin}${asPath}`;

    const handleScroll = (ref) => {
        window.scrollTo({
            top: (ref.offsetTop - 84),
            left: 0,
            behavior: "smooth",
        });
    };

    if (typeof window !== 'undefined') {
        document.body.className = "";
        document.body.classList.add('template-product');
        document.body.classList.add(`layout-${proView}`);
    }

    function sidebar() {
        return (
            <>
                <div className={`collection--template__sidebar ${proView.includes('rightbar') ? styles.sidebar_right : styles.sidebar_left} d-none d-md-block col-12 col-md-2-4`}>
                    <StickyBox offsetTop={0} offsetBottom={20}>
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
                                        <Image src={sidebarBanner.src} alt="" width={233} height={233} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </StickyBox>
                </div>
            </>
        )
    }

    function loadStyles() {
        return (
            <div className="product-form__advance">
                <fieldset className="js product-form__input" data-type="input">
                    <legend className="form__label">
                        <span className="form__label-title">{t("Choose_style")}:</span>
                    </legend>
                    <div className={styles.product_advance_form_item}>
                        <Link className={`${styles.product_advance_item} product-advance__item ${styles.isactive}`} href={`/product/${product.handle}`}>
                            <div className={styles.product_advance_item_image}>
                                <Image src={product.image[0].imgpath} alt='' width={119} height={119} />
                            </div>
                            <h5 className={styles.product_advance_item_title}>{product.name}</h5>
                        </Link>
                        {
                            product.advanced.map((data, index) => (
                                <Link className={styles.product_advance_item} href={`/product/${data.handle}`} key={index}>
                                    <div className={styles.product_advance_item_image}>
                                        <Image src={data.thumb} alt='' width={119} height={119} />
                                    </div>
                                    <h5 className={styles.product_advance_item_title}>{data.name}</h5>
                                </Link>
                            ))
                        }
                    </div>
                </fieldset>
            </div>
        )
    }

    function changeVariant(optionPosition, variantTitle, variantText, variantPosition) {
        if (optionPosition === 0) {
            setOption1(variantTitle);
        } else { setOption2(variantTitle); }

        if (proView.includes('group-images')) {
            if (variantText === 'color') {
                setGroupImages(product.option[optionPosition].variant[variantPosition].groupimages);
            }
        }
    }

    function changeQtyInput(qtyNew, price) {
        if (qty > 0) setQty(parseInt(qtyNew));
    }

    function changeQty(number, price) {
        if (qty > 1) {
            (number) ? setQty((q) => q - 1) : setQty((q) => q + 1);
        } else { if (qty === 1) { (number) ? '' : setQty((q) => q + 1); } }
    }

    async function AddtoCart() {
        console.log('Adding to cart:', { product_id: product.id, quantity: qty }); // Debug log
        if (!product?.id) return;
        try {
            console.log('Adding to cart:', { product_id: product.id, quantity: qty }); // Debug log
            setClassStatus('cart-loadding');
            setStatusText(t("Adding_to_Cart"));
            await addToCartApi({ product_id: product.id, quantity: qty }).unwrap();
            setClassStatus('cart-complete');
            setStatusText(t("Added_success"));
            setTimeout(() => {
                setClassStatus('');
                setStatusText(t("Add_to_Cart"));
            }, 500);
        } catch (error) {
            setClassStatus('');
            setStatusText(t("Add_to_Cart"));
        }
    }

    if (product?.name != undefined) {
        return (
            <>
                <Head>
                    <title>{product.name}</title>
                </Head>

                <Header />
                <main>
                    <Breadcrumbs text={product.name} />
                    <div className="product-template">
                        <div className={styles.product_template_layout}>
                            <div className="container">
                                <div className='product-template__container row'>
                                    {
                                        (proView.includes('sidebar') || proView.includes('advanced') || proView.includes('group-images')) ? sidebar() : ''
                                    }
                                    <div className={`product-template__content ${(proView.includes('sidebar') || proView.includes('advanced') || proView.includes('group-images')) ? styles.padding_left : ''} ${proView.includes('rightbar') ? styles.padding_right : ''} ${columnView}`}>
                                        <div className="product-template__inner row">
                                            <div className="product-template__media col-12 col-sm-12 col-md-7">
                                                <StickyBox offsetTop={0} offsetBottom={20}>
                                                    {
                                                        (proView.includes('sidebar') || proView.includes('advanced') || proView.includes('group-images') || proView.includes('rightbar'))
                                                            ?
                                                            <ProductPageGallery productImg={groupImages} />
                                                            :
                                                            (proView.includes('stacked'))
                                                                ?
                                                                <ProductPageGalleryStacked productImg={groupImages} type={proView} />
                                                                :
                                                                <ProductPageGalleryVertical productImg={groupImages} />
                                                    }

                                                </StickyBox>
                                            </div>
                                            <div className={`${styles.product_template_info} product-template__info col-12 col-sm-12 col-md-5`}>
                                                <StickyBox offsetTop={30} offsetBottom={20}>
                                                    <h1 className={styles.product_title}>{product.name}</h1>
                                                    <div className="price price--large">
                                                        {displayPrice(product.price, product.price_compare)}
                                                    </div>
                                                    <div className={styles.product_rating}>
                                                        {displayRating(product.stars)}
                                                        <div className={styles.product_rating_add} onClick={() => { handleScroll(ref_reviewbox.current); }}>
                                                            <span>{t("Write_Review")}</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.product_earnpoints}>
                                                        <SVGDiamond />
                                                        <span className="earnpoints-text">{t("Earn")} {Math.round(product.price / 2)} {t("Reward_Points")}</span>
                                                    </div>
                                                    {
                                                        product.advanced != undefined ? loadStyles() : ''
                                                    }
                                                    <div className="variant-selects">
                                                        {
                                                            product.option.map((item, indexi) => (
                                                                <div key={item.handle}>
                                                                    <fieldset className="js product-form__input" data-type="input">
                                                                        <legend className="form__label">
                                                                            <span className="form__label-title">{t(item.title)}: {(indexi === 0) ? t(option1) : t(option2)}</span>
                                                                        </legend>
                                                                        <div className={`product-form__item product-form__${item.title.toLowerCase()}`}>
                                                                            {/* {
                                                                                item.variant.map((vari, indexj) => (
                                                                                    <div key={vari.handle}>
                                                                                        <label className="product-form-value__item product-form__" htmlFor={`option-${item.handle}-variant-${vari.handle}`}>
                                                                                            <input
                                                                                                type="radio"
                                                                                                name={`group-${item.handle}`}
                                                                                                value={vari.title}
                                                                                                id={`option-${item.handle}-variant-${vari.handle}`}
                                                                                                onChange={() => changeVariant(indexi, vari.title, item.handle, indexj)}
                                                                                            />
                                                                                            {(item.handle == 'color') ? <>
                                                                                                <span title={vari.title} className={`color-${vari.title.toLowerCase()} ${(option1 === vari.title) ? 'checked' : ''} ${(option2 === vari.title) ? 'checked' : ''}`} style={{ backgroundColor: vari.handle }}>{t(vari.title)}</span>
                                                                                            </> : <>
                                                                                                <span title={vari.title} className={`color-${vari.title.toLowerCase()} ${(option1 === vari.title) ? 'checked' : ''} ${(option2 === vari.title) ? 'checked' : ''}`}>{t(vari.title.replace(' ', ''))}</span>
                                                                                            </>}

                                                                                        </label>
                                                                                    </div>
                                                                                ))
                                                                            } */}
                                                                        </div>
                                                                    </fieldset>
                                                                    {
                                                                        (item.sizechart != undefined) ? <div className='product-template__sizechart'>
                                                                            <span className='product-sizechart__title' onClick={() => setOpen(o => !o)}>{t("Size_chart")}</span>
                                                                            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                                                                                <div className="modal__layout modal-open sizechart-popup">
                                                                                    <div className="modal__close" onClick={closeModal}></div>
                                                                                    <div className="modal__content">
                                                                                        <div className="modal__header">
                                                                                            <span className="modal__close-icon" onClick={closeModal}><SVGClose /></span>
                                                                                        </div>
                                                                                        <div className="modal__body">
                                                                                            <Image src={sizechart.src} alt="" width={655} height={867} />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Popup>
                                                                        </div>
                                                                            : ''
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="product-form__input product-form__quantity">
                                                        <label className="form__label">
                                                            {t("Quantity")}
                                                        </label>
                                                        <div className="quantity">
                                                            <button className="quantity__button no-js-hidden" name="minus" type="button" onClick={(e) => changeQty(true, product.price)}>
                                                                <span className="visually-hidden">{t("Decrease_quantity")}</span>
                                                                <SVGMinus />
                                                            </button>
                                                            <input onChange={(e) => changeQtyInput(e.target.value, product.price)} className="quantity__input" type="number" name="updates[]" value={qty} min="0" autoComplete="off" />
                                                            <button className="quantity__button no-js-hidden" name="plus" type="button" onClick={(e) => changeQty(false, product.price)}>
                                                                <span className="visually-hidden">{t("Increase_quantity")}</span>
                                                                <SVGPlus />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='product-template__form'>
                                                        <div className='product-form'>
                                                            <div className='product-form__buttons'>
                                                                <div className='product-form__buttons-group row'>
                                                                    <div className="col-12 col-sm-6">
                                                                        <button type="submit" name="add" className={`product-form__submit button button--full-width button--primary ${classStatus}`} onClick={AddtoCart}>{statusText}
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <ProductWishlist product={product} isDetail={true} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.product_terms}>
                                                        {t("Please_read")} <Link href="/page-termofservice" className='product-terms__action'>{t("Terms_conditions")}</Link>
                                                    </div>
                                                    <div className="product-template__details">
                                                        <div className={`product-template__title-area ${styles.details_strong}`}>{t("Details")}</div>
                                                        <div className="product-template__content-area">
                                                            <ul>
                                                                <li id="sku-template--14471996047434__main" className="product-template__sku">
                                                                    <span className="product-template__info-title">{t("SKU")}: </span>
                                                                    <span className="product-template__info-text">{product.SKU}</span>
                                                                </li>
                                                                <li className="product-template__vendor">
                                                                    <span className="product-template__info-title">{t("Brand")}: </span>
                                                                    <span className="product-template__info-text">{product.Brand}</span>
                                                                </li>
                                                                <li className="product-template__type">
                                                                    <span className="product-template__info-title">{t("Type")}: </span>
                                                                    <span className="product-template__info-text">{product.Type}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="product-template__description">
                                                        <div className={`product-template__title-area ${styles.details_strong}`}>{t("Quick_overview")}</div>
                                                        <div className="product-template__content-area">
                                                            <div dangerouslySetInnerHTML={{ __html: product.shortdesc || "" }} />
                                                        </div>
                                                    </div>
                                                    <div className="product-template__sharing">
                                                        <div className="product-sharing__desktop d-none d-md-block">
                                                            <div className={`product-sharing__title ${styles.details_strong}`}>{t("Share")}</div>
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
                                                    <div className='product-template__safecheckout'>
                                                        <Image src={safecheckout.src} alt='' width={402} height={78} />
                                                    </div>
                                                </StickyBox>
                                            </div>
                                        </div>
                                        <div className='product-template__bottom'>
                                            <div className='product-desciption page-width'>
                                                <div className="box-divider">
                                                    <h4 className="box-title">{t("Description")}</h4>
                                                </div>
                                                <div className='product-desciption-content'>
                                                    <div dangerouslySetInnerHTML={{ __html: product.desc }} />
                                                </div>
                                            </div>
                                            {
                                                (product.related_product != undefined) ? <ProductPageRelated data={product.related_product} /> : ''
                                            }
                                            <div ref={ref_reviewbox} className="reviewbox_wrapper">
                                                {
                                                    (product.review != undefined) ? <ProductPageReview data={product.review} /> : ''
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        (proView.includes('rightbar')) ? sidebar() : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <ExtNotification />
            </>
        )
    } else {
        return (
            <>
                <Header />
                <main>
                    {
                        isLoading ? <ProductPageSkeleton /> : <>
                            <div className="product-template">
                                <div className={`product-template__layout ${styles.template_wrapper}`}>
                                    <div className="container">
                                        <div className='product-template__container row'>
                                            <div className={`${styles.no_category} no_product`}>
                                                <h2 className={styles.no_category_h2}>{t("No_found_product")}</h2>
                                            </div>
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
export default ProductPage
