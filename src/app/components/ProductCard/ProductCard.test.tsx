import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const testProduct = {
    id: 1,
    name: 'Test Product',
    price: 20,
    currency: 'USD',
    category: 'Test Category',
    description: 'Test Description',
};

describe('ProductCard component', () => {
    it('renders product details correctly', () => {
        render(<ProductCard product={testProduct} />);
        const productName = screen.getByText(testProduct.name);
        const price = screen.getByText(
            new RegExp(`${testProduct.price} ${testProduct.currency}`)
        );
        const category = screen.getByText(`Category: ${testProduct.category}`);

        expect(productName).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(category).toBeInTheDocument();
    });
    it('renders a link to the product page', () => {
        render(<ProductCard product={testProduct} />);
        const link = screen.getByRole('link', { name: 'Detailed View' });

        expect(link).toHaveAttribute('href', `/product/${testProduct.id}`);
    });
});
