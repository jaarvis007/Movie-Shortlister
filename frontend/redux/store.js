// store.js
import { createStore, combineReducers } from 'redux';
import movieReducer from './reducer';
import authReducer from './authreducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
