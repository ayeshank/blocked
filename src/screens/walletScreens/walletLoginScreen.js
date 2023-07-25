import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {verifyOTP} from '../../reducers/otpActions';
import styles from '../../theme/theme';
import Wrapper from '../../components/wrapper';
import Snackbar from 'react-native-snackbar';
import LoadingButton from '../../components/LoadingButton';

const WalletLoginScreen = ({verifyOTP}) => {
  const [otpcode, setOTPcode] = useState('');
  const pinInput = useRef();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleWalletLogin = async () => {
    if (otpcode.length == 4) {
      navigation.navigate('WalletMainMenu');
    } else {
      Snackbar.show({
        backgroundColor: 'red',
        text: t('Wallet PIN required'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
    // try {
    //   setLoading(true);
    //   const data = await verifyOTP(otpcode);
    //   if (
    //     data.error &&
    //     data.error.response &&
    //     data.error.response.status === 400
    //   ) {
    //     setLoading(false);
    //     Snackbar.show({
    //       backgroundColor: 'red',
    //       text: 'OTP is not correct',
    //       duration: Snackbar.LENGTH_LONG,
    //     });
    //   } else {
    //     Snackbar.show({
    //       backgroundColor: 'green',
    //       text: 'OTP Verified!',
    //       duration: Snackbar.LENGTH_LONG,
    //     });
    //     setLoading(false); // Set loading to false after successful registration
    //     navigation.navigate('Verified');
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   Snackbar.show({
    //     backgroundColor: 'red',
    //     text: 'Error occurred while signing in',
    //     duration: Snackbar.LENGTH_LONG,
    //   });
    //   // Handle error case if needed
    // }
  };

  return (
    <Wrapper>
      <Text style={styles.mobileNumberText}></Text>
      <View style={{marginVertical: 10}}>
        <Text style={{...styles.mobileNumberSubText, marginVertical: 5}}>
          {t('Enter Your PIN')}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          alignSelf: 'center',
        }}>
        <SmoothPinCodeInput
          ref={pinInput}
          secureTextEntry={true}
          cellSize={55}
          codeLength={4}
          cellStyle={{
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'white',
            borderRadius: 30,
            elevation: 4,
            marginLeft: 10,
          }}
          cellStyleFocused={{
            borderColor: '#3FB65F',
            backgroundColor: '#3FB65F',
          }}
          textStyle={{
            fontSize: 24,
            color: '#3FB65F',
          }}
          value={otpcode}
          onTextChange={otpcode => setOTPcode(otpcode)}
          containerStyle={{
            marginVertical: 12,
            justifyContent: 'center',
            // alignItem: 'center',
          }}
          codeInputStyle={{
            color: 'white',
          }}
        />
      </View>
      <Text></Text>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button name={t('Submit')} onPress={() => handleWalletLogin()} />
        )}
      </View>
    </Wrapper>
  );
};

export default connect(null, {verifyOTP})(WalletLoginScreen);
