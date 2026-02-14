import React from 'react';
import styles from '../../public/assets/styles/Skeleton.module.css'

const SearchPageSkeleton = () => {
    return (
        <>
            <div className='search-template'>
                <div className='search-template__layout'>
                    <div className='container'>
                        <div className={`${styles.skeleton_search_wrapper}`}>
                            <p className={`${styles.skeleton} ${styles.skeleton_search_resulttext}`}></p>
                            <div className='search-template__results'>
                                <div className='row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5'>
                                    <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_search_productgrid}`} ></div>
                                    <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_search_productgrid}`} ></div>
                                    <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_search_productgrid}`} ></div>
                                    <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_search_productgrid}`} ></div>
                                    <div className={`collection-template__product-item col ${styles.skeleton} ${styles.skeleton_search_productgrid}`} ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchPageSkeleton;