import { useRouter } from "next/router";
import Link from 'next/link';
import useTranslation from './useTranslation'
import { SVGArrowRight } from '../../public/assets/SVG';

const Breadcrumbs = (props) => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div className="breadcrumbs-content">
            <div className="container">
                <nav className="breadcrumb-nav">
                    <span itemScope itemType="http://schema.org/BreadcrumbList">
                        <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                            <Link href="/" itemProp="item"><span itemProp="name">{t("Breadcrumb_Home")}</span></Link>
                            <span itemProp="position" hidden>1</span>
                        </span>
                        <span className='arrow-space'><SVGArrowRight /></span>
                        {(router.pathname === '/account-register') ? (
                            <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                <span itemProp="name">{t("Breadcrumb_Register")}</span>
                                <span itemProp="position" hidden>2</span>
                            </span>
                        ) : ''}
                        {(router.pathname === '/account-login') ? (
                            <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                <span itemProp="name">{t("Breadcrumb_Login")}</span>
                                <span itemProp="position" hidden>2</span>
                            </span>
                        ) : ''}
                        {(router.pathname === '/account') ? (
                            <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                <span itemProp="name">{t("Breadcrumb_Account")}</span>
                                <span itemProp="position" hidden>2</span>
                            </span>
                        ) : ''}
                        {(router.pathname === '/account-edit') ? (
                            <>
                                <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                    <Link href="/account" itemProp="item"><span itemProp="name">{t("Breadcrumb_Account")}</span></Link>
                                    <span itemProp="position" hidden>2</span>
                                </span>
                                <span className='arrow-space'><SVGArrowRight /></span>
                                <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                    <span itemProp="name">{t("Breadcrumb_Edit")}</span>
                                    <span itemProp="position" hidden>3</span>
                                </span>
                            </>
                        ) : ''}
                        {
                            (router.pathname === '/account-order') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <Link href="/account" itemProp="item"><span itemProp="name">{t("Breadcrumb_Account")}</span></Link>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                    <span className='arrow-space'><SVGArrowRight /></span>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Order")}</span>
                                        <span itemProp="position" hidden>3</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-about') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Account")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-contact') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Contact")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-faqs') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_FAQs")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-wishlist') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Wishlist")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-compare') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Compare")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-privacypolicy') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_PrivacyPolicy")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-refundpolicy') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_RefundPolicy")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-shippingpolicy') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_ShippingPolicy")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/page-termsofservice') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_TermsOfService")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/blog') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Blog_ListRightSidebar")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/blog-list-left-sidebar') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Blog_ListLeftSidebar")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/blog-list-no-sidebar') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Blog_ListNoSidebar")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/blog-grid-right-sidebar') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Blog_GridRightSidebar")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/blog-grid-left-sidebar') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Blog_GridLeftSidebar")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/blog-grid-no-sidebar') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Blog_GridNoSidebar")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/article') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{props.text}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/collections') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Collections")}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname.includes('/collection/')) ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <Link href="/collections" itemProp="item"><span itemProp="name">{t("Breadcrumb_Collections")}</span></Link>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                    <span className='arrow-space'><SVGArrowRight /></span>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{props.text}</span>
                                        <span itemProp="position" hidden>3</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname.includes('/product/')) ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <Link href="/collections" itemProp="item"><span itemProp="name">{props.text}</span></Link>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/search') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Search")} {props.text}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                        {
                            (router.pathname === '/cart') ? (
                                <>
                                    <span itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <span itemProp="name">{t("Breadcrumb_Cart")} {props.text}</span>
                                        <span itemProp="position" hidden>2</span>
                                    </span>
                                </>
                            ) : ''}
                    </span>
                </nav>
            </div>
        </div>
    );
}
export default Breadcrumbs;