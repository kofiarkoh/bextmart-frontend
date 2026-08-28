import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import StickyBox from "react-sticky-box";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/ultils/Breadcrumbs';
import Button from '../../components/ultils/Button';
import CurrencyConvert from '../../components/ultils/CurrencyConvert';
import ProductPageGallery from '../../components/ultils/ProductPageGallery';
import ProductPageRelated from '../../components/ultils/ProductPageRelated';
import ProductPageReview from '../../components/ultils/ProductPageReview';
import ProductPageSkeleton from '../../components/ultils/ProductPageSkeleton';
import { buildImageUrl, displayPrice } from '../../components/ultils/Tools';
import { dismissAll, notifyAuth, notifyError, notifySuccess } from '../../components/ultils/notify';
import { SVGArrowDown, SVGMinus, SVGPlus } from '../../public/assets/SVG';
import sidebarBanner from "../../public/assets/images/yam-banner-ads.png";
import styles from '../../public/assets/styles/ProductPage.module.css';
import Product_en from "../../public/locales/en/en_Product.json";
import { Collections_Menu_en } from "../../public/locales/en/en_TextMenuCol";
import { useAddToCartMutation } from '../../store/cartApi';
import { useGetAddressOptionsQuery } from '../../store/checkoutApi';
import { useGetProductQuery } from '../../store/productsApi';

function getDeliveryEstimate(days, isPickup, cityName) {
  if (!days) return null;
  const d = new Date();
  d.setDate(d.getDate() + days);
  const date = d.toLocaleDateString('en-GH', { day: 'numeric', month: 'long', year: 'numeric' });
  if (isPickup) {
    return `Your item will be ready for pickup by ${date}. Please bring a valid ID and your Order Number to collect your item, and ensure pickup is completed within 5 days of notice.`;
  }
  return `Your item will be delivered by ${date}. Delivery times may vary slightly based on your exact location within ${cityName || 'the city'}.`;
}

const ProductPage = ({ seoProduct, seoUrl }) => {
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
    const [selectedSubOptions, setSelectedSubOptions] = useState({});
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
    const [estRegionId, setEstRegionId] = useState('');
    const [estCityId, setEstCityId] = useState('');

    const router = useRouter();
    const pathProductId = (router.asPath.match(/^\/product\/([^/?]+)/) || [])[1] || null;
    const productId = router.isReady ? pathProductId : null;

    const { data: productResponse, isLoading: isProductLoading, isError } = useGetProductQuery(productId, { skip: !productId });
    const similarProducts = Array.isArray(productResponse?.similar) ? productResponse.similar : [];
    const authToken = useSelector((state) => state.auth?.token);

    const [tokenChecked, setTokenChecked] = useState(false);
    useEffect(() => {
        setTokenChecked(true);
    }, []);

    const { data: addressOptionsData } = useGetAddressOptionsQuery(undefined, { skip: !tokenChecked || !authToken });
    const estRegions = Array.isArray(addressOptionsData?.data) ? addressOptionsData.data : [];
    const estSelectedRegion = estRegions.find((r) => String(r.id) === String(estRegionId));
    const estCities = estSelectedRegion?.cities || [];
    const estSelectedCity = estCities.find((c) => String(c.id) === String(estCityId));
    const rawApiProduct = productResponse?.data || productResponse?.product || productResponse || null;
    const isApiProductStale = !!rawApiProduct && String(rawApiProduct.uuid || rawApiProduct.id) !== String(productId);
    const apiProduct = isApiProductStale ? null : rawApiProduct;

    const seoSourceProduct = apiProduct || seoProduct || null;
    const seoTitle = seoSourceProduct?.name ? `${seoSourceProduct.name} | Bextmart` : 'Bextmart - Online Shopping in Ghana';
    const seoDescriptionRaw = seoSourceProduct?.short_description || seoSourceProduct?.description || '';
    const seoDescription = seoDescriptionRaw
        ? seoDescriptionRaw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
        : "Shop electronics, fashion, home goods and more on Bextmart — Ghana's online marketplace with fast delivery and secure payment.";
    const seoImage = buildImageUrl(seoSourceProduct?.photos?.[0] || seoSourceProduct?.variants?.[0]?.photos?.[0] || null);
    const seoPrice = seoSourceProduct?.price != null ? parseFloat(seoSourceProduct.price) : null;
    const seoHead = (
        <Head>
            <title key="title">{seoTitle}</title>
            <meta key="description" name="description" content={seoDescription} />
            {seoUrl && <link key="canonical" rel="canonical" href={seoUrl} />}
            <meta key="og:type" property="og:type" content="product" />
            <meta key="og:site_name" property="og:site_name" content="Bextmart" />
            <meta key="og:title" property="og:title" content={seoTitle} />
            <meta key="og:description" property="og:description" content={seoDescription} />
            <meta key="og:image" property="og:image" content={seoImage} />
            {seoUrl && <meta key="og:url" property="og:url" content={seoUrl} />}
            {seoPrice != null && <meta key="product:price:amount" property="product:price:amount" content={String(seoPrice)} />}
            {seoPrice != null && <meta key="product:price:currency" property="product:price:currency" content="GHS" />}
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:title" name="twitter:title" content={seoTitle} />
            <meta key="twitter:description" name="twitter:description" content={seoDescription} />
            <meta key="twitter:image" name="twitter:image" content={seoImage} />
        </Head>
    );

    const restrictedRegionIds = (apiProduct?.restricted_regions || []).map((r) =>
        String(typeof r === 'object' ? r.id : r)
    );
    const isRegionRestricted = !!estRegionId && restrictedRegionIds.includes(String(estRegionId));


    const allPhotos = useMemo(() => {
        if (!apiProduct) return [];
        const photos = Array.isArray(apiProduct.photos) ? apiProduct.photos : [];
        const variantPhotos = (Array.isArray(apiProduct.variants) ? apiProduct.variants : [])
            .map(v => v.photos?.[0])
            .filter(Boolean);
        return [...new Set([...photos, ...variantPhotos])];
    }, [apiProduct]);

    const product = useMemo(() => {

        if (!apiProduct) return null;
        const photos = Array.isArray(apiProduct.photos) ? apiProduct.photos : [];
        const image = allPhotos.length
            ? allPhotos.map((photo, index) => ({
                idpro: `${apiProduct.id || productId}-${index}`,
                imgpath: buildImageUrl(photo),
                imgalt: apiProduct.name || 'product',
            }))
            : [{
                idpro: `${apiProduct.id || productId}-0`,
                imgpath: buildImageUrl(null),
                imgalt: apiProduct.name || 'product',
            }];

         setGroupImages(allPhotos);
        return {
            id: apiProduct.id,
            uuid: apiProduct.uuid,
            name: apiProduct.name,
            price: apiProduct.price,
            quantity: apiProduct.quantity ?? 0,
            quantity_total: apiProduct.quantity ?? 0,
            stars: apiProduct.stars ?? 0,
            desc: apiProduct.description || '',
            shortdesc: apiProduct.short_description || '',
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
    }, [apiProduct, productId, allPhotos]);

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
    function computeSubOptionDefaults(variant, optionsMap) {
        if (!variant || !Array.isArray(variant.options)) return {};
        const defaults = {};
        Object.entries(optionsMap).forEach(([type, value]) => {
            const optionEntry = variant.options.find(o => o.type === type && o.value === value);
            const suboptions = Array.isArray(optionEntry?.suboptions) ? optionEntry.suboptions : [];
            if (suboptions.length === 0) return;
            const subTypes = suboptions.reduce((acc, s) => {
                if (!acc[s.type]) acc[s.type] = [];
                acc[s.type].push(s);
                return acc;
            }, {});
            Object.entries(subTypes).forEach(([subType, entries]) => {
                const firstAvailable = entries.find(e => parseInt(e.quantity || '0') > 0) || entries[0];
                if (firstAvailable) defaults[subType] = firstAvailable.value;
            });
        });
        return defaults;
    }

    function selectVariant(variant, updateImages = true) {
        setSelectedVariant(variant);
        if (updateImages) {
            if (variant?.photos?.[0]) {
                const variantPhoto = variant.photos[0];
                const rest = allPhotos.filter(p => p !== variantPhoto);
                setGroupImages([variantPhoto, ...rest]);
            } else {
                setGroupImages(allPhotos);
            }
        }
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
            setSelectedSubOptions(computeSubOptionDefaults(variant, defaultOpts));
        } else {
            setSelectedOptions({});
            setSelectedSubOptions({});
        }
    }


    useEffect(() => {
        if (!product?.variants?.length) return;
        const firstAvailable = product.variants.find(v => (v.quantity - (v.reserved_stock || 0)) > 0) || product.variants[0];
        selectVariant(firstAvailable);
    }, [product?.id]);

    const isLoading = !router.isReady || isProductLoading || isApiProductStale;

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
                        <Link className={`${styles.product_advance_item} product-advance__item ${styles.isactive}`} href={`/product/${product.uuid || product.handle}`}>
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

    function changeQty(number, price) {
        if (qty > 1) {
            (number) ? setQty((q) => q - 1) : setQty((q) => q + 1);
        } else { if (qty === 1) { (number) ? '' : setQty((q) => q + 1); } }
    }

    async function AddtoCart() {
        if (!authToken) {
            notifyAuth('Please log in to add items to your cart and continue shopping.');
            setTimeout(() => {
                dismissAll();
                router.push(`/account-login?redirect=/product/${product?.uuid || product?.id}`);
            }, 1500);
            return;
        }
        if (!product?.id) return;
        if (product.variants.length > 0 && !selectedVariant) {
            notifyError('Please select a variant before adding to cart.', 'Select a Variant');
            return;
        }
        if (qty > getAvailableStock()) {
            notifyError('Out of stock', 'Not Enough Stock');
            return;
        }
        try {
            setClassStatus('cart-loadding');
            const payload = { product_uuid: product.uuid, quantity: qty };
            if (selectedVariant) {
                payload.product_variant_id = selectedVariant.id;
                if (selectedVariant.options?.length > 0) {
                    const selectedOption = selectedVariant.options.find(
                        o => selectedOptions[o.type] === o.value
                    );
                    // variant_option_id always points to the leaf-most selected level:
                    // the sub-option's own id when one exists, otherwise the option's id.
                    let leafOptionId = selectedOption?.id;
                    if (Array.isArray(selectedOption?.suboptions) && selectedOption.suboptions.length > 0) {
                        const selectedSubOption = selectedOption.suboptions.find(
                            s => selectedSubOptions[s.type] === s.value
                        );
                        if (selectedSubOption?.id) leafOptionId = selectedSubOption.id;
                    }
                    if (leafOptionId) payload.variant_option_id = leafOptionId;
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

    function getVariantStock(variant) {
        if (!variant || typeof variant.quantity !== 'number') return null;
        return variant.quantity - (variant.reserved_stock || 0);
    }

    function getAvailableStock() {
        if (selectedVariant) {
            const variantStock = getVariantStock(selectedVariant);
            if (Array.isArray(selectedVariant.options) && selectedVariant.options.length > 0) {
                const selectedEntries = Object.entries(selectedOptions)
                    .map(([type, value]) => selectedVariant.options.find(o => o.type === type && o.value === value))
                    .filter(Boolean);
                if (selectedEntries.length > 0) {
                    const quantities = selectedEntries.map(o => parseInt(o.quantity || '0'));
                    if (variantStock !== null) quantities.push(variantStock);
                    selectedEntries.forEach(optionEntry => {
                        const suboptions = Array.isArray(optionEntry.suboptions) ? optionEntry.suboptions : [];
                        if (suboptions.length === 0) return;
                        Object.entries(selectedSubOptions)
                            .map(([subType, subValue]) => suboptions.find(s => s.type === subType && s.value === subValue))
                            .filter(Boolean)
                            .forEach(subEntry => quantities.push(parseInt(subEntry.quantity || '0')));
                    });
                    return Math.min(...quantities);
                }
            }
            return variantStock !== null ? variantStock : (selectedVariant.quantity - (selectedVariant.reserved_stock || 0));
        }
        return product.quantity ?? 0;
    }

    if (product?.name != undefined) {
        const displayName = selectedVariant?.title?.trim() ? selectedVariant.title : product.name;
        const availableStock = getAvailableStock();
        const exceedsStock = qty > availableStock;
        return (
            <>
                {seoHead}

                <Header />
                <main>
                    <div className="d-none d-md-block">
                        <Breadcrumbs text={displayName} />
                    </div>
                    <div className="product-template">
                        <div className={styles.product_template_layout}>
                            <div className="container">
                                <h1 className={`${styles.product_title} ${styles.product_title_mobile} d-block d-md-none`}>{displayName}</h1>
                                <div className='product-template__container row'>
                                    <div className="product-template__content col-12">
                                        <div className="product-template__inner row">
                                            <div className="product-template__media col-12 col-sm-12 col-md-5">
                                                <StickyBox offsetTop={0} offsetBottom={20}>
                                                    <ProductPageGallery key={`${productId}-${selectedVariant?.id ?? 'default'}`} productImg={groupImages} />

                                                </StickyBox>
                                            </div>
                                            <div className={`${styles.product_template_info} product-template__info col-12 col-sm-12 col-md-7`}>
                                                <StickyBox offsetTop={30} offsetBottom={20}>
                                                    <h2 className={`${styles.product_title} d-none d-md-block`}>{displayName}</h2>
                                                    <div className="price price--large">
                                                        {(() => {
                                                            const activeOption = selectedVariant?.options?.find(
                                                                o => selectedOptions[o.type] === o.value
                                                            );
                                                            const activeSubOption = Array.isArray(activeOption?.suboptions)
                                                                ? activeOption.suboptions.find(s => selectedSubOptions[s.type] === s.value && s.price != null)
                                                                : null;
                                                            const activePrice = activeSubOption?.price
                                                                ?? (activeOption?.price != null ? activeOption.price : null)
                                                                ?? selectedVariant?.price
                                                                ?? product.price;
                                                            return displayPrice(activePrice);
                                                        })()}
                                                    </div>
                                                    <div className={styles.product_earnpoints}>
                                                        <span className="earnpoints-text" style={{ fontWeight: 500 }}>{t("Quantity")}:</span>
                                                        <div className="quantity" style={{ width: 'auto', minWidth: 120 }}>
                                                            <button className="quantity__button no-js-hidden" name="minus" type="button" onClick={(e) => changeQty(true, product.price)}>
                                                                <span className="visually-hidden">{t("Decrease_quantity")}</span>
                                                                <SVGMinus />
                                                            </button>
                                                            <input readOnly className="quantity__input" type="number" name="updates[]" value={qty} min="0" autoComplete="off" />
                                                            <button className="quantity__button no-js-hidden" name="plus" type="button" onClick={(e) => changeQty(false, product.price)}>
                                                                <span className="visually-hidden">{t("Increase_quantity")}</span>
                                                                <SVGPlus />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {exceedsStock && (
                                                        <div style={{ fontSize: 13, color: '#e53935', marginTop: -8, marginBottom: 16 }}>
                                                            Out of stock
                                                        </div>
                                                    )}
                                                    {
                                                        product.advanced != undefined ? loadStyles() : ''
                                                    }
                                                    {product.variants.length > 0 && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            {/* Step 1 — pick a variant */}
                                                            {(() => {
                                                            const allHaveThumbnails = product.variants.every(
                                                                (v) => Array.isArray(v.photos) && v.photos.length > 0
                                                            );
                                                            return (
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
                                                                        const outOfStock = variant.quantity - (variant.reserved_stock || 0) <= 0;
                                                                        const isSelected = selectedVariant?.id === variant.id;
                                                                        const thumbSrc = allHaveThumbnails && variant.photos?.[0]
                                                                            ? buildImageUrl(variant.photos[0])
                                                                            : null;
                                                                        const hasColor = !!variant.color_code;

                                                                        if (thumbSrc) {
                                                                            return (
                                                                                <button
                                                                                    key={variant.id}
                                                                                    type="button"
                                                                                    title={outOfStock ? `${variant.sku} - Out of stock` : variant.sku}
                                                                                    onClick={() => selectVariant(variant)}
                                                                                    style={{
                                                                                        width: 56,
                                                                                        height: 56,
                                                                                        padding: 2,
                                                                                        borderRadius: 8,
                                                                                        border: isSelected ? '2.5px solid var(--color_primary)' : '2px solid #e5e7eb',
                                                                                        background: '#f9fafb',
                                                                                        cursor: 'pointer',
                                                                                        opacity: 1,
                                                                                        flexShrink: 0,
                                                                                        overflow: 'hidden',
                                                                                        position: 'relative',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src={thumbSrc}
                                                                                        alt={variant.sku}
                                                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
                                                                                    />
                                                                                    {outOfStock && (
                                                                                        <span style={{
                                                                                            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                            background: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700, color: '#e53935', borderRadius: 6,
                                                                                        }}>
                                                                                            Out of stock
                                                                                        </span>
                                                                                    )}
                                                                                </button>
                                                                            );
                                                                        }
                                                                        if (hasColor) {
                                                                            return (
                                                                                <button
                                                                                    key={variant.id}
                                                                                    type="button"
                                                                                    title={outOfStock ? `${variant.sku} - Out of stock` : variant.sku}
                                                                                    onClick={() => selectVariant(variant)}
                                                                                    style={{
                                                                                        width: 32,
                                                                                        height: 32,
                                                                                        borderRadius: '50%',
                                                                                        background: variant.color_code,
                                                                                        border: isSelected ? '3px solid var(--color_primary)' : '2px solid #ddd',
                                                                                        boxShadow: isSelected ? '0 0 0 2px #fff inset' : 'none',
                                                                                        padding: 0,
                                                                                        cursor: 'pointer',
                                                                                        opacity: 1,
                                                                                        flexShrink: 0,
                                                                                        position: 'relative',
                                                                                    }}
                                                                                >
                                                                                    {outOfStock && (
                                                                                        <span style={{
                                                                                            position: 'absolute', inset: 0, borderRadius: '50%',
                                                                                            background: 'linear-gradient(to top right, transparent 47%, #e53935 47%, #e53935 53%, transparent 53%)',
                                                                                        }} />
                                                                                    )}
                                                                                </button>
                                                                            );
                                                                        }
                                                                        return (
                                                                            <button
                                                                                key={variant.id}
                                                                                type="button"
                                                                                onClick={() => selectVariant(variant)}
                                                                                style={{
                                                                                    padding: '6px 14px',
                                                                                    borderRadius: 6,
                                                                                    border: isSelected ? '2px solid var(--color_primary)' : '1.5px solid #ddd',
                                                                                    background: isSelected ? 'var(--color_primary)' : '#fff',
                                                                                    color: isSelected ? '#fff' : '#333',
                                                                                    fontSize: 13,
                                                                                    fontWeight: isSelected ? 700 : 400,
                                                                                    cursor: 'pointer',
                                                                                    opacity: 1,
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
                                                            );
                                                            })()}

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
                                                                                    const variantStock = getVariantStock(selectedVariant);
                                                                                    const outOfStock = optionQty <= 0 || (variantStock !== null && variantStock <= 0);
                                                                                    const isSelected = selectedVal === value;
                                                                                    const hasColor = !!optionEntry?.color_code;
                                                                                    const hasSuboptions = Array.isArray(optionEntry?.suboptions) && optionEntry.suboptions.length > 0;
                                                                                    const optionPrice = hasSuboptions ? null : (optionEntry?.price != null
                                                                                        ? parseFloat(optionEntry.price)
                                                                                        : selectedVariant?.price != null
                                                                                            ? parseFloat(selectedVariant.price)
                                                                                            : product?.price != null
                                                                                                ? parseFloat(product.price)
                                                                                                : null);
                                                                                    return (
                                                                                        <button
                                                                                            key={value}
                                                                                            type="button"
                                                                                            title={hasColor && outOfStock ? `${value} - Out of stock` : undefined}
                                                                                            onClick={() => {
                                                                                                setSelectedOptions(prev => {
                                                                                                    const next = { ...prev, [type]: value };
                                                                                                    setSelectedSubOptions(computeSubOptionDefaults(selectedVariant, next));
                                                                                                    return next;
                                                                                                });
                                                                                            }}
                                                                                            style={{
                                                                                                padding: '10px 16px',
                                                                                                borderRadius: 10,
                                                                                                border: isSelected ? '2px solid var(--color_primary)' : '1.5px solid #ddd',
                                                                                                background: '#fff',
                                                                                                color: isSelected ? 'var(--color_primary)' : '#333',
                                                                                                fontSize: 14,
                                                                                                fontWeight: isSelected ? 700 : 500,
                                                                                                cursor: 'pointer',
                                                                                                textAlign: 'left',
                                                                                                minWidth: 110,
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                gap: 2,
                                                                                            }}
                                                                                        >
                                                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                                                {hasColor && (
                                                                                                    <span style={{
                                                                                                        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                                                                                                        background: optionEntry.color_code,
                                                                                                        border: '1px solid rgba(0,0,0,0.15)',
                                                                                                    }} />
                                                                                                )}
                                                                                                {value}
                                                                                            </span>
                                                                                            {optionPrice != null && (
                                                                                                <CurrencyConvert amount={optionPrice} style={{ fontSize: 13, fontWeight: 400, color: isSelected ? 'var(--color_primary)' : '#666' }} />
                                                                                            )}
                                                                                            {outOfStock && (
                                                                                                <span style={{ fontSize: 11, color: isSelected ? '#ffcdd2' : '#e53935', marginTop: 1 }}>
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

                                                            {/* Step 3 — pick sub-options of the selected option(s) */}
                                                            {selectedVariant && Object.entries(selectedOptions).map(([parentType, parentValue]) => {
                                                                const parentOption = selectedVariant.options.find(o => o.type === parentType && o.value === parentValue);
                                                                const suboptions = Array.isArray(parentOption?.suboptions) ? parentOption.suboptions : [];
                                                                if (suboptions.length === 0) return null;
                                                                const subTypes = suboptions.reduce((acc, s) => {
                                                                    if (!acc[s.type]) acc[s.type] = [];
                                                                    if (!acc[s.type].includes(s.value)) acc[s.type].push(s.value);
                                                                    return acc;
                                                                }, {});
                                                                const parentQty = parseInt(parentOption.quantity || '0');
                                                                const variantStock = getVariantStock(selectedVariant);
                                                                return Object.entries(subTypes).map(([subType, values]) => {
                                                                    const selectedSubVal = selectedSubOptions[subType];
                                                                    return (
                                                                        <div key={`${parentType}-${subType}`} style={{ marginBottom: 14 }}>
                                                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 8, textTransform: 'capitalize' }}>
                                                                                {subType}:
                                                                                {selectedSubVal && (
                                                                                    <span style={{ marginLeft: 6, color: 'var(--color_primary)', fontWeight: 700 }}>
                                                                                        {selectedSubVal}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                                                                                {values.map((value) => {
                                                                                    const subEntry = suboptions.find(s => s.type === subType && s.value === value);
                                                                                    const subQty = subEntry ? parseInt(subEntry.quantity || '0') : 0;
                                                                                    const outOfStock = subQty <= 0
                                                                                        || (parentQty !== null && parentQty <= 0)
                                                                                        || (variantStock !== null && variantStock <= 0);
                                                                                    const isSelected = selectedSubVal === value;
                                                                                    const hasColor = !!subEntry?.color_code;
                                                                                    const subPrice = subEntry?.price != null
                                                                                        ? parseFloat(subEntry.price)
                                                                                        : parentOption?.price != null
                                                                                            ? parseFloat(parentOption.price)
                                                                                            : selectedVariant?.price != null
                                                                                                ? parseFloat(selectedVariant.price)
                                                                                                : product?.price != null
                                                                                                    ? parseFloat(product.price)
                                                                                                    : null;
                                                                                    return (
                                                                                        <button
                                                                                            key={value}
                                                                                            type="button"
                                                                                            title={hasColor && outOfStock ? `${value} - Out of stock` : undefined}
                                                                                            onClick={() => {
                                                                                                setSelectedSubOptions(prev => ({ ...prev, [subType]: value }));
                                                                                            }}
                                                                                            style={{
                                                                                                padding: '10px 16px',
                                                                                                borderRadius: 10,
                                                                                                border: isSelected ? '2px solid var(--color_primary)' : '1.5px solid #ddd',
                                                                                                background: '#fff',
                                                                                                color: isSelected ? 'var(--color_primary)' : '#333',
                                                                                                fontSize: 14,
                                                                                                fontWeight: isSelected ? 700 : 500,
                                                                                                cursor: 'pointer',
                                                                                                textAlign: 'left',
                                                                                                minWidth: 110,
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                gap: 2,
                                                                                            }}
                                                                                        >
                                                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                                                {hasColor && (
                                                                                                    <span style={{
                                                                                                        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                                                                                                        background: subEntry.color_code,
                                                                                                        border: '1px solid rgba(0,0,0,0.15)',
                                                                                                    }} />
                                                                                                )}
                                                                                                {value}
                                                                                            </span>
                                                                                            {subPrice != null && (
                                                                                                <CurrencyConvert amount={subPrice} style={{ fontSize: 13, fontWeight: 400, color: isSelected ? 'var(--color_primary)' : '#666' }} />
                                                                                            )}
                                                                                            {outOfStock && (
                                                                                                <span style={{ fontSize: 11, color: isSelected ? '#ffcdd2' : '#e53935', marginTop: 1 }}>
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
                                                            })}
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
                                                                            disabled={exceedsStock}
                                                                            onClick={AddtoCart}
                                                                            size="full"
                                                                            type="submit"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Delivery Estimate */}
                                                    <div style={{ margin: '20px 0', padding: '14px 16px', borderRadius: 10, border: '1.5px solid var(--color_line, #e5e7eb)', background: 'var(--color_bg_2, #f9fafb)' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color_primary)', flexShrink: 0 }}>
                                                                <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                                                            </svg>
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color_heading)' }}>Choose Your Location</span>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                            <select
                                                                value={estRegionId}
                                                                onChange={(e) => { setEstRegionId(e.target.value); setEstCityId(''); }}
                                                                style={{ flex: 1, minWidth: 120, padding: '7px 10px', borderRadius: 6, border: `1.5px solid ${isRegionRestricted ? '#fca5a5' : 'var(--color_line, #d1d5db)'}`, fontSize: 13, background: '#fff', color: 'var(--color_body)', cursor: 'pointer' }}
                                                            >
                                                                <option value="">Select Region</option>
                                                                {estRegions.map((r) => (
                                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                                ))}
                                                            </select>
                                                            {!isRegionRestricted && (
                                                                <select
                                                                    value={estCityId}
                                                                    onChange={(e) => setEstCityId(e.target.value)}
                                                                    disabled={!estRegionId}
                                                                    style={{ flex: 1, minWidth: 120, padding: '7px 10px', borderRadius: 6, border: '1.5px solid var(--color_line, #d1d5db)', fontSize: 13, background: '#fff', color: 'var(--color_body)', cursor: estRegionId ? 'pointer' : 'not-allowed', opacity: estRegionId ? 1 : 0.5 }}
                                                                >
                                                                    <option value="">Select City</option>
                                                                    {estCities.map((c) => (
                                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </div>
                                                        {isRegionRestricted ? (
                                                            <div style={{ marginTop: 10, display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
                                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                                                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                                                </svg>
                                                                <span style={{ fontSize: 13, color: '#dc2626', fontWeight: 500 }}>
                                                                    This product cannot be shipped to {estSelectedRegion?.name || 'this region'}.
                                                                </span>
                                                            </div>
                                                        ) : estSelectedCity ? (
                                                            <div style={{ marginTop: 10, fontSize: 13 }}>
                                                                {(() => {
                                                                    const types = (estSelectedCity.delivery_types || []).filter(dt => dt.is_available);
                                                                    if (!types.length) return <span style={{ color: '#6b7280' }}>No delivery options available for this city.</span>;
                                                                    return (
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                                            {types.map((dt) => {
                                                                                const isPickup = dt.type?.slug === 'pickup';
                                                                                const estimate = getDeliveryEstimate(dt.estimated_days, isPickup, estSelectedCity?.name);
                                                                                return (
                                                                                <div key={dt.delivery_type_id} style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color_heading)', fontWeight: 500 }}>
                                                                                            <span style={{ fontSize: 16 }}>{isPickup ? '🏪' : '🚚'}</span>
                                                                                            {dt.type?.name}
                                                                                        </span>
                                                                                        <span style={{ fontWeight: 600, color: 'var(--color_heading)' }}>
                                                                                            {parseFloat(dt.fee) > 0
                                                                                                ? <CurrencyConvert amount={parseFloat(dt.fee)} style={{ fontSize: 13 }} />
                                                                                                : <span style={{ color: '#059669' }}>Free</span>
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    {estimate && (
                                                                                        <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 400 }}>{estimate}</span>
                                                                                    )}
                                                                                    {isPickup && (
                                                                                        <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 400, fontStyle: 'italic' }}>
                                                                                            You&apos;ll choose the exact pickup location at checkout.
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        ) : null}
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
                                                <div className='product-template__content-area'>
                                                    <div dangerouslySetInnerHTML={{ __html: product.desc }} />
                                                </div>
                                            </div>
                                            {
                                                (product.related_product != undefined) ? <ProductPageRelated data={product.related_product} /> : ''
                                            }
                                            {similarProducts.length > 0 && (
                                                <div className='product-desciption page-width' style={{ marginTop: 40 }}>
                                                    <div className="box-divider">
                                                        <h4 className="box-title">Products You May Like</h4>
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16, marginTop: 20 }}>
                                                        {similarProducts.slice(0, 6).map((item, index) => (
                                                            <Link
                                                                key={item.id || index}
                                                                href={`/product/${item.uuid || item.id}`}
                                                                style={{ textDecoration: 'none' }}
                                                            >
                                                                <div style={{ background: '#f5f6f8', borderRadius: 8, padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140 }}>
                                                                    <img
                                                                        src={buildImageUrl(item?.photos?.[0] || item?.variants?.[0]?.photos?.[0])}
                                                                        alt={item.name}
                                                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                                    />
                                                                </div>
                                                                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                    {item.name}
                                                                </p>
                                                                <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: 'var(--color_primary)' }}>
                                                                    GH₵ {item.price}
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

            </>
        )
    } else {
        return (
            <>
                {seoHead}

                <Header />
                <main>
                    {isLoading ? <ProductPageSkeleton /> : (
                        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px', background: '#f9fafb' }}>
                            <div style={{ textAlign: 'center', maxWidth: 440 }}>
                                <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"/>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                        <line x1="8" y1="11" x2="14" y2="11"/>
                                    </svg>
                                </div>
                                <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color_heading)', margin: '0 0 8px' }}>
                                    Product Not Found
                                </h1>
                                <p style={{ fontSize: 15, color: 'var(--color_body)', margin: '0 0 28px', lineHeight: 1.6 }}>
                                    Sorry, the product you&apos;re looking for doesn&apos;t exist or may have been removed. Try browsing our catalog or search for something else.
                                </p>
                                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Link href="/products" className="button button--primary">Browse Products</Link>
                                    <Link href="/" className="button button--secondary">Go Home</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
                <Footer />
            </>
        )
    }
}
export async function getServerSideProps({ params, req }) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const seoUrl = `${protocol}://${req.headers.host}/product/${params.pid}`;

    let seoProduct = null;
    try {
        const res = await fetch(`${API_BASE_URL}/products/${params.pid}`);
        if (res.ok) {
            const json = await res.json();
            seoProduct = json?.data || null;
        }
    } catch {
        seoProduct = null;
    }

    return { props: { seoProduct, seoUrl } };
}

export default ProductPage
