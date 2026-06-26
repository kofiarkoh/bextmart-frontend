import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAddToCartMutation } from '../../store/cartApi'
import { SVGCart } from '../../public/assets/SVG';
import { notifyError, notifySuccess, notifyAuth, dismissAll } from './notify';

const ProductAddtoCart = ({ product }) => {
    const router = useRouter();
    const authToken = useSelector((state) => state.auth?.token);

    const [addToCart, { isLoading }] = useAddToCartMutation();
    const [error, setError] = useState(null);

    async function handleAddToCart() {
        if (!authToken) {
            notifyAuth('Please log in to add items to your cart and continue shopping.');
            setTimeout(() => {
                dismissAll();
                router.push(`/account-login?redirect=/product/${product?.uuid || product?.id}`);
            }, 1500);
            return;
        }
        setError(null);
        try {
            await addToCart({ product_uuid: product.uuid, quantity: 1 }).unwrap();
            notifySuccess(`${product.name} added to cart.`, 'Added to Cart')
        } catch (err) {
            const msg = err?.data?.message || 'Could not add to cart.';
            setError(msg);
            notifyError(msg, 'Could Not Add to Cart');
        }
    }

    const buttonLabel = isLoading ? 'Adding...' : 'Add to Cart';
    const buttonClass = `product-item__icon${isLoading ? ' cart-loadding' : ''}`;

    return (
        <div className="cart-button bottom-center">
            <div className="product-item__addcart">
                <button
                    type="button"
                    className={buttonClass}
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    title="Add to Cart"
                >
                    <SVGCart />
                    <span>{buttonLabel}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductAddtoCart;
