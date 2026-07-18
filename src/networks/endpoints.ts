export const url = "https://api.zhndev.site/wp-json/foodflow/v1";

export const NetworkConstants = {
  ACCEPT: "Accept",
  APP_KEY: "App-Key",
  ACCEPT_LANGUAGE: "Accept-Language",
  ACCEPT_LANGUAGE_VALUE: "pt",
  APP_KEY_VALUE: process.env.EXPO_PUBLIC_APP_KEY_VALUE || "",
  ACCEPT_TYPE: "application/json",
  AUTHORIZATION: "Authorization",
  CONTENT_TYPE: "content-Type",
};

export const Endpoints = {
  // auth
  signUp: () => "/auth/register",
  logIn: () => "/auth/login",
  
  // profile
  profile: () => "/user/profile",
  
  // example
  example: () => "/api/",
  
  // products
  products: (pageNum: number, perPage: number) => `/products?page=${pageNum}&per_page=${perPage}`,
  productDetails: (id: number) => `/products/${id}`,
};
