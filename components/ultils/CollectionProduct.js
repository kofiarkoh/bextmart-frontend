import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import ProductLabels from "./ProductLabels";
import ProductQuickView from "./ProductQuickView";
import ProductWishlist from './ProductWishlist'
import ProductCompare from './ProductCompare'
import ProductAddtoCart from './ProductAddtoCart'
import { displayRating, displayPrice, displayInventoryBar } from './Tools'
import useTranslation from './useTranslation'

const CollectionProduct = ({ product }) => {
    const { t } = useTranslation();
    return (
        <>

            <div className="product-item__grid ">
                <div className="product-item__top">
                    <Link className='product-item__link product-item__hover_image' href={`/product/${product.handle}`}>
                        <div className='product-item__image'>
                            <div className='product-item__image'>
                                <Image src={product.image[0].imgpath} priority="true" alt={product.image[0].imgalt} width={370} height={370} />
                            </div>
                        </div>
                        <div className='product-item__image_second'>
                            <div className='product-item__image'>
                                <Image src={product.image[1].imgpath} priority="true" alt={product.image[1].imgalt} width={370} height={370} />
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
                <div className="product-item__bottom">
                    <Link href={`/product/${product.handle}`} className="product-item__title h5">
                        {product.name}
                    </Link>
                    {displayRating(product.stars)}
                    {displayPrice(product.price, product.price_compare)}
                    {displayInventoryBar(product.quantity, product.quantity_total, t("Left"))}
                </div>
                <div className="collection-product-item__list">
                    <div className="product-item__list-title">
                        {displayRating(product.stars)}
                        <Link href={`/product/${product.handle}`} className="product-item__title h5">
                            {product.name}
                        </Link>
                    </div>
                    {displayPrice(product.price, product.price_compare)}
                    <div className="product-item__list-description">
                        {product.shortdesc}
                    </div>
                    <div className="product-item__hover-gr">
                        <div className="product-item__hover">
                            <ProductAddtoCart product={product} />
                            <ProductQuickView product={product} directly="1" />
                            <ProductWishlist product={product} />
                            <ProductCompare product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectionProduct;