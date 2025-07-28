# BookMyShow Clone

A full-stack movie booking application built with React.js, Node.js, Express.js, and MongoDB.

## Features

### User Features
- User registration and authentication
- Browse movies with search and filter functionality
- View movie details and showtimes
- Select seats and book tickets
- Secure payment processing with Stripe
- View booking history

### Admin Features
- Manage movies (add, edit, delete)
- Manage theatres and approve/block them
- View all bookings and analytics

### Partner Features
- Register as theatre partner
- Add and manage theatres
- Create and manage shows
- View theatre-specific bookings

## Tech Stack

### Frontend
- React.js 18
- Redux Toolkit for state management
- Ant Design for UI components
- Axios for API calls
- React Router for navigation
- Stripe for payment processing

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Stripe for payment processing

## Project Structure

```
project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── calls/         # API calls
│   │   ├── redux/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   └── hooks/         # Custom hooks
│   └── public/
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   ├── utils/            # Utility functions
│   └── config/           # Configuration files
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Stripe account for payment processing

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   DATABASE_URL=mongodb://localhost:27017/bookmyshow
   PORT=8081
   secret_key_jwt=your_jwt_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:8081
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/get-current-user` - Get current user

### Movies
- `GET /api/movies/get-all-movies` - Get all movies
- `POST /api/movies/add-movie` - Add new movie (Admin)
- `PUT /api/movies/update-movie` - Update movie (Admin)
- `PUT /api/movies/delete-movie` - Delete movie (Admin)
- `GET /api/movies/movie/:id` - Get movie by ID

### Theatres
- `POST /api/theatres/add-theatre` - Add theatre (Partner)
- `GET /api/theatres/get-all-theatres` - Get all theatres (Admin)
- `POST /api/theatres/get-all-theatres-by-owner` - Get theatres by owner
- `PUT /api/theatres/update-theatre` - Update theatre
- `PUT /api/theatres/delete-theatre` - Delete theatre

### Shows
- `POST /api/shows/add-show` - Add show
- `PUT /api/shows/update-show` - Update show
- `POST /api/shows/delete-show` - Delete show
- `POST /api/shows/get-all-shows-by-theatre` - Get shows by theatre
- `POST /api/shows/get-all-theatres-by-movie` - Get theatres by movie
- `POST /api/shows/get-show-by-id` - Get show by ID

### Bookings
- `POST /api/bookings/make-payment` - Process payment
- `POST /api/bookings/book-show` - Book show
- `GET /api/bookings/get-all-bookings` - Get user bookings

## Key Improvements Made

### Code Quality
- Added comprehensive error handling
- Implemented input validation on both frontend and backend
- Created reusable utility functions and constants
- Added proper TypeScript-like prop validation
- Improved code organization with better file structure

### User Experience
- Enhanced search and filtering functionality
- Improved responsive design
- Added loading states and error boundaries
- Better seat selection interface
- Cleaner UI with consistent styling

### Performance
- Implemented debounced search
- Added request/response interceptors
- Optimized API calls with proper error handling
- Better state management

### Security
- Added input validation middleware
- Improved authentication flow
- Better error messages without exposing sensitive data
- Secure password handling

### Maintainability
- Modular component structure
- Consistent naming conventions
- Comprehensive documentation
- Environment configuration
- Proper separation of concerns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.