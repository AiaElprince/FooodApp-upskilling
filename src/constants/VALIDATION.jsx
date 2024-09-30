export const EmailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: 'Email should be a valid email address'
  }
};

export const PasswordValidation = {
  required: 'Password is required',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  }
};
