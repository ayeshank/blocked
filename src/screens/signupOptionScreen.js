import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Button from '../components/Button';
import ButtonOutline from '../components/ButtonOutline';
import {
  screen1logo,
  screen2round,
  welcomeText1,
  welcomeText2,
  triangleIcon,
} from '../theme/theme';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {changeLanguage} from '../actions/types';
import LanguageDropdown from '../components/LanguageTranslator';
import {useTranslation} from 'react-i18next';

const SignupOptionsScreen = ({selectedLanguage, changeLanguage}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const handleLanguageChange = languageCode => {
    changeLanguage(languageCode);
  };

  const handleTeacherSignup = () => {
    navigation.navigate('Signup', {userType: 'Teacher'});
  };

  const handleStudentSignup = () => {
    navigation.navigate('Signup', {userType: 'Student'});
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
    <Wrapper>
      <ScrollView>
        <View style={styles.languageDropdowncontainer}>
          <View style={styles.languageDropdownView}>
            <LanguageDropdown
              selectedLanguage={selectedLanguage}
              changeLanguage={handleLanguageChange}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={{marginVertical: 0}}>
            <Image source={screen1logo} />
          </View>
          <Image source={screen2round} style={styles.roundImage} />
          <Text style={styles.landingTitle1}>{t('create_an_account')}</Text>
          <Text style={styles.signupOptionTitle1}>
            {t('Please click if you would like to sign up')}
          </Text>
          <Text style={styles.signupOptionTitle2}>
            {t('as a Student or as a Teacher')}
          </Text>
          {/* <Image source={welcomeText1} style={styles.welcomeTextImage} />
          <Image source={welcomeText2} style={styles.welcomeTextImage} /> */}
        </View>

        <View style={{marginVertical: 20}}>
          <Button
            name={t('as_a_student')}
            onPress={() => handleStudentSignup()}
          />
          <ButtonOutline
            name={t('as_a_teacher')}
            onPress={() => handleTeacherSignup()}
          />
          <TouchableOpacity style={{marginVertical: 20, alignItems: 'center'}}>
            <Text style={styles.policyText}>
              By clicking here, you agree to our Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    selectedLanguage: state.language.selectedLanguage,
  };
};

export default connect(mapStateToProps, {changeLanguage})(SignupOptionsScreen);
