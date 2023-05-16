const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('../Middleware/auth');



router.post('/Register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
  
      // Generate JWT token and set it as a cookie
      const token = jwt.sign({ id: user._id }, "secret");
      res.cookie("jwt", token, { httpOnly: true });
  
      // Return user data
      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  






  router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if password is correct
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, 'secret');
  
      // Return token to the client
      return res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/verify-token', (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ message: 'Token missing' });
    }
  
    // Verify the token
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.json({ valid: false });
      }
  
      // Token is valid
      res.json({ valid: true });
    });
  });
module.exports = router;
