import useTranslation from '../ultils/useTranslation'

function DataIndexTabBanner(){    
    const { locale } = useTranslation();
    let title1, title2, viewalltext, banner1, banner1_link, banner2, banner2_link;
    switch (locale) {
        case 'en':
            title1 = 'BEST OF THE MONTH';
            title2 = 'FREE SHIPPING';
            viewalltext = 'VIEW ALL';
            banner1 = '/assets/images/banner/YMShop-home3-banner6.png';
            banner2 = '/assets/images/banner/YMShop-home3-banner7.png';            
            banner1_link = '/collection/women-fashion';            
            banner2_link = '/collection/men-fashion';                        
            break;
        case 'fr':
            title1 = 'LE MEILLEUR DU MOIS';
            title2 = 'LIVRAISON GRATUITE';
            viewalltext = 'VOIR TOUT';
            banner1 = '/assets/images/banner/YMShop-home3-banner6.png';
            banner2 = '/assets/images/banner/YMShop-home3-banner7.png'; 
            banner1_link = '/collection/women-fashion';            
            banner2_link = '/collection/men-fashion';  
            break;
        case 'it':
            title1 = 'IL MEGLIO DEL MESE';
            title2 = 'SPEDIZIONE GRATUITA';
            viewalltext = 'MOSTRA TUTTO';
            banner1 = '/assets/images/banner/YMShop-home3-banner6.png';
            banner2 = '/assets/images/banner/YMShop-home3-banner7.png'; 
            banner1_link = '/collection/women-fashion';            
            banner2_link = '/collection/men-fashion'; 
            break;
        case 'jp':
            title1 = '今月のベスト';
            title2 = '送料無料';
            viewalltext = 'すべて見る';
            banner1 = '/assets/images/banner/YMShop-home3-banner6.png';
            banner2 = '/assets/images/banner/YMShop-home3-banner7.png'; 
            banner1_link = '/collection/women-fashion';            
            banner2_link = '/collection/men-fashion';
            break;            
    }
    return {title1, title2, viewalltext, banner1, banner1_link, banner2, banner2_link}
}

export {DataIndexTabBanner}