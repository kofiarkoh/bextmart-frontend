const CurrencyConvert = ({ amount, className, style }) => {
    const parsed = parseFloat(amount);
    const formatted = isNaN(parsed) ? '0.00' : parsed.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (
        <span className={`money${className ? ` ${className}` : ''}`} style={style}>GHC {formatted}</span>
    )
}
export default CurrencyConvert;