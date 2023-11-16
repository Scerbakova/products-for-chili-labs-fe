import { singleProductMock } from '@/app/__mocks__/productMocks';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Product from './page';

jest.mock('@/app/libs/getProduct', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Product Component', () => {
    it('renders product details when product is found', async () => {
        const getProductMock = require('@/app/libs/getProduct').default;
        getProductMock.mockResolvedValue(singleProductMock);
        const params = { id: '1' };
        render(<Product params={params} />);

        await waitFor(() => {
            const foundProduct = screen.getByText('Test Product');
            expect(foundProduct).toBeInTheDocument();

            const category = screen.getByText('Category: Test Category');
            expect(category).toBeInTheDocument();

            const price = screen.getByText('Price: 50 USD');
            expect(price).toBeInTheDocument();

            const description = screen.getByText('This is a test product');
            expect(description).toBeInTheDocument();
        });
    });

    it('displays "Product not found" when product is not found', async () => {
        const getProductMock = require('@/app/libs/getProduct').default;
        getProductMock.mockResolvedValue(undefined);
        const params = { id: '1' };
        render(<Product params={params} />);

        await waitFor(() => {
            try {
                const productNotFound = screen.getByText('Product not found');
                expect(productNotFound).toBeInTheDocument();
            } catch (error) {
                fail('Product not found message not displayed');
            }
        });
    });

    it('displays loading spinner initially and hides after product is loaded', async () => {
        const getProductMock = require('@/app/libs/getProduct').default;
        getProductMock.mockResolvedValue(singleProductMock);
        const params = { id: '1' };
        render(<Product params={params} />);

        const loadingSpinner = screen.getByTestId('spinner');
        expect(loadingSpinner).toBeInTheDocument();

        await screen.findByText(singleProductMock.name);
        const productElement = screen.getByText(singleProductMock.name);
        expect(productElement).toBeInTheDocument();
        expect(loadingSpinner).not.toBeInTheDocument();
    });
});
