import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import MenuSub from './MenuSub'
import useTranslation from './useTranslation'
import ProductItemList from './ProductItemList'
import { SVGArrowDown, SVGArrowRight } from '../../public/assets/SVG';
import {HorizontalData} from '../data/DataHeader'
import MenuBKG from '../../public/assets/images/MenuBKG.png'
import { useGetCategoriesQuery } from '../../store/productsApi';

const HorizontalMenu = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const categories = categoriesData?.data?.data?.slice(0, 10) || [];
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
                    <li className="header__menu-root menu__dropdown header__categories-menu">
                        <div className="header__menu-item list-menu__item dropdown-toggle">
                            <span className="text">Categories</span>
                        </div>
                        <div className="header__submenu dropdown-menu">
                            <nav className="header__vertical-menu">
                                <ul className="list-menu list-menu--vertical" role="list">
                                    {isCategoriesLoading && (
                                        <li style={{ padding: '12px 16px', fontSize: 13, color: '#888' }}>Loading...</li>
                                    )}
                                    {categories.map((cat) => (
                                        <li key={cat.id} className="header__vertical-root">
                                            <Link
                                                className="header__vertical-item list-menu__item"
                                                href={`/products?category=${cat.slug}`}
                                                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                                            >
                                                <span className="header__vertical-icon" style={{ display: 'flex', alignItems: 'center', width: 20 }}>
                                                    <i className={`ph ${cat.icon}`} style={{ fontSize: 18 }} />
                                                </span>
                                                <span className="text">{cat.name}</span>
                                                <SVGArrowRight />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </li>
                    <li className="header__menu-root menu__dropdown menu__mega">
                        <Link href={TextMenu.find((m) => m.id === 2).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 2).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 2).text}</span>
                        </Link>
                        
                    </li>
                   
            
                
                    <li className="header__menu-root menu__dropdown">
                        <Link href={TextMenu.find((m) => m.id === 6).url} className={`header__menu-item list-menu__item dropdown-toggle ${ (router.asPath === TextMenu.find((m) => m.id === 6).url)? 'header__menu-active':'' }`}>
                            <span className="text">{TextMenu.find((m) => m.id === 6).text}</span>
                        </Link>
                        
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default HorizontalMenu;
