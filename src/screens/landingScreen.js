import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import ButtonOutline from '../components/ButtonOutline';
import {screen1logo, screen1round, welcomeText} from '../theme/theme';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import {connect} from 'react-redux';
import {changeLanguage} from '../actions/types';
import LanguageDropdown from '../components/LanguageTranslator';
import {useTranslation} from 'react-i18next';

const LandingScreen = ({selectedLanguage, changeLanguage}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const handleLanguageChange = languageCode => {
    changeLanguage(languageCode);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('SignupOptions');
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
          <Image source={screen1round} style={styles.roundImage} />
          <Text style={styles.landingTitle1}>
            {t('PLEASE CREATE AN ACCOUNT')}
          </Text>
          <Text style={styles.landingTitle2}>{t('OR SIGN IN')}</Text>
          {/* <Image source={welcomeText} style={styles.welcomeTextImage} /> */}
        </View>

        <View style={{marginVertical: 20}}>
          <Button
            name={t('create_an_account')}
            onPress={() => handleSignup()}
          />
          <ButtonOutline name={t('sign_in')} onPress={() => handleLogin()} />
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

export default connect(mapStateToProps, {changeLanguage})(LandingScreen);
