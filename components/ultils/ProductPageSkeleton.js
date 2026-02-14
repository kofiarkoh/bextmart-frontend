import React from 'react';
import styles from '../../public/assets/styles/Skeleton.module.css'

const ProductPageSkeleton = () => {
    return (
        <>
            <div className="product-template">
                <div className={`product-template__layout ${styles.template_product_wrapper}`}>
                    <div className="container">
                        <div className='product-template__container row'>
                            <div className={`collection--template__sidebar collection-sidebar__left d-none d-md-block col-12 col-md-2-4`}>
                                <div className='collection-sidebar__content'>
                                    <div className={` collection-sidebar__item ${styles.skeleton} ${styles.skeleton_product_sidebar1 }`}></div>
                                    <div className={` collection-sidebar__item ${styles.skeleton} ${styles.skeleton_product_sidebar2 }`}></div>
                                    <div className={` collection-sidebar__item ${styles.skeleton} ${styles.skeleton_product_sidebar3 }`}></div>
                                </div>
                            </div>
                            <div className={`product-template__content product-template__content-left padding-left col-12 col-md-4-5`}>
                                <div className="product-template__inner row">
                                    <div className="product-template__media col-12 col-sm-12 col-md-7">
                                        <div className='product-template__media-content row'>
                                            <div className='col-12 col-lg-12'>
                                                <div className="product-gallery">
                                                    <div className={`product-item__image ${styles.skeleton} ${styles.skeleton_product_topimage}`}></div>
                                                </div>
                                            </div>
                                            <div className='col-12 col-lg-12 d-none d-md-block '>
                                                <div className='product-template__thumbnail product-thumbnail__bottom'>
                                                    <div className={styles.skeleton_product_thumbnail}>
                                                        <div className={`product-item__image ${styles.skeleton} ${styles.skeleton_product_galleryimage}`}></div>
                                                        <div className={`product-item__image ${styles.skeleton} ${styles.skeleton_product_galleryimage}`}></div>
                                                        <div className={`product-item__image ${styles.skeleton} ${styles.skeleton_product_galleryimage}`}></div>
                                                        <div className={`product-item__image ${styles.skeleton} ${styles.skeleton_product_galleryimage}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-template__info col-12 col-sm-12 col-md-5'>
                                        <h1 className={`product-template__title ${styles.skeleton} ${styles.skeleton_product_title}`}></h1>
                                        <div className={`price price--large ${styles.skeleton} ${styles.skeleton_product_price}`}></div>
                                        <div className={`product-template__rating ${styles.skeleton} ${styles.skeleton_product_rating}`}></div>
                                        <div className={`product-template__earnpoints ${styles.skeleton} ${styles.skeleton_product_earnpoint}`}></div>
                                        <div className="product-form__advance">
                                            <div className={styles.skeleton_product_formitem}>
                                                <div className={`product-advance__item ${styles.skeleton} ${styles.skeleton_product_advancebox}`}></div>
                                                <div className={`product-advance__item ${styles.skeleton} ${styles.skeleton_product_advancebox}`}></div>
                                                <div className={`product-advance__item ${styles.skeleton} ${styles.skeleton_product_advancebox}`}></div>
                                            </div>
                                        </div>
                                        <div className="variant-selects">
                                            <div className={`form__label-title ${styles.skeleton} ${styles.skeleton_product_varianttitle}`}></div>
                                            <div className='product-form__item'>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                            </div>
                                        </div>
                                        <div className="variant-selects">
                                            <div className={`form__label-title ${styles.skeleton} ${styles.skeleton_product_varianttitle}`}></div>
                                            <div className='product-form__item'>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                                <div className={`${styles.skeleton} ${styles.skeleton_product_variantbox}`}></div>
                                            </div>
                                        </div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_product_qty}`}></div>
                                        <div className='product-template__form'>
                                            <div className='product-form'>
                                                <div className='product-form__buttons'>
                                                    <div className='product-form__buttons-group row'>
                                                        <div className="col-12 col-sm-6">
                                                            <div className={`${styles.skeleton} ${styles.skeleton_product_button}`}> </div>
                                                        </div>
                                                        <div className="col-12 col-sm-6">
                                                            <div className={`${styles.skeleton} ${styles.skeleton_product_button}`}> </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12">
                                                            <div className={`${styles.skeleton} ${styles.skeleton_product_button}`}> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`product-template__terms ${styles.skeleton} ${styles.skeleton_product_terms}`}></div>
                                        <div className={`product-template__terms ${styles.skeleton} ${styles.skeleton_product_terms}`}></div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductPageSkeleton;