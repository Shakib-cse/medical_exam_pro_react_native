import axios, { AxiosInstance } from 'axios';
import { url, NetworkConstants } from './endpoints';
import { ErrorMessageHandler } from '../helpers/ErrorMessageHandler';

class AxiosSingleton {
  private static instance: AxiosSingleton;
  public api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: url,
      timeout: 100000,
      headers: {
        [NetworkConstants.ACCEPT]: NetworkConstants.ACCEPT_TYPE,
        [NetworkConstants.CONTENT_TYPE]: NetworkConstants.ACCEPT_TYPE,
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): AxiosSingleton {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = new AxiosSingleton();
    }
    return AxiosSingleton.instance;
  }

  public updateAuthToken(token: string) {
    if (__DEV__) {
      console.log('Axios update with auth token');
    }
    this.api.defaults.headers.common[NetworkConstants.AUTHORIZATION] = `Bearer ${token}`;
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        // Logging or additional logic
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (this.isGlobalError(error)) {
          ErrorMessageHandler.showErrorToast(error);
          // Handle global redirects here based on error status if needed
        }
        return Promise.reject(error);
      }
    );
  }

  private isGlobalError(error: any): boolean {
    if (!axios.isAxiosError(error)) return false;

    const status = error.response?.status;
    const isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout');
    const isNetworkError = error.message === 'Network Error';

    return (
      isNetworkError ||
      isTimeout ||
      status === 401 ||
      status === 403 ||
      status === 500 ||
      status === 502 ||
      status === 503
    );
  }
}

const api = AxiosSingleton.getInstance().api;
export const updateApiAuthToken = (token: string) => AxiosSingleton.getInstance().updateAuthToken(token);

export default api;
