import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {splash} from '../theme/theme';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLogin, setLogin] = useState(null); // Initialize the state as null

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const sessionToken = await AsyncStorage.getItem('sessionToken');
        console.log(
          "await AsyncStorage.getItem('sessionToken');",
          await AsyncStorage.getItem('sessionToken'),
        );
        if (sessionToken != undefined && sessionToken != null) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        // console.error('Error checking session status:', error);
        // Handle the error case if needed
      }
    };

    const delayNavigation = () => {
      // Only navigate to the next screen if the session status has been determined
      if (isLogin !== null) {
        setTimeout(() => {
          isLogin
            ? navigation.navigate('MainMenu')
            : navigation.navigate('Landing');
        }, 2000);
      }
    };

    // Call the session status checking function
    checkSessionStatus().then(delayNavigation);
  }, []); // Empty dependency array to run the effect only once

  return (
    <Wrapper>
      <View style={style.splashContainer}>
        <Image source={splash} />
      </View>
    </Wrapper>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
