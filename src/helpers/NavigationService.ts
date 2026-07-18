import { router, Href } from 'expo-router';

/**
 * NavigationService acts as a singleton proxy wrapper over Expo Router,
 * mirroring Flutter's GlobalKey<NavigatorState> imperative behaviors
 * (e.g., popping, pushing via string mappings, without needing React context)
 */
export class NavigationService {
  static navigateTo(routeName: Href) {
    router.push(routeName);
  }

  static navigateToReplacement(routeName: Href) {
    router.replace(routeName);
  }

  static popAndReplace(routeName: Href) {
    // Expo Router does not have popAndPush exactly, replace replaces current stack item
    router.replace(routeName);
  }

  static navigateToUntilReplacement(routeName: Href) {
    // Equivalent to navigating and clearing history (pushReplacementNamed & returning false)
    router.dismissAll();
    router.replace(routeName);
  }

  static navigateToWithArgs(routeName: string, params: Record<string, any>) {
    router.push({
      pathname: routeName as any,
      params,
    });
  }

  static popAndReplaceWithArgs(routeName: string, params: Record<string, any>) {
    router.replace({
      pathname: routeName as any,
      params,
    });
  }

  static goBack() {
    if (router.canGoBack()) {
      router.back();
    }
  }

  static get canGoBack(): boolean {
    return router.canGoBack();
  }
}
