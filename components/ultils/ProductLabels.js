import {showDiscount, hotlabel, newlabel, featuredlabel} from './Tools';
import useTranslation from './useTranslation'

const ProductLabels = ({ product }) => {   
    const { t } = useTranslation();
    return (
        <div className="product-labels product-item__label">
            <div className="product__labels-item product__labels-sale">
                {showDiscount(product.price, product.price_compare)}%
            </div>
            {hotlabel(product.label_hot, t("hot"))}
            {newlabel(product.label_new, t("new"))}
            {featuredlabel(product.label_featured, t("featured"))}
        </div>
    )
}

export default ProductLabels;