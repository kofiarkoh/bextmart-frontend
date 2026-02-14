import React, { useState } from 'react';
import Link from 'next/link';
import useTranslation from './useTranslation'
import {SVGArrowUp} from '../../public/assets/SVG';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)
    const { t } = useTranslation();

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', toggleVisible);
    }

    return (
        <scroll-top onClick={scrollToTop}>
            <span className={`scroll-top-icon ${visible ? 'is-show' : 'is-hide'}`}>
                {t("Back_To_Top")}
                <SVGArrowUp />
            </span>
        </scroll-top>
    );
}

export default ScrollToTop;