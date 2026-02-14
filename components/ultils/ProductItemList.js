import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image'
import ProductLabels from "./ProductLabels";
import ProductQuickView from "./ProductQuickView";
import ProductWishlist from './ProductWishlist'
import ProductCompare from './ProductCompare'
import ProductAddtoCart from './ProductAddtoCart'
import {displayRating, displayPrice} from './Tools';

const ProductItemGrid = ({ product }) => {   
    return (
        <>
            <div className="product-item__top">
                <Link href={`/product/${product.handle}`} className='product-item__link product-item__hover_image'>
                    <>
                            <div className='product-item__image'>
                                <div className='product-item__image'>
                                    <Image src={product.image[0].imgpath} alt={product.image[0].imgalt} width={106} height={106} />
                                </div>
                            </div>
                            <div className='product-item__image_second'>
                                <div className='product-item__image'>
                                    <Image src={product.image[1].imgpath} alt={product.image[1].imgalt} width={106} height={106} />
                                </div>
                            </div>
                        <ProductLabels product={product} />
                    </>
                </Link>

            </div>
            <div className="product-item__bottom">
                <Link href={`/product/${product.handle}`} className="product-item__title h5">
                    {product.name}
                </Link>
                {displayRating(product.stars)}
                {displayPrice(product.price, product.price_compare)}
                <div className="product-item__hover">
                    <ProductAddtoCart product={product} />
                    <ProductQuickView product={product} directly="1" />
                    <ProductWishlist product={product} />
                    <ProductCompare product={product} />
                </div>
            </div>
        </>
    )
}

export default ProductItemGrid;