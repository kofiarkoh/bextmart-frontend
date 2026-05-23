import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from "next/router";
import MenuSub from './MenuSub'
import useTranslation from './useTranslation'
import ProductItemList from './ProductItemList'
import { SVGArrowDown } from '../../public/assets/SVG';
import {HorizontalData} from '../data/DataHeader'
import MenuBKG from '../../public/assets/images/MenuBKG.png'

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
