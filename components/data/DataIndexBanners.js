import useTranslation from '../ultils/useTranslation'

function DataIndexBanners() {
    const { locale } = useTranslation();
    let img1, img2, img3, img4, img5, img6, img7, img8, img1_link, img2_link, img3_link, img4_link, img5_link, img6_link, img7_link, img8_link;
    switch (locale) {
        case 'en':
            img1 = '/assets/images/banner/YMShop-home1-banner1.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2.png';
            img3 = '/assets/images/banner/YMShop-home1-banner3.png';
            img4 = '/assets/images/banner/YMShop-home1-banner4.png';
            img5 = '/assets/images/banner/YMShop-home1-banner5.png';
            img6 = '/assets/images/banner/YMShop-home1-banner6.png';
            img7 = '/assets/images/banner/YMShop-home1-banner7.png';
            img8 = '/assets/images/banner/YMShop-home1-banner8.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4_link = '/collection/tops-tees';
            img5_link = '/collection/dresses';
            img6_link = '/collection/clothing-sets';
            img7_link = '/collections';
            img8_link = '/collection/kids-fashion';
            break;
        case 'fr':
            img1 = '/assets/images/banner/YMShop-home1-banner1_fr.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2_fr.png';
            img3 = '/assets/images/banner/YMShop-home1-banner3_fr.png';
            img4 = '/assets/images/banner/YMShop-home1-banner4_fr.png';
            img5 = '/assets/images/banner/YMShop-home1-banner5_fr.png';
            img6 = '/assets/images/banner/YMShop-home1-banner6_fr.png';
            img7 = '/assets/images/banner/YMShop-home1-banner7_fr.png';
            img8 = '/assets/images/banner/YMShop-home1-banner8_fr.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4_link = '/collection/tops-tees';
            img5_link = '/collection/dresses';
            img6_link = '/collection/clothing-sets';
            img7_link = '/collections';
            img8_link = '/collection/kids-fashion';
            break;
        case 'it':
            img1 = '/assets/images/banner/YMShop-home1-banner1_it.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2_it.png';
            img3 = '/assets/images/banner/YMShop-home1-banner3_it.png';
            img4 = '/assets/images/banner/YMShop-home1-banner4_it.png';
            img5 = '/assets/images/banner/YMShop-home1-banner5_it.png';
            img6 = '/assets/images/banner/YMShop-home1-banner6_it.png';
            img7 = '/assets/images/banner/YMShop-home1-banner7_it.png';
            img8 = '/assets/images/banner/YMShop-home1-banner8_it.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4_link = '/collection/tops-tees';
            img5_link = '/collection/dresses';
            img6_link = '/collection/clothing-sets';
            img7_link = '/collections';
            img8_link = '/collection/kids-fashion';
            break;
        case 'jp':
            img1 = '/assets/images/banner/YMShop-home1-banner1_jp.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2_jp.png';
            img3 = '/assets/images/banner/YMShop-home1-banner3_jp.png';
            img4 = '/assets/images/banner/YMShop-home1-banner4_jp.png';
            img5 = '/assets/images/banner/YMShop-home1-banner5_jp.png';
            img6 = '/assets/images/banner/YMShop-home1-banner6_jp.png';
            img7 = '/assets/images/banner/YMShop-home1-banner7_jp.png';
            img8 = '/assets/images/banner/YMShop-home1-banner8_jp.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4_link = '/collection/tops-tees';
            img5_link = '/collection/dresses';
            img6_link = '/collection/clothing-sets';
            img7_link = '/collections';
            img8_link = '/collection/kids-fashion';
            break;
    }
    return { img1, img2, img3, img4, img5, img6, img7, img8, img1_link, img2_link, img3_link, img4_link, img5_link, img6_link, img7_link, img8_link }
}

function DataIndexBanners2() {
    const { locale } = useTranslation();
    let img1, img2, img3, img1_link, img2_link, img3_link;
    switch (locale) {
        case 'en':
            img1 = '/assets/images/banner/YMShop-home4-banner33.png';
            img2 = '/assets/images/banner/YMShop-home4-banner34.png';
            img3 = '/assets/images/banner/YMShop-home4-banner35.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            break;
        case 'fr':
            img1 = '/assets/images/banner/YMShop-home4-banner33_fr.png';
            img2 = '/assets/images/banner/YMShop-home4-banner34_fr.png';
            img3 = '/assets/images/banner/YMShop-home4-banner35_fr.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            break;
        case 'it':
            img1 = '/assets/images/banner/YMShop-home4-banner33_it.png';
            img2 = '/assets/images/banner/YMShop-home4-banner34_it.png';
            img3 = '/assets/images/banner/YMShop-home4-banner35_it.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            break;
        case 'jp':
            img1 = '/assets/images/banner/YMShop-home4-banner33_jp.png';
            img2 = '/assets/images/banner/YMShop-home4-banner34_jp.png';
            img3 = '/assets/images/banner/YMShop-home4-banner35_jp.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            break;
    }
    return { img1, img2, img3, img1_link, img2_link, img3_link }
}

function DataIndexBanners3() {
    const { locale } = useTranslation();
    let img1, img2, img3, img4, img5, img6, img7, img8, img9, img1_link, img2_link, img3_link, img4_link, img5_link, img6_link, img7_link, img8_link, img9_link;
    switch (locale) {
        case 'en':
            img1 = '/assets/images/banner/YMShop-home5-banner1.png';
            img2 = '/assets/images/banner/YMShop-home5-banner2.png';
            img3 = '/assets/images/banner/YMShop-home5-banner3.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4 = '/assets/images/banner/YMShop-home5-banner4.png';
            img5 = '/assets/images/banner/YMShop-home5-banner5.png';
            img6 = '/assets/images/banner/YMShop-home5-banner6.png';
            img4_link = '/collection/women-fashion';
            img5_link = '/collection/men-fashion';
            img6_link = '/collection/kids-fashion';
            img7 = '/assets/images/banner/YMShop-home5-banner7.png';
            img8 = '/assets/images/banner/YMShop-home5-banner8.png';
            img9 = '/assets/images/banner/YMShop-home5-banner9.png';
            img7_link = '/collection/women-fashion';
            img8_link = '/collection/men-fashion';
            img9_link = '/collection/kids-fashion';
            break;
        case 'fr':
            img1 = '/assets/images/banner/YMShop-home1-banner7_fr.png';
            img2 = '/assets/images/banner/YMShop-home5-banner2.png';
            img3 = '/assets/images/banner/YMShop-home5-banner3.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4 = '/assets/images/banner/YMShop-home5-banner4.png';
            img5 = '/assets/images/banner/YMShop-home5-banner5.png';
            img6 = '/assets/images/banner/YMShop-home5-banner6.png';
            img4_link = '/collection/women-fashion';
            img5_link = '/collection/men-fashion';
            img6_link = '/collection/kids-fashion';
            img7 = '/assets/images/banner/YMShop-home5-banner7.png';
            img8 = '/assets/images/banner/YMShop-home5-banner8.png';
            img9 = '/assets/images/banner/YMShop-home5-banner9.png';
            img7_link = '/collection/women-fashion';
            img8_link = '/collection/men-fashion';
            img9_link = '/collection/kids-fashion';
            break;
        case 'it':
            img1 = '/assets/images/banner/YMShop-home1-banner7_it.png';
            img2 = '/assets/images/banner/YMShop-home5-banner2.png';
            img3 = '/assets/images/banner/YMShop-home5-banner3.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4 = '/assets/images/banner/YMShop-home5-banner4.png';
            img5 = '/assets/images/banner/YMShop-home5-banner5.png';
            img6 = '/assets/images/banner/YMShop-home5-banner6.png';
            img4_link = '/collection/women-fashion';
            img5_link = '/collection/men-fashion';
            img6_link = '/collection/kids-fashion';
            img7 = '/assets/images/banner/YMShop-home5-banner7.png';
            img8 = '/assets/images/banner/YMShop-home5-banner8.png';
            img9 = '/assets/images/banner/YMShop-home5-banner9.png';
            img7_link = '/collection/women-fashion';
            img8_link = '/collection/men-fashion';
            img9_link = '/collection/kids-fashion';
            break;
        case 'jp':
            img1 = '/assets/images/banner/YMShop-home1-banner7_jp.png';
            img2 = '/assets/images/banner/YMShop-home5-banner2.png';
            img3 = '/assets/images/banner/YMShop-home5-banner3.png';
            img1_link = '/collection/women-fashion';
            img2_link = '/collection/men-fashion';
            img3_link = '/collection/kids-fashion';
            img4 = '/assets/images/banner/YMShop-home5-banner4.png';
            img5 = '/assets/images/banner/YMShop-home5-banner5.png';
            img6 = '/assets/images/banner/YMShop-home5-banner6.png';
            img4_link = '/collection/women-fashion';
            img5_link = '/collection/men-fashion';
            img6_link = '/collection/kids-fashion';
            img7 = '/assets/images/banner/YMShop-home5-banner7.png';
            img8 = '/assets/images/banner/YMShop-home5-banner8.png';
            img9 = '/assets/images/banner/YMShop-home5-banner9.png';
            img7_link = '/collection/women-fashion';
            img8_link = '/collection/men-fashion';
            img9_link = '/collection/kids-fashion';
            break;
    }
    return { img1, img2, img3, img4, img5, img6, img7, img8, img9, img1_link, img2_link, img3_link, img4_link, img5_link, img6_link, img7_link, img8_link, img9_link }
}

export { DataIndexBanners, DataIndexBanners2, DataIndexBanners3 }