import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),
      login: async (email, pass) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isAuthenticated: true, user: { email, token: 'mock-jwt-token' }, isLoading: false });
      },
      signup: async (_email, _pass) => {
        set({ isLoading: true });
        // Simulate API call for registration (requires verification before authenticating)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
