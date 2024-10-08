import React, {useState} from 'react';
import {View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../theme/theme';
import {useTranslation} from 'react-i18next';

const CustomPhoneInput = ({
  value,
  onChangeText,
  onChangeFormattedText,
  isSignUpScreen,
}) => {
  const {t} = useTranslation();
  return (
    <View
      style={
        isSignUpScreen == true
          ? styles.inputContainerSignup
          : styles.inputContainer
      }>
      <PhoneInput
        defaultValue={value}
        defaultCode="PK"
        layout="first"
        placeholder={t('Mobile Number')}
        placeholderTextColor="black"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        // withDarkTheme
        withShadow
        // autoFocus
        containerStyle={styles.input}
        textInputProps={{
          placeholderTextColor: 'black',
        }}
        textContainerStyle={styles.input}
        textInputStyle={{
          color: 'black',
          height: 80,
        }}
        codeTextStyle={{color: 'black', height: 25}}
      />
    </View>
  );
};

export default CustomPhoneInput;
