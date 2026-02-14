import useTranslation from '../ultils/useTranslation'

function DataIndexBannersCaption() {
    const { locale } = useTranslation();
    let title,
        element1_img, element1_title, element1_link, element1_desc,
        element2_img, element2_title, element2_link, element2_desc,
        element3_img, element3_title, element3_link, element3_desc,
        element4_img, element4_title, element4_link, element4_desc,
        element5_img, element5_title, element5_link, element5_desc,
        element6_img, element6_title, element6_link, element6_desc;
    switch (locale) {
        case 'en':
            title = 'PRICED RIGHT FOR YOU!';
            element1_img = '/assets/images/banner/YMShop-home3-banner1.png';
            element1_title = 'Up to 40% off';
            element1_link = '/collection/women-fashion';
            element2_img = '/assets/images/banner/YMShop-home3-banner2.png';
            element2_title = 'Tech starting at $10';
            element2_link = '/collection/men-fashion';
            element3_img = '/assets/images/banner/YMShop-home3-banner3.png';
            element3_title = 'Toys Kids starting  at $10';
            element3_link = '/collection/men-fashion';
            element4_img = '/assets/images/banner/YMShop-home3-banner4.png';
            element4_title = 'Stylish starting at $7';
            element4_link = '/collection/kids-fashion';
            element5_img = '/assets/images/banner/YMShop-home3-banner5.png';
            element5_title = 'Outdoor starting at $15';
            element5_link = '/collection/tops-tees';
            break;
        case 'fr':
            title = 'BON PRIX POUR VOUS !';
            element1_img = '/assets/images/banner/YMShop-home3-banner1.png';
            element1_title = "Jusqu'à 40 % de réduction";
            element1_link = '/collection/women-fashion';
            element2_img = '/assets/images/banner/YMShop-home3-banner2.png';
            element2_title = 'Technologie à partir de 10€';
            element2_link = '/collection/men-fashion';
            element3_img = '/assets/images/banner/YMShop-home3-banner3.png';
            element3_title = 'Jouets Enfants à partir de 10€';
            element3_link = '/collection/men-fashion';
            element4_img = '/assets/images/banner/YMShop-home3-banner4.png';
            element4_title = 'Élégant à partir de 7€';
            element4_link = '/collection/kids-fashion';
            element5_img = '/assets/images/banner/YMShop-home3-banner5.png';
            element5_title = 'Extérieur à partir de 15€';
            element5_link = '/collection/tops-tees';
            break;
        case 'it':
            title = 'IL PREZZO GIUSTO PER TE!';
            element1_img = '/assets/images/banner/YMShop-home3-banner1.png';
            element1_title = 'Fino al 40% di sconto';
            element1_link = '/collection/women-fashion';
            element2_img = '/assets/images/banner/YMShop-home3-banner2.png';
            element2_title = 'Tecnologia a partire da 10€';
            element2_link = '/collection/men-fashion';
            element3_img = '/assets/images/banner/YMShop-home3-banner3.png';
            element3_title = 'Giocattoli per bambini a partire da 10€';
            element3_link = '/collection/men-fashion';
            element4_img = '/assets/images/banner/YMShop-home3-banner4.png';
            element4_title = 'Elegante a partire da 7€';
            element4_link = '/collection/kids-fashion';
            element5_img = '/assets/images/banner/YMShop-home3-banner5.png';
            element5_title = "All'aperto a partire da 15€";
            element5_link = '/collection/tops-tees';
            break;
        case 'jp':
            title = 'あなたにぴったりの価格です！';
            element1_img = '/assets/images/banner/YMShop-home3-banner1.png';
            element1_title = '最大 40% オフ';
            element1_link = '/collection/women-fashion';
            element2_img = '/assets/images/banner/YMShop-home3-banner2.png';
            element2_title = '10ドルからの技術';
            element2_link = '/collection/men-fashion';
            element3_img = '/assets/images/banner/YMShop-home3-banner3.png';
            element3_title = 'おもちゃの子供は$ 10から';
            element3_link = '/collection/men-fashion';
            element4_img = '/assets/images/banner/YMShop-home3-banner4.png';
            element4_title = 'スタイリッシュな $7 から';
            element4_link = '/collection/kids-fashion';
            element5_img = '/assets/images/banner/YMShop-home3-banner5.png';
            element5_title = 'アウトドアは15ドルから';
            element5_link = '/collection/tops-tees';
            break;
    }
    return {
        title, element1_img, element1_title, element1_link, element1_desc, element2_img, element2_title, element2_link, element2_desc, element3_img, element3_title, element3_link, element3_desc, element4_img, element4_title, element4_link, element4_desc, element5_img, element5_title, element5_link, element5_desc,
        element6_img, element6_title, element6_link, element6_desc
    }
}

export { DataIndexBannersCaption }