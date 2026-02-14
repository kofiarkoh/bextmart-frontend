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
            title = "OUR FEATURED OFFER";
            element1_img = '/assets/images/banner/YMShop-home2-banner1.png';
            element1_title = 'PS5 games just came in!';
            element1_link = '/collection/women-fashion';
            element1_desc = 'Lorem Ipsum is simply dummy text of the printing';
            element2_img = '/assets/images/banner/YMShop-home2-banner2.png';
            element2_title = 'Sale up to 80% Off on Top Brands';
            element2_link = '/collection/men-fashion';
            element2_desc = 'Lorem Ipsum is simply dummy text of the printing';
            element3_img = '/assets/images/banner/YMShop-home2-banner3.png';
            element3_title = 'Up To 20% Off TVs & More!';
            element3_link = '/collection/men-fashion';
            element3_desc = 'Lorem Ipsum is simply dummy text of the printing';
            element4_img = '/assets/images/banner/YMShop-home2-banner4.png';
            element4_title = '$45 Gift Card (Online-Only)';
            element4_link = '/collection/kids-fashion';
            element4_desc = 'Lorem Ipsum is simply dummy text of the printing';
            element5_img = '/assets/images/banner/YMShop-home2-banner5.png';
            element5_title = '10% Off + Free Shipping';
            element5_link = '/collection/tops-tees';
            element5_desc = 'Lorem Ipsum is simply dummy text of the printing';
            element6_img = '/assets/images/banner/YMShop-home2-banner6.png';
            element6_title = '60-Day Free Trial Offer';
            element6_link = '/collection/dresses';
            element6_desc = 'Lorem Ipsum is simply dummy text of the printing';
            break;
        case 'fr':
            title = "NOTRE OFFRE EN VEDETTE";
            element1_img = '/assets/images/banner/YMShop-home2-banner1.png';
            element1_title = "Les jeux PS5 viennent d'arriver !";
            element1_link = '/collection/women-fashion';
            element1_desc = "Lorem Ipsum est simplement un texte factice de l'impression";
            element2_img = '/assets/images/banner/YMShop-home2-banner2.png';
            element2_title = "Vente jusqu'à 80 % de réduction sur les meilleures marques";
            element2_link = '/collection/men-fashion';
            element2_desc = "Lorem Ipsum est simplement un texte factice de l'impression";
            element3_img = '/assets/images/banner/YMShop-home2-banner3.png';
            element3_title = "Jusqu'à 20 % de réduction sur les téléviseurs et plus !";
            element3_link = '/collection/men-fashion';
            element3_desc = "Lorem Ipsum est simplement un texte factice de l'impression";
            element4_img = '/assets/images/banner/YMShop-home2-banner4.png';
            element4_title = 'Carte-cadeau de 45 $ (en ligne seulement)';
            element4_link = '/collection/kids-fashion';
            element4_desc = "Lorem Ipsum est simplement un texte factice de l'impression";
            element5_img = '/assets/images/banner/YMShop-home2-banner5.png';
            element5_title = '10 % de réduction + livraison gratuite';
            element5_link = '/collection/tops-tees';
            element5_desc = "Lorem Ipsum est simplement un texte factice de l'impression";
            element6_img = '/assets/images/banner/YMShop-home2-banner6.png';
            element6_title = "Offre d'essai gratuit de 60 jours";
            element6_link = '/collection/dresses';
            element6_desc = "Lorem Ipsum est simplement un texte factice de l'impression";
            break;
        case 'it':
            title = "LA NOSTRA OFFERTA IN EVIDENZA";
            element1_img = '/assets/images/banner/YMShop-home2-banner1.png';
            element1_title = 'I giochi per PS5 sono appena arrivati!';
            element1_link = '/collection/women-fashion';
            element1_desc = 'Lorem Ipsum è semplicemente un testo fittizio della stampa';
            element2_img = '/assets/images/banner/YMShop-home2-banner2.png';
            element2_title = "Sconti fino all'80% sui migliori marchi";
            element2_link = '/collection/men-fashion';
            element2_desc = 'Lorem Ipsum è semplicemente un testo fittizio della stampa';
            element3_img = '/assets/images/banner/YMShop-home2-banner3.png';
            element3_title = 'Fino al 20% di sconto su TV e altro!';
            element3_link = '/collection/men-fashion';
            element3_desc = 'Lorem Ipsum è semplicemente un testo fittizio della stampa';
            element4_img = '/assets/images/banner/YMShop-home2-banner4.png';
            element4_title = 'Buono regalo da $ 45 (solo online)';
            element4_link = '/collection/kids-fashion';
            element4_desc = 'Lorem Ipsum è semplicemente un testo fittizio della stampa';
            element5_img = '/assets/images/banner/YMShop-home2-banner5.png';
            element5_title = 'Sconto del 10% + spedizione gratuita';
            element5_link = '/collection/tops-tees';
            element5_desc = 'LLorem Ipsum è semplicemente un testo fittizio della stampa';
            element6_img = '/assets/images/banner/YMShop-home2-banner6.png';
            element6_title = 'Offerta di prova gratuita di 60 giorni';
            element6_link = '/collection/dresses';
            element6_desc = 'Lorem Ipsum è semplicemente un testo fittizio della stampa';
            break;
        case 'jp':
            title = "私たちの注目のオファー";
            element1_img = '/assets/images/banner/YMShop-home2-banner1.png';
            element1_title = 'PS5のゲームが入荷しました！';
            element1_link = '/collection/women-fashion';
            element1_desc = 'は単に印刷のダミー テキストです。';
            element2_img = '/assets/images/banner/YMShop-home2-banner2.png';
            element2_title = 'トップブランドで最大80％オフのセール';
            element2_link = '/collection/men-fashion';
            element2_desc = 'は単に印刷のダミー テキストです。';
            element3_img = '/assets/images/banner/YMShop-home2-banner3.png';
            element3_title = 'テレビなどが最大 20% オフ！';
            element3_link = '/collection/men-fashion';
            element3_desc = 'は単に印刷のダミー テキストです。';
            element4_img = '/assets/images/banner/YMShop-home2-banner4.png';
            element4_title = '45ドルのギフトカード（オンラインのみ）';
            element4_link = '/collection/kids-fashion';
            element4_desc = 'は単に印刷のダミー テキストです。';
            element5_img = '/assets/images/banner/YMShop-home2-banner5.png';
            element5_title = '10% オフ + 送料無料';
            element5_link = '/collection/tops-tees';
            element5_desc = 'は単に印刷のダミー テキストです。';
            element6_img = '/assets/images/banner/YMShop-home2-banner6.png';
            element6_title = '60日間の無料トライアルオファー';
            element6_link = '/collection/dresses';
            element6_desc = 'は単に印刷のダミー テキストです。';
            break;
    }
    return {title, element1_img, element1_title, element1_link, element1_desc, element2_img, element2_title, element2_link, element2_desc, element3_img, element3_title, element3_link, element3_desc, element4_img, element4_title, element4_link, element4_desc, element5_img, element5_title, element5_link, element5_desc,
        element6_img, element6_title, element6_link, element6_desc}
}

export {DataIndexBannersCaption}