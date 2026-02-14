import useTranslation from '../ultils/useTranslation'

function DataIndexBrandsList(){    
    const { locale } = useTranslation();
    let title, viewalltext, viewall, brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, 
    brand1_link, brand2_link, brand3_link, brand4_link, brand5_link, brand6_link, brand7_link, brand8_link;
    switch (locale) {
        case 'en':
            title = 'OUR BRANDS';
            viewalltext = 'VIEW ALL';
            viewall = '/collections';
            brand1 = '/assets/images/brand/YMShop-home5-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home5-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home5-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home5-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home5-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand8 = '/assets/images/brand/YMShop-home5-brand5.png';
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
            title = 'NOS MARQUES';
            viewalltext = 'VOIR TOUT';
            viewall = '/collections';
            brand1 = '/assets/images/brand/YMShop-home5-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home5-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home5-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home5-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home5-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand8 = '/assets/images/brand/YMShop-home5-brand5.png';
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
            title = 'I NOSTRI MARCHI';
            viewalltext = 'MOSTRA TUTTO';
            viewall = '/collections';
            brand1 = '/assets/images/brand/YMShop-home5-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home5-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home5-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home5-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home5-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand8 = '/assets/images/brand/YMShop-home5-brand5.png';
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
            title = '我々のブランド';
            viewalltext = 'すべて見る';
            viewall = '/collections';
            brand1 = '/assets/images/brand/YMShop-home5-brand1.png';
            brand2 = '/assets/images/brand/YMShop-home5-brand2.png';
            brand3 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand4 = '/assets/images/brand/YMShop-home5-brand4.png';
            brand5 = '/assets/images/brand/YMShop-home5-brand5.png';
            brand6 = '/assets/images/brand/YMShop-home5-brand6.png';
            brand7 = '/assets/images/brand/YMShop-home5-brand3.png';
            brand8 = '/assets/images/brand/YMShop-home5-brand5.png';
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
    return {title, viewalltext, viewall, brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, 
        brand1_link, brand2_link, brand3_link, brand4_link, brand5_link, brand6_link, brand7_link, brand8_link}
}

export {DataIndexBrandsList}