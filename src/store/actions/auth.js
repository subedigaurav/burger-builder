import axios from 'axios';
import * as actionTypes from './actionTypes';

// ACTION CREATORS FOR AUTHENTICATION
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		tokenId: token,
		userId: userId,
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

// log the user out
export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

// multiply by 1000 here to convert ms to s
export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		// ... authenticate the user
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNulgwXpavgDYvu8wS1OuGtC6U7dEMsOo';
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNulgwXpavgDYvu8wS1OuGtC6U7dEMsOo';
		}

		// async authentication using firebase
		axios
			.post(url, authData)
			.then(response => {
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error));
			});
	};
};
