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

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp,
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

// here dispatch is used coz we want to export multiple actions from within the action
//! FUNCTION TO LOG THE USER IN IF THE TOKEN IS VALID
export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
};
