import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
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
          <Image source={welcomeText1} style={styles.welcomeTextImage} />
          <Image source={welcomeText2} style={styles.welcomeTextImage} />
        </View>

        <View style={{marginVertical: 20}}>
          <Button
            name={t('as_a_student')}
            onPress={() => handleTeacherSignup()}
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
