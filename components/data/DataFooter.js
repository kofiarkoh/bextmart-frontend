
import useTranslation from '../ultils/useTranslation';
import { FooterLink1_en, FooterLink2_en, FooterLink3_en, FooterLink4_en, FooterLink5_en, FooterLink6_en } from "../../public/locales/en/en_TextFooter";
import { FooterLink1_fr, FooterLink2_fr, FooterLink3_fr, FooterLink4_fr, FooterLink5_fr, FooterLink6_fr } from "../../public/locales/fr/fr_TextFooter.js";
import { FooterLink1_it, FooterLink2_it, FooterLink3_it, FooterLink4_it, FooterLink5_it, FooterLink6_it } from "../../public/locales/it/it_TextFooter.js";
import { FooterLink1_jp, FooterLink2_jp, FooterLink3_jp, FooterLink4_jp, FooterLink5_jp, FooterLink6_jp } from "../../public/locales/jp/jp_TextFooter.js";

function DataFooter(){
    let FooterLink1, FooterLink2, FooterLink3, FooterLink4, FooterLink5, FooterLink6;
    const { locale } = useTranslation(); 
    switch (locale) {
        case 'en':
            FooterLink1 = FooterLink1_en;
            FooterLink2 = FooterLink2_en;
            FooterLink3 = FooterLink3_en;
            FooterLink4 = FooterLink4_en;
            FooterLink5 = FooterLink5_en;
            FooterLink6 = FooterLink6_en;
            break;
        case 'fr':
            FooterLink1 = FooterLink1_fr;
            FooterLink2 = FooterLink2_fr;
            FooterLink3 = FooterLink3_fr;
            FooterLink4 = FooterLink4_fr;
            FooterLink5 = FooterLink5_fr;
            FooterLink6 = FooterLink6_fr;
            break;
        case 'it':
            FooterLink1 = FooterLink1_it;
            FooterLink2 = FooterLink2_it;
            FooterLink3 = FooterLink3_it;
            FooterLink4 = FooterLink4_it;
            FooterLink5 = FooterLink5_it;
            FooterLink6 = FooterLink6_it;
            break;
        case 'jp':
            FooterLink1 = FooterLink1_jp;
            FooterLink2 = FooterLink2_jp;
            FooterLink3 = FooterLink3_jp;
            FooterLink4 = FooterLink4_jp;
            FooterLink5 = FooterLink5_jp;
            FooterLink6 = FooterLink6_jp;
            break;
    }
    return {FooterLink1, FooterLink2, FooterLink3, FooterLink4, FooterLink5, FooterLink6}
}

export {DataFooter};