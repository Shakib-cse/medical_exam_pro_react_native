import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';

// Reset the store before each test
beforeEach(() => {
  useAuthStore.setState({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    isHydrated: true,
  });
});

describe('authStore', () => {
  it('should start unauthenticated', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should set isLoading during login', async () => {
    const { result } = renderHook(() => useAuthStore());

    let loginPromise: Promise<void>;
    act(() => {
      loginPromise = result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isLoading).toBe(true);
    await act(async () => {
      await loginPromise!;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('should clear state on logout', async () => {
    // First login
    const { result } = renderHook(() => useAuthStore());
    await act(async () => {
      await result.current.login('test@example.com', 'pass');
    });
    expect(result.current.isAuthenticated).toBe(true);

    // Then logout
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
