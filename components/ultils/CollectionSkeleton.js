import React from 'react';
import styles from '../../public/assets/styles/Skeleton.module.css'

const CollectionSkeleton = () => {
    return (
        <>
            <div className="collection-template">
                <div className={`product-template__layout ${styles.template_collection_wrapper}`}>
                    <div className="container">
                        <div className='row'>
                            <div className={`collection--template__sidebar ${styles.sidebar_left} d-none d-md-block col-12 col-md-2-4`}>
                                <div className='collection-sidebar__content'>
                                    <div className={` collection-sidebar__item ${styles.skeleton} ${styles.skeleton_collection_sidebar1}`}></div>
                                    <div className={` collection-sidebar__item ${styles.skeleton} ${styles.skeleton_collection_sidebar2}`}></div>
                                    <div className={` collection-sidebar__item ${styles.skeleton} ${styles.skeleton_collection_sidebar3}`}></div>
                                </div>
                            </div>
                            <div className={`${styles.skeleton_collection_content} ${styles.padding_left} col-12 col-md-4-5`}>
                                <h1 className={`${styles.skeleton} ${styles.skeleton_collection_title}`}></h1>
                                <div className={`${styles.skeleton} ${styles.skeleton_collection_desc}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeleton_collection_banner}`}></div>
                                <div id="CollectionProductGrid">
                                    <div className={`${styles.skeleton} ${styles.skeleton_collection_toolbar}`}></div>
                                    <div className={`${styles.collection_products} page-width`}>
                                        <div id="main-collection-product-grid" className={`${styles.collection_products_row} collection-template__product row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-4 collection-template__product-grid`}>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>
                                            <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_collection_productgrid}`} ></div>

                                        </div>
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

export default CollectionSkeleton;

