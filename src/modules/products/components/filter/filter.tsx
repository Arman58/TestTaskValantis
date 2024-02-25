import React, {useState} from 'react';
import './filter.css';
import {FilterProps, FilterValues} from "./types/types";


const Filter: React.FC<FilterProps> = ({onFilterApply}) => {
    const [filter, setFilter] = useState<FilterValues>({
        price: undefined,
        brand: "",
        product: "",
    });
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceValue = parseFloat(event.target.value);
        setFilter((prevFilter) => ({...prevFilter, price: isNaN(priceValue) ? undefined : priceValue}));
    };

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prevFilter) => ({...prevFilter, brand: event.target.value}));
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prevFilter) => ({...prevFilter, product: event.target.value}));
    };

    const handleApplyFilter = () => {
        onFilterApply(filter);
    };

    return (
        <div className="filter-container">
            <label>
                Price:
                <input type="number" value={filter.price} onChange={handlePriceChange}/>
            </label>
            <label>
                Brand:
                <input type="text" value={filter.brand} onChange={handleBrandChange}/>
            </label>
            <label>
                Name:
                <input type="text" value={filter.product} onChange={handleNameChange}/>
            </label>
            <button onClick={handleApplyFilter}>Apply Filter</button>
        </div>
    );
};

export default Filter;
