import React from "react";
import Link from 'next/link';
import useTranslation from './useTranslation'

import { SVGAllCate13, SVGAllCate14, SVGAllCate15, SVGAllCate16, SVGAllCate17, SVGAllCate18, SVGAllCate19, SVGAllCate20, SVGAllCate21, SVGAllCate22, SVGAllCate23, SVGAllCate24, SVGArrowRight } from '../../public/assets/SVG';
import { AllCategiesData } from '../data/DataAllCate2'
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
                                    <SVGAllCate13 />
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
                                    <SVGAllCate14 />
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
                                    <SVGAllCate15 />
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
                                    <SVGAllCate16 />
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
                                    <SVGAllCate17 />
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
                                    <SVGAllCate18 />
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
                                    <SVGAllCate19 />
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
                                    <SVGAllCate20 />
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
                                    <SVGAllCate21 />
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
                                    <SVGAllCate22 />
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
                                    <SVGAllCate23 />
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
                                    <SVGAllCate24 />
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