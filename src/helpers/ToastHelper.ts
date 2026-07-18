import Toast from 'react-native-toast-message';

export class ToastHelper {
  static showLongToast(message: string) {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
      visibilityTime: 4000,
    });
  }

  static showShortToast(message: string) {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  }

  static showNoInternetToast() {
    Toast.show({
      type: 'error',
      text1: "Please check your internet connection",
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  static showNotLoggedInToast() {
    Toast.show({
      type: 'error',
      text1: "Please login to perform this operation",
      position: 'bottom',
      visibilityTime: 3000,
    });
  }

  static showErrorToast(message: string) {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  }
}
