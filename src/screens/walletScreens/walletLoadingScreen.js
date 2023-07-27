import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler, ActivityIndicator} from 'react-native';
import Wrapper from '../../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {walletAuthentication} from '../../reducers/walletActions';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletLoadingScreen = ({walletAuthentication}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleWalletAuthentication = async () => {
    try {
      const data = await walletAuthentication();
      const isUserWalletCreated = await AsyncStorage.getItem(
        'isWalletPinSeedSet',
      );
      if (isUserWalletCreated == 'true') {
        navigation.navigate('WalletStack');
      } else {
        navigation.navigate('WalletStack');
      }
    } catch (error) {
      console.log('error: ', error);
      Snackbar.show({
        backgroundColor: 'red',
        text: 'Error occurred while fetching user wallet detail',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  useEffect(() => {
    handleWalletAuthentication();
  });
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainMenu');
      return true; // Return true to indicate that the back action is handled
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener on component unmount
  }, []);

  return (
    <Wrapper>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#3FB65F" />
      </View>
    </Wrapper>
  );
};

export default connect(null, {walletAuthentication})(WalletLoadingScreen);
