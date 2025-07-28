import { VALIDATION_MESSAGES } from './constants';

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.toString());
};

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Form validation rules for Ant Design
export const getValidationRules = {
  required: (fieldName) => [
    { required: true, message: VALIDATION_MESSAGES.REQUIRED(fieldName) }
  ],
  
  email: () => [
    { required: true, message: VALIDATION_MESSAGES.REQUIRED('Email') },
    { 
      validator: (_, value) => {
        if (!value || validateEmail(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(VALIDATION_MESSAGES.EMAIL_INVALID));
      }
    }
  ],
  
  password: () => [
    { required: true, message: VALIDATION_MESSAGES.REQUIRED('Password') },
    { 
      validator: (_, value) => {
        if (!value || validatePassword(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(VALIDATION_MESSAGES.PASSWORD_MIN));
      }
    }
  ],
  
  phone: () => [
    { required: true, message: VALIDATION_MESSAGES.REQUIRED('Phone') },
    { 
      validator: (_, value) => {
        if (!value || validatePhone(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(VALIDATION_MESSAGES.PHONE_INVALID));
      }
    }
  ],
  
  url: (fieldName = 'URL') => [
    { required: true, message: VALIDATION_MESSAGES.REQUIRED(fieldName) },
    { 
      validator: (_, value) => {
        if (!value || validateURL(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(VALIDATION_MESSAGES.URL_INVALID));
      }
    }
  ]
};