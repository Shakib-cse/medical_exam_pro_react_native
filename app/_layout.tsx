import '../src/global.css';
import '../src/i18n'; // Initialize i18n before any component renders
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuthStore } from '../src/features/auth/data/authStore';
import { DeviceHelper } from '../src/helpers/DeviceHelper';
import { updateApiAuthToken } from '../src/networks/axios';
import { Routes } from '../src/helpers/Routes';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isHydrated, isAuthenticated, user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    DeviceHelper.initialize();
  }, []);

  useEffect(() => {
    // Wait for hydration and for the navigation state to be ready
    if (!isHydrated || !navigationState?.key) return;

    if (user?.token) {
      updateApiAuthToken(user.token);
    }

    const inAuthGroup = segments[0] === '(auth)';

    // We use a small timeout to ensure the navigator is fully mounted
    // before attempting redirection
    const timer = setTimeout(() => {
      if (!isAuthenticated && !inAuthGroup) {
        router.replace(Routes.loginScreen);
      } else if (isAuthenticated && inAuthGroup) {
        router.replace(Routes.homeScreen);
      }
      SplashScreen.hideAsync();
    }, 1);

    return () => clearTimeout(timer);
  }, [isHydrated, isAuthenticated, segments, navigationState?.key]);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
