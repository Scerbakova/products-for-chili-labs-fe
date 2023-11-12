import getProduct from "@/app/libs/getProduct";
import { Product } from "@/app/models/product";

export default async function Product({ params: { id }}: { params: { id: string }}) {
  const product: Product | undefined = await getProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

	return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-2 my-8 text-lime-600">
      <h1 className="text-3xl font-semibold text-center mb-4">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold">Category: {product.category}</p>
          <p className="text-lg font-semibold">Price: {product.price} {product.currency}</p>
          <hr className="my-4" />
          <p className="text-zinc-400">{product.description}</p>
        </div>
      </div>
    </div>
  );
}