import axios from 'axios';

pageNum=Math.floor(Math.random() * 500) + 1

const API_KEY = `a0c857effd9a4c08bb1905b33f159e6b`;

export const fetchMovies = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`);
  return response.data.results;
};
