import { renderHook, act } from '@testing-library/react-native';
import { useProductStore } from '../productStore';

beforeEach(() => {
  useProductStore.setState({
    products: [],
    isLoading: false,
    selectedProduct: null,
  });
});

describe('productStore', () => {
  it('should start with empty products', () => {
    const { result } = renderHook(() => useProductStore());
    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should fetch and populate products', async () => {
    const { result } = renderHook(() => useProductStore());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.isLoading).toBe(false);
  });

  it('should select a product by id', async () => {
    const { result } = renderHook(() => useProductStore());

    await act(async () => {
      await result.current.fetchProducts();
    });

    const firstProduct = result.current.products[0];

    act(() => {
      result.current.selectProduct(firstProduct.id);
    });

    expect(result.current.selectedProduct).toEqual(firstProduct);
  });

  it('should return null when selecting non-existent id', () => {
    const { result } = renderHook(() => useProductStore());

    act(() => {
      result.current.selectProduct('non-existent-id');
    });

    expect(result.current.selectedProduct).toBeNull();
  });
});
