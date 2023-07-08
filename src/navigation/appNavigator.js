import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen';
import SignupOptionsScreen from '../screens/signupOptionScreen';
import SignupScreen from '../screens/signupScreen';
import LandingScreen from '../screens/landingScreen';
import LoginScreen from '../screens/loginScreen';
import otpScreen from '../screens/otpScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="SignupOptions"
          component={SignupOptionsScreen}
          options={{title: 'Signup Options', headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{title: 'Signup', headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="OTP"
          component={otpScreen}
          options={{title: 'OTP', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
