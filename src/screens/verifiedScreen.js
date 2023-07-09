import React from 'react';
import {View, Text, Image} from 'react-native';
import {verifyIcon} from '../theme/theme';
import GlobalHeader from '../components/GlobalHeader';
import Button from '../components/Button';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const VerifiedScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <Wrapper>
      <GlobalHeader />
      <Text style={styles.mobileNumberText}>{t('PHONE_VERIFICATION')}</Text>
      <View style={styles.verificationImage}>
        <Image source={verifyIcon} />
      </View>
      <Text
        style={{
          ...styles.mobileNumberText,
          marginTop: 10,
          color: '#767676',
          fontWeight: '200',
        }}>
        {t('Verified')}
      </Text>
      <View style={styles.verificationButton}>
        <Button
          name={t('VERIFY')}
          onPress={() => navigation.navigate('MainMenu')}
        />
      </View>
    </Wrapper>
  );
};

export default VerifiedScreen;
