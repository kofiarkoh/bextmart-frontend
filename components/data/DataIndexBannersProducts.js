import useTranslation from '../ultils/useTranslation'

function DataIndexBP1(){    
    const { locale } = useTranslation();
    let top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
    top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action,
    top_banner3_bkg, top_banner3_title, top_banner3_link, top_banner3_desc, top_banner3_action;

    switch (locale) {
        case 'en':            
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner10.png';
            top_banner1_title = 'TABLES';
            top_banner1_desc = 'ARRIVAL';
            top_banner1_action = 'SHOP ALL';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner11.png';
            top_banner2_title = 'CHAIRS';
            top_banner2_desc = 'ARRIVAL';
            top_banner2_action = 'SHOP ALL';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home5-banner12.png';
            top_banner3_title = 'SOFAS';
            top_banner3_desc = 'ARRIVAL';
            top_banner3_action = 'SHOP ALL';
            top_banner3_link = '/collection/kids-fashion'; 
            break;
        case 'fr':
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner10.png';
            top_banner1_title = 'LES TABLES';
            top_banner1_desc = 'ARRIVÉE';
            top_banner1_action = 'TOUT MAGASINER';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner11.png';
            top_banner2_title = 'CHAISES';
            top_banner2_desc = 'ARRIVÉE';
            top_banner2_action = 'TOUT MAGASINER';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home5-banner12.png';
            top_banner3_title = 'CANAPÉS';
            top_banner3_desc = 'ARRIVÉE';
            top_banner3_action = 'TOUT MAGASINER';
            top_banner3_link = '/collection/kids-fashion';  
            break;
        case 'it':
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner10.png';
            top_banner1_title = 'TAVOLI';
            top_banner1_desc = 'ARRIVO';
            top_banner1_action = 'ACQUISTA TUTTO';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner11.png';
            top_banner2_title = 'SEDIE';
            top_banner2_desc = 'ARRIVO';
            top_banner2_action = 'ACQUISTA TUTTO';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home5-banner12.png';
            top_banner3_title = 'DIVANI';
            top_banner3_desc = 'ARRIVO';
            top_banner3_action = 'ACQUISTA TUTTO';
            top_banner3_link = '/collection/kids-fashion';        
            break;
        case 'jp':
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner10.png';
            top_banner1_title = 'テーブル';
            top_banner1_desc = '到着';
            top_banner1_action = 'すべて購入';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner11.png';
            top_banner2_title = '椅子';
            top_banner2_desc = '到着';
            top_banner2_action = 'すべて購入';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home5-banner12.png';
            top_banner3_title = 'ソファ';
            top_banner3_desc = '到着';
            top_banner3_action = 'すべて購入';
            top_banner3_link = '/collection/kids-fashion';     
            break;            
    }
    return {top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
        top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action,
        top_banner3_bkg, top_banner3_title, top_banner3_link, top_banner3_desc, top_banner3_action}
}

function DataIndexBP2(){    
    const { locale } = useTranslation();
    let top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
    top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action;

    switch (locale) {
        case 'en':            
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner13.png';
            top_banner1_title = 'DECORATE';
            top_banner1_desc = 'YOUR HOME';
            top_banner1_action = 'SHOP ALL';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner14.png';
            top_banner2_title = 'COMFORT';
            top_banner2_desc = 'YOUR HOME';
            top_banner2_action = 'SHOP ALL';
            top_banner2_link = '/collection/men-fashion';
            break;
        case 'fr':
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner13.png';
            top_banner1_title = 'DÉCORER';
            top_banner1_desc = 'TA MAISON';
            top_banner1_action = 'TOUT MAGASINER';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner14.png';
            top_banner2_title = 'CONFORT';
            top_banner2_desc = 'TA MAISON';
            top_banner2_action = 'TOUT MAGASINER';
            top_banner2_link = '/collection/men-fashion';
            break;
        case 'it':
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner13.png';
            top_banner1_title = 'DECORARE';
            top_banner1_desc = 'LA TUA CASA';
            top_banner1_action = 'ACQUISTA TUTTO';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner14.png';
            top_banner2_title = 'COMFORT';
            top_banner2_desc = 'LA TUA CASA';
            top_banner2_action = 'ACQUISTA TUTTO';
            top_banner2_link = '/collection/men-fashion';      
            break;
        case 'jp':
            top_banner1_bkg = '/assets/images/banner/YMShop-home5-banner13.png';
            top_banner1_title = '飾る';
            top_banner1_desc = 'あなたの家';
            top_banner1_action = 'すべて購入';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home5-banner14.png';
            top_banner2_title = '快適';
            top_banner2_desc = 'あなたの家';
            top_banner2_action = 'すべて購入';
            top_banner2_link = '/collection/men-fashion';   
            break;            
    }
    return {top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
        top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action}
}

export {DataIndexBP1, DataIndexBP2}