// Success response helper
const successResponse = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

// Error response helper
const errorResponse = (res, message, statusCode = 400, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(error && { error })
  });
};

// Validation error response
const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors
  });
};

// Not found response
const notFoundResponse = (res, resource = 'Resource') => {
  return res.status(404).json({
    success: false,
    message: `${resource} not found`
  });
};

// Unauthorized response
const unauthorizedResponse = (res, message = 'Unauthorized access') => {
  return res.status(401).json({
    success: false,
    message
  });
};

// Server error response
const serverErrorResponse = (res, error = null) => {
  console.error('Server Error:', error);
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  serverErrorResponse
};