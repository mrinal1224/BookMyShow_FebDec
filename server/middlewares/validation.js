const { validationErrorResponse } = require('../utils/responseHelper');
const { 
  validateEmail, 
  validatePassword, 
  validatePhone, 
  validateURL, 
  validateRequired,
  validateNumber 
} = require('../utils/validation');

// User registration validation
const validateUserRegistration = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!validateRequired(name)) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!validateRequired(email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!validateRequired(password)) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (!validatePassword(password)) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (role && !['admin', 'user', 'partner'].includes(role)) {
    errors.push({ field: 'role', message: 'Invalid role' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

// User login validation
const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!validateRequired(email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!validateRequired(password)) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

// Movie validation
const validateMovie = (req, res, next) => {
  const { title, description, duration, genre, language, releaseDate, poster } = req.body;
  const errors = [];

  if (!validateRequired(title)) {
    errors.push({ field: 'title', message: 'Movie title is required' });
  }

  if (!validateRequired(description)) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (!validateRequired(duration)) {
    errors.push({ field: 'duration', message: 'Duration is required' });
  } else if (!validateNumber(duration, 1, 500)) {
    errors.push({ field: 'duration', message: 'Duration must be between 1 and 500 minutes' });
  }

  if (!validateRequired(genre)) {
    errors.push({ field: 'genre', message: 'Genre is required' });
  }

  if (!validateRequired(language)) {
    errors.push({ field: 'language', message: 'Language is required' });
  }

  if (!validateRequired(releaseDate)) {
    errors.push({ field: 'releaseDate', message: 'Release date is required' });
  }

  if (!validateRequired(poster)) {
    errors.push({ field: 'poster', message: 'Poster URL is required' });
  } else if (!validateURL(poster)) {
    errors.push({ field: 'poster', message: 'Invalid poster URL' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

// Theatre validation
const validateTheatre = (req, res, next) => {
  const { name, address, phone, email } = req.body;
  const errors = [];

  if (!validateRequired(name)) {
    errors.push({ field: 'name', message: 'Theatre name is required' });
  }

  if (!validateRequired(address)) {
    errors.push({ field: 'address', message: 'Address is required' });
  }

  if (!validateRequired(phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number' });
  }

  if (!validateRequired(email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

// Show validation
const validateShow = (req, res, next) => {
  const { name, date, time, movie, ticketPrice, totalSeats, theatre } = req.body;
  const errors = [];

  if (!validateRequired(name)) {
    errors.push({ field: 'name', message: 'Show name is required' });
  }

  if (!validateRequired(date)) {
    errors.push({ field: 'date', message: 'Show date is required' });
  }

  if (!validateRequired(time)) {
    errors.push({ field: 'time', message: 'Show time is required' });
  }

  if (!validateRequired(movie)) {
    errors.push({ field: 'movie', message: 'Movie is required' });
  }

  if (!validateRequired(ticketPrice)) {
    errors.push({ field: 'ticketPrice', message: 'Ticket price is required' });
  } else if (!validateNumber(ticketPrice, 1, 10000)) {
    errors.push({ field: 'ticketPrice', message: 'Ticket price must be between 1 and 10000' });
  }

  if (!validateRequired(totalSeats)) {
    errors.push({ field: 'totalSeats', message: 'Total seats is required' });
  } else if (!validateNumber(totalSeats, 1, 1000)) {
    errors.push({ field: 'totalSeats', message: 'Total seats must be between 1 and 1000' });
  }

  if (!validateRequired(theatre)) {
    errors.push({ field: 'theatre', message: 'Theatre is required' });
  }

  if (errors.length > 0) {
    return validationErrorResponse(res, errors);
  }

  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateMovie,
  validateTheatre,
  validateShow
};