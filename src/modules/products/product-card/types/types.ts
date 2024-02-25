export interface Product {
    id: string;
    brand: string | null;
    price: number;
    product: string;
}

export interface ProductProps {
    product:Product
}
