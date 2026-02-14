import useTranslation from '../ultils/useTranslation'

function DataIndexCategories(){    
    const { locale } = useTranslation();
    let cate1_link, cate2_link, cate3_link, cate4_link, cate5_link, cate6_link, cate7_link, cate8_link, cate9_link, cate10_link, cate11_link;
    switch (locale) {
        case 'en':
            cate1_link = '/collection/women-fashion';            
            cate2_link = '/collection/men-fashion';            
            cate3_link = '/collection/kids-fashion';            
            cate4_link = '/collection/tops-tees';            
            cate5_link = '/collection/dresses';            
            cate6_link = '/collection/clothing-sets';            
            cate7_link = '/collections';            
            cate8_link = '/collection/kids-fashion';
            cate9_link = '/collection/dresses';            
            cate10_link = '/collection/clothing-sets';            
            cate11_link = '/collections';            
            break;
        case 'fr':
            cate1_link = '/collection/women-fashion';            
            cate2_link = '/collection/men-fashion';            
            cate3_link = '/collection/kids-fashion';            
            cate4_link = '/collection/tops-tees';            
            cate5_link = '/collection/dresses';            
            cate6_link = '/collection/clothing-sets';            
            cate7_link = '/collections';            
            cate8_link = '/collection/kids-fashion';
            cate9_link = '/collection/dresses';            
            cate10_link = '/collection/clothing-sets';            
            cate11_link = '/collections';            
            break;
        case 'it':
            cate1_link = '/collection/women-fashion';            
            cate2_link = '/collection/men-fashion';            
            cate3_link = '/collection/kids-fashion';            
            cate4_link = '/collection/tops-tees';            
            cate5_link = '/collection/dresses';            
            cate6_link = '/collection/clothing-sets';            
            cate7_link = '/collections';            
            cate8_link = '/collection/kids-fashion';
            cate9_link = '/collection/dresses';            
            cate10_link = '/collection/clothing-sets';            
            cate11_link = '/collections';            
            break;
        case 'jp':
            cate1_link = '/collection/women-fashion';            
            cate2_link = '/collection/men-fashion';            
            cate3_link = '/collection/kids-fashion';            
            cate4_link = '/collection/tops-tees';            
            cate5_link = '/collection/dresses';            
            cate6_link = '/collection/clothing-sets';            
            cate7_link = '/collections';            
            cate8_link = '/collection/kids-fashion';
            cate9_link = '/collection/dresses';            
            cate10_link = '/collection/clothing-sets';            
            cate11_link = '/collections';            
            break;            
    }
    return {cate1_link, cate2_link, cate3_link, cate4_link, cate5_link, cate6_link, cate7_link, cate8_link, cate9_link, cate10_link, cate11_link}
}

export {DataIndexCategories}