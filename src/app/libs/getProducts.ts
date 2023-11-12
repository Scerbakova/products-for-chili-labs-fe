import { Product } from '../models/product';

export default async function getProducts(): Promise<{ products: Product[] }> {
  const response = await fetch('https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd');

  if (!response.ok) {
    throw new Error('No data found');
  }

  const data = await response.json();
  return { products: data.products };
}