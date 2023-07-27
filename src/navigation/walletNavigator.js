import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import styles from '../theme/theme';
import UploadKYCDocsScreen from '../screens/walletScreens/uploadKYCDocsScreen';
import {TouchableOpacity, Image, View, ActivityIndicator} from 'react-native';
import {arrowWhite, dotsWhite} from '../theme/theme';
import WalletMainMenu from '../screens/walletScreens/walletMainMenuScreen';
import TokenMenuScreen from '../screens/walletScreens/tokenMenuScreen';
import TokenTransferScreen from '../screens/walletScreens/tokenTransferScreen';
import walletLoginScreen from '../screens/walletScreens/walletLoginScreen';
import createWalletPinScreen from '../screens/walletScreens/createWalletPinScreen';
import reEnterWalletPinScreen from '../screens/walletScreens/reEnterWalletPinScreen';
import createRecoveryPhaseScreen from '../screens/walletScreens/createRecoveryPhaseScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wrapper from '../components/wrapper';

const Stack = createStackNavigator();

const WalletNavigator = () => {
  const [isWalletSet, setWallet] = useState(null);

  const handleWalletAuthentication = async () => {
    try {
      const isUserWalletCreated = await AsyncStorage.getItem(
        'isWalletPinSeedSet',
      );
      if (isUserWalletCreated === 'true') {
        setWallet(true);
      } else {
        setWallet(false);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    handleWalletAuthentication();
  }, []);

  if (isWalletSet === null) {
    return (
      <Wrapper>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#3FB65F" />
        </View>
      </Wrapper>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isWalletSet ? 'WalletLogin' : 'CreateWalletPin'}>
      <Stack.Screen
        name="WalletMainMenu"
        component={WalletMainMenu}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="UploadKYCDocs"
        component={UploadKYCDocsScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="TokenMenu"
        component={TokenMenuScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="TokenTransfer"
        component={TokenTransferScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="WalletLogin"
        component={walletLoginScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="CreateWalletPin"
        component={createWalletPinScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="ReEnterWalletPin"
        component={reEnterWalletPinScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="CreateRecoveryPhase"
        component={createRecoveryPhaseScreen}
        options={({navigation}) => ({
          headerTitle: 'BlockEd Wallet',
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowWhite} style={styles.headerIconLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Image source={dotsWhite} style={styles.headerIconRight} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#3FB65F',
          },
          headerTintColor: 'white',
        })}
      />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
