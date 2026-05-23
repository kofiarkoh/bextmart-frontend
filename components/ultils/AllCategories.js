import React from "react";
import Link from 'next/link';
import { SVGMenu, SVGArrowRight } from '../../public/assets/SVG';
import { useGetCategoriesQuery } from '../../store/productsApi';

const AllCategories = () => {
    const { data, isLoading } = useGetCategoriesQuery();
    const categories = data?.data?.data?.slice(0, 10) || [];

    return (
        <div className="top-header__menu-root header__allcollections menu__dropdown">
            <div className="dropdown-toggle list-menu__item">
                <SVGMenu />
                All Categories
            </div>
            <div className="dropdown-menu header__categorie-dropdown">
                <nav className="header__vertical-menu">
                    <ul className="list-menu list-menu--vertical" role="list">
                        {isLoading && (
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
        </div>
    );
};

export default AllCategories;
