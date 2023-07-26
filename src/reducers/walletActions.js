import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  walletAuthRequest,
  walletAuthFailure,
  walletAuthSuccess,
} from '../actions/types';

export const walletAuthentication = () => {
  return async dispatch => {
    dispatch(walletAuthRequest());
    try {
      const apiToken = await AsyncStorage.getItem('sessionToken');
      const response = await axios.get(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/user/wallet',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      console.log('response.data----:', response.data.data);
      await AsyncStorage.setItem('walletPinCode', response.data.data.pinCode);
      await AsyncStorage.setItem(
        'walletSeedPhrase',
        response.data.data.seedPhrase,
      );
      await AsyncStorage.setItem(
        'walletBalance',
        response.data.data.balance.toString(),
      );
      await AsyncStorage.setItem(
        'walletBalanceCurrecy',
        response.data.data.balanceCurrency,
      );
      if (
        response.data.data.isPinCodeSet == true &&
        response.data.data.isSeedPhraseSet == true
      ) {
        await AsyncStorage.setItem('isWalletPinSeedSet', 'true');
      }
      dispatch(walletAuthSuccess());
      console.log('working');
    } catch (error) {
      console.log('error: ', error);
      dispatch(walletAuthFailure(error.message));
      return {error}; // Return the error object
    }
  };
};

export const createWalletPinCode = code => {
  return async dispatch => {
    dispatch(walletAuthRequest());
    try {
      const apiToken = await AsyncStorage.getItem('sessionToken');
      const response = await axios.get(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/user/wallet',
        JSON.stringify({
          appId: '619354d5de2f280018720548',
          pinCode: code,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      console.log('response.data----:', response.data.data);
      dispatch(walletAuthSuccess());
      console.log('working');
    } catch (error) {
      console.log('error: ', error);
      dispatch(walletAuthFailure(error.message));
      return {error}; // Return the error object
    }
  };
};
