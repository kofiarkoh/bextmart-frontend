import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import ProductLabels from "./ProductLabels";
import ProductQuickView from "./ProductQuickView";
import ProductWishlist from './ProductWishlist'
import ProductCompare from './ProductCompare'
import ProductAddtoCart from './ProductAddtoCart'
import { displayRating, displayPrice, displayInventoryBar, buildImageUrl } from './Tools'
import useTranslation from './useTranslation'

const ProductItemGrid = ({ product }) => {
    const { t } = useTranslation();
    const primaryPhoto = product?.photos?.[0]
    const secondaryPhoto = product?.photos?.[1] || primaryPhoto
    return (
        <>
            <div className="product-item__grid ">
                <div className="product-item__top">
                    <Link className='product-item__link product-item__hover_image' href={`/product/${product.id}`}>
                        <div className='product-item__image'>
                            <div className='product-item__image'>
                                <img style={{ width: 182, height: 182, objectFit: "contain" }} src={buildImageUrl(primaryPhoto)} priority="true" alt={product?.name || "product"} width={182} height={182} />
                            </div>
                        </div>
                        <div className='product-item__image_second'>
                            <div className='product-item__image'>
                                <img style={{ width: 182, height: 182, objectFit: "contain"  }} src={buildImageUrl(secondaryPhoto)} priority="true" alt={product?.name || "product"} width={182} height={182} />
                            </div>
                        </div>
                    </Link>
                    <ProductLabels product={product} />
                    <div className="product-item__hover group-button top-right">
                        <ProductQuickView product={product} directly="1" />
                        <ProductWishlist product={product} />
                        <ProductCompare product={product} />                                
                    </div>
                    <ProductAddtoCart product={product} />
                </div>
                <div className="product-item__bottom" style={{
                    display: 'block'
                }}>
                    <Link href={`/product/${product.id}`} className="product-item__title h5">
                        {product.name}
                    </Link>
                    {displayRating(3.4)}
                    <div style={{
                        paddingTop: "10px",
                    }}>GHC {product.price}</div>
                </div>
            </div>
        </>
    )
}

export default ProductItemGrid;
