import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  selectedProduct: Product | null;
  fetchProducts: () => Promise<void>;
  selectProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  selectedProduct: null,
  fetchProducts: async () => {
    set({ isLoading: true });
    // Simulate API fetch
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', price: 99, imageUrl: 'https://via.placeholder.com/150' },
      { id: '2', name: 'Product 2', description: 'Description 2', price: 149, imageUrl: 'https://via.placeholder.com/150' },
    ];
    set({ products: mockProducts, isLoading: false });
  },
  selectProduct: (id) => {
    const product = get().products.find(p => p.id === id) || null;
    set({ selectedProduct: product });
  },
}));
