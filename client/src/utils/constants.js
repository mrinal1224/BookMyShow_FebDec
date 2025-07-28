// API endpoints
export const API_ENDPOINTS = {
  USERS: {
    REGISTER: '/api/users/register',
    LOGIN: '/api/users/login',
    GET_CURRENT: '/api/users/get-current-user'
  },
  MOVIES: {
    GET_ALL: '/api/movies/get-all-movies',
    ADD: '/api/movies/add-movie',
    UPDATE: '/api/movies/update-movie',
    DELETE: '/api/movies/delete-movie',
    GET_BY_ID: (id) => `/api/movies/movie/${id}`
  },
  THEATRES: {
    ADD: '/api/theatres/add-theatre',
    GET_ALL: '/api/theatres/get-all-theatres',
    GET_BY_OWNER: '/api/theatres/get-all-theatres-by-owner',
    UPDATE: '/api/theatres/update-theatre',
    DELETE: '/api/theatres/delete-theatre'
  },
  SHOWS: {
    ADD: '/api/shows/add-show',
    UPDATE: '/api/shows/update-show',
    DELETE: '/api/shows/delete-show',
    GET_BY_THEATRE: '/api/shows/get-all-shows-by-theatre',
    GET_BY_MOVIE: '/api/shows/get-all-theatres-by-movie',
    GET_BY_ID: '/api/shows/get-show-by-id'
  },
  BOOKINGS: {
    MAKE_PAYMENT: '/api/bookings/make-payment',
    BOOK_SHOW: '/api/bookings/book-show',
    GET_ALL: '/api/bookings/get-all-bookings'
  }
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  PARTNER: 'partner'
};

// Movie genres
export const MOVIE_GENRES = [
  { value: 'Action', label: 'Action' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Adventure', label: 'Adventure' }
];

// Languages
export const LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Malayalam', label: 'Malayalam' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Marathi', label: 'Marathi' }
];

// Date and time formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM Do YYYY',
  INPUT: 'YYYY-MM-DD',
  TIME_DISPLAY: 'hh:mm A',
  TIME_INPUT: 'HH:mm'
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: (field) => `${field} is required`,
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 6 characters long',
  PHONE_INVALID: 'Please enter a valid phone number',
  URL_INVALID: 'Please enter a valid URL'
};

// Seat configuration
export const SEAT_CONFIG = {
  COLUMNS: 12,
  SEAT_TYPES: {
    AVAILABLE: 'available',
    SELECTED: 'selected',
    BOOKED: 'booked'
  }
};

// Payment configuration
export const PAYMENT_CONFIG = {
  CURRENCY: 'usd',
  STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa'
};