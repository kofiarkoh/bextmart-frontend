import React from "react";
import ElementBannersBrand from './ultils/ElementBannersBrand'
import styles from '../public/assets/styles/Home.module.css'

const SectionBannersBrand = (props) => {    
    return (
        <>
            <section className="html-section index-banners-brands">
                <div className={`${styles.banners_brands} spaced-section`}>
                    <div className="container">
                        <div className={`${styles.banners_brands__container} row`}>
                            {props.data1.map((data, index) => {
                                return (
                                    <div key={index} className="left-block col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                        <ElementBannersBrand data={data} bannerPosition={props.bannerPosition} />
                                    </div>
                                )
                            })}
                            {props.data2.map((data, index) => {
                                return (
                                    <div key={index} className="right-block col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                        <ElementBannersBrand data={data} bannerPosition={props.bannerPosition} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SectionBannersBrand;