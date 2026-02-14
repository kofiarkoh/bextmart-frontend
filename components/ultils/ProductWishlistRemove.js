import React, { useState, useEffect } from "react";
import { useAtom } from 'jotai'
import { wishlistCount } from './Store'
import useTranslation from './useTranslation'
import update from 'immutability-helper';
import { SVGClose } from '../../public/assets/SVG';

const UtilWishlist = ({ product, isDetail }) => {
    const [wlCount, setwlCount] = useAtom(wishlistCount);
    const [wishlistAdded, setWishlistAdded] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const { t } = useTranslation();

    function removewishlist() {
        let data = localStorage.getItem('yam-wishlist');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        const wlExisted = data.findIndex(a => a.id === product.id);
        data.splice(wlExisted, 1);
        localStorage.setItem('yam-wishlist', JSON.stringify(data));
        setClassStatus('icon-loadding');
        setTimeout(() => {
            setWishlistAdded(true);
            setwlCount((c) => c - 1);
            setClassStatus('');
        }, 1000);
    }

    return (
        <div className="product-item__wishlist">
            <product-wishlist>
                <span className={`product-item__icon ${classStatus} ${wishlistAdded ? 'is-added' : ''}`} title={t("Wishlist_remove")} onClick={removewishlist}>
                    <SVGClose />
                </span>
            </product-wishlist>
        </div>
    )
}

export { wishlistCount }
export default UtilWishlist;