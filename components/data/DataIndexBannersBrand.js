import useTranslation from '../ultils/useTranslation'
import { BannersBrand1Data_en, BannersBrand2Data_en, BannersBrand3Data_en, BannersBrand4Data_en, BannersBrand5Data_en, BannersBrand6Data_en } from "../../public/locales/en/en_BannersBrand.js";
import { BannersBrand1Data_fr, BannersBrand2Data_fr, BannersBrand3Data_fr, BannersBrand4Data_fr, BannersBrand5Data_fr, BannersBrand6Data_fr } from "../../public/locales/fr/fr_BannersBrand.js";
import { BannersBrand1Data_it, BannersBrand2Data_it, BannersBrand3Data_it, BannersBrand4Data_it, BannersBrand5Data_it, BannersBrand6Data_it } from "../../public/locales/it/it_BannersBrand.js";
import { BannersBrand1Data_jp, BannersBrand2Data_jp, BannersBrand3Data_jp, BannersBrand4Data_jp, BannersBrand5Data_jp, BannersBrand6Data_jp } from "../../public/locales/jp/jp_BannersBrand.js";

function DataIndexBannersBrand(){    
    const { locale } = useTranslation();
    let {data1, data2, data3, data4, data5, data6} = {};
    switch (locale) {
        case 'en':
            data1 = BannersBrand1Data_en;
            data2 = BannersBrand2Data_en;
            data3 = BannersBrand3Data_en;
            data4 = BannersBrand4Data_en;
            data5 = BannersBrand5Data_en;
            data6 = BannersBrand6Data_en;
            break;
        case 'fr':
            data1 = BannersBrand1Data_fr;
            data2 = BannersBrand2Data_fr;
            data3 = BannersBrand3Data_fr;
            data4 = BannersBrand4Data_fr;
            data5 = BannersBrand5Data_fr;
            data6 = BannersBrand6Data_fr;
            break;
        case 'it':
            data1 = BannersBrand1Data_it;
            data2 = BannersBrand2Data_it;
            data3 = BannersBrand3Data_it;
            data4 = BannersBrand4Data_it;
            data5 = BannersBrand5Data_it;
            data6 = BannersBrand6Data_it;
            break;
        case 'jp':
            data1 = BannersBrand1Data_jp;
            data2 = BannersBrand2Data_jp;
            data3 = BannersBrand3Data_jp;
            data4 = BannersBrand4Data_jp;
            data5 = BannersBrand5Data_jp;
            data6 = BannersBrand6Data_jp;
            break;            
    }
    return {data1, data2, data3, data4, data5, data6}
}

export {DataIndexBannersBrand}