// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import * as Facebook from 'expo-auth-session/providers/facebook';
// import { useEffect } from 'react';

// WebBrowser.maybeCompleteAuthSession();

// export const useSocialAuth = () => {
//   const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
//     clientId: 'YOUR_GOOGLE_CLIENT_ID',
//   });

//   const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
//     clientId: 'YOUR_FACEBOOK_CLIENT_ID',
//   });

//   useEffect(() => {
//     if (googleResponse?.type === 'success') {
//       const { authentication } = googleResponse;
//       console.log('Google Auth Success:', authentication?.accessToken);
//       // Handle google login...
//     }
//   }, [googleResponse]);

//   useEffect(() => {
//     if (fbResponse?.type === 'success') {
//       const { authentication } = fbResponse;
//       console.log('Facebook Auth Success:', authentication?.accessToken);
//       // Handle Facebook login...
//     }
//   }, [fbResponse]);

//   return {
//     loginWithGoogle: () => googlePromptAsync(),
//     loginWithFacebook: () => fbPromptAsync(),
//   };
// };
