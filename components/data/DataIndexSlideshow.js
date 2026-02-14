import useTranslation from '../ultils/useTranslation'

function DataIndexSlideshow(){    
    const { locale } = useTranslation();
    let slideshow1, slideshow2, slideshow3, slideshow4, 
    slideshow1_caption, slideshow2_caption, slideshow3_caption, slideshow4_caption, 
    slideshow1_link, slideshow2_link, slideshow3_link, slideshow4_link,
    img1, img2, img3, img4, img5, img6,
    img1_link, img2_link, img3_link, img4_link, img5_link, img6_link;
    switch (locale) {
        case 'en':
            slideshow1 = '/assets/images/yam1-sl1-bkg.png';
            slideshow2 = '/assets/images/yam1-sl2-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl1-caption.png';
            slideshow2_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            img1 = '/assets/images/banner/YMShop-home1-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home1-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home1-topbanner3.png';
            img4 = '/assets/images/banner/YMShop-home1-topbanner4.png';
            img5 = '/assets/images/banner/YMShop-home1-topbanner5.png';
            img6 = '/assets/images/banner/YMShop-home1-topbanner6.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';            
            img4_link = '/collection/tops-tees';            
            img5_link = '/collection/dresses';            
            img6_link = '/collection/clothing-sets';
            break;
        case 'fr':
            slideshow1 = '/assets/images/yam1-sl1-bkg.png';
            slideshow2 = '/assets/images/yam1-sl2-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl1-caption_fr.png';
            slideshow2_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption._fr.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            img1 = '/assets/images/banner/YMShop-home1-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home1-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home1-topbanner3.png';
            img4 = '/assets/images/banner/YMShop-home1-topbanner4.png';
            img5 = '/assets/images/banner/YMShop-home1-topbanner5.png';
            img6 = '/assets/images/banner/YMShop-home1-topbanner6.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';            
            img4_link = '/collection/tops-tees';            
            img5_link = '/collection/dresses';            
            img6_link = '/collection/clothing-sets'; 
            break;
        case 'it':
            slideshow1 = '/assets/images/yam1-sl1-bkg.png';
            slideshow2 = '/assets/images/yam1-sl2-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl1-caption_it.png';
            slideshow2_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption_it.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            img1 = '/assets/images/banner/YMShop-home1-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home1-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home1-topbanner3.png';
            img4 = '/assets/images/banner/YMShop-home1-topbanner4.png';
            img5 = '/assets/images/banner/YMShop-home1-topbanner5.png';
            img6 = '/assets/images/banner/YMShop-home1-topbanner6.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';            
            img4_link = '/collection/tops-tees';            
            img5_link = '/collection/dresses';            
            img6_link = '/collection/clothing-sets'; 
            break;
        case 'jp':
            slideshow1 = '/assets/images/yam1-sl1-bkg.png';
            slideshow2 = '/assets/images/yam1-sl2-bkg.png';
            slideshow3 = '/assets/images/yam1-sl3-bkg.png';
            slideshow4 = '/assets/images/yam1-sl4-bkg.png';
            slideshow1_caption = '/assets/images/yam1-sl1-caption_jp.png';
            slideshow2_caption = '/assets/images/yam1-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam1-sl3-caption_jp.png';
            slideshow4_caption = '/assets/images/yam1-sl4-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees'; 
            img1 = '/assets/images/banner/YMShop-home1-topbanner1.png';
            img2 = '/assets/images/banner/YMShop-home1-topbanner2.png';
            img3 = '/assets/images/banner/YMShop-home1-topbanner3.png';
            img4 = '/assets/images/banner/YMShop-home1-topbanner4.png';
            img5 = '/assets/images/banner/YMShop-home1-topbanner5.png';
            img6 = '/assets/images/banner/YMShop-home1-topbanner6.png';
            img1_link = '/collection/women-fashion';            
            img2_link = '/collection/men-fashion';            
            img3_link = '/collection/kids-fashion';            
            img4_link = '/collection/tops-tees';            
            img5_link = '/collection/dresses';            
            img6_link = '/collection/clothing-sets';
            break;            
    }
    return {slideshow1, slideshow2, slideshow3, slideshow4, slideshow1_caption, slideshow2_caption, slideshow3_caption, slideshow4_caption, slideshow1_link, slideshow2_link, slideshow3_link, slideshow4_link, img1, img2, img3, img4, img5, img6, img1_link, img2_link, img3_link, img4_link, img5_link, img6_link}
}

export {DataIndexSlideshow}