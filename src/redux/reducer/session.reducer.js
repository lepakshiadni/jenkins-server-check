// reducers/sessionReducer.js
const initialState = {
    sessions: []
  };
  
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_SESSIONS_SUCCESS':
        return {
          ...state,
          sessions: action.payload
        };
      case 'DELETE_SESSION_SUCCESS':
        return {
          ...state,
          sessions: state.sessions.filter(session => session._id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default sessionReducer;
  