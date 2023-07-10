import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import CustomPhoneInput from '../components/PhoneInput';
import GlobalHeader from '../components/GlobalHeader';
import Button from '../components/Button';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {login} from '../reducers/loginActions';
import LoadingButton from '../components/LoadingButton';
import Snackbar from 'react-native-snackbar';
import {err} from 'react-native-svg/lib/typescript/xml';

const LoginScreen = ({login}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [formattedValue, setFormattedValue] = useState('');
  const [phone, setPhone] = useState('3328224649');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Dispatch the login action with the phone number
    try {
      setLoading(true);
      const data = await login(formattedValue);
      if (
        data.error &&
        data.error.response &&
        data.error.response.status === 400
      ) {
        setLoading(false);
        Snackbar.show({
          backgroundColor: 'red',
          text: 'Phone Number Not Registered',
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        Snackbar.show({
          backgroundColor: 'green',
          text: 'Login Successful!',
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false); // Set loading to false after successful registration
        navigation.navigate('OTP');
      }
    } catch (error) {
      setLoading(false);
      console.log('error: ', error);
      Snackbar.show({
        backgroundColor: 'red',
        text: 'Error occurred while signing in',
        duration: Snackbar.LENGTH_LONG,
      });
      // Handle error case if needed
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Landing');
      return true; // Return true to indicate that the back action is handled
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener on component unmount
  }, []);

  return (
    <Wrapper>
      <GlobalHeader />
      <Text style={styles.mobileNumberText}>{t('WELCOME_BACK')}</Text>
      <Text style={styles.mobileNumberSubText}>
        {t('Fill_in_your_account_using')}
      </Text>
      <View style={styles.phoneNumberField}>
        <CustomPhoneInput
          defaultValue={phone}
          onChangeText={text => {
            setPhone(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
        />
      </View>
      <View style={styles.bottomFixedComponent}>
        {loading ? (
          <LoadingButton />
        ) : (
          <Button name={t('Next')} onPress={() => handleLogin()} />
        )}
      </View>
    </Wrapper>
  );
};

export default connect(null, {login})(LoginScreen);
