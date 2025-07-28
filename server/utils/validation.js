const validator = require('validator');

// Email validation
const validateEmail = (email) => {
  return validator.isEmail(email);
};

// Password validation
const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Phone validation
const validatePhone = (phone) => {
  return validator.isMobilePhone(phone.toString(), 'any');
};

// URL validation
const validateURL = (url) => {
  return validator.isURL(url);
};

// Date validation
const validateDate = (date) => {
  return validator.isISO8601(date);
};

// Number validation
const validateNumber = (num, min = 0, max = Infinity) => {
  const number = Number(num);
  return !isNaN(number) && number >= min && number <= max;
};

// Required field validation
const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateURL,
  validateDate,
  validateNumber,
  validateRequired
};