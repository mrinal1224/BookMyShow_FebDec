import moment from 'moment';
import { DATE_FORMATS } from './constants';

// Format date for display
export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  return moment(date).format(format);
};

// Format time for display
export const formatTime = (time, format = DATE_FORMATS.TIME_DISPLAY) => {
  return moment(time, 'HH:mm').format(format);
};

// Calculate total price
export const calculateTotalPrice = (seats, ticketPrice) => {
  return seats.length * ticketPrice;
};

// Generate seat numbers
export const generateSeatLayout = (totalSeats, columns = 12, bookedSeats = [], selectedSeats = []) => {
  const rows = Math.ceil(totalSeats / columns);
  const seatLayout = [];

  for (let row = 0; row < rows; row++) {
    const rowSeats = [];
    for (let col = 0; col < columns; col++) {
      const seatNumber = row * columns + col + 1;
      if (seatNumber <= totalSeats) {
        rowSeats.push({
          number: seatNumber,
          isBooked: bookedSeats.includes(seatNumber),
          isSelected: selectedSeats.includes(seatNumber),
          row: row + 1,
          column: col + 1
        });
      }
    }
    if (rowSeats.length > 0) {
      seatLayout.push(rowSeats);
    }
  }

  return seatLayout;
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format currency
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};

// Get available seats count
export const getAvailableSeatsCount = (totalSeats, bookedSeats) => {
  return totalSeats - bookedSeats.length;
};

// Sort shows by time
export const sortShowsByTime = (shows) => {
  return shows.sort((a, b) => moment(a.time, 'HH:mm') - moment(b.time, 'HH:mm'));
};

// Check if date is today or future
export const isValidShowDate = (date) => {
  return moment(date).isSameOrAfter(moment(), 'day');
};

// Generate unique key for React lists
export const generateKey = (prefix, id) => {
  return `${prefix}-${id}`;
};

// Capitalize first letter
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};