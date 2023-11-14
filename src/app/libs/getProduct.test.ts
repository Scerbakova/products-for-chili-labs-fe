import getProduct from './getProduct';
import getProducts from './getProducts';

jest.mock('./getProducts');
const mockedProducts = {
    products: [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' },
    ],
};

describe('getProduct', () => {
    it('should return the correct product by ID', async () => {
        (getProducts as jest.Mock).mockResolvedValue(mockedProducts);
        const product = await getProduct('2');

        expect(product).toEqual({ id: '2', name: 'Product 2' });
    });

    it('should return undefined for non-existent product ID', async () => {
        (getProducts as jest.Mock).mockResolvedValue(mockedProducts);
        const product = await getProduct('4');

        expect(product).toBeUndefined();
    });
});
