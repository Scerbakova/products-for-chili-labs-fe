import { Product } from '../models/product';
import getProducts from './getProducts'

export default async function getProduct(id: string) {
	const { products } = await getProducts();
	return products.find((product: Product) => product.id.toString() === id.toString());
}