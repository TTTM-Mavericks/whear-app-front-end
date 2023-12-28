interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Email Validator
 * @param email 
 * @returns 
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the password is provided
  if (!email) {
    return {
      isValid: false,
      error: 'Email is required.',
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Invalid email format.',
    };
  }

  return {
    isValid: true,
  };
}

export const validateString = (string: string): ValidationResult => {
  const stringRegex = /^[a-zA-Z0-9]{8,20}$/;

  // Check if the password is provided
  if (!string) {
    return {
      isValid: false,
      error: 'Username is required.',
    };
  }

  if (!stringRegex.test(string)) {
    return {
      isValid: false,
      error: 'String must 8-20 characties and not have special characties.',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Password validator
 * @param password 
 * @returns 
 */
export const validatePassword = (password: string): ValidationResult => {
  // Check if the password is provided
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required.',
    };
  }

  // Define individual conditions for password validation
  const isLengthValid = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

  // Check each condition and return corresponding error messages
  if (!isLengthValid) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters long.',
    };
  }

  if (!hasLowercase) {
    return {
      isValid: false,
      error: 'Password must include at least one lowercase letter.',
    };
  }

  if (!hasUppercase) {
    return {
      isValid: false,
      error: 'Password must include at least one uppercase letter.',
    };
  }

  if (!hasDigit) {
    return {
      isValid: false,
      error: 'Password must include at least one digit.',
    };
  }

  if (!hasSpecialChar) {
    return {
      isValid: false,
      error: 'Password must include at least one special character.',
    };
  }

  // Password is valid
  return {
    isValid: true,
  };
};
