import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {splash} from '../theme/theme';

const SplashScreen = () => {
  const navigation = useNavigation();
  // const [isLogin, setLogin] = useState(false); // Initialize the state as null

  useEffect(() => {
    async function checkSessionStatus() {
      try {
        const sessionToken = await AsyncStorage.getItem('sessionToken');

        if (sessionToken !== undefined && sessionToken !== null) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error checking session status:', error);
        // Handle the error case if needed
      }
    }

    const delayNavigation = async () => {
      // Call the session status checking function and await its completion
      const status = await checkSessionStatus();

      // Only navigate to the next screen if the session status has been determined
      if (status !== null) {
        setTimeout(() => {
          status
            ? navigation.navigate('MainMenu')
            : navigation.navigate('Landing');
        }, 2000);
      }
    };

    delayNavigation();
  }, []);

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
