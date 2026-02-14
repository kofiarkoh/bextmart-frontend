import useTranslation from '../ultils/useTranslation';

import TextAllCate_en from '../../public/locales/en/en_TextAllCate2.json';
import TextAllCate_fr from '../../public/locales/fr/fr_TextAllCate2.json';
import TextAllCate_it from '../../public/locales/it/it_TextAllCate2.json';
import TextAllCate_jp from '../../public/locales/jp/jp_TextAllCate2.json';
import { TextAllCateCol1_en, TextAllCateCol2_en, TextAllCateCol3_en, TextAllCateCol4_en, TextAllCateCol5_en, TextAllCateCol6_en, TextAllCateCol7_en, TextAllCateCol8_en, TextAllCateCol9_en } from "../../public/locales/en/en_TextAllCateCol";
import { TextAllCateCol1_fr, TextAllCateCol2_fr, TextAllCateCol3_fr, TextAllCateCol4_fr, TextAllCateCol5_fr, TextAllCateCol6_fr, TextAllCateCol7_fr, TextAllCateCol8_fr, TextAllCateCol9_fr } from "../../public/locales/fr/fr_TextAllCateCol";
import { TextAllCateCol1_it, TextAllCateCol2_it, TextAllCateCol3_it, TextAllCateCol4_it, TextAllCateCol5_it, TextAllCateCol6_it, TextAllCateCol7_it, TextAllCateCol8_it, TextAllCateCol9_it } from "../../public/locales/it/it_TextAllCateCol";
import { TextAllCateCol1_jp, TextAllCateCol2_jp, TextAllCateCol3_jp, TextAllCateCol4_jp, TextAllCateCol5_jp, TextAllCateCol6_jp, TextAllCateCol7_jp, TextAllCateCol8_jp, TextAllCateCol9_jp } from "../../public/locales/jp/jp_TextAllCateCol";

function AllCategiesData(){
    const { locale } = useTranslation();    
    let TextAllCate, TextAllCateCol1, TextAllCateCol2, TextAllCateCol3, TextAllCateCol4, TextAllCateCol5, TextAllCateCol6, TextAllCateCol7, TextAllCateCol8, TextAllCateCol9; 
    switch (locale) {
        case 'en':
            TextAllCate = TextAllCate_en;
            TextAllCateCol1 = TextAllCateCol1_en;
            TextAllCateCol2 = TextAllCateCol2_en;
            TextAllCateCol3 = TextAllCateCol3_en;
            TextAllCateCol4 = TextAllCateCol4_en;
            TextAllCateCol5 = TextAllCateCol5_en;
            TextAllCateCol6 = TextAllCateCol6_en;
            TextAllCateCol7 = TextAllCateCol7_en;
            TextAllCateCol8 = TextAllCateCol8_en;
            TextAllCateCol9 = TextAllCateCol9_en;
            break;
        case 'fr':
            TextAllCate = TextAllCate_fr;
            TextAllCateCol1 = TextAllCateCol1_fr;
            TextAllCateCol2 = TextAllCateCol2_fr;
            TextAllCateCol3 = TextAllCateCol3_fr;
            TextAllCateCol4 = TextAllCateCol4_fr;
            TextAllCateCol5 = TextAllCateCol5_fr;
            TextAllCateCol6 = TextAllCateCol6_fr;
            TextAllCateCol7 = TextAllCateCol7_fr;
            TextAllCateCol8 = TextAllCateCol8_fr;
            TextAllCateCol9 = TextAllCateCol9_fr;
            break;
        case 'it':
            TextAllCate = TextAllCate_it;
            TextAllCateCol1 = TextAllCateCol1_it;
            TextAllCateCol2 = TextAllCateCol2_it;
            TextAllCateCol3 = TextAllCateCol3_it;
            TextAllCateCol4 = TextAllCateCol4_it;
            TextAllCateCol5 = TextAllCateCol5_it;
            TextAllCateCol6 = TextAllCateCol6_it;
            TextAllCateCol7 = TextAllCateCol7_it;
            TextAllCateCol8 = TextAllCateCol8_it;
            TextAllCateCol9 = TextAllCateCol9_it;
            break;
        case 'jp':
            TextAllCate = TextAllCate_jp;
            TextAllCateCol1 = TextAllCateCol1_jp;
            TextAllCateCol2 = TextAllCateCol2_jp;
            TextAllCateCol3 = TextAllCateCol3_jp;
            TextAllCateCol4 = TextAllCateCol4_jp;
            TextAllCateCol5 = TextAllCateCol5_jp;
            TextAllCateCol6 = TextAllCateCol6_jp;
            TextAllCateCol7 = TextAllCateCol7_jp;
            TextAllCateCol8 = TextAllCateCol8_jp;
            TextAllCateCol9 = TextAllCateCol9_jp;
            break;
    }
    return {TextAllCate, TextAllCateCol1, TextAllCateCol2, TextAllCateCol3, TextAllCateCol4, TextAllCateCol5, TextAllCateCol6, TextAllCateCol7, TextAllCateCol8, TextAllCateCol9}
}

export {AllCategiesData};