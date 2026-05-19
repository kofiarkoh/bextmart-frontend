const CurrencyConvert = (props) => {
    const amount = parseFloat(props.amount);
    const formatted = isNaN(amount) ? '0.00' : amount.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (
        <span className="money">GHC {formatted}</span>
    )
}
export default CurrencyConvert;