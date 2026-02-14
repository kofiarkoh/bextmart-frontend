import useTranslation from '../ultils/useTranslation'

function DataInfo(){    
    const { locale } = useTranslation();
    let info1_img, info1_title, info1_desc, info2_img, info2_title, info2_desc, info3_img, info3_title, info3_desc, info4_img, info4_title, info4_desc;
    switch (locale) {
        case 'en':
            info1_img = '/assets/images/yam5-info1.png';
            info1_title = 'It is a long established';
            info1_desc = 'It is a long established'; 
            info2_img = '/assets/images/yam5-info2.png';
            info2_title = 'It is a long established';
            info2_desc = 'It is a long established'; 
            info3_img = '/assets/images/yam5-info3.png';
            info3_title = 'It is a long established';
            info3_desc = 'It is a long established'; 
            info4_img = '/assets/images/yam5-info4.png';
            info4_title = 'It is a long established';
            info4_desc = 'It is a long established'; 
            break;
        case 'fr':
            info1_img = '/assets/images/yam5-info1.png';
            info1_title = 'C\'est un établi de longue date';
            info1_desc = 'C\'est un établi de longue date'; 
            info2_img = '/assets/images/yam5-info2.png';
            info2_title = 'C\'est un établi de longue date';
            info2_desc = 'C\'est un établi de longue date'; 
            info3_img = '/assets/images/yam5-info3.png';
            info3_title = 'C\'est un établi de longue date';
            info3_desc = 'C\'est un établi de longue date'; 
            info4_img = '/assets/images/yam5-info4.png';
            info4_title = 'C\'est un établi de longue date';
            info4_desc = 'C\'est un établi de longue date';  
            break;
        case 'it':
            info1_img = '/assets/images/yam5-info1.png';
            info1_title = 'È una lunga tradizione';
            info1_desc = 'È una lunga tradizione'; 
            info2_img = '/assets/images/yam5-info2.png';
            info2_title = 'È una lunga tradizione';
            info2_desc = 'È una lunga tradizione'; 
            info3_img = '/assets/images/yam5-info3.png';
            info3_title = 'È una lunga tradizione';
            info3_desc = 'È una lunga tradizione'; 
            info4_img = '/assets/images/yam5-info4.png';
            info4_title = 'È una lunga tradizione';
            info4_desc = 'È una lunga tradizione';         
            break;
        case 'jp':
            info1_img = '/assets/images/yam5-info1.png';
            info1_title = '老舗です';
            info1_desc = '老舗です'; 
            info2_img = '/assets/images/yam5-info2.png';
            info2_title = '老舗です';
            info2_desc = '老舗です'; 
            info3_img = '/assets/images/yam5-info3.png';
            info3_title = '老舗です';
            info3_desc = '老舗です'; 
            info4_img = '/assets/images/yam5-info4.png';
            info4_title = '老舗です';
            info4_desc = '老舗です';      
            break;            
    }
    return {info1_img, info1_title, info1_desc, info2_img, info2_title, info2_desc, info3_img, info3_title, info3_desc, info4_img, info4_title, info4_desc}
}

export {DataInfo}