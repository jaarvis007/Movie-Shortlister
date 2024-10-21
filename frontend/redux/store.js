// import { createStore } from 'redux';
// import rootReducer from './reducer';

// const store = createStore(rootReducer);


import { createStore, combineReducers } from 'redux';
import movieReducer from './reducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
});

const store = createStore(movieReducer);

export default store;

