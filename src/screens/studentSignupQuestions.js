import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler, StyleSheet} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import styles from '../theme/theme';
import Wrapper from '../components/wrapper';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const StudentSignupQuestion = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [gradeValue, setGradeValue] = useState('K-6');
  const [skillValue, setSkillValue] = useState('Science');
  const [gradeOpen, setGradeOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);
  const [gradeItems, setGradeItems] = useState([
    {label: 'K-6', value: 'K-6'},
    {label: '7-12', value: '7-12'},
    {label: 'Some University', value: 'Some University'},
    {
      label: "Bachelor's First Degree",
      value: "Bachelor's First Degree",
    },
    {
      label: "Master's Second Degree (or Higher)",
      value: "Master's Second Degree (or Higher)",
    },
  ]);
  const [skillItems, setSkillItems] = useState([
    {label: 'Languages', value: 'Languages'},
    {label: 'Mathematics', value: 'Mathematics'},
    {label: 'Science', value: 'Science'},
    {label: 'Social Studies', value: 'Social Studies'},
    {label: 'Humanitites', value: 'Humanitites'},
  ]);

  const handleSubmit = () => {
    if (!gradeValue || !skillValue) {
      Snackbar.show({
        backgroundColor: 'red',
        text: 'You must select your Grade & Skill',
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
        <Text style={styles.signUpheading}>{t('Personal_Information')}</Text>
        <View
          style={{
            ...styles.signUpSelect,
            ...styles.sideMarginContainer,
          }}>
          <Text style={styles.signUpSelectText}>
            {t('Which is the highes school grade that you completed?')}
          </Text>
          <View
            style={{
              zIndex: 9999,
            }}>
            <DropDownPicker
              open={gradeOpen}
              value={gradeValue}
              setOpen={setGradeOpen}
              setValue={setGradeValue}
              items={gradeItems}
              setItems={setGradeItems}
              style={myStyles.dropdown}
              dropDownStyle={myStyles.dropdown}
              containerStyle={myStyles.dropdownContainerStyle}
              itemStyle={myStyles.dropdownItemStyle}
              dropDownContainerStyle={{
                borderColor: 'transparent',
                elevation: 3,
              }}
              placeholder={t('Select from list')}
            />
          </View>
          <Text></Text>
          <Text style={styles.signUpSelectText}>
            {t('What_skills_do_you_want_to_study?')}
          </Text>
          <View>
            <DropDownPicker
              open={skillOpen}
              value={skillValue}
              setOpen={setSkillOpen}
              setValue={setSkillValue}
              items={skillItems}
              setItems={setSkillItems}
              style={myStyles.dropdown}
              dropDownStyle={myStyles.dropdown}
              containerStyle={myStyles.dropdownContainerStyle}
              itemStyle={myStyles.dropdownItemStyle}
              dropDownContainerStyle={{
                borderColor: 'transparent',
                elevation: 3,
              }}
              placeholder="Select from list"
            />
          </View>
        </View>
        <View style={styles.verificationButton}>
          <Button name={t('Submit')} onPress={() => handleSubmit()} />
        </View>
      </Wrapper>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    zIndex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 3,
    borderColor: 'transparent',
    position: 'relative', // Add relative positioning
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    zIndex: 2,
    position: 'absolute', // Add absolute positioning
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
    elevation: 3,
  },
  dropdownContainerStyle: {
    height: 40,
    zIndex: 3,
  },
  dropdownItemStyle: {
    justifyContent: 'flex-start',
    color: 'yellow',
  },
});
export default StudentSignupQuestion;
