export const Routes = {
  // Auth Routes
  loginScreen: '/(auth)/login' as const,
  signUpScreen: '/(auth)/signup' as const,
  verificationScreen: '/(auth)/verification' as const,
  successScreen: '/(auth)/success' as const,
  forgotPWScreen: '/(auth)/forgot-password' as const,
  forgotVerificationScreen: '/(auth)/forgot-verification' as const,
  resetPasswordScreen: '/(auth)/reset-password' as const,

  // Main App Routes
  homeScreen: '/(app)/home' as const,
  productsScreen: '/(app)/product/' as const,
  productDetailsScreen: '/(app)/product/[id]' as const,
  profile: '/(app)/profile' as const,
  practiceSessionScreen: '/(app)/practice-session' as const,
  pricingScreen: '/(app)/pricing' as const,
};
