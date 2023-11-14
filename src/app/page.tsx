'use client';
import { useEffect, useState } from 'react';
import { Product } from './models/product';
import getProducts from './libs/getProducts';
import { navigateToPreviousPage } from './libs/navigateToPreviousPage';
import { navigateToNextPage } from './libs/navigateToNextPage';
import InputSearch from './components/inputSearch';
import Pagination from './components/pagination';
import ProductCard from './components/productCard';
import Spinner from './components/spinner';

const productsAmountOnPage = 10;

export default function Home() {
    const [initialProducts, setInitialProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [startFromProduct, setStartFromProduct] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filteredProducts = initialProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProducts(filteredProducts);
        }, 1500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, initialProducts]);

    const fetchProducts = async () => {
        const { products } = await getProducts();
        setInitialProducts(products);
        setProducts(products);
        setLoading(false);
    };

    const productsLength = products?.length;

    const onPreviousClick = () => {
        navigateToPreviousPage(
            startFromProduct,
            productsAmountOnPage,
            setStartFromProduct
        );
    };

    const onNextClick = () => {
        navigateToNextPage(
            startFromProduct,
            productsAmountOnPage,
            productsLength,
            setStartFromProduct
        );
    };

    const previousButtonDisabled = startFromProduct === 0;
    const nextButtonDisabled =
        startFromProduct === productsLength - productsAmountOnPage;

    return (
        <div className="container mx-auto p-4">
            {loading && (
                <div className="h-screen flex justify-center items-center">
                    <Spinner />
                </div>
            )}
            <h1 className="text-4xl font-semibold text-center my-8">
                Products
            </h1>
            <InputSearch
                handleSearchChange={(e) => {
                    setSearchTerm(e.target.value.trim());
                }}
            />
            {!productsLength && !loading && (
                <div className="text-center text-xl">😒 No products found</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {products
                    ?.slice(
                        startFromProduct,
                        startFromProduct + productsAmountOnPage
                    )
                    .map((product: Product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
            </div>
            {productsLength > productsAmountOnPage && (
                <Pagination
                    onPreviousClick={onPreviousClick}
                    previousButtonDisabled={previousButtonDisabled}
                    onNextClick={onNextClick}
                    nextButtonDisabled={nextButtonDisabled}
                />
            )}
        </div>
    );
}
