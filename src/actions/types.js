export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const OTP_REQUEST = 'OTP_REQUEST';
export const OTP_SUCCESS = 'OTP_SUCCESS';
export const OTP_FAILURE = 'OTP_FAILURE';

export const signupRequest = userData => ({
  type: SIGNUP_REQUEST,
  payload: userData,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginRequest = phone => ({
  type: LOGIN_REQUEST,
  payload: phone,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const otpRequest = phone => ({
  type: OTP_REQUEST,
  payload: phone,
});

export const otpSuccess = () => ({
  type: OTP_SUCCESS,
});

export const otpFailure = error => ({
  type: OTP_FAILURE,
  payload: error,
});

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  payload: language,
});
