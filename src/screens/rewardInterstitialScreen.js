import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import {uploadAdHereIcon} from '../theme/theme';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;
const RewardInterstitialScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <Wrapper>
      <GlobalHeader />
      <Text style={styles.greenTitleText}>{t('Reward or Interstitial')}</Text>
      <View style={myStyles.container}>
        <View style={myStyles.imageContainer}>
          <Image source={uploadAdHereIcon} style={myStyles.adHereIconStyle} />
          <Text style={myStyles.imageDesc}>{t('Ad Here')}</Text>
        </View>
      </View>
    </Wrapper>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  adHereIconStyle: {
    width: 80,
    height: 80,
    // Additional styles for the image if needed
  },
  imageDesc: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    color: '#4D4D4D',
    paddingTop: 10,
  },
});

// export default connect(null, {login})(RewardInterstitialScreen);
export default RewardInterstitialScreen;
