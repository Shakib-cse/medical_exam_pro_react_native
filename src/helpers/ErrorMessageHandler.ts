import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";

export class ErrorMessageHandler {
  static getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return this._getAxiosErrorMessage(error);
    } else if (error instanceof SyntaxError || error instanceof TypeError) {
      return "Unexpected data received or format error. Please try again.";
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "Something went wrong. Please try again.";
    }
  }

  static _getAxiosErrorMessage(error: AxiosError): string {
    // Handle network-related timeouts/errors first
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return "Request timed out. Please check your connection.";
    }
    
    if (error.message === 'Network Error') {
      return "No internet connection. Please check your network.";
    }

    if (axios.isCancel(error)) {
      return "Request was cancelled.";
    }

    if (error.response) {
      return this._getBadResponseErrorMessage(error);
    }

    return "Network error occurred. Please try again.";
  }

  static _getBadResponseErrorMessage(error: AxiosError): string {
    const statusCode = error.response?.status;
    const responseData = error.response?.data as any;

    // First try to extract message from JSON response
    if (responseData && typeof responseData === 'object') {
      const message =
        responseData['message'] ??
        responseData['error'] ??
        responseData['detail'];
      if (typeof message === 'string') {
        return message;
      }
    }

    // If no message in JSON, use status code based messages
    switch (statusCode) {
      case 400:
        return "Bad request.";
      case 401:
        return "Session expired. Please login again.";
      case 403:
        return "Access denied.";
      case 404:
        return "Resource not found.";
      case 409:
        return "Conflict occurred.";
      case 422:
        return "Validation failed.";
      case 500:
        return "Internal server error. Please try again later.";
      case 502:
        return "Service temporarily unavailable. Please try again later.";
      case 503:
        return "Service under maintenance. Please try again later.";
      default:
        return `Server error (${statusCode ?? "unknown"}). Please try again.`;
    }
  }

  static showErrorToast(error: unknown): void {
    const message = this.getErrorMessage(error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
      position: "top",
    });
  }
}
