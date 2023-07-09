import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen';
import SignupOptionsScreen from '../screens/signupOptionScreen';
import SignupScreen from '../screens/signupScreen';
import LandingScreen from '../screens/landingScreen';
import LoginScreen from '../screens/loginScreen';
import otpScreen from '../screens/otpScreen';
import VerifiedScreen from '../screens/verifiedScreen';
import StudentSignupQuestion from '../screens/studentSignupQuestions';
import TeacherSignUpQuestion from '../screens/teacherSignupQuestions';
import MainMenu from '../screens/mainMenu';
import ProfileScreen from '../screens/profileScreen';

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
        <Stack.Screen
          name="Verified"
          component={VerifiedScreen}
          options={{title: 'Verified', headerShown: false}}
        />
        <Stack.Screen
          name="StudentSignupQuestion"
          component={StudentSignupQuestion}
          options={{title: 'StudentSignupQuestion', headerShown: false}}
        />
        <Stack.Screen
          name="TeacherSignUpQuestion"
          component={TeacherSignUpQuestion}
          options={{title: 'TeacherSignUpQuestion', headerShown: false}}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{title: 'MainMenu', headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Profile', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
