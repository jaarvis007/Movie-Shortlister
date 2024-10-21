// actions.js
export const SET_SHORTLISTED_MOVIES = 'SET_SHORTLISTED_MOVIES';

export const setShortlistedMovies = (movies) => {
  return {
    type: SET_SHORTLISTED_MOVIES,
    payload: movies, // Ensure this is an array of movie objects
  };
};
