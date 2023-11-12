import Link from "next/link";
import { Product } from "../models/product";

interface CardProps {
  product: Product;
}

export default function Card({product}: CardProps ) {
  return (
    <div className="border p-4 bg-gradient-to-r from-slate-800 to-teal-800 rounded border-none">
    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
    <p className="mb-2">
      Price: {product.price} {product.currency}
    </p>
    <p className="mb-2">Category: {product.category}</p>
    <Link href={`/product/${product.id}`}>
      <div className="bg-red-900 rounded text-white p-2 text-center cursor-pointer hover:bg-red-700 transition">
        Detailed View
      </div>
    </Link>
  </div>
  )
}