const axios = require('axios');
const User = require('../models/user');
const Movie = require('../models/user'); 
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const secretKey = process.env.JWT_KEY; 

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

app.get('/user/:userId/shortlisted-movies', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('shortlistedMovies'); // Only select the shortlistedMovies field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ shortlistedMovies: user.shortlistedMovies });
  } catch (error) {
    console.error('Error fetching shortlisted movies:', error);
    res.status(500).json({ message: 'Error fetching shortlisted movies', error: error.message });
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body; 

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          name,
          email,
          password: hashedPassword,
          shortlistedMovies: []
      });

      await newUser.save();
      console.log("New User Created:", newUser);
      res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
      console.error(err); 
      res.status(500).json({ message: 'Error signing up', error: err.message });
  }
});

app.post('/logout', async (req, res) => {
  const { userId, shortlistedMovies } = req.body;
  console.log(req.body);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { shortlistedMovies: shortlistedMovies }, // Update the shortlistedMovies array
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Shortlisted movies updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating shortlisted movies:', error);
    res.status(500).json({ message: 'Error updating shortlisted movies', error: error.message });
  }
});



module.exports = app;
