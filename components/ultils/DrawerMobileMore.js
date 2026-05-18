import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useTranslation from './useTranslation'
import { SVGMore, SVGClose } from '../../public/assets/SVG';
import { clearCredentials } from '../../store/authSlice';
import { notifySuccess } from './notify';

const DrawerMobileMore = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const authToken = useSelector((state) => state.auth?.token);
    const user = useSelector((state) => state.auth?.user);

    function getInitials(u) {
        if (!u) return '?';
        const first = u.first_name?.[0] || u.name?.[0] || '';
        const last = u.last_name?.[0] || '';
        return (first + last).toUpperCase() || '?';
    }

    function getDisplayName(u) {
        if (!u) return '';
        if (u.first_name) return `${u.first_name} ${u.last_name || ''}`.trim();
        return u.name || u.email || '';
    }

    function handleLogout() {
        dispatch(clearCredentials());
        localStorage.removeItem('auth_token');
        localStorage.removeItem('yam-user');
        notifySuccess('Signed out successfully.', 'Goodbye!');
        setIsOpen(false);
        router.push('/');
    }

    const avatarColors = ['#e53935', '#8e24aa', '#1e88e5', '#43a047', '#f4511e', '#00897b'];
    function avatarColor(name) {
        let hash = 0;
        for (let i = 0; i < (name || '').length; i++) hash += name.charCodeAt(i);
        return avatarColors[hash % avatarColors.length];
    }

    const initials = getInitials(user);
    const displayName = getDisplayName(user);
    const email = user?.email || '';

    return (
        <>
            <div className={`cartdrawer ${isOpen ? 'menu-opening' : ''}`}>
                <div className="cartsummary header__icon header__icon--account header__icon--summary link focus-inset header-drawer__toggle">
                    <div className="drawer__toggle-icon" onClick={() => setIsOpen(v => !v)}>
                        <SVGMore />
                    </div>
                </div>
                <div className="header-drawer__inner header-drawer__right">
                    <div className="header-drawer__overlay" onClick={() => setIsOpen(false)} />
                    <div className="header-drawer_content account-drawer__content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                        {/* Header */}
                        <div style={{
                            background: 'var(--color_primary)',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: 0.3 }}>
                                {authToken ? 'My Account' : 'Welcome'}
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4, display: 'flex' }}
                            >
                                <SVGClose />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {/* Profile / Auth section */}
                            {authToken ? (
                                <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid #f0f0f0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                        <div style={{
                                            width: 52, height: 52, borderRadius: '50%',
                                            background: avatarColor(displayName),
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: 700, fontSize: 20, flexShrink: 0,
                                        }}>
                                            {initials}
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: 15, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {displayName}
                                            </div>
                                            {email && (
                                                <div style={{ fontSize: 12, color: '#777', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {email}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <Link href="/account" onClick={() => setIsOpen(false)} style={{
                                            flex: 1, textAlign: 'center', padding: '9px 0',
                                            background: 'var(--color_primary)', color: '#fff',
                                            borderRadius: 6, fontWeight: 600, fontSize: 13, textDecoration: 'none',
                                        }}>
                                            My Account
                                        </Link>
                                        <button onClick={handleLogout} style={{
                                            flex: 1, textAlign: 'center', padding: '9px 0',
                                            background: '#fff', color: '#e53935',
                                            border: '1.5px solid #e53935',
                                            borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                                        }}>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid #f0f0f0' }}>
                                    <p style={{ color: '#555', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
                                        Sign in to view your orders and manage your account.
                                    </p>
                                    <Link href="/account-login" onClick={() => setIsOpen(false)} style={{
                                        display: 'block', textAlign: 'center', padding: '11px 0',
                                        background: 'var(--color_primary)', color: '#fff',
                                        borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none',
                                        marginBottom: 10,
                                    }}>
                                        Sign In
                                    </Link>
                                    <Link href="/account-register" onClick={() => setIsOpen(false)} style={{
                                        display: 'block', textAlign: 'center', padding: '11px 0',
                                        background: '#fff', color: 'var(--color_primary)',
                                        border: '1.5px solid var(--color_primary)',
                                        borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none',
                                    }}>
                                        Create Account
                                    </Link>
                                </div>
                            )}

                            {/* Quick Links */}
                            <div style={{ padding: '8px 0' }}>
                                {authToken && (
                                    <Link href="/account?tab=orders" onClick={() => setIsOpen(false)} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '14px 20px', textDecoration: 'none', color: '#222',
                                        borderBottom: '1px solid #f5f5f5', fontSize: 14,
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                                            <rect x="9" y="3" width="6" height="4" rx="1"/>
                                        </svg>
                                        My Orders
                                    </Link>
                                )}
                                <Link href="/products" onClick={() => setIsOpen(false)} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 20px', textDecoration: 'none', color: '#222',
                                    borderBottom: '1px solid #f5f5f5', fontSize: 14,
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/>
                                        <rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/>
                                    </svg>
                                    All Products
                                </Link>
                                <Link href="/page-contact" onClick={() => setIsOpen(false)} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 20px', textDecoration: 'none', color: '#222',
                                    borderBottom: '1px solid #f5f5f5', fontSize: 14,
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                                    </svg>
                                    Help & Support
                                </Link>
                            </div>

                            {/* Hotline */}
                            <div style={{
                                margin: '12px 16px', padding: '14px 16px',
                                background: '#f8f9fa', borderRadius: 8,
                                display: 'flex', alignItems: 'center', gap: 12,
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color_primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                                </svg>
                                <div>
                                    <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>Customer Support</div>
                                    <a href="tel:19006789" style={{ fontWeight: 700, fontSize: 14, color: 'var(--color_primary)', textDecoration: 'none' }}>
                                        1900-6789
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DrawerMobileMore;
