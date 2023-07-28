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

      if (
        response.data.data.isPinCodeSet == true &&
        response.data.data.isSeedPhraseSet == true
      ) {
        await AsyncStorage.setItem('walletPinCode', response.data.data.pinCode);
        await AsyncStorage.setItem('walletAppId', response.data.data.appId);
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
        await AsyncStorage.setItem('isWalletPinSeedSet', 'true');
      } else if (
        response.data.data.isPinCodeSet == false &&
        response.data.data.isSeedPhraseSet == false
      ) {
        await AsyncStorage.setItem('walletAppId', response.data.data.appId);
        await AsyncStorage.setItem('isWalletPinSeedSet', 'false');
      }
      dispatch(walletAuthSuccess());
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
      const appId = await AsyncStorage.getItem('walletAppId');
      console.log('appId: ', appId);
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/user/wallet/pincode/create',
        JSON.stringify({
          appId: appId,
          pinCode: code,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      console.log('response.data----:', response.data);
      dispatch(walletAuthSuccess());
    } catch (error) {
      console.log('error: ', error.message);
      dispatch(walletAuthFailure(error.message));
      return {error}; // Return the error object
    }
  };
};

export const createRecoveryPhase = text => {
  return async dispatch => {
    dispatch(walletAuthRequest());
    try {
      const apiToken = await AsyncStorage.getItem('sessionToken');
      const appId = await AsyncStorage.getItem('walletAppId');
      console.log('appId: ', appId);
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/user/wallet/seedphrase/create',
        JSON.stringify({
          appId: appId,
          seedPhrase: text,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      console.log('response.data----:', response.data);
      dispatch(walletAuthSuccess());
    } catch (error) {
      console.log('error: ', error.message);
      dispatch(walletAuthFailure(error.message));
      return {error}; // Return the error object
    }
  };
};

export const getAllUsers = () => {
  return async dispatch => {
    dispatch(walletAuthRequest());
    try {
      const apiToken = await AsyncStorage.getItem('sessionToken');
      const response = await axios.get(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/users',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      //   console.log('response.data----:', response.data);
      dispatch(walletAuthSuccess());
      return response.data.data;
    } catch (error) {
      console.log('error: ', error.message);
      dispatch(walletAuthFailure(error.message));
      return {error}; // Return the error object
    }
  };
};

export const sendToken = (amount, receiverUserId) => {
  return async dispatch => {
    dispatch(walletAuthRequest());
    try {
      const apiToken = await AsyncStorage.getItem('sessionToken');
      const appId = await AsyncStorage.getItem('walletAppId');
      const currentUserBalance = await AsyncStorage.getItem('walletBalance');
      const response = await axios.post(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/user/wallet/balance/send',
        JSON.stringify({
          balanceSent: amount,
          balanceCurrency: 'USD',
          senderAppId: appId,
          toUserId: receiverUserId,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );

      console.log('response.data----:', response.data);
      if (response.data.data.success == true) {
        await AsyncStorage.setItem(
          'walletBalance',
          parseFloat(currentUserBalance) - parseFloat(amount),
        );
      }
      dispatch(walletAuthSuccess());
      return response.data.data;
    } catch (error) {
      console.log('errorAction: ', error.message);
      dispatch(walletAuthFailure(error.message));
      return {error}; // Return the error object
    }
  };
};
