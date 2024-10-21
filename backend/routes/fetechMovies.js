const axios = require('axios');
const User = require('../models/user');
const Movie = require('../models/user'); // Assuming you have a Movie model
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const secretKey = process.env.JWT_KEY; 

const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

app.get('/movies', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a0c857effd9a4c08bb1905b33f159e6b&language=en-US`);
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

app.post('/shortlist', async (req, res) => {
  const { movieId, title, overview, release_date, poster_path } = req.body;
  try {
    const movie = new Movie({ movieId, title, overview, release_date, poster_path, isShortlisted: true });
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error shortlisting movie', message: error.message });
  }
});

app.get('/shortlisted-movies', async (req, res) => {
  try {
    const movies = await Movie.find({ isShortlisted: true });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shortlisted movies', message: error.message });
  }
});

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

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
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
  const { name, email, password } = req.body; // Receive user data

  try {
      // Check if the user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          name,
          email,
          password: hashedPassword, // Save the hashed password
          shortlistedMovies: []
      });

      await newUser.save();
      console.log("New User Created:", newUser);
      res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
      console.error(err); // Log the error for debugging
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
