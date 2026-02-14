import React from 'react';
import Image from 'next/image'

const ProductPageGalleryStacked = ({ productImg }) => {
    return (
        <>
            <div className='product-media__stacked row'>
                {
                    productImg.map((item) => (
                        <div className="product-media__item" key={item.idpro}>
                            <Image src={item.imgpath} priority="true" alt={item.imgalt} width={720} height={720} />
                        </div>
                    ))
                }
            </div>
        </>
    )

}

export default ProductPageGalleryStacked;