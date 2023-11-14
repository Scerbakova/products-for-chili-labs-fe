import { navigateToNextPage } from './navigateToNextPage';

describe('navigateToNextPage', () => {
    it('should calculate the new starting point correctly', () => {
        const startFromProduct = 0;
        const productsAmountOnPage = 10;
        const productsLength = 30;

        const setStartFromProduct = jest.fn(); // Mock the state setter function

        navigateToNextPage(
            startFromProduct,
            productsAmountOnPage,
            productsLength,
            setStartFromProduct
        );

        const expectedNewStart = Math.min(
            startFromProduct + productsAmountOnPage,
            productsLength - productsAmountOnPage
        );

        expect(setStartFromProduct).toHaveBeenCalledWith(expectedNewStart);
    });

    it('should not exceed the product length for the new starting point', () => {
        const startFromProduct = 20;
        const productsAmountOnPage = 10;
        const productsLength = 30;

        const setStartFromProduct = jest.fn();

        navigateToNextPage(
            startFromProduct,
            productsAmountOnPage,
            productsLength,
            setStartFromProduct
        );

        const expectedNewStart = Math.min(
            startFromProduct + productsAmountOnPage,
            productsLength - productsAmountOnPage
        );

        expect(setStartFromProduct).toHaveBeenCalledWith(expectedNewStart);
    });
});
