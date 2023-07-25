import React, {useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import CustomInputText from '../components/CustomInputText';
import UploadInputField from '../components/UploadInputField';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const TeacherSignUpQuestion = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [courses, setCourses] = useState('');
  const [skillValue, setSkillValue] = useState('Science');

  const handleSubmit = () => {
    if (!courses && !skillValue) {
      Snackbar.show({
        backgroundColor: 'red',
        text: 'You must select your courses & skills',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      navigation.navigate('Login');
    }
  };
  const handleBackButton = () => {
    // Navigate back to the MainMenu screen
    navigation.goBack();
    return true; // Return true to indicate that the back action is handled
  };

  useEffect(() => {
    // Override the default back button behavior
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // Clean up the custom back button handler when the screen is unmounted
    return () => backHandler.remove();
  }, []);
  return (
    <View>
      <Wrapper>
        <GlobalHeader />
        <Text style={styles.mobileNumberText}>{t('SIGN_UP')}</Text>
        <Text style={styles.mobileNumberSubText}>
          {t('Please_fill_below_details_to_create_a_new_account')}
        </Text>
        <View
          style={{
            ...styles.signUpSelect,
            ...styles.sideMarginContainer,
          }}>
          <Text style={styles.signUpSelectText}>
            {t('Teaching_course(s)_speciality')}
          </Text>
          <CustomInputText
            placeholder={t('Enter your Teaching course(s) speciality')}
            value={courses}
            onChangeText={text => setCourses(text)}
            returnKeyType={'next'}
            keyboardType={'default'}
          />
          <Text></Text>
          <Text style={styles.signUpSelectText}>
            {t('Upload_your_teaching_certification_and_degree_of_education')}
          </Text>
          <UploadInputField placeholder={t('Upload Certification Documents')} />
          <Text></Text>
          <UploadInputField placeholder={t('Upload Education Degree')} />
        </View>
        <View style={styles.verificationButton}>
          <Button name={t('Submit')} onPress={() => handleSubmit()} />
        </View>
      </Wrapper>
    </View>
  );
};

export default TeacherSignUpQuestion;
