import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import styles from '../theme/theme';
import UploadKYCDocsScreen from '../screens/walletScreens/uploadKYCDocsScreen';
import {TouchableOpacity, Image} from 'react-native';
import {arrowWhite, dotsWhite} from '../theme/theme';
import WalletMainMenu from '../screens/walletScreens/walletMainMenuScreen';
import TokenMenuScreen from '../screens/walletScreens/tokenMenuScreen';
import TokenTransferScreen from '../screens/walletScreens/tokenTransferScreen';
import walletLoginScreen from '../screens/walletScreens/walletLoginScreen';
import createWalletPinScreen from '../screens/walletScreens/createWalletPinScreen';
import reEnterWalletPinScreen from '../screens/walletScreens/reEnterWalletPinScreen';
import createRecoveryPhaseScreen from '../screens/walletScreens/createRecoveryPhaseScreen';

const Stack = createStackNavigator();

const WalletNavigator = () => (
  <Stack.Navigator initialRouteName="WalletLogin">
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
      name="CreateWalletPin"
      component={createWalletPinScreen}
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

export default WalletNavigator;
