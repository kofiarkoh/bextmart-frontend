import { atom, useAtom } from 'jotai'
import { useEffect } from 'react';
import useTranslation from './useTranslation'

const wishlistCount = atom(0);
const compareCount = atom(0);
const cartCount = atom(0);
const cartTotal = atom(0);
const cartData = atom([]);
const userLoggedData = atom({});
const language = atom(null);
const storecurrency = atom("usd");
const storecurrencySymbol = atom("$");

const Store = () => {
    // init Wishlist count
    const [wlCount, setwlCount] = useAtom(wishlistCount);
    useEffect(() => {
        let data = localStorage.getItem('yam-wishlist');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setwlCount(data.length);
        }
    }, [wlCount, setwlCount]);

    // init Compare count
    const [cmCount, setcmCount] = useAtom(compareCount);
    useEffect(() => {
        let data = localStorage.getItem('yam-compare');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setcmCount(data.length);
        }
    }, [cmCount, setcmCount]);

    // init Cart element
    const [scCount, setscCount] = useAtom(cartCount);
    const [scTotal, setscTotal] = useAtom(cartTotal);
    const [scData, setscData] = useAtom(cartData);
    useEffect(() => {
        let data = localStorage.getItem('yam-shoppingcart');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);
            setscCount(data.length);
            let totaladded = 0;
            data.map(a => totaladded = totaladded + a.total);
            setscTotal(totaladded);
            setscData(data);
        }

    }, []);
    useEffect(() => {
    }, [scCount, scTotal, scData, setscCount, setscTotal, setscData]);

    //init user
    const [userlogged, setuserlogged] = useAtom(userLoggedData);
    useEffect(() => {
        let data = localStorage.getItem('yam-user');
        if (data !== null && data !== '[]' && data !== '[null]') {
            data = JSON.parse(data);            
            setuserlogged(data);
        }

    }, []);
    useEffect(() => {
    }, [userlogged, setuserlogged]);

    // language
    const { locale } = useTranslation();
    const [islanguage, setislanguage] = useAtom(language);
    useEffect(() => {
        setislanguage(locale);
    }, [islanguage, locale, setislanguage]);
    // useEffect(() => {
    // }, [islanguage]);
}

export { wishlistCount, compareCount, cartCount, cartTotal, cartData, userLoggedData, language, storecurrency, storecurrencySymbol }
export default Store;