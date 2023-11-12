'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "./models/product";
import getProducts from "./libs/getProducts";
import Link from "next/link";
import { debounce } from "./libs/debounce";
import { navigateToPreviousPage } from "./libs/navigateToPreviousPage";
import { navigateToNextPage } from "./libs/navigateToNextPage";
import Search from "./components/search";
import Pagination from "./components/pagination";

const productsAmountOnPage = 10;

export default function Home() {
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [startFromProduct, setStartFromProduct] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { products } = await getProducts();
    setInitialProducts(products);
    setProducts(products);
  };

  const productsLength = products.length;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTouched(true);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (inputTouched) {
    const search = debounce(() => {
      if (searchTerm.trim() === "") {
        setProducts(initialProducts);
      } else {
        const filteredProducts = initialProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setStartFromProduct(0);
        setProducts(filteredProducts);
        console.log(products)
      }
    }, 1500);

      search();
    }
  }, [searchTerm, initialProducts, inputTouched]);

  const onPreviousClick = () => {
    navigateToPreviousPage(startFromProduct, productsAmountOnPage, setStartFromProduct);
  };

  const onNextClick = () => {
    navigateToNextPage(startFromProduct, productsAmountOnPage, productsLength, setStartFromProduct);
  };

  const previousButtonDisabled = startFromProduct === 0;
  const nextButtonDisabled = startFromProduct === productsLength - productsAmountOnPage;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center my-8">Products</h1>

      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(startFromProduct, startFromProduct + productsAmountOnPage).map((product: Product) => (
          <div className="border p-4" key={product.id}>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="mb-2">Price: {product.price} {product.currency}</p>
            <p className="mb-2">Category: {product.category}</p>
            <Link href={`/product/${product.id}`}>
              <div className="bg-lime-900 text-white p-2 text-center cursor-pointer">Detailed View</div>
            </Link>
          </div>
        ))}
      </div>
      {(productsLength > productsAmountOnPage) &&
        <Pagination
          onPreviousClick={onPreviousClick}
          previousButtonDisabled={previousButtonDisabled}
          onNextClick={onNextClick}
          nextButtonDisabled={nextButtonDisabled}
        />
      }
    </div>
  );
}