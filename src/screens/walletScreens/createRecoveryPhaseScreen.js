import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import InputText from '../../components/CustomInputText';
import {verifyOTP} from '../../reducers/otpActions';
import styles from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import Snackbar from 'react-native-snackbar';
import LoadingButton from '../../components/LoadingButton';
import ErrorField from '../../components/CustomError';

const CreateRecoveryPhaseScreen = ({verifyOTP}) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seedError, setSeedError] = useState('');
  const pinInput = useRef();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleOTPVerification = async () => {
    try {
      setLoading(true);
      const data = await verifyOTP(otpcode);
      if (
        data.error &&
        data.error.response &&
        data.error.response.status === 400
      ) {
        setLoading(false);
        Snackbar.show({
          backgroundColor: 'red',
          text: 'OTP is not correct',
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        Snackbar.show({
          backgroundColor: 'green',
          text: 'OTP Verified!',
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false); // Set loading to false after successful registration
        navigation.navigate('Verified');
      }
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        backgroundColor: 'red',
        text: 'Error occurred while signing in',
        duration: Snackbar.LENGTH_LONG,
      });
      // Handle error case if needed
    }
  };

  return (
    <Wrapper>
      <Text style={styles.mobileNumberText}></Text>
      <View style={{marginVertical: 10}}>
        <Text style={{...styles.mobileNumberSubText, marginVertical: 5}}>
          {t('Create your recovery phrase')}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          alignSelf: 'center',
        }}>
        <InputText
          placeholder="Seed Phrase"
          value={seedPhrase}
          onChangeText={text => setSeedPhrase(text)}
          returnKeyType={'next'}
          keyboardType={'default'}
        />
        {/* {seedError && <ErrorField errortext="Seed Phrase is required" />} */}
      </View>
      <Text></Text>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            name={t('Submit')}
            onPress={() => navigation.navigate('reEnterPinCode')}
          />
        )}
      </View>
    </Wrapper>
  );
};

export default connect(null, {verifyOTP})(CreateRecoveryPhaseScreen);
