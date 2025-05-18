export const PASSWORD_RULES = {
  minLength: 8,
  hasUpperCase: (password: string) => /[A-Z]/.test(password),
  hasLowerCase: (password: string) => /[a-z]/.test(password),
  hasNumber: (password: string) => /\d/.test(password),
  hasSpecialChar: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
};

export const validatePassword = (password: string) => {
  const errors: string[] = [];
  
  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(`Password must be at least ${PASSWORD_RULES.minLength} characters long`);
  }
  if (!PASSWORD_RULES.hasUpperCase(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!PASSWORD_RULES.hasLowerCase(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!PASSWORD_RULES.hasNumber(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!PASSWORD_RULES.hasSpecialChar(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};
