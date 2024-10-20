const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require("./config/db");
const axios = require('axios');
const Movie = require('./models/movies.js');
require('dotenv').config(); // Load environment variables
const API_KEY = process.env.TMDB_API_KEY;


const app = express();
const PORT =  3000;
connectDB();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api", require("./routes/fetechMovies.js"));
