import useTranslation from '../ultils/useTranslation'

function DataIndexBC1() {
    const { locale } = useTranslation();
    let top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
        top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action,
        top_banner3_bkg, top_banner3_title, top_banner3_link, top_banner3_desc, top_banner3_action,
        left_title, left_action, left_link,
        left_block1_title, left_block1_desc, left_block1_img, left_block1_link,
        left_block2_title, left_block2_desc, left_block2_img, left_block2_link,
        left_block3_title, left_block3_desc, left_block3_img, left_block3_link,
        left_block4_title, left_block4_desc, left_block4_img, left_block4_link,
        middle_title, middle_action, middle_link,
        middle_block1_title, middle_block1_desc, middle_block1_img, middle_block1_link,
        middle_block2_title, middle_block2_desc, middle_block2_img, middle_block2_link,
        middle_block3_title, middle_block3_desc, middle_block3_img, middle_block3_link,
        middle_block4_title, middle_block4_desc, middle_block4_img, middle_block4_link,
        right_title, right_action, right_link,
        right_block1_title, right_block1_desc, right_block1_img, right_block1_link,
        right_block2_title, right_block2_desc, right_block2_img, right_block2_link,
        right_block3_title, right_block3_desc, right_block3_img, right_block3_link,
        right_block4_title, right_block4_desc, right_block4_img, right_block4_link
        ;
    switch (locale) {
        case 'en':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner3.png';
            top_banner1_title = 'DRESSES';
            top_banner1_desc = 'Sale up to 10% off online shop';
            top_banner1_action = 'SHOP ALL';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner4.png';
            top_banner2_title = 'TOPS';
            top_banner2_desc = 'Buy 1 Get 1 Free all items';
            top_banner2_action = 'SHOP ALL';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner5.png';
            top_banner3_title = 'SHOES';
            top_banner3_desc = 'It’s all about that colorful';
            top_banner3_action = 'SHOP ALL';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'ALL DRESSES';
            left_action = 'VIEW ALL >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'Casual & Work';
            left_block1_desc = 'From $8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner6.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'Club & Night Out';
            left_block2_desc = 'From $30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner7.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'Cocktail';
            left_block3_desc = 'From $50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner8.png';
            left_block3_link = '/collections';
            left_block4_title = 'Wedding Dresses';
            left_block4_desc = 'Sale up to 20%';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner9.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'TOPS, TEES & BLOUSES';
            middle_action = 'VIEW ALL >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'Blouses & Shirts';
            middle_block1_desc = 'From $8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner10.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'Tanks & Camis';
            middle_block2_desc = 'From $30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner11.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'Tunics';
            middle_block3_desc = 'From $50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner12.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'Vests';
            middle_block4_desc = 'Sale up to 20%';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner13.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'ALL SHOES';
            right_action = 'VIEW ALL >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'Athletic & Boots';
            right_block1_desc = 'From $8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner14.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'Fashion Sneakers';
            right_block2_desc = 'From $30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner15.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'Loafers & Slip-Ons';
            right_block3_desc = 'From $50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner16.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'Sandals';
            right_block4_desc = 'Sale up to 20%';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner17.png';
            right_block4_link = '/collection/tops-tees';
            break;
        case 'fr':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner3.png';
            top_banner1_title = "ROBES";
            top_banner1_desc = 'Vente jusqu\'à 10% de réduction sur la boutique en ligne';
            top_banner1_action = 'TOUT MAGASINER';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner4.png';
            top_banner2_title = 'HAUTS';
            top_banner2_desc = 'Achetez 1 obtenez 1 gratuit tous les articles';
            top_banner2_action = 'TOUT MAGASINER';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner5.png';
            top_banner3_title = 'DES CHAUSSURES';
            top_banner3_desc = 'Tout est à propos de ce coloré';
            top_banner3_action = 'TOUT MAGASINER';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'TOUTES LES ROBES';
            left_action = 'VOIR TOUT >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'Travail occasionnel';
            left_block1_desc = 'À partir de €8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner6.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'Club et soirée';
            left_block2_desc = 'À partir de €30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner7.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'Cocktail';
            left_block3_desc = 'À partir de €50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner8.png';
            left_block3_link = '/collections';
            left_block4_title = 'Robes de mariée';
            left_block4_desc = 'Vente jusqu\'à 20%';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner9.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'HAUTS, T-SHIRTS ET BLOUSES';
            middle_action = 'VOIR TOUT >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'Blouses et chemises';
            middle_block1_desc = 'À partir de €8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner10.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'Débardeurs et camisoles';
            middle_block2_desc = 'À partir de €30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner11.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'Tuniques';
            middle_block3_desc = 'À partir de €50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner12.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'Gilets';
            middle_block4_desc = 'Vente jusqu\'à 20%';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner13.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'TOUTES LES CHAUSSURES';
            right_action = 'VOIR TOUT >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'Athlétique et Bottes';
            right_block1_desc = 'À partir de €8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner14.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'Mode Baskets';
            right_block2_desc = 'À partir de €30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner15.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'Mocassins et Slip-Ons';
            right_block3_desc = 'À partir de €50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner16.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'Des sandales';
            right_block4_desc = 'Vente jusqu\'à 20%';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner17.png';
            right_block4_link = '/collection/tops-tees';
            break;
        case 'it':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner3.png';
            top_banner1_title = 'VESTITI';
            top_banner1_desc = 'Saldi fino al 10% di sconto sul negozio online';
            top_banner1_action = 'ACQUISTA TUTTO';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner4.png';
            top_banner2_title = 'TOP';
            top_banner2_desc = 'Acquista 1 Ottieni 1 Gratis tutti gli articoli';
            top_banner2_action = 'ACQUISTA TUTTO';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner5.png';
            top_banner3_title = 'SCARPE';
            top_banner3_desc = 'È tutto così colorato';
            top_banner3_action = 'ACQUISTA TUTTO';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'TUTTI I VESTITI';
            left_action = 'MOSTRA TUTTO >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'Lavoro casuale';
            left_block1_desc = 'Da €8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner6.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'Discoteca e serata fuori';
            left_block2_desc = 'Da €30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner7.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'Cocktail';
            left_block3_desc = 'Da €50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner8.png';
            left_block3_link = '/collections';
            left_block4_title = 'Abiti da sposa';
            left_block4_desc = 'Saldi fino al 20%';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner9.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'TOP, T-shirt e camicette';
            middle_action = 'MOSTRA TUTTO >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'Bluse e camicie';
            middle_block1_desc = 'Da €8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner10.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'Canotte e canotte';
            middle_block2_desc = 'Da €30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner11.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'Tuniche';
            middle_block3_desc = 'Da €50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner12.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'Gilet';
            middle_block4_desc = 'Saldi fino al 20%';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner13.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'TUTTE LE SCARPE';
            right_action = 'MOSTRA TUTTO >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'Atletico e stivali';
            right_block1_desc = 'Da €8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner14.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'Scarpe da ginnastica alla moda';
            right_block2_desc = 'Da €30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner15.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'Mocassini e slip-on';
            right_block3_desc = 'Da €50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner16.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'Sandali';
            right_block4_desc = 'Saldi fino al 20%';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner17.png';
            right_block4_link = '/collection/tops-tees';
            break;
        case 'jp':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner3.png';
            top_banner1_title = 'ドレス';
            top_banner1_desc = 'セール 最大 10% オフ オンライン ショップ';
            top_banner1_action = 'すべて購入';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner4.png';
            top_banner2_title = 'トップス';
            top_banner2_desc = 'すべてのアイテムを 1 つ購入すると 1 つ無料';
            top_banner2_action = 'すべて購入';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner5.png';
            top_banner3_title = '靴';
            top_banner3_desc = 'それはすべてそのカラフルについてです';
            top_banner3_action = 'すべて購入';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'すべてのドレス';
            left_action = 'すべて見る >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'カジュアルな仕事';
            left_block1_desc = 'ドルから ¥8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner6.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'クラブ＆ナイトアウト';
            left_block2_desc = 'ドルから ¥30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner7.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'カクテル';
            left_block3_desc = 'ドルから ¥50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner8.png';
            left_block3_link = '/collections';
            left_block4_title = 'ウェディングドレス';
            left_block4_desc = '最大 20% のセール';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner9.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'トップス、ティー、ブラウス';
            middle_action = 'すべて見る >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'ブラウス＆シャツ';
            middle_block1_desc = 'ドルから ¥8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner10.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'タンク＆キャミソール';
            middle_block2_desc = 'ドルから ¥30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner11.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'チュニック';
            middle_block3_desc = 'ドルから ¥50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner12.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'ベスト';
            middle_block4_desc = '最大 20% のセール';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner13.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'すべての靴';
            right_action = 'すべて見る >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'アスレチック & ブーツ';
            right_block1_desc = 'ドルから ¥8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner14.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'ファッションスニーカー';
            right_block2_desc = 'ドルから ¥30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner15.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'ローファー＆スリッポン';
            right_block3_desc = 'ドルから ¥50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner16.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'サンダル';
            right_block4_desc = '最大 20% のセール';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner17.png';
            right_block4_link = '/collection/tops-tees';
            break;
    }
    
    return {
        top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
        top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action,
        top_banner3_bkg, top_banner3_title, top_banner3_link, top_banner3_desc, top_banner3_action,
        left_title, left_action, left_link,
        left_block1_title, left_block1_desc, left_block1_img, left_block1_link,
        left_block2_title, left_block2_desc, left_block2_img, left_block2_link,
        left_block3_title, left_block3_desc, left_block3_img, left_block3_link,
        left_block4_title, left_block4_desc, left_block4_img, left_block4_link,
        middle_title, middle_action, middle_link,
        middle_block1_title, middle_block1_desc, middle_block1_img, middle_block1_link,
        middle_block2_title, middle_block2_desc, middle_block2_img, middle_block2_link,
        middle_block3_title, middle_block3_desc, middle_block3_img, middle_block3_link,
        middle_block4_title, middle_block4_desc, middle_block4_img, middle_block4_link,
        right_title, right_action, right_link,
        right_block1_title, right_block1_desc, right_block1_img, right_block1_link,
        right_block2_title, right_block2_desc, right_block2_img, right_block2_link,
        right_block3_title, right_block3_desc, right_block3_img, right_block3_link,
        right_block4_title, right_block4_desc, right_block4_img, right_block4_link
    }
}

function DataIndexBC2() {
    const { locale } = useTranslation();
    let top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
        top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action,
        top_banner3_bkg, top_banner3_title, top_banner3_link, top_banner3_desc, top_banner3_action,
        left_title, left_action, left_link,
        left_block1_title, left_block1_desc, left_block1_img, left_block1_link,
        left_block2_title, left_block2_desc, left_block2_img, left_block2_link,
        left_block3_title, left_block3_desc, left_block3_img, left_block3_link,
        left_block4_title, left_block4_desc, left_block4_img, left_block4_link,
        middle_title, middle_action, middle_link,
        middle_block1_title, middle_block1_desc, middle_block1_img, middle_block1_link,
        middle_block2_title, middle_block2_desc, middle_block2_img, middle_block2_link,
        middle_block3_title, middle_block3_desc, middle_block3_img, middle_block3_link,
        middle_block4_title, middle_block4_desc, middle_block4_img, middle_block4_link,
        right_title, right_action, right_link,
        right_block1_title, right_block1_desc, right_block1_img, right_block1_link,
        right_block2_title, right_block2_desc, right_block2_img, right_block2_link,
        right_block3_title, right_block3_desc, right_block3_img, right_block3_link,
        right_block4_title, right_block4_desc, right_block4_img, right_block4_link
        ;
    switch (locale) {
        case 'en':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner18.png';
            top_banner1_title = 'JACKETS';
            top_banner1_desc = 'Celebrate love for all';
            top_banner1_action = 'SHOP ALL';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner19.png';
            top_banner2_title = 'JEANS';
            top_banner2_desc = 'FREE delivery on over $100';
            top_banner2_action = 'SHOP ALL';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner20.png';
            top_banner3_title = 'SWIM';
            top_banner3_desc = 'Great Steals for Her';
            top_banner3_action = 'SHOP ALL';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'JACKETS & COATS';
            left_action = 'VIEW ALL >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'Active & Performance';
            left_block1_desc = 'From $8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner21.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'Leather & Faux';
            left_block2_desc = 'From $30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner22.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'Trench & Rain';
            left_block3_desc = 'From $50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner23.png';
            left_block3_link = '/collections';
            left_block4_title = 'Work Wear';
            left_block4_desc = 'Sale up to 20%';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner24.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'ALL JEANS';
            middle_action = 'VIEW ALL >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'Men\'s Jeans';
            middle_block1_desc = 'From $8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner25.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'Women\'s Jeans';
            middle_block2_desc = 'From $30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner26.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'Girls\' Jeans';
            middle_block3_desc = 'From $50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner27.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'Boys\' Jeans';
            middle_block4_desc = 'Sale up to 20%';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner28.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'ALL SWIM';
            right_action = 'VIEW ALL >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'Bikini Swimsuits';
            right_block1_desc = 'From $8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner29.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'Cover Ups';
            right_block2_desc = 'From $30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner30.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'Baby’s Swimwear';
            right_block3_desc = 'From $50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner31.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'Men\'s Swimwear';
            right_block4_desc = 'Sale up to 20%';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner32.png';
            right_block4_link = '/collection/tops-tees';
            break;
        case 'fr':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner18.png';
            top_banner1_title = 'VESTES';
            top_banner1_desc = 'Célébrer l\'amour pour tous';
            top_banner1_action = 'TOUT MAGASINER';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner19.png';
            top_banner2_title = 'JEANS';
            top_banner2_desc = 'Livraison GRATUITE sur plus de 100 €';
            top_banner2_action = 'TOUT MAGASINER';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner20.png';
            top_banner3_title = 'BAIGNADE';
            top_banner3_desc = 'Grands vols pour elle';
            top_banner3_action = 'TOUT MAGASINER';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'JACKETS & COATS';
            left_action = 'VOIR TOUT >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'VESTES & MANTEAUX';
            left_block1_desc = 'A partir de €8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner21.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'Cuir & Simili';
            left_block2_desc = 'A partir de €30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner22.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'Tranchée et Pluie';
            left_block3_desc = 'A partir de €50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner23.png';
            left_block3_link = '/collections';
            left_block4_title = 'Vêtements de travail';
            left_block4_desc = 'Vente jusqu\'à 20%';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner24.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'TOUS LES JEANS';
            middle_action = 'VOIR TOUT >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'Jeans pour hommes';
            middle_block1_desc = 'A partir de €8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner25.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'Jeans pour femmes';
            middle_block2_desc = 'A partir de €30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner26.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'Jeans pour filles';
            middle_block3_desc = 'A partir de €50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner27.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'Jeans pour garçon';
            middle_block4_desc = 'Vente jusqu\'à 20%';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner28.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'TOUT NAGE';
            right_action = 'VOIR TOUT >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'Bikinis Maillots De Bain';
            right_block1_desc = 'A partir de €8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner29.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'Des dissimulations';
            right_block2_desc = 'A partir de €30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner30.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'Maillots de bain pour bébé';
            right_block3_desc = 'A partir de €50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner31.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'Maillots de bain pour hommes';
            right_block4_desc = 'Vente jusqu\'à 20%';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner32.png';
            right_block4_link = '/collection/tops-tees';
            break;
        case 'it':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner18.png';
            top_banner1_title = 'GIACCHE';
            top_banner1_desc = 'Festeggia l\'amore per tutti';
            top_banner1_action = 'ACQUISTA TUTTO';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner19.png';
            top_banner2_title = 'JEANS';
            top_banner2_desc = 'Consegna GRATUITA su oltre € 100';
            top_banner2_action = 'ACQUISTA TUTTO';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner20.png';
            top_banner3_title = 'NUOTATA';
            top_banner3_desc = 'Grandi furti per lei';
            top_banner3_action = 'ACQUISTA TUTTO';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'GIACCHE E CAPPOTTI';
            left_action = 'MOSTRA TUTTO >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'Attivo e performante';
            left_block1_desc = 'Da €8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner21.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'Pelle e finta';
            left_block2_desc = 'Da €30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner22.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'Trincea e pioggia';
            left_block3_desc = 'Da €50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner23.png';
            left_block3_link = '/collections';
            left_block4_title = 'Abbigliamento da lavoro';
            left_block4_desc = 'Saldi fino al 20%';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner24.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'TUTTI I JEANS';
            middle_action = 'MOSTRA TUTTO >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'Jeans da uomo';
            middle_block1_desc = 'Da €8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner25.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = 'Jeans da donna';
            middle_block2_desc = 'Da €30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner26.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'Jeans da bambina';
            middle_block3_desc = 'Da €50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner27.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'Jeans da ragazzo';
            middle_block4_desc = 'Saldi fino al 20%';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner28.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'TUTTI NUOTO';
            right_action = 'MOSTRA TUTTO >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'Costumi da bagno bikini';
            right_block1_desc = 'Da €8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner29.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'Insabbiamenti';
            right_block2_desc = 'Da €30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner30.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'Costumi da bagno per bambini';
            right_block3_desc = 'Da €50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner31.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'Costumi da bagno da uomo';
            right_block4_desc = 'Saldi fino al 20%';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner32.png';
            right_block4_link = '/collection/tops-tees';
            break;
        case 'jp':
            top_banner1_bkg = '/assets/images/banner/YMShop-home4-banner18.png';
            top_banner1_title = 'ジャケット';
            top_banner1_desc = 'すべての人への愛を祝いましょう';
            top_banner1_action = 'すべて購入';
            top_banner1_link = '/collection/women-fashion';
            top_banner2_bkg = '/assets/images/banner/YMShop-home4-banner19.png';
            top_banner2_title = 'ジーンズ';
            top_banner2_desc = '100ドル以上で送料無料';
            top_banner2_action = 'すべて購入';
            top_banner2_link = '/collection/men-fashion';
            top_banner3_bkg = '/assets/images/banner/YMShop-home4-banner20.png';
            top_banner3_title = '泳ぐ';
            top_banner3_desc = '彼女のための素晴らしい盗み';
            top_banner3_action = 'すべて購入';
            top_banner3_link = '/collection/kids-fashion';
            left_title = 'ジャケット＆コート';
            left_action = 'すべて見る >>';
            left_link = '/collection/women-fashion';
            left_block1_title = 'アクティブ＆パフォーマンス';
            left_block1_desc = 'から ¥8';
            left_block1_img = '/assets/images/banner/YMShop-home4-banner21.png';
            left_block1_link = '/collection/tops-tees';
            left_block2_title = 'レザー＆フェイク';
            left_block2_desc = 'から ¥30';
            left_block2_img = '/assets/images/banner/YMShop-home4-banner22.png';
            left_block2_link = '/collection/clothing-sets';
            left_block3_title = 'トレンチ＆レイン';
            left_block3_desc = 'から ¥50';
            left_block3_img = '/assets/images/banner/YMShop-home4-banner23.png';
            left_block3_link = '/collections';
            left_block4_title = '作業着';
            left_block4_desc = '最大 20% のセール';
            left_block4_img = '/assets/images/banner/YMShop-home4-banner24.png';
            left_block4_link = '/collection/kids-fashion';
            middle_title = 'すべてのジーンズ';
            middle_action = 'すべて見る >>';
            middle_link = '/collection/men-fashion';
            middle_block1_title = 'メンズジーンズ';
            middle_block1_desc = 'から ¥8';
            middle_block1_img = '/assets/images/banner/YMShop-home4-banner25.png';
            middle_block1_link = '/collection/dresses';
            middle_block2_title = '女性用ジーンズ';
            middle_block2_desc = 'から ¥30';
            middle_block2_img = '/assets/images/banner/YMShop-home4-banner26.png';
            middle_block2_link = '/collection/tops-tees';
            middle_block3_title = 'ガールズジーンズ';
            middle_block3_desc = 'から ¥50';
            middle_block3_img = '/assets/images/banner/YMShop-home4-banner27.png';
            middle_block3_link = '/collection/clothing-sets';
            middle_block4_title = 'ボーイズジーンズ';
            middle_block4_desc = '最大 20% のセール';
            middle_block4_img = '/assets/images/banner/YMShop-home4-banner28.png';
            middle_block4_link = '/collection/kids-fashion';
            right_title = 'すべての水泳';
            right_action = 'すべて見る >>';
            right_link = '/collection/kids-fashion';
            right_block1_title = 'ビキニ水着';
            right_block1_desc = 'から ¥8';
            right_block1_img = '/assets/images/banner/YMShop-home4-banner29.png';
            right_block1_link = '/collection/kids-fashion';
            right_block2_title = 'カバーアップ';
            right_block2_desc = 'から ¥30';
            right_block2_img = '/assets/images/banner/YMShop-home4-banner30.png';
            right_block2_link = '/collection/clothing-sets';
            right_block3_title = 'ベビー水着';
            right_block3_desc = 'から ¥50';
            right_block3_img = '/assets/images/banner/YMShop-home4-banner31.png';
            right_block3_link = '/collection/dresses';
            right_block4_title = 'メンズ水着';
            right_block4_desc = '最大 20% のセール';
            right_block4_img = '/assets/images/banner/YMShop-home4-banner32.png';
            right_block4_link = '/collection/tops-tees';
            break;
    }
    
    return {
        top_banner1_bkg, top_banner1_title, top_banner1_link, top_banner1_desc, top_banner1_action,
        top_banner2_bkg, top_banner2_title, top_banner2_link, top_banner2_desc, top_banner2_action,
        top_banner3_bkg, top_banner3_title, top_banner3_link, top_banner3_desc, top_banner3_action,
        left_title, left_action, left_link,
        left_block1_title, left_block1_desc, left_block1_img, left_block1_link,
        left_block2_title, left_block2_desc, left_block2_img, left_block2_link,
        left_block3_title, left_block3_desc, left_block3_img, left_block3_link,
        left_block4_title, left_block4_desc, left_block4_img, left_block4_link,
        middle_title, middle_action, middle_link,
        middle_block1_title, middle_block1_desc, middle_block1_img, middle_block1_link,
        middle_block2_title, middle_block2_desc, middle_block2_img, middle_block2_link,
        middle_block3_title, middle_block3_desc, middle_block3_img, middle_block3_link,
        middle_block4_title, middle_block4_desc, middle_block4_img, middle_block4_link,
        right_title, right_action, right_link,
        right_block1_title, right_block1_desc, right_block1_img, right_block1_link,
        right_block2_title, right_block2_desc, right_block2_img, right_block2_link,
        right_block3_title, right_block3_desc, right_block3_img, right_block3_link,
        right_block4_title, right_block4_desc, right_block4_img, right_block4_link
    }
}

export { DataIndexBC1, DataIndexBC2 }