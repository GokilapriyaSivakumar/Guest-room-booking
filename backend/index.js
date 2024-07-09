const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// MongoDB connection string
const mongoURL = 'mongodb://127.0.0.1:27017/guestRoomBooking';

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB');
    console.error(err);
    process.exit(1);
  });

// Example Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// User Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Room Routes
const roomRoutes = require('./routes/room');
app.use('/api/rooms', roomRoutes);

// Booking Routes
const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
