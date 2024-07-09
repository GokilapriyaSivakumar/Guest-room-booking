const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { roomId, startDate, endDate } = req.body;
  const userId = req.user.userId;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check availability
    const existingBooking = await Booking.findOne({
      room: room._id,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is already booked for these dates' });
    }

    // Create booking
    const booking = new Booking({
      room: room._id,
      user: userId,
      startDate,
      endDate,
    });

    await booking.save();
    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
