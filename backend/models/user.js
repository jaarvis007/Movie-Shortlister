const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Added name field
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shortlistedMovies: [
    {
      movieId: { type: String, required: true },
      title: { type: String, required: true },
      poster_path: { type: String, required: true },
      overview: { type: String }
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
