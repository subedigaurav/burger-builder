import axios from 'axios';
import * as actionTypes from './actionTypes';

// ACTION CREATORS FOR AUTHENTICATION
export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  tokenId: token,
  userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

// log the user out
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// multiply by 1000 here to convert ms to s
export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => (dispatch) => {
  // ... authenticate the user
  dispatch(authStart());

  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url =			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNulgwXpavgDYvu8wS1OuGtC6U7dEMsOo';
  if (!isSignUp) {
    url =				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNulgwXpavgDYvu8wS1OuGtC6U7dEMsOo';
  }

  // async authentication using firebase
  axios
    .post(url, authData)
    .then((response) => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000,
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationTime', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

// here dispatch is used coz we want to export multiple actions from within the action
//! FUNCTION TO LOG THE USER IN IF THE TOKEN IS VALID
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    // convert to date coz what we retrieve from localstorage will be a string
    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    if (expirationTime > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000,
        ),
      );
    } else {
      dispatch(logout());
    }
  }
};
