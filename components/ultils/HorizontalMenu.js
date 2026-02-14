import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import MenuSub from './MenuSub'
import useTranslation from './useTranslation'
import ProductItemList from './ProductItemList'
import { SVGArrowDown } from '../../public/assets/SVG';
import {HorizontalData} from '../data/DataHeader'
import MenuBKG from '../../public/assets/images/MenuBkg.png'

const HorizontalMenu = () => {
    const { t } = useTranslation();
    const router = useRouter();
    let TextMenu = HorizontalData().TextMenu,
    TextMenuCol1 = HorizontalData().TextMenuCol1,
    TextMenuCol2 = HorizontalData().TextMenuCol2,
    TextMenuCol3 = HorizontalData().TextMenuCol3,
    TextMenuCol4 = HorizontalData().TextMenuCol4,
    TextMenuCol5 = HorizontalData().TextMenuCol5,
    Blogdata = HorizontalData().Blogdata,
    Productdata = HorizontalData().Productdata,
    MenuBanner = HorizontalData().MenuBanner;

    return (
        <>
            <nav className="header__inline-menu">
                <ul className="list-menu list-menu--inline" role="list">
                    <li className="header__menu-root">
                        <Link href={TextMenu.find((m) => m.id === 1).url} className={`header__menu-item list-menu__item ${ (router.asPath === TextMenu.find((m) => m.id === 1).url)? 'header__menu-active':'' }`}>
                            {TextMenu.find((m) => m.id === 1).text}
                        </Link>
                    </li>
                    <li className="header__menu-root menu__dropdown menu__mega">
                        <Link href={TextMenu.find((m) => m.id === 2).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 2).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 2).text}</span>
                            <SVGArrowDown />
                        </Link>
                        <ul className="header__mega dropdown-menu row" role="list">
                            <MenuSub sub={TextMenuCol1} />
                            <li className="header__mega-root col-3">
                                <div className="header__mega-product">
                                    <div className="linklist-title">
                                        {t("Megamenu_producttitle")}
                                    </div>
                                    <div className="header__mega-product-grid">
                                        {
                                            Productdata.map((item) => (
                                                <div className="product-item__list" key={item.id}>
                                                    <ProductItemList product={item} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="header__menu-root menu__dropdown menu__mega">
                        <Link href={TextMenu.find((m) => m.id === 3).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 3).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 3).text}</span>
                            <SVGArrowDown />
                        </Link>
                        <ul className="header__mega dropdown-menu row" role="list">
                            <MenuSub sub={TextMenuCol2} />
                            <li className="header__mega-root col-3">
                                <div className="header__mega-html">
                                    <Link href="/collections" className="col-image">
                                        {/* <img src={MenuBanner.src} alt={TextMenu.find((m) => m.id === 7).text} /> */}
                                        <Image alt={TextMenu.find((m) => m.id === 3).text} src={MenuBanner} width={300} height={300} />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="header__menu-root menu__dropdown menu__mega">
                        <Link href={TextMenu.find((m) => m.id === 4).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 4).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 4).text}</span>
                            <SVGArrowDown />
                        </Link>
                        <ul className="header__mega dropdown-menu row" role="list" style={{
                            backgroundImage: `url(${MenuBKG.src})`,
                            width: '100%',
                            height: '100%',
                        }}>
                            <MenuSub sub={TextMenuCol3} />
                            <li className="header__mega-root col-3">
                                <div className="header__mega-html">
                                    <div className="dis_table">
                                        <div className="dis_tablecell menu-custom-text">
                                            <div className="col-caption">
                                                <span className="title">
                                                    {t("Megamenu_text1")}
                                                </span>
                                                <span className="content">
                                                    {t("Megamenu_text2")} </span>
                                            </div>
                                            <Link href="/collections" className="button _btn">
                                                {t("Megamenu_text3")}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="header__menu-root menu__dropdown menu__mega">
                        <Link href={TextMenu.find((m) => m.id === 5).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 5).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 5).text}</span>
                            <SVGArrowDown />
                        </Link>
                        <ul className="header__mega dropdown-menu row" role="list">
                            <MenuSub sub={TextMenuCol4} />
                            {
                                Blogdata.map((item) => (
                                    <li className="header__mega-root col-3" key={item.id}>
                                        <div className="header__mega-article">
                                            <div className="article-item__grid">
                                                <div className="article-item__left effect effect-">
                                                    <Link href={item.url} className="article-item__link effect-parent">
                                                        <Image src={`${item.image}`} alt={item.title} width={300} height={177} />
                                                    </Link>
                                                </div>
                                                <div className="article-item__right">
                                                    <Link href={item.url}  className="article-item__title h3">
                                                        {item.title}
                                                    </Link>
                                                    <ul className="article-item__info no-bullet">
                                                        <li className="article-item__author"> {t("Blog_By")} <span className="article-item__author-user">{item.author}</span>
                                                        </li>
                                                        <li className="article-item__date"> {item.createat} </li>
                                                    </ul>
                                                    <div className="blog-description">
                                                        <p> {item.desc} </p>
                                                    </div>
                                                    <div className="blog-readmore">
                                                        <Link href={item.url} >{t("Blog_Read_more")}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                    <li className="header__menu-root menu__dropdown">
                        <Link href={TextMenu.find((m) => m.id === 6).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 6).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 6).text}</span>
                            <SVGArrowDown />
                        </Link>
                        <ul className="header__submenu list-menu list-menu--disclosure dropdown-menu" role="list">
                            {TextMenuCol5.map((links, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="header__menu-root"
                                    >
                                        <Link href={links.url} className='header__menu-item list-menu__item'>
                                            {links.name}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="header__menu-root  ">

                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default HorizontalMenu;