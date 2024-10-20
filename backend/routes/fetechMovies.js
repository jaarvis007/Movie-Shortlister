const axios = require('axios');
const Movie = require('../models/movies');
const express = require("express");

const app=express();

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
  const movie = new Movie({ title, overview, release_date, poster_path, isShortlisted: true });
  await movie.save();
  res.json(movie);
});

app.get('/shortlisted-movies', async (req, res) => {
  const movies = await Movie.find({ isShortlisted: true });
  res.json(movies);
});


module.exports = app