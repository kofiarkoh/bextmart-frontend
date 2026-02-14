import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import Axios from 'axios';
import { useAtom } from 'jotai'
import { storecurrency, storecurrencySymbol } from './Store'


const CurrencyConvert = (props) => {
   
    return (
        <span className={`money`}>
            {/* <CurrencyFormat value={props.amount} thousandSeparator={true} prefix={"GHC"} displayType={'text'} /> */}
            <span className='currency-name'>GHC</span>
            <span className=''>{props.amount}</span>
        </span>
    )
}
export default CurrencyConvert;