import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from './useTranslation';
import CurrencyConvert from './CurrencyConvert';
import { buildImageUrl } from './Tools';
import { useGetSuggestionsQuery } from '../../store/productsApi';
import { SVGSearchMobile, SVGClose } from '../../public/assets/SVG';

const QUICK_LINKS = [
    { label: 'Phones', q: 'phone' },
    { label: 'Clothing', q: 'clothing' },
    { label: 'Electronics', q: 'electronics' },
    { label: 'Accessories', q: 'accessories' },
];

const DrawerMobileSearch = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const { data: suggestionsData, isFetching } = useGetSuggestionsQuery(query, {
        skip: query.length < 2,
    });

    const suggestions = Array.isArray(suggestionsData?.data)
        ? suggestionsData.data
        : Array.isArray(suggestionsData)
        ? suggestionsData
        : [];

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    }

    function handleSelect(name) {
        setQuery(name);
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(name)}`);
    }

    return (
        <>
            <div className={`cartdrawer ${isOpen ? 'menu-opening' : ''}`}>
                <summary className="cartsummary header__icon header__icon--search header__icon--summary link focus-inset header-drawer__toggle">
                    <div className="drawer__toggle-icon" onClick={(e) => { e.preventDefault(); setIsOpen(c => !c); }}>
                        <SVGSearchMobile />
                    </div>
                </summary>

                <div className="header-drawer__inner header-drawer__left" role="dialog" aria-modal="true">
                    <div className="header-drawer__overlay" onClick={() => setIsOpen(false)}></div>
                    <div className="header-drawer_content search-drawer__content">
                        <div className="header-drawer__title">
                            <h3 className="drawer--title">{t('Search_our_site')}</h3>
                            <button type="button" className="drawer__close-button link link--text focus-inset" onClick={() => setIsOpen(false)}>
                                <SVGClose />
                            </button>
                        </div>

                        <div className="header-drawer__content search-drawer__content">
                            <div className="search-drawer__form">
                                <form onSubmit={handleSubmit} role="search" className="search__form">
                                    <input
                                        type="search"
                                        className="search_box"
                                        placeholder={t('search_inner')}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        autoComplete="off"
                                    />
                                    <button className="search_submit" type="submit" aria-label="Search">
                                        <SVGSearchMobile />
                                    </button>
                                </form>
                            </div>

                            <div className="header-drawer__scroll">
                                {query.length < 2 ? (
                                    <div className="search-drawer__quick" style={{ padding: '16px' }}>
                                        <span className="search-drawer__quick-title">{t('Quick_search')}</span>
                                        <ul className="search-drawer__quick-list">
                                            {QUICK_LINKS.map((link) => (
                                                <li key={link.q}>
                                                    <Link
                                                        href={`/search?q=${link.q}`}
                                                        className="list-menu__item"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : isFetching ? (
                                    <p style={{ padding: '16px', fontSize: 14, color: 'var(--color_body)' }}>Searching...</p>
                                ) : suggestions.length === 0 ? (
                                    <p style={{ padding: '16px', fontSize: 14, color: 'var(--color_body)' }}>No suggestions found.</p>
                                ) : (
                                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                        {suggestions.map((item, i) => {
                                            const name = item.label || item.name || item.query || (typeof item === 'string' ? item : '');
                                            const price = item.price;
                                            const photo = item?.photos?.[0];
                                            return (
                                                <li
                                                    key={item.id || i}
                                                    onClick={() => handleSelect(name)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12,
                                                        padding: '10px 16px',
                                                        borderBottom: '1px solid var(--color_line)',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {photo && (
                                                        <img
                                                            src={buildImageUrl(photo)}
                                                            alt={name}
                                                            width={44}
                                                            height={44}
                                                            style={{ objectFit: 'contain', flexShrink: 0, borderRadius: 4, background: '#f5f6f8' }}
                                                        />
                                                    )}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--color_heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {name}
                                                        </p>
                                                        {price && (
                                                            <p style={{ margin: 0, fontSize: 13, color: 'var(--color_primary)', fontWeight: 600 }}>
                                                                <CurrencyConvert amount={parseFloat(price)} />
                                                            </p>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>

                            {query.length >= 2 && (
                                <div className="header-drawer__bottom">
                                    <Link
                                        href={`/search?q=${encodeURIComponent(query)}`}
                                        className="search-drawer__action"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('Show_all')} &ldquo;{query}&rdquo;
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrawerMobileSearch;
