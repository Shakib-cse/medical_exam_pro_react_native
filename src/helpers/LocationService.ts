// import * as Location from 'expo-location';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AppStorageKeys } from '../common/constants/AppConstants';

// export class LocationService {
//   private static instance: LocationService;
//   public isLocationPermissionGranted = false;

//   private constructor() {}

//   static getInstance(): LocationService {
//     if (!LocationService.instance) {
//       LocationService.instance = new LocationService();
//     }
//     return LocationService.instance;
//   }

//   async initialize(): Promise<void> {
//     await this.checkLocationPermission();
//   }

//   private async checkLocationPermission(): Promise<void> {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       this.isLocationPermissionGranted = false;
//       console.warn('Permission to access location was denied');
//       return;
//     }

//     this.isLocationPermissionGranted = true;
//     await this.updateLocation();
//   }

//   private async updateLocation(): Promise<void> {
//     try {
//       let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
//       const { latitude, longitude } = location.coords;

//       await AsyncStorage.setItem(AppStorageKeys.kKeySelectedLat, latitude.toString());
//       await AsyncStorage.setItem(AppStorageKeys.kKeySelectedLng, longitude.toString());

//       let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//       if (geocode.length > 0) {
//         const place = geocode[0];
//         const locationName = `${place.street || ''}, ${place.region || ''}, ${place.country || ''}`;
//         await AsyncStorage.setItem(AppStorageKeys.kKeySelectedLocation, locationName);
//       }
//     } catch (e) {
//       console.error("Error fetching location", e);
//     }
//   }
// }
