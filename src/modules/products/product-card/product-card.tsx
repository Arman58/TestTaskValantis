import {ProductProps} from "./types/types";

import "./prodcut-card.css"

const ProductCard: React.FC<ProductProps> = ({product}) => {

    return (
        <>
            <li key={product.id} className="product-card">
                <p className="product-id">ID: {product.id}</p>
                <p className="product-name">{product.product}</p>
                <p className="product-brand">Brand: {product.brand || 'N/A'}</p>
                <p className="product-price">Price: ${product.price?.toFixed(2)}</p>
            </li>
        </>
    )
}

export default ProductCard
