import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import styles from '../public/assets/styles/Home.module.css'

const SectionTwoBanners = (props) => {

    const BannerElementBig = (props) => {
        return (
            <div className={`${styles.banner_grid__item} caption-false col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6`}>
                <div className="effect effect-shine caption-position-bottom">
                    <Link href={props.link} className={`${styles.banner_grid__link} effect-parent`}>
                        <Image className='brands__image effect-img' priority="true" alt="" src={props.banner} width={635} height={202} />
                    </Link>
                </div>
            </div>
        )
    }
    const BannerElementSmall = (props) => {
        return (
            <div className={`${styles.banner_grid__item} caption-false col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3`}>
                <div className="effect effect-shine caption-position-bottom">
                    <Link href={props.link} className={`${styles.banner_grid__link} effect-parent`}>
                        <Image className='brands__image effect-img' priority="true" alt="" src={props.banner} width={308} height={201} />
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
                            <BannerElementBig banner={props.banner1} link={props.link1} />
                            <BannerElementSmall banner={props.banner2} link={props.link2} />
                            <BannerElementSmall banner={props.banner3} link={props.link3} />                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionTwoBanners;