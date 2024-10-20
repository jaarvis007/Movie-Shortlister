// reducer.js
const initialState = {
  shortlistedMovies: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      const isMovieInList = state.shortlistedMovies.some(movie => movie.id === action.payload.id);
      if (isMovieInList) {
        return state;
      }

      return {
        ...state,
        shortlistedMovies: [...state.shortlistedMovies, action.payload],
      };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        shortlistedMovies: state.shortlistedMovies.filter(movie => movie.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default movieReducer;
