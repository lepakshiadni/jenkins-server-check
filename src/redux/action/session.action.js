// src/redux/actions/session.actions.js

import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

// Action types
export const GET_SESSIONS_REQUEST = 'GET_SESSIONS_REQUEST';
export const GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS';
export const GET_SESSIONS_FAILURE = 'GET_SESSIONS_FAILURE';
export const DELETE_SESSION_REQUEST = 'DELETE_SESSION_REQUEST';
export const DELETE_SESSION_SUCCESS = 'DELETE_SESSION_SUCCESS';
export const DELETE_SESSION_FAILURE = 'DELETE_SESSION_FAILURE';

// Get sessions
export const getSessions = (userId) => async (dispatch) => {
  dispatch({ type: GET_SESSIONS_REQUEST });
  try {
    const response = await axios.get(`${baseUrl}/api/sessions/${userId}`);
    dispatch({ type: GET_SESSIONS_SUCCESS, payload: response.data.sessions });
  } catch (error) {
    dispatch({ type: GET_SESSIONS_FAILURE, payload: error.message });
  }
};

// Delete session
export const deleteSession = (sessionId) => async (dispatch) => {
  dispatch({ type: DELETE_SESSION_REQUEST });
  try {
    await axios.delete(`${baseUrl}/api/sessions/${sessionId}`);
    dispatch({ type: DELETE_SESSION_SUCCESS, payload: sessionId });
  } catch (error) {
    dispatch({ type: DELETE_SESSION_FAILURE, payload: error.message });
  }
};
