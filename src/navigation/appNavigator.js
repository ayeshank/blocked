import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {arrow, dots, screen1logo} from '../theme/theme';
import GlobalHeader from '../components/GlobalHeader';
import styles from '../theme/theme';
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
import MessageScreen from '../screens/messageScreen';
import ChatScreen from '../screens/chatScreen';
import CourseCheckout from '../screens/courseCheckoutScreen';
import CourseDetailView from '../screens/courseDetailViewScreen';
import RewardInterstitialScreen from '../screens/rewardInterstitialScreen';
import TodayAppointmentScreen from '../screens/todayAppointmentScreen';
import TodayAppointmentCoursesScreen from '../screens/todayAppointmentCoursesScreen';
import WalletNavigator from './walletNavigator';
import AvailableCoursesListScreen from '../screens/AvailableCoursesListScreen';
import AllCoursesListScreen from '../screens/allCoursesListScreen';
import walletLoginScreen from '../screens/walletScreens/walletLoginScreen';
import walletLoadingScreen from '../screens/walletScreens/walletLoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
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
        <Stack.Screen
          name="WalletLoading"
          component={walletLoadingScreen}
          options={{title: 'WalletLoading', headerShown: false}}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={({navigation}) => ({
            title: 'Messages',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={arrow} style={styles.headerIconLeft} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('hello')}>
                <Image source={dots} style={styles.headerIconRight} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({navigation, route}) => ({
            title:
              route.params.contact.userProfileDetails.firstName +
              ' ' +
              route.params.contact.userProfileDetails.lastName,
            // title: 'dummy',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleStyle: {
              fontSize: 16,
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={arrow} style={styles.headerIconLeft} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CourseCheckout"
          component={CourseCheckout}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="CourseDetailView"
          component={CourseDetailView}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="AvailableCoursesList"
          component={AvailableCoursesListScreen}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="AllCoursesList"
          component={AllCoursesListScreen}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="RewardInterstitial"
          component={RewardInterstitialScreen}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="TodayAppointment"
          component={TodayAppointmentScreen}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="TodayAppointmentCourses"
          component={TodayAppointmentCoursesScreen}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
        <Stack.Screen
          name="WalletStack"
          component={WalletNavigator}
          options={({navigation}) => ({
            title: <GlobalHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F4F7FC',
            },
            headerTitleAlign: 'center',
            headerLeft: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
