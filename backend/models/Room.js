const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  floorSize: {
    type: String,
    required: true
  },
  numberOfBeds: {
    type: Number,
    required: true
  },
  amenities: {
    type: String,
    required: true
  },
  minBookingDays: {
    type: Number,
    required: true
  },
  maxBookingDays: {
    type: Number,
    required: true
  },
  rentPerDay: {
    type: Number,
    required: true
  },
  photos: {
    type: String,
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
