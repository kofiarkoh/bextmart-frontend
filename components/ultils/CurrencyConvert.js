import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import Axios from 'axios';
import { useAtom } from 'jotai'
import { storecurrency, storecurrencySymbol } from './Store'


const CurrencyConvert = (props) => {
    const [currency, setCurrency] = useAtom(storecurrency);
    const [currencySymbol, setCurrencySymbol] = useAtom(storecurrencySymbol);
    const [info, setInfo] = useState([]);
    const [from, setFrom] = useState("usd");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(props.amount);
    useEffect(() => {
        // Axios.get(
        //     `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        //     .then((res) => {
        //         setInfo(res.data[from]);
        //     });
    }, [from]);

    useEffect(() => {
        setOptions(Object.keys(info));
        setOutput((props.amount * info[currency]).toFixed(2));
    }, [info, output, currency, props.amount]);

    return (
        <span className={`money from-usd-${props.amount} to-${currency}`}>
            <CurrencyFormat value={output} thousandSeparator={true} prefix={currencySymbol} displayType={'text'} />
            <span className='currency-name'>{currency}</span>
        </span>
    )
}
export default CurrencyConvert;