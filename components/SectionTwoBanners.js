import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import styles from '../public/assets/styles/Home.module.css'

const SectionTwoBanners = (props) => {
    return (
        <>
            <section className={styles.index_banner_grid}>
                <div className={` ${styles.banner_grid} spaced-section`}>
                    <div className="container">
                        <div className={`${styles.banner_grid__container} row`}>
                            <div className={`${styles.banner_grid__item} caption-false col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6`}>
                                <div className="effect effect-shine caption-position-bottom">
                                    <Link href={props.link1} className={`${styles.banner_grid__link} effect-parent`}>
                                        <Image className='brands__image effect-img' priority="true" alt="" src={props.banner1} width={635} height={202} />
                                    </Link>
                                </div>
                            </div>
                            <div className={`${styles.banner_grid__item} caption-false col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6`}>
                                <div className="effect effect-shine caption-position-bottom">
                                    <Link href={props.link2} className={`${styles.banner_grid__link} effect-parent`}>
                                        <Image className='brands__image effect-img' priority="true" alt="" src={props.banner2} width={635} height={202} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionTwoBanners;