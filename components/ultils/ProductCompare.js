import React, { useState, useEffect } from "react";
import { useAtom } from 'jotai'
import { compareCount } from './Store'
import useTranslation from './useTranslation'

import { SVGRefresh } from '../../public/assets/SVG';

const UtilCompare = ({ product }) => {
    const [cmCount, setcmCount] = useAtom(compareCount);
    const [compareAdded, setcompareAdded] = useState(false);
    const [classStatus, setClassStatus] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        let data = localStorage.getItem('yam-compare');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setcmCount(data.length);
        } else {
            data = [];
        }
        const cmExisted = data.findIndex(a => a.id === product.id);
        if (cmExisted !== -1) {
            setcompareAdded(true);
        }
    }, [compareAdded, product.id, setcmCount]);

    function addcompare() {
        let data = localStorage.getItem('yam-compare');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        const cmExisted = data.findIndex(a => a.id === product.id);
        if (cmExisted === -1) {
            data = [...data, product];
            localStorage.setItem('yam-compare', JSON.stringify(data));
            setClassStatus('icon-loadding');
            setTimeout(() => {
                setcompareAdded(true);
                setcmCount((c) => c + 1);
                setClassStatus('');
            }, 1000);
        }
    }

    return (
        <div className="product-item__compare">
            <product-compare>
                <span className={`product-item__icon ${classStatus} ${compareAdded ? 'is-added' : ''}`} title={compareAdded ? t("Added_Compare") : t("Add_Compare")} onClick={addcompare}>
                    <SVGRefresh />
                </span>
            </product-compare>
        </div>
    )
}

export { compareCount }
export default UtilCompare;