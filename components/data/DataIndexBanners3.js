import useTranslation from '../ultils/useTranslation'

function DataIndexBanners2(){    
    const { locale } = useTranslation();
    let img1, img2, img1_link, img2_link;
    switch (locale) {
        case 'en':
            img1 = '/assets/images/banner/YMShop-home1-banner1.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';  
            break;
        case 'fr':
            img1 = '/assets/images/banner/YMShop-home1-banner1_fr.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2_fr.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';   
            break;
        case 'it':
            img1 = '/assets/images/banner/YMShop-home1-banner1_it.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2_it.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';         
            break;
        case 'jp':
            img1 = '/assets/images/banner/YMShop-home1-banner1_jp.png';
            img2 = '/assets/images/banner/YMShop-home1-banner2_jp.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';      
            break;            
    }
    return {img1, img2, img1_link, img2_link}
}

export {DataIndexBanners2}