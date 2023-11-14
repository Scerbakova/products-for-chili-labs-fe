import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { longProductArray, shortProductArray } from './__mocks__/productMocks';
import Home from './page';

jest.mock('@/app/libs/getProducts', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const user = userEvent.setup();

describe('Home Component', () => {
    it('renders loading state and fetches initial products', async () => {
        const getProductsMock = require('@/app/libs/getProducts').default;
        getProductsMock.mockResolvedValue({ products: shortProductArray });

        render(<Home />);

        const loadingSpinner = screen.getByTestId('spinner');
        expect(loadingSpinner).toBeInTheDocument();

        await screen.findByText('Products');

        shortProductArray.forEach((product) => {
            const productElement = screen.getByText(product.name);
            expect(productElement).toBeInTheDocument();
        });
    });
    it('displays loading spinner initially and hides after products are loaded', async () => {
        const getProductsMock = require('@/app/libs/getProducts').default;
        getProductsMock.mockResolvedValue({ products: [] });
        render(<Home />);

        const loadingSpinner = screen.getByTestId('spinner');
        expect(loadingSpinner).toBeInTheDocument();

        await screen.findByText('Products');

        expect(loadingSpinner).not.toBeInTheDocument();
    });
    it('updates displayed products after a search term is entered', async () => {
        const getProductsMock = require('@/app/libs/getProducts').default;
        getProductsMock.mockResolvedValue({ products: shortProductArray });
        render(<Home />);

        await screen.findByText('Products');

        const searchInput = screen.getByPlaceholderText('Search products...');

        await user.type(searchInput, '1');

        await waitFor(
            () => {
                expect(screen.getByText('Product 1')).toBeInTheDocument();
                expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
            },
            { timeout: 1500 }
        );
    });
    it('handles pagination correctly', async () => {
        const getProductsMock = require('@/app/libs/getProducts').default;
        getProductsMock.mockResolvedValue({ products: longProductArray });
        const productsAmountOnPage = 10;
        render(<Home />);

        await screen.findByText('Products');

        const nextButton = screen.getByText('Next Page');
        expect(nextButton).toBeInTheDocument();
        await user.click(nextButton);

        expect(
            screen.getByText(longProductArray[productsAmountOnPage].name)
        ).toBeInTheDocument();
        expect(
            screen.queryByText(longProductArray[0].name)
        ).not.toBeInTheDocument();

        const previousButton = screen.getByText('Previous Page');
        expect(previousButton).toBeInTheDocument();
        await user.click(previousButton);

        expect(screen.getByText(longProductArray[0].name)).toBeInTheDocument();
        expect(
            screen.queryByText(longProductArray[productsAmountOnPage].name)
        ).not.toBeInTheDocument();
    });
});
