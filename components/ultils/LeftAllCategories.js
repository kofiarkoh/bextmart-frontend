import React from "react";
import Link from 'next/link';
import { SVGArrowRight } from '../../public/assets/SVG';
import { useGetCategoriesQuery } from '../../store/productsApi';

const LeftAllCategories = () => {
    const { data, isLoading } = useGetCategoriesQuery();
    const categories = data?.data?.data?.slice(0, 10) || [];

    return (
        <nav className="header__vertical-menu">
            <ul className="list-menu list-menu--vertical" role="list">
                {isLoading && (
                    <li style={{ padding: '12px 16px', fontSize: 13, color: '#888' }}>Loading...</li>
                )}
                {categories.map((cat) => (
                    <li key={cat.id} className="header__vertical-root menu__dropdown">
                        <Link
                            href={`/products?category=${cat.slug}`}
                            className="header__vertical-item list-menu__item dropdown-toggle"
                        >
                            <span className="header__vertical-icon icon-type-svg">
                                <i className={`ph ${cat.icon}`} style={{ fontSize: 18 }} />
                            </span>
                            <span className="text">{cat.name}</span>
                            <SVGArrowRight />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LeftAllCategories;
