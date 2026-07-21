import * as ScreenOrientation from 'expo-screen-orientation';
import { BackHandler, Platform, Alert } from 'react-native';
import { NavigationService } from './NavigationService';

export class DeviceHelper {
  static async lockPortrait() {
    try {
      if (ScreenOrientation && ScreenOrientation.lockAsync) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    } catch (e) {
      console.warn('ScreenOrientation lock failed:', e);
    }
  }

  static setupBackButtonExitAlert() {
    if (Platform.OS !== 'android') return;

    BackHandler.addEventListener('hardwareBackPress', () => {
      // If we can go back in the stack, we shouldn't exit the app immediately
      if (NavigationService.canGoBack) {
        NavigationService.goBack();
        return true;
      }

      Alert.alert('Exit App', 'Do you want to exit the app?', [
        { text: 'No', style: 'cancel', onPress: () => {} },
        { text: 'Yes', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Prevents default exit behavior
    });
  }

  static initialize() {
    this.lockPortrait();
    this.setupBackButtonExitAlert();
  }
}
