import React from "react";
import Link from 'next/link';
import ProductLabels from "./ProductLabels";
import ProductWishlist from './ProductWishlist'
import ProductAddtoCart from './ProductAddtoCart'
import CurrencyConvert from './CurrencyConvert'
import { buildImageUrl } from './Tools'
import useTranslation from './useTranslation'

const ProductItemGrid = ({ product }) => {
    const { t } = useTranslation();
    const primaryPhoto = product?.photos?.[0]

    return (
        <div className="product-item__grid product-card">
            <div className="product-item__top">
                <Link className="product-item__link" href={`/product/${product.uuid}`}>
                    <div className="product-card__image-wrapper">
                        <img
                            className="product-card__image"
                            src={buildImageUrl(primaryPhoto)}
                            alt={product?.name || "product"}
                            width={220}
                            height={220}
                        />
                    </div>
                </Link>

                <ProductLabels product={product} />

                {/* <div className="product-item__hover group-button top-right">
                    <ProductWishlist product={product} />
                </div> */}

                <ProductAddtoCart product={product} />
            </div>

            <div className="product-card__info">
                <Link href={`/product/${product.uuid}`} className="product-card__name">
                    {product.name}
                </Link>
                <div className="product-card__price">
                    <CurrencyConvert amount={parseFloat(product.price) || 0} />
                </div>
            </div>
        </div>
    )
}

export default ProductItemGrid;
