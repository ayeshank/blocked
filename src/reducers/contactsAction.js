import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  contactsRequest,
  contactsSuccess,
  contactsFailure,
} from '../actions/types';

export const fetchContacts = () => {
  return async dispatch => {
    // dispatch(contactsRequest(searchQuery));
    try {
      const loginIdValue = await AsyncStorage.getItem('verify_Id');
      const loginIdValue2 = await AsyncStorage.getItem('user_id');
      const apiToken = await AsyncStorage.getItem('sessionToken');
      const response = await axios.get(
        `https://hopeaccelerated-chat.herokuapp.com/api/v1/user/contacts?userId=${loginIdValue2}&keyword=""`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );

      if (response) {
        console.log('responseContacts: ', response.data);
        // await AsyncStorage.setItem('sessionToken', response.data.token);
        return response.data.data;
      } else if (response.data.data.length === 0) {
        return [];
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
export const searchUser = searchQuery => {
  return async dispatch => {
    dispatch(contactsRequest(searchQuery));
    try {
      const apiToken = await AsyncStorage.getItem('sessionToken');
      console.log('searchQuery: ', searchQuery);
      const response = await axios.get(
        `https://hopeaccelerated-backend.herokuapp.com/api/v1/users/by/name?name=${searchQuery}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      console.log('response A: ', response.data.data);
      if (response) {
        console.log('responseSearchedUser: ', response.data);
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
