import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {splash} from '../theme/theme';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulating a delay before navigating to the next screen
    setTimeout(() => {
      navigation.navigate('Landing');
    }, 2000);
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
