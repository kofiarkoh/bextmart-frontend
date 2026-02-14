import useTranslation from '../ultils/useTranslation';

// All Categories import
import TextAllCate_en from '../../public/locales/en/en_TextAllCate.json';
import TextAllCate_fr from '../../public/locales/fr/fr_TextAllCate.json';
import TextAllCate_it from '../../public/locales/it/it_TextAllCate.json';
import TextAllCate_jp from '../../public/locales/jp/jp_TextAllCate.json';
import { TextAllCateCol1_en, TextAllCateCol2_en, TextAllCateCol3_en, TextAllCateCol4_en, TextAllCateCol5_en, TextAllCateCol6_en, TextAllCateCol7_en, TextAllCateCol8_en, TextAllCateCol9_en } from "../../public/locales/en/en_TextAllCateCol";
import { TextAllCateCol1_fr, TextAllCateCol2_fr, TextAllCateCol3_fr, TextAllCateCol4_fr, TextAllCateCol5_fr, TextAllCateCol6_fr, TextAllCateCol7_fr, TextAllCateCol8_fr, TextAllCateCol9_fr } from "../../public/locales/fr/fr_TextAllCateCol";
import { TextAllCateCol1_it, TextAllCateCol2_it, TextAllCateCol3_it, TextAllCateCol4_it, TextAllCateCol5_it, TextAllCateCol6_it, TextAllCateCol7_it, TextAllCateCol8_it, TextAllCateCol9_it } from "../../public/locales/it/it_TextAllCateCol";
import { TextAllCateCol1_jp, TextAllCateCol2_jp, TextAllCateCol3_jp, TextAllCateCol4_jp, TextAllCateCol5_jp, TextAllCateCol6_jp, TextAllCateCol7_jp, TextAllCateCol8_jp, TextAllCateCol9_jp } from "../../public/locales/jp/jp_TextAllCateCol";

// Horizontal Menu import
import TextMenu_en from '../../public/locales/en/en_TextMenu.json';
import TextMenu_jp from '../../public/locales/jp/jp_TextMenu.json';
import TextMenu_fr from '../../public/locales/fr/fr_TextMenu.json';
import TextMenu_it from '../../public/locales/it/it_TextMenu.json';
import { TextMenuCol1_en, TextMenuCol2_en, TextMenuCol3_en, TextMenuCol4_en, TextMenuCol5_en } from "../../public/locales/en/en_TextMenuCol";
import { TextMenuCol1_jp, TextMenuCol2_jp, TextMenuCol3_jp, TextMenuCol4_jp, TextMenuCol5_jp } from "../../public/locales/jp/jp_TextMenuCol";
import { TextMenuCol1_fr, TextMenuCol2_fr, TextMenuCol3_fr, TextMenuCol4_fr, TextMenuCol5_fr } from "../../public/locales/fr/fr_TextMenuCol";
import { TextMenuCol1_it, TextMenuCol2_it, TextMenuCol3_it, TextMenuCol4_it, TextMenuCol5_it } from "../../public/locales/it/it_TextMenuCol";
import { Blog_en } from "../../public/locales/en/en_Blog";
import { Blog_jp } from "../../public/locales/jp/jp_Blog";
import { Blog_fr } from "../../public/locales/fr/fr_Blog";
import { Blog_it } from "../../public/locales/it/it_Blog";
import Product_en from "../../public/locales/en/en_Product.json";
import Product_jp from "../../public/locales/jp/jp_Product.json";
import Product_fr from "../../public/locales/fr/fr_Product.json";
import Product_it from "../../public/locales/it/it_Product.json";
import MenuBanner_en from '../../public/assets/images/MenuBanner.png'
import MenuBanner_jp from '../../public/assets/images/MenuBanner_jp.png'
import MenuBanner_fr from '../../public/assets/images/MenuBanner_fr.png'
import MenuBanner_it from '../../public/assets/images/MenuBanner_it.png'

function HorizontalData(){
    const { locale } = useTranslation();  
    let TextMenu, TextMenuCol1, TextMenuCol2, TextMenuCol3, TextMenuCol4, TextMenuCol5, Blogdata, Productdata, MenuBanner;
    switch (locale) {
        case 'en':
            TextMenu = TextMenu_en;
            TextMenuCol1 = TextMenuCol1_en;
            TextMenuCol2 = TextMenuCol2_en;
            TextMenuCol3 = TextMenuCol3_en;
            TextMenuCol4 = TextMenuCol4_en;
            TextMenuCol5 = TextMenuCol5_en;
            Productdata = Product_en.slice(0, 1);
            MenuBanner = MenuBanner_en;
            Blogdata = Blog_en.blog_list.slice(0, 2);
            break;
        case 'fr':
            TextMenu = TextMenu_fr;
            TextMenuCol1 = TextMenuCol1_fr;
            TextMenuCol2 = TextMenuCol2_fr;
            TextMenuCol3 = TextMenuCol3_fr;
            TextMenuCol4 = TextMenuCol4_fr;
            TextMenuCol5 = TextMenuCol5_fr;
            Productdata = Product_fr.slice(0, 1);
            MenuBanner = MenuBanner_fr;
            Blogdata = Blog_fr.blog_list.slice(0, 2);
            break;
        case 'it':
            TextMenu = TextMenu_it;
            TextMenuCol1 = TextMenuCol1_it;
            TextMenuCol2 = TextMenuCol2_it;
            TextMenuCol3 = TextMenuCol3_it;
            TextMenuCol4 = TextMenuCol4_it;
            TextMenuCol5 = TextMenuCol5_it;
            Productdata = Product_it.slice(0, 1);
            MenuBanner = MenuBanner_it;
            Blogdata = Blog_it.blog_list.slice(0, 2);
            break;
        case 'jp':
            TextMenu = TextMenu_jp;
            TextMenuCol1 = TextMenuCol1_jp;
            TextMenuCol2 = TextMenuCol2_jp;
            TextMenuCol3 = TextMenuCol3_jp;
            TextMenuCol4 = TextMenuCol4_jp;
            TextMenuCol5 = TextMenuCol5_jp;
            Productdata = Product_jp.slice(0, 1);
            MenuBanner = MenuBanner_jp;
            Blogdata = Blog_jp.blog_list.slice(0, 2);
            break;
    }
    return {TextMenu, TextMenuCol1, TextMenuCol2, TextMenuCol3, TextMenuCol4, TextMenuCol5, Blogdata, Productdata, MenuBanner}
}

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

export {AllCategiesData, HorizontalData};