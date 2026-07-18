import { AppRegExpText } from './AppConstants';

export class Validators {
  static isValidEmail(email: string): boolean {
    return AppRegExpText.kRegExpEmail.test(email);
  }

  static isValidPhone(phone: string): boolean {
    return AppRegExpText.kRegExpPhone.test(phone);
  }

  static validateEmailField(email: string): string | null {
    if (!email || email.trim().length === 0) {
      return "Email cannot be empty";
    }
    if (!this.isValidEmail(email)) {
      return "Please enter a valid email address";
    }
    return null;
  }

  static validatePasswordField(password: string): string | null {
    if (!password || password.trim().length === 0) {
      return "Password cannot be empty";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  }
}
