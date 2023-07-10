import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  otpRequest,
  otpFailure,
  otpSuccess,
  getProfileRequest,
} from '../actions/types';

export const verifyOTP = otp => {
  // Perform OTP verification API call and handle response using Redux Thunk
  return async dispatch => {
    dispatch(otpRequest(otp));
    try {
      const loginIdValue = await AsyncStorage.getItem('verify_Id');
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/check-mobi/verify',
        JSON.stringify({
          id: loginIdValue,
          pin: otp,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzkzYzBjYjA3NDRkMjc4MDVlOTlmNiIsImlhdCI6MTYwMjA3MDgxOSwiZXhwIjoxNjA0NjYyODE5fQ.fsZIfO79r8heAwXYEbHi_feY5X0psS5HVh8CpFEftNI',
          },
        },
      );
      if (response.data) {
        await AsyncStorage.setItem('sessionToken', response.data.token);
        await getProfile();
      }
      dispatch({
        type: 'OTP_VERIFICATION_SUCCESS',
        payload: {otp}, // You can pass any necessary data here
      });

      return response.data; // Return the response data
    } catch (error) {
      console.log('error: ', error);
      dispatch(otpFailure(error.message));
      return {error}; // Return the error object
    }
  };
};

export const getProfile = async () => {
  try {
    const apiToken = await AsyncStorage.getItem('sessionToken');
    const response = await axios.get(
      'https://hopeaccelerated-backend.herokuapp.com/api/v1/auth/me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      },
    );
    const name =
      response.data.data.profile.firstName +
      ' ' +
      response.data.data.profile.lastName;
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userEmail', response.data.data.user.email);
    await AsyncStorage.setItem('userPhone', response.data.data.user.phone);
    await AsyncStorage.setItem('userQRcode', response.data.data.user.qrcode);
    await AsyncStorage.setItem('user_id', response.data.data.profile._id);
    return response.data; // Return the response data
  } catch (error) {
    console.log('error: ', error);
    return {error}; // Return the error object
  }
};
