import React, { useState, useEffect } from "react";
import { useAtom } from 'jotai'
import { wishlistCount } from './Store'
import useTranslation from './useTranslation'
import { SVGHeart } from '../../public/assets/SVG';

const UtilWishlist = ({ product, isDetail }) => {    
    const [wlCount, setwlCount] = useAtom(wishlistCount);
    const [wishlistAdded, setWishlistAdded] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        let data = localStorage.getItem('yam-wishlist');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setwlCount(data.length)
        } else {
            data = [];
        }
        const wlExisted = data.findIndex(a => a.id === product.id);
        if (wlExisted !== -1) {
            setWishlistAdded(true);
        }
    }, [wishlistAdded, product.id, setwlCount]);

    function addwishlist() {
        let data = localStorage.getItem('yam-wishlist');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        const wlExisted = data.findIndex(a => a.id === product.id);
        if (wlExisted === -1) {
            data = [...data, product];
            localStorage.setItem('yam-wishlist', JSON.stringify(data));
            setClassStatus('icon-loadding');
            setTimeout(() => {
                setWishlistAdded(true);
                setwlCount((c) => c + 1);
                setClassStatus('');
            }, 1000);
        }
    }

    return (
        <div className="product-item__wishlist">
            <product-wishlist>
                {
                    (isDetail) ? <>
                        <span className={`product-template__wishlist button button--full-width button--primary ${classStatus} ${wishlistAdded ? 'is-added' : ''}`} title={wishlistAdded ? t("Added_Wishlist") : t("Add_Wishlist")} onClick={addwishlist}>
                            {wishlistAdded ? t("Added_Wishlist") : t("Add_Wishlist")}
                        </span>
                    </> :
                        <>
                            <span className={`product-item__icon ${classStatus} ${wishlistAdded ? 'is-added' : ''}`} title={wishlistAdded ? t("Added_Wishlist") : t("Add_Wishlist")} onClick={addwishlist}>
                                <SVGHeart />
                            </span>
                        </>
                }

            </product-wishlist>
        </div>
    )
}

export { wishlistCount }
export default UtilWishlist;