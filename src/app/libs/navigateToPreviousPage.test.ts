import { navigateToPreviousPage } from './navigateToPreviousPage';


const setStartFromProduct = jest.fn();

describe('navigateToPreviousPage', () => {
    it('should calculate the new starting point correctly', () => {
        const startFromProduct = 20;
        const productsAmountOnPage = 10;

        navigateToPreviousPage(
            startFromProduct,
            productsAmountOnPage,
            setStartFromProduct
        );

        const expectedNewStart = Math.max(
            startFromProduct - productsAmountOnPage,
            0
        );

        expect(setStartFromProduct).toHaveBeenCalledWith(expectedNewStart);
    });

    it('should not go below 0 for the new starting point', () => {
        const startFromProduct = 5;
        const productsAmountOnPage = 10;

        navigateToPreviousPage(
            startFromProduct,
            productsAmountOnPage,
            setStartFromProduct
        );
        const expectedNewStart = Math.max(
            startFromProduct - productsAmountOnPage,
            0
        );

        expect(setStartFromProduct).toHaveBeenCalledWith(expectedNewStart);
    });

    it('should handle cases when products amount on page is greater than starting point', () => {
        const startFromProduct = 10;
        const productsAmountOnPage = 20;

        navigateToPreviousPage(
            startFromProduct,
            productsAmountOnPage,
            setStartFromProduct
        );

        const expectedNewStart = 0;

        expect(setStartFromProduct).toHaveBeenCalledWith(expectedNewStart);
    });
});
