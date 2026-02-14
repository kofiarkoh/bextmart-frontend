import useTranslation from '../ultils/useTranslation'

function DataIndexBrandsList(){    
    const { locale } = useTranslation();
    let title, viewalltext, viewall, brandimg1, brandimg1_link, brandimg2, brandimg2_link, brandimg3, brandimg3_link, brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, 
    brand1_link, brand2_link, brand3_link, brand4_link, brand5_link, brand6_link, brand7_link, brand8_link;
    switch (locale) {
        case 'en':
            title = 'POPUPLAR BRANDS';
            viewalltext = 'VIEW ALL';
            viewall = '/collections';
            brandimg1 = '/assets/images/banner/YMShop-home3-brandbanner1.png';
            brandimg1_link = '/collection/women-fashion';
            brandimg2 = '/assets/images/banner/YMShop-home3-brandbanner2.png';
            brandimg2_link = '/collection/men-fashion';
            brandimg3 = '/assets/images/banner/YMShop-home3-brandbanner3.png';
            brandimg3_link = '/collection/kids-fashion';
            brand1 = '/assets/images/brand/YMShop-home3-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home3-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home3-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home3-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home3-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home3-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home3-brand7.png';
            brand8 = '/assets/images/brand/YMShop-home3-brand8.png';
            brand1_link = '/collection/women-fashion';            
            brand2_link = '/collection/men-fashion';            
            brand3_link = '/collection/kids-fashion';            
            brand4_link = '/collection/tops-tees';            
            brand5_link = '/collection/dresses';            
            brand6_link = '/collection/clothing-sets';            
            brand7_link = '/collections';            
            brand8_link = '/collection/kids-fashion';
            break;
        case 'fr':
            title = 'MARQUES POPULAIRES';
            viewalltext = 'VOIR TOUT';
            viewall = '/collections';
            brandimg1 = '/assets/images/banner/YMShop-home3-brandbanner1_fr.png';
            brandimg1_link = '/collection/women-fashion';
            brandimg2 = '/assets/images/banner/YMShop-home3-brandbanner2_fr.png';
            brandimg2_link = '/collection/men-fashion';
            brandimg3 = '/assets/images/banner/YMShop-home3-brandbanner3_fr.png';
            brandimg3_link = '/collection/kids-fashion';
            brand1 = '/assets/images/brand/YMShop-home3-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home3-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home3-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home3-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home3-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home3-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home3-brand7.png';
            brand8 = '/assets/images/brand/YMShop-home3-brand8.png';
            brand1_link = '/collection/women-fashion';            
            brand2_link = '/collection/men-fashion';            
            brand3_link = '/collection/kids-fashion';            
            brand4_link = '/collection/tops-tees';            
            brand5_link = '/collection/dresses';            
            brand6_link = '/collection/clothing-sets';            
            brand7_link = '/collections';            
            brand8_link = '/collection/kids-fashion';
            break;
        case 'it':
            title = 'MARCHI POPOLARI';
            viewalltext = 'MOSTRA TUTTO';
            viewall = '/collections';
            brandimg1 = '/assets/images/banner/YMShop-home3-brandbanner1_it.png';
            brandimg1_link = '/collection/women-fashion';
            brandimg2 = '/assets/images/banner/YMShop-home3-brandbanner2_it.png';
            brandimg2_link = '/collection/men-fashion';
            brandimg3 = '/assets/images/banner/YMShop-home3-brandbanner3_it.png';
            brandimg3_link = '/collection/kids-fashion';
            brand1 = '/assets/images/brand/YMShop-home3-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home3-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home3-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home3-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home3-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home3-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home3-brand7.png';
            brand8 = '/assets/images/brand/YMShop-home3-brand8.png';
            brand1_link = '/collection/women-fashion';            
            brand2_link = '/collection/men-fashion';            
            brand3_link = '/collection/kids-fashion';            
            brand4_link = '/collection/tops-tees';            
            brand5_link = '/collection/dresses';            
            brand6_link = '/collection/clothing-sets';            
            brand7_link = '/collections';            
            brand8_link = '/collection/kids-fashion';
            break;
        case 'jp':
            title = '人気ブランド';
            viewalltext = 'すべて見る';
            viewall = '/collections';
            brandimg1 = '/assets/images/banner/YMShop-home3-brandbanner1_jp.png';
            brandimg1_link = '/collection/women-fashion';
            brandimg2 = '/assets/images/banner/YMShop-home3-brandbanner2_jp.png';
            brandimg2_link = '/collection/men-fashion';
            brandimg3 = '/assets/images/banner/YMShop-home3-brandbanner3_jp.png';
            brandimg3_link = '/collection/kids-fashion';
            brand1 = '/assets/images/brand/YMShop-home3-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home3-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home3-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home3-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home3-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home3-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home3-brand7.png';
            brand8 = '/assets/images/brand/YMShop-home3-brand8.png';
            brand1_link = '/collection/women-fashion';            
            brand2_link = '/collection/men-fashion';            
            brand3_link = '/collection/kids-fashion';            
            brand4_link = '/collection/tops-tees';            
            brand5_link = '/collection/dresses';            
            brand6_link = '/collection/clothing-sets';            
            brand7_link = '/collections';            
            brand8_link = '/collection/kids-fashion';
            break;            
    }
    return {title, viewalltext, viewall, brandimg1, brandimg1_link, brandimg2, brandimg2_link, brandimg3, brandimg3_link, 
        brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8,
        brand1_link, brand2_link, brand3_link, brand4_link, brand5_link, brand6_link, brand7_link, brand8_link}
}

export {DataIndexBrandsList}