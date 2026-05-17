import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import {useGetSuggestionsQuery} from "../store/productsApi";
import {useAtom} from "jotai";
import {useSelector} from "react-redux";

import useTranslation from "./ultils/useTranslation";
import Store, {
	wishlistCount,
	compareCount,
	storecurrency,
	storecurrencySymbol,
} from "./ultils/Store";
import LoginDropdown from "./ultils/LoginDropdown";
import DrawerMobileMenu from "./ultils/DrawerMobileMenu";
import DrawerMobileSearch from "./ultils/DrawerMobileSearch";
import DrawerCart from "./ultils/DrawerCart";
import DrawerMobileMore from "./ultils/DrawerMobileMore";
import AllCategories from "./ultils/AllCategories";
import HorizontalMenu from "./ultils/HorizontalMenu";

import CurrencyData from "../data/Currency.json";
import Logo from "../public/assets/images/bexmart_logo_yellow.png";
import {
	SVGArrowDown,
	SVGSearch,
} from "../public/assets/SVG";
import {useLogoutMutation} from "../store/authApi";

function DropdownItem({ href, icon, label }) {
	return (
		<li style={{ listStyle: 'none' }}>
			<Link href={href} style={{
				display: 'flex', alignItems: 'center', gap: 10,
				padding: '8px 4px', color: '#333', textDecoration: 'none',
				fontSize: 13, borderRadius: 4, transition: 'background 0.15s',
			}}
				onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
				onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
			>
				<span style={{ color: '#666', flexShrink: 0 }}>{icon}</span>
				{label}
			</Link>
		</li>
	)
}

const Header = () => {
	const {t, locale} = useTranslation();
	const [searchInput, setSearchInput] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const { data: suggestionsData, isFetching: isSuggestionsFetching } = useGetSuggestionsQuery(
		searchInput,
		{ skip: searchInput.length < 2 }
	);
	const suggestions = (() => {
		if (!suggestionsData) return [];
		if (Array.isArray(suggestionsData?.data?.data)) return suggestionsData.data.data;
		if (Array.isArray(suggestionsData?.data)) return suggestionsData.data;
		if (Array.isArray(suggestionsData)) return suggestionsData;
		return [];
	})();
	const showDropdown = isFocused && searchInput.length >= 2;
	const [currency, setCurrency] = useAtom(storecurrency);
	const [currencySymbol, setCurrencySymbol] = useAtom(storecurrencySymbol);
	const [wlcount] = useAtom(wishlistCount);
	const [cmcount] = useAtom(compareCount);
	const authUser = useSelector((state) => state.auth?.user);
	const authToken = useSelector((state) => state.auth?.token);
	const [logout] = useLogoutMutation();
	const router = useRouter();
	const [sticky, setSticky] = useState({isSticky: false, offset: 0});
	const headerRef = useRef(null);
	const handleScroll = (elTopOffset, elHeight) => {
		if (window.pageYOffset > elTopOffset + elHeight) {
			setSticky({isSticky: true, offset: elHeight});
		} else {
			setSticky({isSticky: false, offset: 0});
		}
	};


	useEffect(() => {
		var header = headerRef.current.getBoundingClientRect();
		const handleScrollEvent = () => {
			handleScroll(header.top, header.height);
		};

		window.addEventListener("scroll", handleScrollEvent);

		return () => {
			window.removeEventListener("scroll", handleScrollEvent);
		};
	}, []);

	useEffect(() => {
		const currencyStored = JSON.parse(localStorage.getItem("yam-currency"));
		if (currencyStored === null) {
			const currencyData = {
				currency: currency,
				symbol: currencySymbol,
			};
			localStorage.setItem("yam-currency", JSON.stringify(currencyData));
		} else {
			setCurrency(currencyStored.currency);
			setCurrencySymbol(currencyStored.symbol);
		}
	}, [currency, currencySymbol, setCurrency, setCurrencySymbol]);
	// useEffect(() => { }, [currency, currencySymbol]);

	function changeCurrency(code, symbol) {
		setCurrency(code);
		setCurrencySymbol(symbol);
		const currencyData = {
			currency: code,
			symbol: symbol,
		};
		localStorage.setItem("yam-currency", JSON.stringify(currencyData));
	}

	const isLoggedIn = Boolean(authToken);

	const userAvatar = authUser?.avatar || "/assets/images/avatar.png";

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await logout().unwrap();
		} finally {
			if (router.pathname === "/account") router.push("/");
		}
	};

	return (
		<>
			<header className="layout-header" style={{marginTop: sticky.offset}}>
				<Store />
				<div className="top-header d-none d-md-block">
					<div className="container">
						<div className="top-header__content row">
							<div className="top-header__content-left col-12 col-sm-12 col-md-12 col-lg-4 col-xl-5 col-xxl-5">
								<div className="welcome-text">{t("Welcome")}</div>
							</div>
							<div className="top-header__content-right col-12 col-sm-12 col-md-12 col-lg-8 col-xl-7 col-xxl-7 d-none d-lg-block">
								<nav className="top-header__menu">
									<ul className="top-header__menu-content list-menu--inline no-bullet clearfix">
										<LoginDropdown />
										<li className="top-header__menu-root header__menu-currencywrap menu__dropdown">
											<div className="dropdown-toggle top-header__menu-item list-menu__item header-currency">
												{currencySymbol} {currency}
												<SVGArrowDown />
											</div>
											<ul className="header__menu-login header__menu-currency no-bullet dropdown-menu">
												<li className="header__menu-login-content">
													<ul
														id="HeaderCountryList"
														role="list"
														className="no-bullet localization-form__list">
														{CurrencyData.map((data, index) => (
															<li
																className={`localization-form__item ${data.code === currency ? "localization-form__active" : ""}`}
																key={index}>
																<span
																	className="localization-form__link header-currencies"
																	onClick={() => {
																		changeCurrency(data.code, data.symbol);
																	}}>
																	{" "}
																	{data.symbol} {data.code}{" "}
																</span>
															</li>
														))}
													</ul>
												</li>
											</ul>
										</li>
										<li className="top-header__menu-root header__wishlist">
											<header-wishlist class="header__icon-wishlist main-header__icon-root header__icon-root">
												<Link href="/page-wishlist" className="header__icon">
													{t("Wishlist")} (
													<span aria-hidden="true" className="header__icon-count-bubble">
														{wlcount}
													</span>
													)
												</Link>
											</header-wishlist>
										</li>
										<li className="top-header__menu-root header__compare">
											<header-compare class="header__icon-compare main-header__icon-root header__icon-root">
												<Link href="/page-compare" className="header__icon">
													{t("Compare")}(
													<span aria-hidden="true" className="header__icon-count-bubble">
														{cmcount}
													</span>
													)
												</Link>
											</header-compare>
										</li>
										<li className="top-header__menu-root header__menu-text2">
											<Link href="/page-contact">{t("Help")}</Link>
										</li>
										<li className="top-header__menu-root header__menu-text2">
											<Link href="/blog">{t("Blog")}</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
				<div
					id="sticky-header"
					className={`navbar${sticky.isSticky ? " has-sticky" : ""}`}
					ref={headerRef}>
					<div className="main-header header-wrapper--border-bottom">
						<div className="container">
							<div className="main-header-content row">
								<div className="mobile-header__left d-block d-lg-none">
									<header-drawer data-breakpoint="tablet">
										<DrawerMobileMenu />
									</header-drawer>
									<div className="mobile-header__search header__icon-root">
										<DrawerMobileSearch />
									</div>
								</div>
								<div className="main-header__logo">
									<h1 className="header__heading">
										<Link
											href="/"
											className="header__heading-link link link--text focus-inset">
											<Image
												className="header__heading-logo d-none d-lg-block"
												priority="true"
												alt="Shop logo"
												src={Logo}
												height={70}
												width={160}
												style={{ objectFit: 'contain', height: 80, width: 'auto' }}
											/>
											<Image
												className="header__heading-logo d-block d-lg-none"
												priority="true"
												alt="Shop logo"
												src={Logo}
												height={70}
												width={120}
												style={{ objectFit: 'contain', height: 80, width: 'auto' }}
											/>
										</Link>
									</h1>
								</div>
								<div className="main-header__right">
									<div className="main-header__allcollections d-none d-lg-block">
										<AllCategories />
									</div>
									<div className="main-header__icon">
										<div className="header__search d-none d-lg-block" style={{ position: 'relative' }}>
											<div className="search-form">
												<form
													action="/search"
													method="get"
													role="search"
													className="search__form">
													<input
														type="text"
														name="q"
														className="search_box"
														placeholder={t("search_inner")}
														value={searchInput}
														onChange={(e) => setSearchInput(e.target.value)}
														onFocus={() => setIsFocused(true)}
														onBlur={() => setTimeout(() => setIsFocused(false), 200)}
														autoComplete="off"
													/>
													<button
														className="search_submit"
														type="submit"
														aria-label="icon search">
														<SVGSearch />
													</button>
												</form>
											</div>
											{showDropdown && (
												<ul style={{
													position: 'absolute',
													top: '100%',
													left: 0,
													right: 0,
													background: '#fff',
													border: '1px solid var(--color_line)',
													borderRadius: '0 0 6px 6px',
													boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
													zIndex: 9999,
													margin: 0,
													padding: 0,
													listStyle: 'none',
													maxHeight: 320,
													overflowY: 'auto',
												}}>
													{isSuggestionsFetching && (
														<li style={{ padding: '12px 16px', fontSize: 13, color: 'var(--color_body)' }}>
															Searching...
														</li>
													)}
													{!isSuggestionsFetching && suggestions.length === 0 && (
														<li style={{ padding: '12px 16px', fontSize: 13, color: 'var(--color_body)' }}>
															No suggestions found
														</li>
													)}
													{suggestions.map((item, i) => {
														const label = item.label || item.name || item.query || (typeof item === 'string' ? item : '');
														return (
															<li key={item.id || i} style={{ borderBottom: '1px solid var(--color_line)' }}>
																<button
																	type="button"
																	onMouseDown={() => {
																		setSearchInput(label);
																		setIsFocused(false);
																		router.push(`/search?q=${encodeURIComponent(label)}`);
																	}}
																	style={{
																		display: 'flex',
																		alignItems: 'center',
																		gap: 10,
																		padding: '10px 14px',
																		fontSize: 14,
																		color: 'var(--color_body)',
																		background: 'none',
																		border: 'none',
																		width: '100%',
																		textAlign: 'left',
																		cursor: 'pointer',
																	}}>
																	<SVGSearch />
																	{label}
																</button>
															</li>
														);
													})}
												</ul>
											)}
										</div>
										<div className="header__delivery d-none d-lg-block">
											<div className="localization-form__content menu__dropdown">
												{/* ── Trigger ── */}
												<button
													type="button"
													className="localization-form__select dropdown-toggle"
													data-toggle="HeaderUserMenu"
													style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px', color: '#fff' }}>
													<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
														<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
														<circle cx="12" cy="7" r="4"/>
													</svg>
													<span style={{ fontSize: 14, fontWeight: 500 }}>
														{isLoggedIn ? (authUser?.first_name || 'Account') : 'Account'}
													</span>
													<SVGArrowDown />
												</button>

												{/* ── Dropdown panel ── */}
												<ul className="header__menu-location no-bullet dropdown-menu" style={{ minWidth: 220, padding: 0 }}>
													<li className="header__menu-login-content" style={{ padding: '16px 16px 12px' }}>

														{/* Sign In button — always shown */}
														<Link
															href={isLoggedIn ? "/account" : "/account-login"}
															style={{
																display: 'block', width: '100%', textAlign: 'center',
																padding: '10px', borderRadius: 6, marginBottom: 10,
																background: 'var(--color_primary)',
																fontWeight: 600, fontSize: 14, textDecoration: 'none',
																boxSizing: 'border-box',
															}}>
															<span style={{ color: '#fff', fontWeight: 600 }}>
																{isLoggedIn ? 'My Account' : 'Sign In'}
															</span>
														</Link>

														{/* Register link — guests only */}
														{!isLoggedIn && (
															<p style={{ textAlign: 'center', fontSize: 12, margin: '0 0 10px', color: '#666', whiteSpace: 'nowrap' }}>
																New customer?{' '}
																<Link href="/account-register" style={{ color: 'var(--color_primary)', fontWeight: 600 }}>
																	Create account
																</Link>
															</p>
														)}

														{/* Divider */}
														<div style={{ borderTop: '1px solid #f0f0f0', margin: '4px 0 8px' }} />

														{/* Menu links — only when logged in */}
														<ul id="HeaderUserMenu" role="list" className="no-bullet" style={{ margin: 0, padding: 0 }}>
															{isLoggedIn && (
																<DropdownItem href="/account" icon={
																	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
																		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
																	</svg>
																} label="My Account" />
															)}
															{isLoggedIn && (
																<DropdownItem href="/account?section=orders" icon={
																	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
																		<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
																	</svg>
																} label="Orders" />
															)}
															{isLoggedIn && (
																<li style={{ listStyle: 'none', marginTop: 4 }}>
																	<button
																		onClick={handleLogout}
																		style={{
																			display: 'flex', alignItems: 'center', gap: 10,
																			width: '100%', padding: '8px 4px',
																			background: 'none', border: 'none', cursor: 'pointer',
																			fontSize: 13, color: '#dc2626', textAlign: 'left',
																		}}>
																		<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
																			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
																		</svg>
																		Sign Out
																	</button>
																</li>
															)}
														</ul>
													</li>
												</ul>
											</div>
										</div>
										<div className="main-header__icon-root header__icon-root header__icon-cart">
											<DrawerCart />
										</div>
										<div className="main-header__icon-root header__icon-root header__icon-account d-block d-lg-none">
											<DrawerMobileMore />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="navigation-header-content-gr d-none d-lg-block">
					<div className="container">
						<div className="navigation-header-content mainmenu-align-center d-none d-md-block">
							<div className="navigation-header__menu">
								<HorizontalMenu />
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
