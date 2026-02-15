import CurrencyConvert from './CurrencyConvert'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
const ASSET_BASE_URL = "http://127.0.0.1:8000/storage"// API_BASE_URL.replace(/\/api\/?$/, "")

export function buildImageUrl(path) {
    if (!path) return "/assets/images/placeholder.png"
    if (path.startsWith("http://") || path.startsWith("https://")) return path
    const normalizedBase = ASSET_BASE_URL.endsWith("/") ? ASSET_BASE_URL.slice(0, -1) : ASSET_BASE_URL
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    let url = `${normalizedBase}${normalizedPath}`;
    return url
}

export function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Product utils
export function displayRating(number) {
    return (
        <div className="product-item__rating">
            <span className="spr-badge" data-rating={number}>
                <span className="spr-starrating spr-badge-starrating">
                    <i className={`spr-icon spr-icon-star${(1 <= number) ? '' : '-empty'}`} />
                    <i className={`spr-icon spr-icon-star${(2 <= number) ? '' : '-empty'}`} />
                    <i className={`spr-icon spr-icon-star${(3 <= number) ? '' : '-empty'}`} />
                    <i className={`spr-icon spr-icon-star${(4 <= number) ? '' : '-empty'}`} />
                    <i className={`spr-icon spr-icon-star${(5 <= number) ? '' : '-empty'}`} />
                </span>
            </span>
        </div>
    )
}

export function displayPrice(price, comparePrice) {
    return (
        <div className={`price product-item__price ${(comparePrice > price) ? 'price--on-sale' : ''}`}>
            <dl>
                <div className="price__sale" styl={{display: 'block'}}>
                    <dd>
                        <span className="price-item price-item--sale">
                            <span className="money"><CurrencyConvert amount={parseInt(price)} /></span>
                        </span>
                    </dd>
                    {/* <dd className={`price__compare ${(comparePrice > price) ? 'show' : 'hidden'}`}>
                        <s className="price-item price-item--regular">
                            <span className="money"><CurrencyConvert amount={parseInt(comparePrice)} /></span>
                        </s>
                    </dd> */}
                </div>
            </dl>
        </div>
    )
}

export function displayInventoryBar(qty, max, text) {    
    return (
        <div className="product-item__inventory">
            <label htmlFor="productInventory">{qty} {text}</label>
            <progress id="productInventory" value={qty} max={max}></progress>
        </div>
    )

}

export function showDiscount(price, price_compare) {
    if (price_compare > price) {
        return Math.round((price_compare - price) * 100 / price_compare);
    }
}

export function hotlabel(active, text) {
    if (active)
        return (<div className="product__labels-item product__labels-hot">{text}</div>)
}

export function newlabel(active, text) {
    if (active)
        return (<div className="product__labels-item product__labels-new">{text}</div>)
}

export function featuredlabel(active, text) {
    if (active)
        return (<div className="product__labels-item product__labels-featured">{text}</div>)
}

export function unitvariant(option) {
    let i = true;
    // option.map((item) => {
    //     if (item.variant.length > 1) i = false;
    // })
    return i;
}

export function groupOption(option) {
    let output = '';
    option.map((item) => (
        (output === '') ? output = item.title + '-' + item.variant[0].title : output = output + '#' + item.title + '-' + item.variant[0].title
    ));
    return output;
}

export function arrayOption(option) {
    let output = [];
    option.map((item) => (
        output = [...output, { "option": item.title, "variant": item.variant[0].title }]
    ));
    return output;
}

export function arrayOption1(option1, variant1) {
    let output1 = { "option": option1, "variant": variant1 };
    return [output1]
}

export function arrayOption2(option1, variant1, option2, variant2) {
    let output1 = { "option": option1, "variant": variant1 };
    let output2 = { "option": option2, "variant": variant2 };
    return [output1, output2]
}

export function languageName(code) {
    switch (code) {
        case 'en':
            return 'English'
        case 'fr':
            return 'Français'
        case 'it':
            return 'Italiana'
        case 'jp':
            return '日本'
        default:
            return null
    }
}
