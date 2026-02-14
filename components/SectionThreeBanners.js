import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import styles from '../public/assets/styles/Home.module.css'

const SectionTwoBanners = (props) => {

    const BannerElement = (props) => {
        return (
            <div className={`${styles.banner_grid__item} caption-false col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4`}>
                <div className="effect effect-shine caption-position-bottom">
                    <Link href={props.link} className={`${styles.banner_grid__link} effect-parent`}>
                        <Image className='brands__image effect-img' priority="true" alt="" src={props.banner} width={417} height={411} />
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <>
            <section className={styles.index_banner_grid}>
                <div className={` ${styles.banner_grid} spaced-section`}>
                    <div className="container">
                        <div className={`${styles.banner_grid__container} row`}>
                            <BannerElement banner={props.banner1} link={props.link1} />
                            <BannerElement banner={props.banner2} link={props.link2} />
                            <BannerElement banner={props.banner3} link={props.link3} />                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionTwoBanners;