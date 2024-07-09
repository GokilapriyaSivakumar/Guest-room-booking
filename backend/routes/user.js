const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password, isOwner } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }
  
  try {
    const newUser = new User({ name, email, password, isOwner });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
