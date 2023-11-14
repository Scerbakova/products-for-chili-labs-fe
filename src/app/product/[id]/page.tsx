'use client';
import getProduct from '@/app/libs/getProduct';
import { Product } from '@/app/models/product';
import { useEffect, useState } from 'react';

const Product = ({ params }: { params: { id: string } }) => {
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const product: Product | undefined = await getProduct(params.id);
            setProduct(product);
        };

        fetchData();
    }, [params.id]);

    if (!product) {
        return <div>Product not found</div>;
    }

    const categoryAndPriceClass = 'text-lg font-semibold';

    return (
        <div className="w-full h-screen p-8 text-teal-600 bg-gradient-to-r from-slate-800 to-slate-700 rounded">
            <h1 className="text-3xl font-semibold text-center mb-4">
                {product.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className={categoryAndPriceClass}>
                        Category: {product.category}
                    </p>
                    <p className={categoryAndPriceClass}>
                        Price: {product.price} {product.currency}
                    </p>
                    <hr className="my-4" />
                    <p className="text-zinc-400">{product.description}</p>
                </div>
            </div>
        </div>
    );
};
export default Product;
