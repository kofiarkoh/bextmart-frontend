import React from "react";
import Link from 'next/link';
import useTranslation from './useTranslation'

import { SVGAllCate1, SVGAllCate2, SVGAllCate3, SVGAllCate4, SVGAllCate5, SVGAllCate6, SVGAllCate7, SVGAllCate8, SVGAllCate9, SVGAllCate10, SVGAllCate11, SVGAllCate12, SVGArrowRight } from '../../public/assets/SVG';
import { AllCategiesData } from '../data/DataHeader'
import AllCateSub from "./AllCateSub";

const LeftAllCategories = () => {
    const { t } = useTranslation();
    let TextAllCate = AllCategiesData().TextAllCate,
    TextAllCateCol1 = AllCategiesData().TextAllCateCol1, 
    TextAllCateCol2 = AllCategiesData().TextAllCateCol2, 
    TextAllCateCol3 = AllCategiesData().TextAllCateCol3, 
    TextAllCateCol4 = AllCategiesData().TextAllCateCol4, 
    TextAllCateCol5 = AllCategiesData().TextAllCateCol5, 
    TextAllCateCol6 = AllCategiesData().TextAllCateCol6, 
    TextAllCateCol7 = AllCategiesData().TextAllCateCol7, 
    TextAllCateCol8 = AllCategiesData().TextAllCateCol8, 
    TextAllCateCol9 = AllCategiesData().TextAllCateCol9;

    return (
        <>
            <nav className="header__vertical-menu">
                <ul className="list-menu list-menu--vertical" role="list">
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 1).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate1 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 1).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol1} sub2={TextAllCateCol2} sub3={TextAllCateCol3} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 2).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate2 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 2).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol4} sub2={TextAllCateCol5} sub3={TextAllCateCol6} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 3).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate3 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 3).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol7} sub2={TextAllCateCol8} sub3={TextAllCateCol9} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 4).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate4 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 4).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol1} sub2={TextAllCateCol4} sub3={TextAllCateCol7} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 5).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate5 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 5).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol2} sub2={TextAllCateCol5} sub3={TextAllCateCol8} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 6).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate6 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 6).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol3} sub2={TextAllCateCol6} sub3={TextAllCateCol9} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 7).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate7 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 7).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol7} sub2={TextAllCateCol4} sub3={TextAllCateCol1} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 8).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate8 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 8).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol8} sub2={TextAllCateCol5} sub3={TextAllCateCol2} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 9).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate9 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 9).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol9} sub2={TextAllCateCol6} sub3={TextAllCateCol3} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 10).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate10 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 10).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol4} sub2={TextAllCateCol1} sub3={TextAllCateCol7} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 11).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate11 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 11).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol5} sub2={TextAllCateCol2} sub3={TextAllCateCol8} />
                        </ul>
                    </li>
                    <li className="header__vertical-root menu__dropdown">
                        <Link href={TextAllCate.find((m) => m.id === 12).url} className="header__vertical-item list-menu__item dropdown-toggle ">
                                <span className="header__vertical-icon icon-type-svg ">
                                    <SVGAllCate12 />
                                </span>
                                <span className="text">{TextAllCate.find((m) => m.id === 12).text}</span>
                                <SVGArrowRight />
                        </Link>
                        <ul className="header__mega list-menu component-scrollbar dropdown-menu row row-cols-3" role="list">
                            <AllCateSub sub1={TextAllCateCol6} sub2={TextAllCateCol3} sub3={TextAllCateCol9} />
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default LeftAllCategories;