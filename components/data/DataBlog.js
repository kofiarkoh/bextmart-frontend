import useTranslation from '../ultils/useTranslation';
import { Blog_en } from "../../public/locales/en/en_Blog";
import { Blog_fr } from "../../public/locales/fr/fr_Blog";
import { Blog_it } from "../../public/locales/it/it_Blog";
import { Blog_jp } from "../../public/locales/jp/jp_Blog";

function BlogsData(){
    const { locale } = useTranslation();  
    let { BlogData, PostsData, RelatedPosts } = [];
    switch (locale) {
        case 'en':
            BlogData = Blog_en;
            PostsData = Blog_en.blog_list;
            RelatedPosts = Blog_en.blog_list.slice(1, 6);
            break;
        case 'fr':
            BlogData = Blog_fr;
            PostsData = Blog_fr.blog_list;
            RelatedPosts = Blog_fr.blog_list.slice(1, 6);
            break;
        case 'it':
            BlogData = Blog_it;
            PostsData = Blog_it.blog_list;
            RelatedPosts = Blog_it.blog_list.slice(1, 6);
            break;
        case 'jp':
            BlogData = Blog_jp;
            PostsData = Blog_jp.blog_list;
            RelatedPosts = Blog_jp.blog_list.slice(1, 6);
            break;
    }
    return { BlogData, PostsData, RelatedPosts }
}

export {BlogsData};