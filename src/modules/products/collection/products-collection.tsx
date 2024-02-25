import React, {useEffect, useState} from "react";
import axios from "axios";
import md5 from "md5";
import {Product} from "../product-card/types/types";
import Filter from "../components/filter/filter";
import ProductCard from "../product-card/product-card";
import Pagination from "../components/pagination/pagination";
import Loader from "../components/loader/loader";
import {FilterValues} from "../components/filter/types/types";

const API_URL = 'https://api.valantis.store:41000/';
const PASSWORD = 'Valantis';

const ProductsCollection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const [loading, setLoading] = useState(false);
    const [filteredIds, setFilteredIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const authString = `${PASSWORD}_${timestamp}`;
    const authHeader = md5(authString);

    useEffect(() => {
        const fetchFilteredIds = async () => {
            try {
                setLoading(true);

                const idsResponse = await axios.post(
                    API_URL,
                    {
                        action: 'get_ids',
                    },
                    {
                        headers: {
                            'X-Auth': authHeader,
                        },
                    }
                );
                const uniqueIds = Array.from(new Set(idsResponse.data.result)) as string[];

                setFilteredIds(uniqueIds);
                setTotalPages(Math.ceil(idsResponse.data.result.length / 50)); // Calculate total pages
            } catch (error: any) {
                console.error('Error:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredIds();
    }, [authHeader]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const startIdx = (currentPage - 1) * 50;
                const endIdx = startIdx + 50;
                const idsToFetch = filteredIds.slice(startIdx, endIdx);

                const productsResponse = await axios.post(
                    API_URL,
                    {
                        action: 'get_items',
                        params: {
                            ids: idsToFetch,
                            limit: 50,
                            offset: 0,
                        },
                    },
                    {
                        headers: {
                            'X-Auth': authHeader,
                        },
                    }
                );
                const uniqueProducts = Array.from(
                    new Map(productsResponse.data.result.map((product: Product) => [product.id, product]))
                ).map(([, product]) => product) as Product[];

                setProducts(uniqueProducts);
            } catch (error: any) {
                console.error('Error fetching products:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (filteredIds.length > 0) {
            fetchData();
        }
    }, [currentPage, filteredIds, authHeader]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleFilterApply = async (filter: FilterValues) => {
        try {
            setLoading(true);

            const filteredIdsResponse = await axios.post(
                API_URL,
                {
                    action: 'filter',
                    params: filter,
                },
                {
                    headers: {
                        'X-Auth': authHeader,
                    },
                }
            );

            setFilteredIds(filteredIdsResponse.data.result);
            setTotalPages(Math.ceil(filteredIdsResponse.data.result.length / 50));
            setCurrentPage(1);
        } catch (error: any) {
            console.error('Error filtering data:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {loading && <Loader/>}
            <Filter onFilterApply={handleFilterApply}/>
            {!loading && (
                products.length > 1 ? <ul>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </ul> : <div>0 items</div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    );
};

export default ProductsCollection;
