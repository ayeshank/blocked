import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  contactsRequest,
  contactsSuccess,
  contactsFailure,
} from '../actions/types';

export const fetchContacts = otp => {
  return async dispatch => {
    dispatch(contactsRequest(otp));
    try {
      const loginIdValue = await AsyncStorage.getItem('verify_Id');
      const loginIdValue2 = await AsyncStorage.getItem('user_id');
      const apiToken = await AsyncStorage.getItem('sessionToken');
      console.log('loginIdValue: ', loginIdValue);
      console.log('loginIdValue2: ', loginIdValue2);

      const response = await axios.get(
        `https://hopeaccelerated-chat.herokuapp.com/api/v1/user/contacts?userId=${loginIdValue2}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      if (response) {
        console.log('response: ', response.data);
        // await AsyncStorage.setItem('sessionToken', response.data.token);
        return response.data.data;
      }
      dispatch(contactsSuccess());

      return response.data; // Return the response data
    } catch (error) {
      console.log('error: ', error);
      dispatch(contactsFailure(error.message));
      return {error}; // Return the error object
    }
  };
};
