// import * as Notifications from 'expo-notifications';
// import { Platform } from 'react-native';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export class NotificationService {
//   static async requestPermissions() {
//     const { status } = await Notifications.requestPermissionsAsync();
//     if (status !== 'granted') {
//       console.warn('Notification permissions not granted');
//       return false;
//     }
//     return true;
//   }

//   static async scheduleNotification(title: string, body: string, trigger: number = 1) {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title,
//         body,
//       },
//       trigger: { seconds: trigger } as any,
//     });
//   }

//   static async cancelAllNotifications() {
//     await Notifications.cancelAllScheduledNotificationsAsync();
//   }
// }
