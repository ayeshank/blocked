import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {otpRequest, otpFailure, otpSuccess} from '../actions/types';

export const verifyOTP = otp => {
  // Perform OTP verification API call and handle response using Redux Thunk
  return async dispatch => {
    dispatch(otpRequest(otp));
    try {
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/check-mobi/verify',
        JSON.stringify({
          id: AsyncStorage.getItem('verify_Id'),
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
      await AsyncStorage.setItem('APIToken', data.data.token),
        console.log('verify otp Response: ', response.data);
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
