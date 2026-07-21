export const AppRegExpText = {
  kRegExpEmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
  kRegExpPhone: /^(\+[0-9]+[- .]*)?(\([0-9]+[- .]*)?([0-9][0-9- .]+[0-9])$/,
  patternMail:
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const AppStorageKeys = {
  kKeyfirstTime: 'first',
  kSelectedCategotyId: 'selectedCategotyId',
  kKeyStatus: 'status',
  kEmail: 'email',
  kPassword: 'password',
  kMediaFile: 'media_files',
  kIsFav: 'IsFav',

  // old
  kKeyIsLoggedIn: 'is_logged_in',
  kKeyAccessToken: 'access_token',
  kPhone: 'phone_number',
  kKeySelectedLocation: 'selected_location',
  kKeySelectedLat: 'selected_lot',
  kKeySelectedLng: 'selected_lng',
  kKeyCurrency: 'currency',
  kKeyLanguage: 'language',
  kKeyLanguageCode: 'language_code',
  kKeyCountryCode: 'country_code',
  kKeyDeviceToken: 'device_token',
  kKeyUser: 'user',

  kKeyProvider: 'provider',
  kFacebook: 'facebook',
  kApple: 'apple',
  kGoogle: 'google',
  kKeyEnglish: 'en',
  kKeyPortuguese: 'pt',

  kKeyFirstName: 'first_name',
  kKeyLastName: 'lst_name',
  kKeyDeviceID: 'device_id',
  kKeyUserID: 'user_id',

  kKeyIsExploring: 'exploring',
  kKeyFCMToken: 'firebase_token',
};
