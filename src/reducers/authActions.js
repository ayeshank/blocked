import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signupRequest, signupSuccess, signupFailure} from '../actions/types';

export const signupUser = userData => {
  return async dispatch => {
    dispatch(signupRequest(userData));
    try {
      console.log('userData: ', userData);
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/auth/register',
        JSON.stringify(userData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('signup response ', response);
      await AsyncStorage.setItem('userId', response.data.data.profile.id);
      otpAPI(response.data.data.otp, response.data.data.phone);

      dispatch(signupSuccess());

      return response.data; // Return the response data
    } catch (error) {
      dispatch(signupFailure(error.message));

      return {error}; // Return the error object
    }
  };
};
