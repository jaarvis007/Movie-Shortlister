// authReducer.js
const initialState = {
    user: null,  // Stores the user object after login
    error: null, // Stores any error message
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'LOGIN_FAIL':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  