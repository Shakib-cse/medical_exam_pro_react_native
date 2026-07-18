import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="success" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="forgot-verification" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
