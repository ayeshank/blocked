import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginRequest, loginSuccess, loginFailure} from '../actions/types';

export const login = phone => {
  return async dispatch => {
    dispatch(loginRequest(phone));
    try {
      console.log('workingapi');
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/check-mobi',
        JSON.stringify({
          number: phone,
          type: 'reverse_cli',
          platform: 'android',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzkzYzBjYjA3NDRkMjc4MDVlOTlmNiIsImlhdCI6MTYwMjA3MDgxOSwiZXhwIjoxNjA0NjYyODE5fQ.fsZIfO79r8heAwXYEbHi_feY5X0psS5HVh8CpFEftNI',
          },
        },
      );
      await AsyncStorage.setItem('verify_Id', response.data.data.id);
      console.log('response.data.data.id: ', response.data.data.id);
      console.log('login Response: ', response.data);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {phone}, // You can pass any necessary data here
      });

      return response.data; // Return the response data
    } catch (error) {
      console.log('error: ', error);
      dispatch(loginFailure(error.message));
      return {error}; // Return the error object
    }
  };
};
