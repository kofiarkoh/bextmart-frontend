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
import { notifyError, notifySuccess } from '../../components/ultils/notify'
import Button from '../../components/ultils/Button'

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
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(0);
    const [classStatus, setClassStatus] = useState('');
    const [statusText, setStatusText] = useState("Add to Cart");
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
    const { data: productResponse, isLoading: isProductLoading, isError } = useGetProductQuery(productId, { skip: !productId });
    const similarProducts = Array.isArray(productResponse?.similar) ? productResponse.similar : [];
    const selectedProduct = useSelector((state) => state.products.selected);
    const apiProduct = selectedProduct || productResponse?.data || productResponse?.product || productResponse || null;


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
            variants: Array.isArray(apiProduct.variants) ? apiProduct.variants : [],
            attributes: apiProduct.attributes && typeof apiProduct.attributes === 'object' && !Array.isArray(apiProduct.attributes)
                ? apiProduct.attributes
                : {},
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
    function selectVariant(variant) {
        setSelectedVariant(variant);
        if (variant?.options && Array.isArray(variant.options) && variant.options.length > 0) {
            const optionTypes = variant.options.reduce((acc, o) => {
                if (!acc[o.type]) acc[o.type] = [];
                acc[o.type].push(o);
                return acc;
            }, {});
            const defaultOpts = {};
            Object.entries(optionTypes).forEach(([type, entries]) => {
                const firstAvailable = entries.find(e => parseInt(e.quantity || '0') > 0) || entries[0];
                if (firstAvailable) defaultOpts[type] = firstAvailable.value;
            });
            setSelectedOptions(defaultOpts);
        } else {
            setSelectedOptions({});
        }
        if (variant && Array.isArray(variant.photos) && variant.photos.length > 0) {
            setGroupImages([variant.photos[0], ...(product?.photos || [])]);
        } else if (product?.photos) {
            setGroupImages(product.photos);
        }
    }


    useEffect(() => {
        if (!product?.variants?.length) return;
        const firstAvailable = product.variants.find(v => (v.stock - (v.reserved_stock || 0)) > 0) || product.variants[0];
        selectVariant(firstAvailable);
    }, [product?.id]);

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
        if (!product?.id) return;
        if (product.variants.length > 0 && !selectedVariant) {
            notifyError('Please select a variant before adding to cart.', 'Select a Variant');
            return;
        }
        try {
            setClassStatus('cart-loadding');
            const payload = { product_id: product.id, quantity: qty };
            if (selectedVariant) {
                payload.product_variant_id = selectedVariant.id;
                if (selectedVariant.options?.length > 0) {
                    const selectedOption = selectedVariant.options.find(
                        o => selectedOptions[o.type] === o.value
                    );
                    if (selectedOption?.id) payload.variant_option_id = selectedOption.id;
                }
            }
            await addToCartApi(payload).unwrap();
            setClassStatus('');
            notifySuccess(`${product.name} added to cart.`, 'Added to Cart');
        } catch (error) {
            setClassStatus('');
            const msg = error?.data?.message || 'Could not add to cart.';
            notifyError(msg, 'Could Not Add to Cart');
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
                                    <div className="product-template__content col-12">
                                        <div className="product-template__inner row">
                                            <div className="product-template__media col-12 col-sm-12 col-md-7">
                                                <StickyBox offsetTop={0} offsetBottom={20}>
                                                    <ProductPageGallery productImg={groupImages} />

                                                </StickyBox>
                                            </div>
                                            <div className={`${styles.product_template_info} product-template__info col-12 col-sm-12 col-md-5`}>
                                                <StickyBox offsetTop={30} offsetBottom={20}>
                                                    <h1 className={styles.product_title}>{product.name}</h1>
                                                    <div className="price price--large">
                                                        {(() => {
                                                            const activeOption = selectedVariant?.options?.find(
                                                                o => selectedOptions[o.type] === o.value && o.price != null
                                                            );
                                                            const activePrice = activeOption?.price ?? selectedVariant?.price ?? product.price;
                                                            return displayPrice(activePrice, product.price_compare);
                                                        })()}
                                                    </div>
                                                    <div className={styles.product_earnpoints}>
                                                        <span className="earnpoints-text" style={{ fontWeight: 500 }}>{t("Quantity")}:</span>
                                                        <div className="quantity" style={{ width: 'auto', minWidth: 120 }}>
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
                                                    {
                                                        product.advanced != undefined ? loadStyles() : ''
                                                    }
                                                    {product.variants.length > 0 && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            {/* Step 1 — pick a variant */}
                                                            <div style={{ marginBottom: 14 }}>
                                                                <div style={{ fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8 }}>
                                                                    Variant:
                                                                    {selectedVariant && (
                                                                        <span style={{ marginLeft: 6, color: 'var(--color_primary)', fontWeight: 700 }}>
                                                                            {selectedVariant.sku}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                                                                    {product.variants.map((variant) => {
                                                                        const outOfStock = variant.stock - (variant.reserved_stock || 0) <= 0;
                                                                        const isSelected = selectedVariant?.id === variant.id;
                                                                        const hasColor = !!variant.color_code;
                                                                        if (hasColor) {
                                                                            return (
                                                                                <button
                                                                                    key={variant.id}
                                                                                    type="button"
                                                                                    title={variant.sku}
                                                                                    disabled={outOfStock}
                                                                                    onClick={() => selectVariant(variant)}
                                                                                    style={{
                                                                                        width: 32,
                                                                                        height: 32,
                                                                                        borderRadius: '50%',
                                                                                        background: variant.color_code,
                                                                                        border: isSelected ? '3px solid var(--color_primary)' : '2px solid #ddd',
                                                                                        boxShadow: isSelected ? '0 0 0 2px #fff inset' : 'none',
                                                                                        padding: 0,
                                                                                        cursor: outOfStock ? 'not-allowed' : 'pointer',
                                                                                        opacity: outOfStock ? 0.4 : 1,
                                                                                        flexShrink: 0,
                                                                                    }}
                                                                                />
                                                                            );
                                                                        }
                                                                        return (
                                                                            <button
                                                                                key={variant.id}
                                                                                type="button"
                                                                                disabled={outOfStock}
                                                                                onClick={() => selectVariant(variant)}
                                                                                style={{
                                                                                    padding: '6px 14px',
                                                                                    borderRadius: 6,
                                                                                    border: isSelected ? '2px solid var(--color_primary)' : '1.5px solid #ddd',
                                                                                    background: isSelected ? 'var(--color_primary)' : '#fff',
                                                                                    color: isSelected ? '#fff' : outOfStock ? '#bbb' : '#333',
                                                                                    fontSize: 13,
                                                                                    fontWeight: isSelected ? 700 : 400,
                                                                                    cursor: outOfStock ? 'not-allowed' : 'pointer',
                                                                                    opacity: outOfStock ? 0.5 : 1,
                                                                                }}
                                                                            >
                                                                                {variant.sku}
                                                                                {outOfStock && (
                                                                                    <span style={{ display: 'block', fontSize: 10, color: isSelected ? '#ffcdd2' : '#e53935', marginTop: 1 }}>
                                                                                        Out of stock
                                                                                    </span>
                                                                                )}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>

                                                            {/* Step 2 — pick sub-options of the selected variant */}
                                                            {selectedVariant && Array.isArray(selectedVariant.options) && selectedVariant.options.length > 0 && (() => {
                                                                const optionTypes = selectedVariant.options.reduce((acc, o) => {
                                                                    if (!acc[o.type]) acc[o.type] = [];
                                                                    if (!acc[o.type].includes(o.value)) acc[o.type].push(o.value);
                                                                    return acc;
                                                                }, {});
                                                                return Object.entries(optionTypes).map(([type, values]) => {
                                                                    const selectedVal = selectedOptions[type];
                                                                    return (
                                                                        <div key={type} style={{ marginBottom: 14 }}>
                                                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8, textTransform: 'capitalize' }}>
                                                                                {type}:
                                                                                {selectedVal && (
                                                                                    <span style={{ marginLeft: 6, color: 'var(--color_primary)', fontWeight: 700 }}>
                                                                                        {selectedVal}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                                                                                {values.map((value) => {
                                                                                    const optionEntry = selectedVariant.options.find(o => o.type === type && o.value === value);
                                                                                    const optionQty = optionEntry ? parseInt(optionEntry.quantity || '0') : 0;
                                                                                    const outOfStock = optionQty <= 0;
                                                                                    const isSelected = selectedVal === value;
                                                                                    const hasColor = !!optionEntry?.color_code;
                                                                                    if (hasColor) {
                                                                                        return (
                                                                                            <button
                                                                                                key={value}
                                                                                                type="button"
                                                                                                title={value}
                                                                                                disabled={outOfStock}
                                                                                                onClick={() => setSelectedOptions(prev => ({ ...prev, [type]: value }))}
                                                                                                style={{
                                                                                                    width: 32,
                                                                                                    height: 32,
                                                                                                    borderRadius: '50%',
                                                                                                    background: optionEntry.color_code,
                                                                                                    border: isSelected ? '3px solid var(--color_primary)' : '2px solid #ddd',
                                                                                                    boxShadow: isSelected ? '0 0 0 2px #fff inset' : 'none',
                                                                                                    padding: 0,
                                                                                                    cursor: outOfStock ? 'not-allowed' : 'pointer',
                                                                                                    opacity: outOfStock ? 0.4 : 1,
                                                                                                    flexShrink: 0,
                                                                                                }}
                                                                                            />
                                                                                        );
                                                                                    }
                                                                                    return (
                                                                                        <button
                                                                                            key={value}
                                                                                            type="button"
                                                                                            disabled={outOfStock}
                                                                                            onClick={() => {
                                                                                                setSelectedOptions(prev => ({ ...prev, [type]: value }));
                                                                                            }}
                                                                                            style={{
                                                                                                padding: '6px 14px',
                                                                                                borderRadius: 6,
                                                                                                border: isSelected ? '2px solid var(--color_primary)' : '1.5px solid #ddd',
                                                                                                background: isSelected ? 'var(--color_primary)' : '#fff',
                                                                                                color: isSelected ? '#fff' : outOfStock ? '#bbb' : '#333',
                                                                                                fontSize: 13,
                                                                                                fontWeight: isSelected ? 700 : 400,
                                                                                                cursor: outOfStock ? 'not-allowed' : 'pointer',
                                                                                                opacity: outOfStock ? 0.5 : 1,
                                                                                            }}
                                                                                        >
                                                                                            {value}
                                                                                            {outOfStock && (
                                                                                                <span style={{ display: 'block', fontSize: 10, color: isSelected ? '#ffcdd2' : '#e53935', marginTop: 1 }}>
                                                                                                    Out of stock
                                                                                                </span>
                                                                                            )}
                                                                                        </button>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                });
                                                            })()}
                                                        </div>
                                                    )}
                                                    <div className='product-template__form'>
                                                        <div className='product-form'>
                                                            <div className='product-form__buttons'>
                                                                <div className='product-form__buttons-group row'>
                                                                    <div className="col-12">
                                                                        <Button
                                                                            label="Add to Cart"
                                                                            loading={classStatus === 'cart-loadding'}
                                                                            onClick={AddtoCart}
                                                                            size="full"
                                                                            type="submit"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {product.photos.length > 0 && (() => {
                                                        const variantAttrs = selectedVariant?.attributes && typeof selectedVariant.attributes === 'object' && !Array.isArray(selectedVariant.attributes) ? selectedVariant.attributes : null;
                                                        const attrs = variantAttrs || product.attributes;
                                                        const entries = Object.entries(attrs).filter(([, v]) => v !== null && v !== '');
                                                        if (!entries.length) return null;
                                                        return (
                                                            <div className="product-template__details">
                                                                <div className={`product-template__title-area ${styles.details_strong}`}>Details</div>
                                                                <div className="product-template__content-area">
                                                                    <ul>
                                                                        {entries.map(([key, value]) => (
                                                                            <li key={key} className="product-template__sku">
                                                                                <span className="product-template__info-title" style={{ textTransform: 'capitalize' }}>
                                                                                    {key.replace(/_/g, ' ')}:{' '}
                                                                                </span>
                                                                                <span className="product-template__info-text">
                                                                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                    <div className="product-template__description">
                                                        <div className={`product-template__title-area ${styles.details_strong}`}>Quick Overview</div>
                                                        <div className="product-template__content-area">
                                                            <div dangerouslySetInnerHTML={{ __html: product.shortdesc || "" }} />
                                                        </div>
                                                    </div>
                                                    <div className="product-template__sharing">
                                                        <div className="product-sharing__desktop d-none d-md-block">
                                                            <div className={`product-sharing__title ${styles.details_strong}`}>{t("Share")}</div>
                                                            <ul className="social-sharing">
                                                                <li>
                                                                    <Link target="_blank" href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(FullURL)}`} className="btn--share share-facebook">
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                                                        <span className="share-title" aria-hidden="true">Facebook</span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link target="_blank" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(product.name + ' ' + FullURL)}`} className="btn--share share-whatsapp">
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                                                                        <span className="share-title" aria-hidden="true">WhatsApp</span>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(FullURL)}`} className="btn--share share-twitter">
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                                                        <span className="share-title" aria-hidden="true">Twitter</span>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* <div className='product-template__safecheckout'>
                                                        <Image src={safecheckout.src} alt='' width={402} height={78} />
                                                    </div> */}
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
                                            {similarProducts.length > 0 && (
                                                <div className='product-desciption page-width' style={{ marginTop: 40 }}>
                                                    <div className="box-divider">
                                                        <h4 className="box-title">Similar Products</h4>
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16, marginTop: 20 }}>
                                                        {similarProducts.slice(0, 6).map((item, index) => (
                                                            <Link
                                                                key={item.id || index}
                                                                href={`/product/${item.id}`}
                                                                style={{ textDecoration: 'none' }}
                                                            >
                                                                <div style={{ background: '#f5f6f8', borderRadius: 8, padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140 }}>
                                                                    <img
                                                                        src={buildImageUrl(item?.photos?.[0])}
                                                                        alt={item.name}
                                                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                                    />
                                                                </div>
                                                                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                    {item.name}
                                                                </p>
                                                                <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: 'var(--color_primary)' }}>
                                                                    GHC {item.price}
                                                                </p>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div ref={ref_reviewbox} className="reviewbox_wrapper">
                                                {
                                                    (product.review != undefined) ? <ProductPageReview data={product.review} /> : ''
                                                }
                                            </div>
                                        </div>

                                    </div>
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
