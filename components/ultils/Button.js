import React from 'react';

const spinner = (
    <span style={{
        width: 17, height: 17, borderRadius: '50%',
        border: '2.5px solid rgba(255,255,255,0.3)',
        borderTopColor: '#fff',
        display: 'inline-block',
        animation: 'spin 0.8s linear infinite',
        flexShrink: 0,
    }} />
);

const variantStyles = {
    primary: {
        background: 'var(--color_primary)',
        color: '#fff',
        border: 'none',
    },
    secondary: {
        background: '#fff',
        color: 'var(--color_primary)',
        border: '1.5px solid var(--color_primary)',
    },
    danger: {
        background: '#e53935',
        color: '#fff',
        border: 'none',
    },
    ghost: {
        background: 'transparent',
        color: 'var(--color_primary)',
        border: '1.5px solid currentColor',
    },
};

const sizeStyles = {
    sm:  { padding: '7px 16px', fontSize: 13 },
    md:  { padding: '10px 20px', fontSize: 14 },
    lg:  { padding: '13px 28px', fontSize: 15 },
    full: { padding: '12px 20px', fontSize: 14, width: '100%' },
};

const Button = ({
    children,
    label,
    loading = false,
    disabled = false,
    variant = 'primary',
    size = 'md',
    type = 'button',
    onClick,
    style = {},
    className = '',
    leftIcon,
    rightIcon,
}) => {
    const isDisabled = disabled || loading;
    const text = children ?? label;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                borderRadius: 6,
                fontWeight: 600,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: disabled && !loading ? 0.55 : 1,
                transition: 'opacity 0.2s, background 0.2s',
                boxSizing: 'border-box',
                ...variantStyles[variant],
                ...sizeStyles[size],
                ...style,
            }}
        >
            {loading ? (
                <>
                    {variant === 'primary' || variant === 'danger' ? spinner : (
                        <span style={{
                            width: 17, height: 17, borderRadius: '50%',
                            border: '2.5px solid rgba(0,0,128,0.2)',
                            borderTopColor: 'var(--color_primary)',
                            display: 'inline-block',
                            animation: 'spin 0.8s linear infinite',
                            flexShrink: 0,
                        }} />
                    )}
                    {text}
                </>
            ) : (
                <>
                    {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
                    {text}
                    {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
                </>
            )}
        </button>
    );
};

export default Button;
