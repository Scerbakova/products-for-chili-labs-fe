import getProducts from './getProducts';

describe('getProducts', () => {
  beforeEach(() => {
		global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return products on successful API call', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    const mockResponse = {
      ok: true,
      json: async () => ({ products: mockProducts }),
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getProducts();

    expect(result.products).toEqual(mockProducts);
  });

  it('should throw an error on failed API call', async () => {
    const mockResponse = {
      ok: false,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(getProducts()).rejects.toThrow('No data found');
  });
});