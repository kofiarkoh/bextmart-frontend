import useTranslation from '../ultils/useTranslation'

function DataIndexSlideshow(){    
    const { locale } = useTranslation();
    let slideshow1, slideshow2, slideshow3, slideshow4, slideshow1_caption, slideshow2_caption, slideshow3_caption, slideshow4_caption, 
    slideshow1_link, slideshow2_link, slideshow3_link, slideshow4_link,
    product_link1, product_link2, product_link3, product_banner1, product_banner2, product_banner3, product_bkg1, product_bkg2, product_bkg3, 
    img1, img2, img3, img1_link, img2_link, img3_link;
    switch (locale) {
        case 'en':
            slideshow1 = '/assets/images/yam1-sl2-bkg.png';
            slideshow2 = '/assets/images/yam1-sl1-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow2_caption = '/assets/images/yam1-sl1-caption.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            product_link1 = '/product/tshirt',
            product_link2 = '/product/single-breasted-poplin',
            product_link3 = '/product/large-vacuum-clear',
            product_banner1 = '/assets/images/banner/YMShop-home2-topbanner4.png',
            product_banner2 = '/assets/images/banner/YMShop-home2-topbanner5.png',
            product_banner3 = '/assets/images/banner/YMShop-home2-topbanner6.png',
            product_bkg1 = '#00b378',
            product_bkg2 = '#e6007c',
            product_bkg3 = '#195ad7',
            img1 = '/assets/images/banner/YMShop-home2-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home2-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home2-topbanner3.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';   
            break;
        case 'fr':
            slideshow1 = '/assets/images/yam1-sl2-bkg.png';
            slideshow2 = '/assets/images/yam1-sl1-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl1-caption.png';
            slideshow2_caption = '/assets/images/yam1-sl1-caption_fr.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption_fr.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            product_link1 = '/product/tshirt',
            product_link2 = '/product/single-breasted-poplin',
            product_link3 = '/product/large-vacuum-clear',
            product_banner1 = '/assets/images/banner/YMShop-home2-topbanner4.png',
            product_banner2 = '/assets/images/banner/YMShop-home2-topbanner5.png',
            product_banner3 = '/assets/images/banner/YMShop-home2-topbanner6.png',
            product_bkg1 = '#00b378',
            product_bkg2 = '#e6007c',
            product_bkg3 = '#195ad7',
            img1 = '/assets/images/banner/YMShop-home2-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home2-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home2-topbanner3.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';   
            break;
        case 'it':
            slideshow1 = '/assets/images/yam1-sl2-bkg.png';
            slideshow2 = '/assets/images/yam1-sl1-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow2_caption = '/assets/images/yam1-sl1-caption_it.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption_it.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            product_link1 = '/product/tshirt',
            product_link2 = '/product/single-breasted-poplin',
            product_link3 = '/product/large-vacuum-clear',
            product_banner1 = '/assets/images/banner/YMShop-home2-topbanner4.png',
            product_banner2 = '/assets/images/banner/YMShop-home2-topbanner5.png',
            product_banner3 = '/assets/images/banner/YMShop-home2-topbanner6.png',
            product_bkg1 = '#00b378',
            product_bkg2 = '#e6007c',
            product_bkg3 = '#195ad7',
            img1 = '/assets/images/banner/YMShop-home2-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home2-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home2-topbanner3.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';        
            break;
        case 'jp':
            slideshow1 = '/assets/images/yam1-sl2-bkg.png';
            slideshow2 = '/assets/images/yam1-sl1-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow2_caption = '/assets/images/yam1-sl1-caption_jp.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption_jp.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            product_link1 = '/product/tshirt',
            product_link2 = '/product/single-breasted-poplin',
            product_link3 = '/product/large-vacuum-clear',
            product_banner1 = '/assets/images/banner/YMShop-home2-topbanner4.png',
            product_banner2 = '/assets/images/banner/YMShop-home2-topbanner5.png',
            product_banner3 = '/assets/images/banner/YMShop-home2-topbanner6.png',
            product_bkg1 = '#00b378',
            product_bkg2 = '#e6007c',
            product_bkg3 = '#195ad7',
            img1 = '/assets/images/banner/YMShop-home2-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home2-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home2-topbanner3.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';     
            break;            
    }
    return {slideshow1, slideshow2, slideshow3, slideshow4, slideshow1_caption, slideshow2_caption, slideshow3_caption, slideshow4_caption, slideshow1_link, slideshow2_link, slideshow3_link, slideshow4_link, 
        product_link1, product_link2, product_link3, product_bkg1, product_bkg2, product_bkg3, product_banner1, product_banner2, product_banner3,
        img1, img2, img3, img1_link, img2_link, img3_link}
}



export {DataIndexSlideshow}

