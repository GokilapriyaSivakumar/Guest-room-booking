const express = require('express');
const Room = require('../models/Room');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received request to create room:', req.body);
  const { name, floorSize, numberOfBeds, amenities, minBookingDays, maxBookingDays, rentPerDay, photos } = req.body;

  try {
    const room = new Room({ name, floorSize, numberOfBeds, amenities, minBookingDays, maxBookingDays, rentPerDay, photos });
    await room.save();
    console.log('Room created successfully:', room);
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error); 
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('owner', 'name email');
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
