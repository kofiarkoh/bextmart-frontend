import React from 'react';
import styles from '../../public/assets/styles/Skeleton.module.css'

const CartPageSkeleton = () => {
    return (
        <>
            <div className='main-cart-items'>
                <div className='cart-template__layout '>
                    <div className=''>
                        <div className={`${styles.skeleton_cart_wrapper}`}>
                            <p className={`${styles.skeleton} ${styles.skeleton_search_resulttext}`}></p>
                            <div className='cart-list'>
                                <div className={`${styles.skeleton} ${styles.skeleton_carttable_heading}`}></div>
                                <div className={`${styles.skeleton_carttable_item}`}>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_img}`}></div>
                                    <div className={styles.skeleton_carttableitem_info}>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_title}`}></div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_text}`}></div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_text}`}></div>
                                    </div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more2}`}></div>
                                </div>
                                <div className={`${styles.skeleton_carttable_item}`}>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_img}`}></div>
                                    <div className={styles.skeleton_carttableitem_info}>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_title}`}></div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_text}`}></div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_text}`}></div>
                                    </div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more2}`}></div>
                                </div>
                                <div className={`${styles.skeleton_carttable_item}`}>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_img}`}></div>
                                    <div className={styles.skeleton_carttableitem_info}>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_title}`}></div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_text}`}></div>
                                        <div className={`${styles.skeleton} ${styles.skeleton_carttableiteminfo_text}`}></div>
                                    </div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttableitem_more2}`}></div>
                                </div>
                                <div className={`${styles.skeleton} ${styles.skeleton_carttable_footer}`}></div>
                                <div className={`${styles.skeleton_carttable_button}`}>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttable_button1}`}></div>
                                    <div className={`${styles.skeleton} ${styles.skeleton_carttable_button2}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPageSkeleton;