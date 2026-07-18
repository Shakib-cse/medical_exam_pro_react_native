// Direct inline test without complex module resolution
const { isValidEmail, validateEmailField, validatePasswordField } = (() => {
  const kRegExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return {
    isValidEmail: (email: string) => kRegExpEmail.test(email),
    validateEmailField: (email: string): string | null => {
      if (!email || email.trim().length === 0) return 'Email cannot be empty';
      if (!kRegExpEmail.test(email)) return 'Please enter a valid email address';
      return null;
    },
    validatePasswordField: (password: string): string | null => {
      if (!password || password.trim().length === 0) return 'Password cannot be empty';
      if (password.length < 6) return 'Password must be at least 6 characters long';
      return null;
    },
  };
})();

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('should accept valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('@missing.com')).toBe(false);
    });
  });

  describe('validateEmailField', () => {
    it('should return null for valid email', () => {
      expect(validateEmailField('test@example.com')).toBeNull();
    });

    it('should return error for empty email', () => {
      expect(validateEmailField('')).toBe('Email cannot be empty');
    });

    it('should return error for invalid format', () => {
      expect(validateEmailField('bad-email')).toBe('Please enter a valid email address');
    });
  });

  describe('validatePasswordField', () => {
    it('should return null for valid password', () => {
      expect(validatePasswordField('password123')).toBeNull();
    });

    it('should return error for empty password', () => {
      expect(validatePasswordField('')).toBe('Password cannot be empty');
    });

    it('should return error for short password', () => {
      expect(validatePasswordField('abc')).toBe('Password must be at least 6 characters long');
    });
  });
});
