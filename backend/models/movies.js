const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  release_date: String,
  poster_path: String,
  isShortlisted: { type: Boolean, default: false }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;