
export interface FilterValues {
    price?: number;
    brand?: string;
    product?: string;
}

 export interface FilterProps {
    onFilterApply: (filter: FilterValues) => void;
}
