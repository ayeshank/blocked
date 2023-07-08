import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {signupUser} from '../reducers/authActions';
import {fetchDeviceData} from '../reducers/deviceActions';
import {useNavigation} from '@react-navigation/native';
import {circle, tick, passwordIcon} from '../theme/theme';
import styles from '../theme/theme';

import GlobalHeader from '../components/GlobalHeader';
import CustomPhoneInput from '../components/PhoneInput';
import SelectGenderHorizontal from '../components/SelectGenderHorizontal';
import DateSelect from '../components/DatePicker';
import InputText from '../components/CustomInputText';
import ErrorField from '../components/CustomError';
import {useTranslation} from 'react-i18next';
import LoadingButton from '../components/LoadingButton';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({signupUser, fetchDeviceData, androidId, deviceId}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('Blocked01');
  const [lastName, setLastName] = useState('Blocked01');
  const [phone, setPhone] = useState('3328224777');
  const [formattedValue, setFormattedValue] = useState('');
  const [email, setEmail] = useState('blocked06@gmail.com');
  const [password, setPassword] = useState('757001ank$');
  const [country, setCountry] = useState('Pakistan');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [token, setToken] = useState('');
  // const [otpToken, setOtpToken] = useState('');

  const errorState = {
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    emailError: '',
    password: false,
    country: false,
    terms: false,
  };
  const [errors, setErrors] = useState(errorState);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const countryRef = useRef(null);

  useEffect(() => {
    fetchDeviceData();
    console.log('fetchDeviceData: ', fetchDeviceData());
    console.log('androidId: ', androidId);
    console.log('deviceId: ', deviceId);
  }, [fetchDeviceData]);

  const firstKeyDown = () => {
    lastNameRef.current.focus();
  };
  const _firstKeyDown = () => {
    phoneRef.current.focus();
  };
  const secondKeyDown = () => {
    emailRef.current.focus();
  };
  const thirdKeyDown = () => {
    passwordRef.current.focus();
  };
  const fourthKeyDown = () => {
    countryRef.current.focus();
  };

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  // const otptoken = value => {
  //   setToken(value);
  // };

  useEffect(() => {
    if (token) {
      // navigation.navigate('FirstSignUpQuestions');
      console.log('token is here****');
    }
  }, [token, navigation]);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validationErrors = {...errorState};
    let isValid = true;

    if (!firstName.trim()) {
      validationErrors.firstName = true;
      isValid = false;
    }
    if (!lastName.trim()) {
      validationErrors.lastName = true;
      isValid = false;
    }
    if (!phone.trim()) {
      validationErrors.phone = true;
      isValid = false;
    }
    if (!email.trim()) {
      validationErrors.email = true;
      validationErrors.emailError = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      validationErrors.email = true;
      validationErrors.emailError = 'Invalid email format';
      isValid = false;
    }
    // if (
    //   !password ||
    //   !/\d/.test(password) ||
    //   !/[A-Z]/.test(password) ||
    //   !/[a-z]/.test(password) ||
    //   password.length < 8
    // ) {
    //   validationErrors.password = true;
    //   isValid = false;
    // }
    if (!country.trim()) {
      validationErrors.country = true;
      isValid = false;
    }
    if (!terms) {
      validationErrors.terms = true;
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      setLoading(true);
      const obj = {
        email,
        password,
        phone: formattedValue,
        roleId: '6061ac8b4c0fbf384c754ea0',
        appsChannelKey: '4cf265539f9353b94a4e20fb3c189dab',
        preferredLanguage: 'english',
        deviceIds: [androidId, deviceId],
        profile: {
          firstName,
          lastName,
          country,
        },
      };

      try {
        console.log('sendingOBJ: ', obj);
        const data = await signupUser(obj);
        if (
          data.error &&
          data.error.response &&
          data.error.response.status === 400
        ) {
          setLoading(false);
          Snackbar.show({
            backgroundColor: 'red',
            text: 'User Already Exist',
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            backgroundColor: 'green',
            text: 'Registration Successful!',
            duration: Snackbar.LENGTH_LONG,
          });
          setLoading(false); // Set loading to false after successful registration
          navigation.navigate('Login');
          console.log('data: ', data);
        }
      } catch (error) {
        setLoading(false);
        Snackbar.show({
          backgroundColor: 'red',
          text: 'Error occurred while registering',
          duration: Snackbar.LENGTH_LONG,
        });
        // Handle error case if needed
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <ScrollView>
        <GlobalHeader />
        <Text style={styles.mobileNumberText}>{t('SIGN_UP')}</Text>
        <Text style={styles.mobileNumberSubText}>
          {t('Please_fill_below_details_to_create_a_new_account')}
        </Text>
        <Text></Text>
        <InputText
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          ref={firstNameRef}
          onSubmitEditing={firstKeyDown}
          returnKeyType={'next'}
          keyboardType={'default'}
        />
        {errors.firstName && <ErrorField errortext={'Full_Name_is_required'} />}
        <InputText
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          ref={lastNameRef}
          onSubmitEditing={secondKeyDown}
          returnKeyType={'next'}
          keyboardType={'default'}
        />
        {errors.lastName && <ErrorField errortext={'Last_Name_is_required'} />}
        <CustomPhoneInput
          defaultValue={phone}
          onChangeText={text => {
            setPhone(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          ref={phoneRef}
          onSubmitEditing={_firstKeyDown}
          returnKeyType={'next'}
          keyboardType={'default'}
          isSignUpScreen={true}
        />
        {errors.phone && <ErrorField errortext={'Phone_Number_is_required'} />}
        <InputText
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          ref={emailRef}
          onSubmitEditing={thirdKeyDown}
          returnKeyType={'next'}
          keyboardType={'default'}
        />
        {errors.email && <ErrorField errortext={'Email_is_required'} />}
        <View style={styles.container}>
          <View
            style={{
              ...styles.inputTextHeader,
              ...styles.inputTextContainer,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <TextInput
              style={{flex: 1, padding: 10, backgroundColor: 'white'}}
              placeholder="Password"
              placeholderTextColor="black"
              color="black"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={showPassword}
              ref={passwordRef}
              onSubmitEditing={fourthKeyDown}
              returnKeyType={'next'}
              keyboardType={'default'}
              selectionColor="white"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={passwordIcon}
                resizeMode="contain"
                style={{height: 20, width: 40, backgroundColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {errors.password && <ErrorField errortext={'Password_Error'} />}
        <InputText
          placeholder="Country"
          value={country}
          onChangeText={text => setCountry(text)}
          ref={countryRef}
          returnKeyType={'done'}
          keyboardType={'default'}
        />
        {errors.country && <ErrorField errortext={'Country_is_required'} />}
        <View style={styles.sideMarginContainer}>
          <Text></Text>
          <Text style={styles.signupQuestions}>{t('What_is_you_Gender?')}</Text>
          <SelectGenderHorizontal />
          <Text></Text>
          <Text style={styles.signupQuestions}>
            {t('What_is_your_date_of_birth?')}
          </Text>
          <DateSelect />
        </View>
        <Text></Text>
        <TouchableOpacity style={styles.terms} onPress={() => setTerms(!terms)}>
          {terms ? <Image source={tick} /> : <Image source={circle} />}
          <Text style={styles.termsText}>
            {'  '}
            {t('I_Agree_to_the_Terms_&_Conditions')}
          </Text>
        </TouchableOpacity>
        {errors.terms && (
          <ErrorField errortext={'You_must_agree_terms_and_condition'} />
        )}
        <Text style={{marginBottom: 56}}></Text>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {loading ? (
          <LoadingButton />
        ) : (
          // <Button name={t('SIGN_UP')} onPress={handleSubmit} />
          <Button name={t('SIGN_UP')} onPress={() => handleSubmit()} />
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  androidId: state.device.androidId,
  deviceId: state.device.deviceId,
});

export default connect(mapStateToProps, {signupUser, fetchDeviceData})(
  SignupScreen,
);
