import useTranslation from '../ultils/useTranslation'

function DataIndexSlideshow(){    
    const { locale } = useTranslation();
    let slideshow1, slideshow2, slideshow3, slideshow4, slideshow1_caption, slideshow2_caption, slideshow3_caption, slideshow4_caption, 
    slideshow1_link, slideshow2_link, slideshow3_link, slideshow4_link;
    switch (locale) {
        case 'en':
            slideshow1 = '/assets/images/yam5-sl1-bkg.png';
            slideshow2 = '/assets/images/yam5-sl2-bkg.png';
            slideshow3 = '/assets/images/yam5-sl3-bkg.png';
            slideshow1_caption = '/assets/images/yam5-sl1-caption.png';
            slideshow2_caption = '/assets/images/yam5-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam5-sl3-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees';  
            break;
        case 'fr':
            slideshow1 = '/assets/images/yam5-sl1-bkg.png';
            slideshow2 = '/assets/images/yam5-sl2-bkg.png';
            slideshow3 = '/assets/images/yam5-sl3-bkg.png';
            slideshow1_caption = '/assets/images/yam5-sl1-caption.png';
            slideshow2_caption = '/assets/images/yam5-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam5-sl3-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees';    
            break;
        case 'it':
            slideshow1 = '/assets/images/yam5-sl1-bkg.png';
            slideshow2 = '/assets/images/yam5-sl2-bkg.png';
            slideshow3 = '/assets/images/yam5-sl3-bkg.png';
            slideshow1_caption = '/assets/images/yam5-sl1-caption.png';
            slideshow2_caption = '/assets/images/yam5-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam5-sl3-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees';      
            break;
        case 'jp':
            slideshow1 = '/assets/images/yam5-sl1-bkg.png';
            slideshow2 = '/assets/images/yam5-sl2-bkg.png';
            slideshow3 = '/assets/images/yam5-sl3-bkg.png';
            slideshow1_caption = '/assets/images/yam5-sl1-caption.png';
            slideshow2_caption = '/assets/images/yam5-sl2-caption.png';
            slideshow3_caption = '/assets/images/yam5-sl3-caption.png';
            slideshow1_link = '/collection/women-fashion';            
            slideshow2_link = '/collection/men-fashion';            
            slideshow3_link = '/collection/kids-fashion';            
            slideshow4_link = '/collection/tops-tees';   
            break;            
    }
    return {slideshow1, slideshow2, slideshow3, slideshow4, slideshow1_caption, slideshow2_caption, slideshow3_caption, slideshow4_caption, slideshow1_link, slideshow2_link, slideshow3_link, slideshow4_link        }
}



export {DataIndexSlideshow}

