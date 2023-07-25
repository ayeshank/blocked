import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UploadInputField from '../../components/UploadInputField';
import Wrapper from '../../components/wrapper';
import styles from '../../theme/theme';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const UploadKYCDocsScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleUploadDocs = async () => {
    navigation.navigate('TokenMenu');
  };

  return (
    <Wrapper>
      <View style={myStyles.container}>
        <Text style={myStyles.text}>
          {t(
            'In order that we can redeem your Tokens so that you can use it for different purposes, please complete our Know Your Consumer (KYC) steps. Have your Government ID and Proof of Address Documents ready for these steps.',
          )}
        </Text>
        <UploadInputField placeholder={t('Upload Your Government ID')} />
        <Text></Text>
        <UploadInputField placeholder={t('Upload Your Proof of Address')} />
      </View>
      <View style={styles.bottomFixedComponent}>
        {/* {loading ? (
          <LoadingButton />
        ) : ( */}

        <Button name={'Submit'} onPress={() => handleUploadDocs()} />
        {/* )} */}
      </View>
    </Wrapper>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    marginBottom: 16,
    lineHeight: 20.46,
  },
});

export default UploadKYCDocsScreen;
